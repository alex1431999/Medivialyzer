import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TeamModule } from './team/team.module';
import { ClientModule } from './client/client.module';

const username = process.env.PGUSER || 'postgres';
const password = process.env.PGPASSWORD || 'postgres';
const database = process.env.PGDATABASE || 'medivialyzer';
const host = process.env.PGHOST || 'database';
const port = parseInt(process.env.PGPORT || '5432', 10);

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username,
      password,
      database,
      host,
      port,
      synchronize: true, // We shouldn't use this in prod but I use if for convenience
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    TeamModule,
    ClientModule,
  ],
})
export class AppModule {}
