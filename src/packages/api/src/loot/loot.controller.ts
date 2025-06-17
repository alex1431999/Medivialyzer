import { Controller, Post, Body } from '@nestjs/common';
import { LootService } from './loot.service';
import { LootDto } from './dto/loot.dto';

@Controller('loot')
export class LootController {
  constructor(private readonly lootService: LootService) {}

  @Post('createMany')
  createMany(@Body() lootDtos: LootDto[]) {
    return this.lootService.createMany(lootDtos);
  }
}
