import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;
}
