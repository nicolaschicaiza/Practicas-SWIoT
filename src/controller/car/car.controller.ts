/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { CreateCarDto } from 'src/dto/create-car.dto';
import { UpdateCarDto } from 'src/dto/update-car.dto';
import { CarService } from 'src/service/car/car.service';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) { }

  @Post()
  async createCar(@Res() response, @Body() createCarDto: CreateCarDto) {
    try {
      const newCar = await this.carService.createCar(createCarDto);

      return response.status(HttpStatus.CREATED).json({
        message: `Car has been created successfully`,
        newCar,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Car not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('/:id')
  async updateCar(@Res() response, @Param('id') carId: string, @Body() updateCarDto: UpdateCarDto) {
    try {
      const existingCar = await this.carService.updateCar(carId, updateCarDto);
      return response.status(HttpStatus.OK).json({
        message: 'Car has been successfully updated',
        existingCar,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getCars(@Res() response) {
    try {
      const carData = await this.carService.getAllCars();
      return response.status(HttpStatus.OK).json({
        message: 'All car data found successfully',
        carData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get('/:id')
  async getCar(@Res() response, @Param('id') carId: string) {
    try {
      const existingCar = await this.carService.getCar(carId);
      return response.status(HttpStatus.OK).json({
        message: 'Car found successfully', existingCar,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteCar(@Res() response, @Param('id') carId: string) {
    try {
      const deletedCar = await this.carService.deleteCar(carId);

      return response.status(HttpStatus.OK).json({
        message: 'Car deleted successfully', deletedCar,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
