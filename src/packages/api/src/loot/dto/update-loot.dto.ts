import { PartialType } from '@nestjs/mapped-types';
import { CreateLootDto } from './create-loot.dto';

export class UpdateLootDto extends PartialType(CreateLootDto) {}
