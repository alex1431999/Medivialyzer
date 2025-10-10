import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { Client } from '../client/entities/client.entity';
import { Waste } from './entities/waste.entity';
import { TeamGateway } from './team.gateway';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [TypeOrmModule.forFeature([Team, Client, Waste]), ClientModule],
  controllers: [TeamController],
  providers: [TeamService, TeamGateway],
})
export class TeamModule {}
