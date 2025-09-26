import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from '../../client/dto/client.dto';
import { WasteDto } from './waste.dto';

export class TeamDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: () => ClientDto })
  owner: ClientDto;

  @ApiProperty()
  name: string;

  @ApiProperty({ type: () => [ClientDto] })
  members: ClientDto[];

  @ApiProperty({ type: () => [WasteDto] })
  wastes: WasteDto[];
}
