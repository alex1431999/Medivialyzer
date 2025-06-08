import { Injectable } from '@nestjs/common';
import { CreateLootDto } from './dto/create-loot.dto';
import { UpdateLootDto } from './dto/update-loot.dto';

@Injectable()
export class LootService {
  create(createLootDto: CreateLootDto) {
    return 'This action adds a new loot';
  }

  findAll() {
    return `This action returns all loot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loot`;
  }

  update(id: number, updateLootDto: UpdateLootDto) {
    return `This action updates a #${id} loot`;
  }

  remove(id: number) {
    return `This action removes a #${id} loot`;
  }
}
