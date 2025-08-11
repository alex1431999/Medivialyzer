import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from '../../client/dto/client.dto';

export class TeamDto {
  @ApiProperty()
  owner: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  members: ClientDto[];
}
