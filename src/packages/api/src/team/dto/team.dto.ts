import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from '../../client/dto/client.dto';

export class TeamDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  owner: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => [ClientDto] })
  members: ClientDto[];
}
