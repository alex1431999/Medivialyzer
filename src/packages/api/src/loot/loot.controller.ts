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
import { UpdateLootDto } from './dto/update-loot.dto';

@Controller('loot')
export class LootController {
  constructor(private readonly lootService: LootService) {}

  @Post()
  create(@Body() createLootDto: CreateLootDto) {
    return this.lootService.create(createLootDto);
  }

  @Get()
  findAll() {
    return this.lootService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lootService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLootDto: UpdateLootDto) {
    return this.lootService.update(+id, updateLootDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lootService.remove(+id);
  }
}
