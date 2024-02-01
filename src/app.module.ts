import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'auth/auth.module';

import {city} from './entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root1',
    password: '1234',
    database: 'test3',
    entities: [city],
    synchronize: true,
  }),TypeOrmModule.forFeature([city]),AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
