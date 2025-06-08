import { Module } from '@nestjs/common';
import { LootService } from './loot.service';
import { LootController } from './loot.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loot } from './entities/loot.entity';
import { Item } from './entities/item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loot, Item])],
  controllers: [LootController],
  providers: [LootService],
})
export class LootModule {}
