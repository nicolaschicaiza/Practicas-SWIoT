/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarController } from './controller/car/car.controller';
import { CarSchema } from './schema/car.schema';
import { CarService } from './service/car/car.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/cardb'
    ),
    MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }])
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class AppModule { }
