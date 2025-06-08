import { IsArray, IsDate, IsString, ValidateNested } from 'class-validator';
import { ItemDto } from './item.dto';
import { Type } from 'class-transformer';

export class CreateLootDto {
  @IsString()
  clientId: string;

  @IsString()
  creatureName: string;

  @IsDate()
  timestamp: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDto)
  items: ItemDto[];
}
