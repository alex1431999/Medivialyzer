import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { TeamDto } from './dto/team.dto';
import { CreateMemberDto } from '../client/dto/create-member.dto';
import { CreateWasteDto } from './dto/create-waste.dto';
import { TeamGateway } from './team.gateway';
import { ClientService } from '../client/client.service';

@Controller('team')
export class TeamController {
  constructor(
    private readonly teamService: TeamService,
    private readonly clientService: ClientService,
    private readonly teamGateway: TeamGateway,
  ) {}

  @Post()
  @ApiOkResponse({ type: TeamDto })
  async create(@Body() createTeamDto: CreateTeamDto) {
    const team = await this.teamService.create(createTeamDto);
    return this.teamService.findOne(team.id);
  }

  @Get('/client/:clientId')
  @ApiOkResponse({ type: TeamDto, isArray: true })
  async findAll(@Param('clientId') clientId: string) {
    return this.teamService.findAllByClient(clientId);
  }

  @Get(':id')
  @ApiOkResponse({ type: TeamDto })
  async findOne(@Param('id') id: string) {
    const team = await this.teamService.findOne(id);
    if (!team) throw new NotFoundException(`Team with ID ${id} not found`);
    return team;
  }

  @Patch(':id')
  @ApiOkResponse({ type: TeamDto })
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    await this.teamService.update(id, updateTeamDto);
    this.teamGateway.notifyTeamUpdated(id);
    return this.teamService.findOne(id);
  }

  @Patch(':id/reset')
  @ApiOkResponse({ type: TeamDto })
  async reset(@Param('id') id: string) {
    await this.teamService.reset(id);
    this.teamGateway.notifyTeamUpdated(id);
    return this.teamService.findOne(id);
  }

  @Delete(':id')
  @ApiOkResponse()
  async remove(@Param('id') id: string) {
    await this.teamService.remove(id);
  }

  @Post(':id/members')
  @ApiOkResponse({ type: TeamDto })
  async createMember(
    @Param('id') id: string,
    @Body() createMemberDto: CreateMemberDto,
  ) {
    const member = await this.clientService.findOne(createMemberDto.id);
    if (!member)
      throw new NotFoundException(
        `Could not find member with id ${createMemberDto.id}`,
      );

    const team = await this.teamService.createMember(id, createMemberDto);
    this.teamGateway.notifyMemberCreated(id, member.name);

    return team;
  }

  @Delete(':id/members/:memberId')
  @ApiOkResponse()
  removeMember(@Param('id') id: string, @Param('memberId') memberId: string) {
    return this.teamService.removeMember(id, memberId);
  }

  @Post(':id/waste/:memberId')
  @ApiOkResponse()
  async createWaste(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
    @Body() createWasteDto: CreateWasteDto,
  ) {
    const member = await this.clientService.findOne(memberId);
    if (!member)
      throw new NotFoundException(`Could not find member with id ${id}`);

    await this.teamService.createWaste(id, memberId, createWasteDto);
    this.teamGateway.notifyWasteAdded(id, member.name);
  }
}
