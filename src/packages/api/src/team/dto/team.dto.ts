import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from '../../client/dto/client.dto';
import { WasteDto } from './waste.dto';
import { IsNumber, IsOptional } from 'class-validator';

export class TeamDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ type: () => ClientDto })
  owner: ClientDto;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lootAmount?: number | null;

  @ApiProperty({ type: () => [ClientDto] })
  members: ClientDto[];

  @ApiProperty({ type: () => [WasteDto] })
  wastes: WasteDto[];
}
