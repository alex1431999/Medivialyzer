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

    return this.teamRepository.findBy({ owner: client });
  }

  async findAllByMember(memberId: string) {
    const client = await this.clientRepository.findOne({
      where: { id: memberId },
    });

    if (!client) throw new Error('Owner doesnt exist');

    return this.teamRepository.findBy({ members: client });
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

  findOne(id: string) {
    return this.teamRepository.findOne({ where: { id } });
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    return this.teamRepository.update(id, updateTeamDto);
  }

  remove(id: string) {
    return this.teamRepository.delete(id);
  }
}
