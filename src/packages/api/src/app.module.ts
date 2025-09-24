import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TeamModule } from './team/team.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'database',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'medivialyzer',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // turn off in production
    }),
    TeamModule,
    ClientModule,
  ],
})
export class AppModule {}
