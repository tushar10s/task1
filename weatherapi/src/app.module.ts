import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {city} from './entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '1234',
    database: 'test',
    entities: [city],
    synchronize: true,
  }),TypeOrmModule.forFeature([city])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
