import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { LootModule } from './loot/loot.module';

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
    LootModule,
  ],
})
export class AppModule {}
