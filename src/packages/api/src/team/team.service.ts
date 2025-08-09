import { Injectable } from '@nestjs/common';
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

  async findAllByOwner(owner: number) {
    const client = await this.clientRepository.findOne({
      where: { id: owner },
    });

    if (!client) throw new Error('Owner doesnt exist');

    return this.teamRepository.findBy({ owner: client });
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
