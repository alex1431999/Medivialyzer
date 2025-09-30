import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { CreateMemberDto } from '../client/dto/create-member.dto';
import { CreateWasteDto } from './dto/create-waste.dto';
import { Waste } from './entities/waste.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,

    @InjectRepository(Client)
    private clientRepository: Repository<Client>,

    @InjectRepository(Waste)
    private wasteRepository: Repository<Waste>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const client = await this.clientRepository.findOne({
      where: { id: createTeamDto.owner },
    });

    if (!client) throw new Error('Owner doesnt exist');

    return this.teamRepository.save({ ...createTeamDto, owner: client });
  }

  async findAllByClient(clientId: string) {
    const client = await this.clientRepository.findOne({
      where: { id: clientId },
    });

    if (!client) throw new Error('Client doesnt exist');

    return this.teamRepository
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.owner', 'owner')
      .leftJoinAndSelect('team.members', 'members')
      .leftJoinAndSelect('team.wastes', 'wastes')
      .leftJoinAndSelect('wastes.client', 'wasteClient')
      .where('owner.id = :clientId', { clientId })
      .orWhere('members.id = :clientId', { clientId })
      .getMany();
  }

  async createMember(teamId: string, createMemberDto: CreateMemberDto) {
    const team = await this.findOne(teamId);

    const client = await this.clientRepository.findOneBy({
      id: createMemberDto.id,
    });

    if (!team || !client)
      throw new NotFoundException('Team or Client not found');

    const allMembers = [team.owner, ...team.members];
    const allMembersIds = allMembers.map((member) => member.id);

    if (allMembersIds.includes(createMemberDto.id))
      throw new BadRequestException('User is already part of this team');

    team.members.push(client);
    await this.teamRepository.save(team);

    return team;
  }

  async removeMember(teamId: string, memberId: string) {
    const team = await this.findOne(teamId);

    if (!team) throw new NotFoundException('Team not found');

    team.members = team.members.filter((member) => member.id !== memberId);

    await this.teamRepository.save(team);
  }

  findOne(id: string) {
    return this.teamRepository.findOne({
      where: { id },
      relations: ['owner', 'members', 'wastes', 'wastes.client'],
    });
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    return this.teamRepository.update(id, updateTeamDto);
  }

  remove(id: string) {
    return this.teamRepository.delete(id);
  }

  async createWaste(
    teamId: string,
    memberId: string,
    createWasteDto: CreateWasteDto,
  ) {
    const team = await this.findOne(teamId);
    const client = await this.clientRepository.findOne({
      where: { id: memberId },
    });

    if (!team || !client)
      throw new NotFoundException('Team or client not found');

    const waste = this.wasteRepository.create({
      team,
      client,
      wasteAmount: createWasteDto.wasteAmount,
    });

    return this.wasteRepository.save(waste);
  }
}
