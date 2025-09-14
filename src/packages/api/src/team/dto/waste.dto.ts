import { ApiProperty } from '@nestjs/swagger';
import { ClientDto } from '../../client/dto/client.dto';

export class WasteDto {
  @ApiProperty()
  wasteAmount: number;

  @ApiProperty({ type: () => ClientDto })
  client: ClientDto;
}
