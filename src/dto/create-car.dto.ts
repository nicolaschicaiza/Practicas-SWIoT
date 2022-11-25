import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateCarDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly model: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly manufacturer: string;

  @IsNumber()
  @IsNotEmpty()
  readonly prodYear: number;

  @IsNumber()
  @IsNotEmpty()
  readonly price: number;

  @IsNumber()
  @IsNotEmpty()
  readonly engineVolume: number;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly mileage: string;
}
