import { ApiProperty } from '@nestjs/swagger';

export class CreateWasteDto {
  @ApiProperty()
  wasteAmount: number;
}
