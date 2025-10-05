import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  owner: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  @IsNumber()
  @IsOptional()
  lootAmount?: number | null;
}
