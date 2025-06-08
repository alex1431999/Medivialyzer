import { Module } from '@nestjs/common';
import { LootService } from './loot.service';
import { LootController } from './loot.controller';

@Module({
  controllers: [LootController],
  providers: [LootService],
})
export class LootModule {}
