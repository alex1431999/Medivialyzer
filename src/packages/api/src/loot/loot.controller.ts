import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LootService } from './loot.service';
import { CreateLootDto } from './dto/create-loot.dto';

@Controller('loot')
export class LootController {
  constructor(private readonly lootService: LootService) {}

  @Post()
  create(@Body() createLootDto: CreateLootDto) {
    return this.lootService.create(createLootDto);
  }
}
