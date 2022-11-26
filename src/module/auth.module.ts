/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtSecret } from 'src/constants';
import { AuthController } from 'src/controller/auth/auth.controller';
import { JwtAuthGuard } from 'src/guard/jwt-auth.guard';
import { JwtStrategy } from 'src/strategy/jwt-auth.strategy';
import { LocalStrategy } from 'src/strategy/local.strategy';
import { AuthService } from '../service/auth/auth.service';
import { UsersModule } from './users.module';

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtSecret, //? "Este es el secreto para generar JWT",
      signOptions: { expiresIn: '60m' },
    })], //! Importa el módulo de usuarios
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard],
  exports: [AuthService],
})
export class AuthModule { }
