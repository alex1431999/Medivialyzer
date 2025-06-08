import { IsNumber, IsString } from 'class-validator';

export class ItemDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: string;
}
