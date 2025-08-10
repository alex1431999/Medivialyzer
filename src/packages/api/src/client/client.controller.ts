import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.clientService.findOne(id);

    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return client;
  }

  @Get(':id/exists')
  async exists(@Param('id') id: string) {
    const client = await this.clientService.findOne(id);
    return Boolean(client);
  }
}
