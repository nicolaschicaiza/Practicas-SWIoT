/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarController } from './controller/car/car.controller';
import { CarSchema } from './schema/car.schema';
import { CarService } from './service/car/car.service';
import { AuthModule } from './module/auth.module';
import { UsersModule } from './module/users.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://localhost:27017/cardb'
    ),
    MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]),
    AuthModule,
    UsersModule
  ],
  controllers: [CarController],
  providers: [CarService],
})
export class AppModule { }
