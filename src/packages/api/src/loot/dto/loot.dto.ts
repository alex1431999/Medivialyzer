import { IsArray, IsDate, IsString, ValidateNested } from 'class-validator';
import { ItemDto } from './item.dto';
import { Type } from 'class-transformer';

export class LootDto {
  @IsString()
  clientId: string;

  @IsString()
  creatureName: string;

  @IsDate()
  timestamp: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}
