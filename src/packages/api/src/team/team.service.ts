import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Repository } from 'typeorm';
import { Client } from '../client/entities/client.entity';

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

  async addMember(teamId: number, memberId: string) {
    const team = await this.teamRepository.findOne({
      where: { id: teamId },
      relations: ['members'],
    });

    const client = await this.clientRepository.findOneBy({ id: memberId });

    if (!team || !client)
      throw new NotFoundException('Team or Client not found');

    team.members.push(client);
    await this.teamRepository.save(team);

    return team;
  }

  findOne(id: number) {
    return this.teamRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTeamDto: UpdateTeamDto) {
    return this.teamRepository.update(id, updateTeamDto);
  }

  remove(id: number) {
    return this.teamRepository.delete(id);
  }
}
