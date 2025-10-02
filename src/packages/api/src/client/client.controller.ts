import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ClientDto } from './dto/client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ClientExistsDto } from './dto/client-exists.dto';

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }

  @ApiOkResponse({ type: ClientDto })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const client = await this.clientService.findOne(id);

    if (!client) {
      throw new NotFoundException(`Client with id ${id} not found`);
    }

    return client;
  }

  @ApiOkResponse({ type: ClientExistsDto })
  @Get(':id/exists')
  async exists(@Param('id') id: string) {
    const client = await this.clientService.findOne(id);
    return { exists: Boolean(client) };
  }

  @ApiOkResponse({ type: ClientDto })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    await this.clientService.update(id, updateClientDto);
    return this.clientService.findOne(id);
  }
}
