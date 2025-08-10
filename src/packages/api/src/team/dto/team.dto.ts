import { ApiProperty } from '@nestjs/swagger';

export class TeamDto {
  @ApiProperty()
  owner: string;

  @ApiProperty()
  name: string;
}
