import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Client } from '../client/entities/client.entity';
import { Waste } from './entities/waste.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Client, Waste])],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}
