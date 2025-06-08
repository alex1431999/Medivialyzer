import { Injectable } from '@nestjs/common';
import { CreateLootDto } from './dto/create-loot.dto';
import { UpdateLootDto } from './dto/update-loot.dto';

@Injectable()
export class LootService {
  createMany(createLootDtos: CreateLootDto[]) {
    return 'This action adds a new loot';
  }
}
