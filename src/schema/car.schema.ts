import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Car {
  @Prop()
  model: string;
  @Prop()
  manufacturer: string;
  @Prop()
  prodYear: number;
  @Prop()
  price: number;
  @Prop()
  engineVolume: number;
  @Prop()
  mileage: string;
}

export const CarSchema = SchemaFactory.createForClass(Car);
