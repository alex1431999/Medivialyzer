import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateClientDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
}
