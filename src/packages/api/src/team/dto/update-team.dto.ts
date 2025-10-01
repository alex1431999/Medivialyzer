import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  owner?: never;
}
