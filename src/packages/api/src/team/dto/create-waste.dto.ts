import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateWasteDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  wasteAmount: number;
}
