import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty()
  id: string;
}
