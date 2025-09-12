import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';
import { CreateMemberDto } from '../client/dto/create-member.dto';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private teamRepository: Repository<Team>,

    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const client = await this.clientRepository.findOne({
      where: { id: createTeamDto.owner },
    });

    if (!client) throw new Error('Owner doesnt exist');

    return this.teamRepository.save({ ...createTeamDto, owner: client });
  }

  async findAllByOwner(owner: string) {
    const client = await this.clientRepository.findOne({
      where: { id: owner },
    });

    if (!client) throw new Error('Owner doesnt exist');

    return this.teamRepository.find({
      where: { owner: client },
      relations: ['owner', 'members'],
    });
  }

  async findAllByMember(memberId: string) {
    const client = await this.clientRepository.findOne({
      where: { id: memberId },
    });

    if (!client) throw new Error('Owner doesnt exist');

    return this.teamRepository.find({
      where: { members: client },
      relations: ['owner', 'members'],
    });
  }

  async createMember(teamId: string, createMemberDto: CreateMemberDto) {
    // TODO verify the user is not part of the team yet, either as member or owner
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: ['members'],
    });

    const client = await this.clientRepository.findOneBy({
      id: createMemberDto.id,
    });

    if (!team || !client)
      throw new NotFoundException('Team or Client not found');

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
      relations: ['members', 'owner'],
    });
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    return this.teamRepository.update(id, updateTeamDto);
  }

  remove(id: string) {
    return this.teamRepository.delete(id);
  }
}
