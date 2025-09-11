import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { TeamDto } from './dto/team.dto';
import { CreateMemberDto } from '../client/dto/create-member.dto';

@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  @ApiOkResponse({ type: TeamDto })
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @Get()
  @ApiOkResponse({ type: TeamDto, isArray: true })
  findAllByOwner(@Param('ownerClientId') ownerClientId: string) {
    return this.teamService.findAllByOwner(ownerClientId);
  }

  @Get()
  @ApiOkResponse({ type: TeamDto, isArray: true })
  async findAll(@Param('clientId') clientId: string) {
    const allOwned = await this.teamService.findAllByOwner(clientId);
    const allJoined = await this.teamService.findAllByMember(clientId);

    return [...allOwned, ...allJoined];
  }

  @Get(':id')
  @ApiOkResponse({ type: TeamDto })
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: TeamDto })
  async update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    await this.teamService.update(id, updateTeamDto);
    return this.teamService.findOne(id);
  }

  @Delete(':id')
  @ApiOkResponse()
  async remove(@Param('id') id: string) {
    await this.teamService.remove(id);
  }

  @Post(':id/members')
  @ApiOkResponse({ type: TeamDto })
  createMember(
    @Param('id') id: string,
    @Body() createMemberDto: CreateMemberDto,
  ) {
    return this.teamService.createMember(id, createMemberDto);
  }
}
