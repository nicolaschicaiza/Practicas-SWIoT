/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarDto } from 'src/dto/create-car.dto';
import { UpdateCarDto } from 'src/dto/update-car.dto';
import { ICar } from 'src/interface/car.interface';

@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private carModel: Model<ICar>) { }

  async createCar(createCarDto: CreateCarDto): Promise<ICar> {
    const newCar = await new this.carModel(createCarDto);
    return newCar.save();
  }

  async updateCar(carId: string, updateCarDto: UpdateCarDto): Promise<ICar> {
    const existingCar = await this.carModel.findByIdAndUpdate(carId, updateCarDto, {
      new: true
    });

    if (!existingCar) {
      throw new NotFoundException(`Car #${carId} not found`);
    }
    return existingCar;
  }

  async getAllCars(): Promise<ICar[]> {
    const carData = await this.carModel.find();

    if (!carData || carData.length == 0) {
      throw new NotFoundException(`Car data not found!`);
    }
    return carData;
  }

  async getCar(carId: string): Promise<ICar> {
    const existingCar = await this.carModel.findById(carId).exec();

    if (!existingCar) {
      throw new NotFoundException(`Car #${carId} not found`);
    }
    return existingCar;
  }

  async deleteCar(carId: string): Promise<ICar> {
    const deletedCar = await this.carModel.findByIdAndDelete(carId);

    if (!deletedCar) {
      throw new NotFoundException(`Car #${carId} not found`);
    }
    return deletedCar;
  }
}

