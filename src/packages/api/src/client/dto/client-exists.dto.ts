import { ApiProperty } from '@nestjs/swagger';

export class ClientExistsDto {
  @ApiProperty()
  exists: boolean;
}
