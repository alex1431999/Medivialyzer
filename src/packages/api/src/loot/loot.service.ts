import { Injectable } from '@nestjs/common';
import { LootDto } from './dto/loot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loot } from './entities/loot.entity';
import { Repository } from 'typeorm';
import { Item } from './entities/item.entity';

@Injectable()
export class LootService {
  constructor(
    @InjectRepository(Loot)
    private lootRepository: Repository<Loot>,

    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async createMany(lootDtos: LootDto[]): Promise<void> {
    const promises = lootDtos.map(this.create.bind(this));
    await Promise.all(promises);
  }

  async create(lootDto: LootDto): Promise<void> {
    const { clientId, creatureName, timestamp, items } = lootDto;

    const lootEntity = this.lootRepository.create({
      clientId,
      creatureName,
      timestamp,
      items: items.map((item) => this.itemRepository.create(item)),
    });

    await this.lootRepository.save(lootEntity);
  }

  async findAllByClientId(clientId: string): Promise<Loot[]> {
    return this.lootRepository.findBy({ clientId });
  }
}
