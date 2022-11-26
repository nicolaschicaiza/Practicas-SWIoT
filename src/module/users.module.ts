/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from '../service/users/users.service';

@Module({
  providers: [UsersService],
  exports: [UsersService], //! Exporta el servicio
})
export class UsersModule { }
