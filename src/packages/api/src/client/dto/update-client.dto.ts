import { ApiProperty } from '@nestjs/swagger';

export class UpdateClientDto {
  @ApiProperty()
  name: string;
}
