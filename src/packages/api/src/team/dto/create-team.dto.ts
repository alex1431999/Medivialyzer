import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty()
  owner: string;

  @ApiProperty()
  name: string;
}
