import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TeamModule } from './team/team.module';
import { ClientModule } from './client/client.module';

const username = process.env.PGUSER || 'postgres';
const password = process.env.PGPASSWORD || 'postgres';
const database = process.env.PGDATABASE || 'postgres';
const host = process.env.PGHOST || 'database';
const port = parseInt(process.env.PGPORT || '5432', 10);

const synchronize = process.env.NODE_ENV === 'development';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username,
      password,
      database,
      host,
      port,
      synchronize,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    TeamModule,
    ClientModule,
  ],
})
export class AppModule {}
