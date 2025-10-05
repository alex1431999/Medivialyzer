import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-team.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  lootAmount?: number | null;

  owner?: never;
}
