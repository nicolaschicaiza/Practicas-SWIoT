import { Document } from 'mongoose';

export interface ICar extends Document {
  readonly model: string;
  readonly manufacturer: string;
  readonly prodYear: number;
  readonly price: number;
  readonly engineVolume: number;
  readonly mileage: string;
}
