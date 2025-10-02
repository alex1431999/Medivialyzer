import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateClientDto } from './dto/update-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  create(createClientDto: CreateClientDto) {
    return this.clientRepository.insert(createClientDto);
  }

  async update(id: string, updateClientDto: UpdateClientDto) {
    const result = await this.clientRepository.update(id, updateClientDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Client with ID ${id} not found`);
    }
    return result;
  }

  findOne(id: string) {
    return this.clientRepository.findOne({ where: { id } });
  }
}
