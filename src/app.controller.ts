import { Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private myName = 'Nicolás Chicaiza';

  @Get()
  read(): string {
    return `Hola: ${this.myName}`;
  }

  @Post(':myName')
  create(@Param('newName') newName: string): string {
    this.myName = newName;
    return `Mensaje modificado: ${this.myName}`;
  }
}
