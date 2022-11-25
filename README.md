# Desarrollo de la Guía Práctica para Implementación de un Servidor Web

**Nombre completo:** Jefry Nicolás Chicaiza Carrasquilla
**Nombre de la asignatura:** Electiva - Desarrollo de Software en la Web Semántica
**Fecha de realización:** Desde 22 de Noviembre

Repositorio para el desarrollo de un servidor web a través del framework Nest.js. Esta guía consta de 3 prácticas, las cuales contienen instrucciones para la implementación de los componentes necesarios para la creación del servidor.

1. [Guía de la práctica 1: Configuración de entorno y red](https://github.com/mfdogalindo/UC-Practicas-SWoT/tree/main/Practica_01)
2. [Guía de la prácticas 2: Creando un servidor REST](https://github.com/mfdogalindo/UC-Practicas-SWoT/tree/main/Practica_02)
3. [Guía de la prácticas 3: Seguridad y calidad](https://github.com/mfdogalindo/UC-Practicas-SWoT/tree/main/Practica_03)

---

## Recursos Utilizados para el Desarrollo

### Recursos Hardware

Respecto a los recursos hardware utilizados para el desarrollo de esta guía se cuenta con las siguientes especificaciones:

- **Modelo de la computadora**: Acer Nitro 5 2021
- **Procesador**: Intel Core I5 de 10 generación
- **Memoria RAM**: Capacidad de 24GB
- **Tarjeta Gráfica**: NVidia Geforce RTX 3050

### Recursos Software

En la computadora especificada anteriormente se tiene instalado los siguientes recursos software para el desarrollo de la guía:

- **Sistema Operativo**: Linux en distribución Ubuntu 22.04
- **Terminal**: Kitty terminal
- **Editor de Código**: VSCode, NVIM e IntelliJ IDEA
- **Plataforma HTTP**: Postman
- **Navegador**: Firefox
- **Linux Shell**: ZSH
- **Plataformas de virtualización**: VirtualBox, Virtual Manager, Docker (aún que no es virtualización está instalado)

---

## Desarrollo

### Práctica 1: Configuración de entorno y red

#### Objetivos

1. Crear un entorno Linux virtual para evaluar servicios empleando herramientas como VirtualBox, GitHub y Docker.
2. Identificar en Linux mecanismos pra la identificación de ocupación de puertos y a qué servicios está relacionado.
3. Implementar un pequeño servicio cliente/servidor en Python empleando TCP y UDP, a partir de ello establezca cual es más adecuado para algunos contextos que le serán planteados.

#### Solución de Práctica

1. Configuración del entorno: El estudiante deberá configurar su dispositivo de elección para ejecutar una imagen virtualizada de Linux, este será un suministro importante para el resto de prácticas.

En esta parte de la práctica no se realizó ningún tipo de virtualización, debido a que el equipo de computación utilizado tiene instalado de forma nativa la distribución de Ubuntu que funciona sobre el kernel de Linux. Por tanto, se cumple con el requerimiento.

2. Instalar Docker

Debido que en proyectos realizados de otra material se hizo uso del sistema de Docker, este ya se encuentra instalado en la computadora utilizada.

3. Reconocimiento de herramientas de red: Identificar configuración de red por medio del comando `ip` e `ifconfig`. Identificar servicios y puertos ocupados en el sistema con los comandos `ss`, `netstat` y `lsof`.

- **Herramientas de red**

  <a href="https://asciinema.org/a/MKE2yer3jaTa09D24R9Jq4exF" target="_blank"><img src="https://asciinema.org/a/MKE2yer3jaTa09D24R9Jq4exF.svg" /></a>

En esta demostración de los comandos ejecutados, en primer lugar se ejecuta `ip all route`, el cual muestra a demás del identificador de la red a la cual está conectado cada una de las interfaces del equipo, ya sean físicas y virtuales, también se muestra la dirección asignada al host dentro de la red, la puerta de enlace y la dirección del `broadcast` (`Interface: wlp0s20f3`[WiFi] `gateway: 192.168.20.1` ` host: 192.168.20.233``direccionamiento: Estático `).

El segundo comando utilizado es `ifconfig`, que a diferencia del anterior este no hace parte de un comando nativo de Linux, sino que es necesario instalar el paquete denominado `net-tools`. Sin embargo, este comando resulta ser más util cuando se quiere obtener información acerca de la configuración de red de una computadora que funciona a través del kernel de Linux. Información adicional que podemos diferenciar del comando anterior, encontramos que este nos permite conocer la dirección MAC de la interfaz, cantidad de paquetes que han sido transmitidos y recibidos, además del peso en `Bytes` que estos representan, entre otra más información.

- **Servicios y puertos utilizados**
  <a href="https://asciinema.org/a/bTuuJTI6kCR3n6XFw6StLjLLv" target="_blank"><img src="https://asciinema.org/a/bTuuJTI6kCR3n6XFw6StLjLLv.svg" /></a>

Dentro de los numerosos servicios que existen para visualizar que puertos están siendo utilizados y quién en específico lo está usando, se empleo los paquetes de `ss` y `netstat`. Al consultar sobre `ss` se encontró que para extraer los puertos que están abiertos se debe utilizar la bandera `ss -l`, de lo que se obtuvo un aproximado de 300 resultados. Por otro lado, `netstat` fue necesario utilizarlo con las bandera `netstat -tulp` para obtener los puertos abiertos en los protocolos `TCP` y `UDP`, además del nombre del programa. Sin embargo, no se obtuvieron el mismo número de puertos abiertos, esto debido a que `ss` obtiene los puertos que aunque están abiertos o en estado de escucha, no está ocupado por un servicio en específico, sino que lo hace de manera dinámica.

4. Identificar servicios desplegados: El estudiante deberá identificar 5 servicios deferentes listados por las herramientas de red y determinar a qué aplicaciones posiblemente están relacionados.

![Salida de `netstat` de los servicios activos y su puerto asignado](./.img/img4.png)

En la imagen se pueden identificar varios servicios que están utilizando cierto puerto que dentro de estándares internacionales operan como protocolos de comunicación. Se identifica el servicio de SSH, TabNine, jetbrains, code y gnome-remote-d.

5. Evaluar scripts en Python: Al estudiante se le entregarán scripts en Python para desplegar un ejemplo de cliente servidor con protocolos TCP y UDP, el estudiante evaluará el rendimiento de los dos servicios y debe descubrir la ocupación de los puertos por medio de las herramientas previamente estudiadas.

- **Cliente y Servidor TCP/IP**

Los siguientes son los scripts proporcionados para el desarrollo de este item.

[Script del servidor](scripts_python/cliente_servidor_tcp/socket_echo_server.py)
[Script del cliente](scripts_python/cliente_servidor_tcp/socket_echo_client.py)

Al ejecutar los scripts se obtienen las siguientes salidas.

![Ejecución de Scripts Cliente Servidor TCP](.img/img51.png)

En la imagen se observa que al levantar el servidor este lo hace a través del puerto `10000`, por tanto, se espera que al realizar un escaneo de los puertos con una de las herramientas de gestión de red, este esté abierto.

![Servicio levantado por el servidor](.img/img52.png)

Se evidencia que el servicio se está ejecutando de forma correcta sobre el puerto especificado. Sin embargo, se observa que donde se especifica el puerto a parece el termino `webmin`, el cual es el nombre que le da un sistema Unix cuando se trata de un servicio web y opera sobre el puerto `10000`.

- **Cliente y Servidor UDP**
  [Script del servidor](scripts_python/cliente_servidor_tcp/socket_echo_server.py)
  [Script del cliente](scripts_python/cliente_servidor_tcp/socket_echo_client.py)

Al ejecutar los scripts se obtienen las siguientes salidas.

![Ejecución de Scripts Cliente Servidor UDP](.img/img53.png)

Al igual que en el caso anterior el servidor se ejecuta sobre el puerto `10000`. Sin embargo, en este punto se puede establecer la diferencia entre estos protocolos.

- En el **Protocolo TCP** se pudo observar que al realizar la comunicación entre el Cliente y el Servidor para el envío de un mensaje. El cliente lo hace por partes, ya que este protocolo es utilizado para establecer una comunicación confiable, donde es necesario que todos los paquetes enviados lleguen a su receptor y para ello es necesario que exista una confirmación de recepción de cada uno de los paquetes para que en caso de que no se haya recibido alguno de ellos se realiza una retransmisión del mismo.
- Por otro lado, el **Protocolo UDP** se considera un protocolo de transmisión rápida, ya que este opera bajo el modelo de comunicación no orientado a conexión. Esto quiere decir que los paquetes serán enviados de manera consecutiva y sin tener ningún camino establecido. El receptor será el encargado ordenar los paquetes y luego confirmar al transmisor que es lo que se recibió.

### Práctica 2: Creando un servidor REST

#### Objetivos

1. Instalar servidor NodeJS y NestJS
2. Implementar un servidor web que exponga un recurso REST
3. Publicar en GitHub el código fuente del servidor
4. Identificar los verbos HTTP y su uso para un caso de ejemplo

#### Desarrollo

Debido que en el equipo de trabajo ya se tiene instalado el complemento `NodeJS` no se realizó ninguna instalación. La versión utilizada corresponde a `v18.12.1`, la cual es la versión LTS en el momento de realizar la guía, como se puede observar en la siguiente imagen.

![Historial de soporte de versiones NodeJS](.img/schedule.svg)

Por tanto, se continua realizando la instalación del framework a utilizar para el desarrollo de la guía, el cual es `NestJS`.

Al realizar la instalación del framework se instala la versión `9.1.5`.

Después, se crea el proyecto a través del siguiente comando.

```bash
nest new <name-project>
```

A partir de aquí se empieza a construir el servicio REST propuesto por la guía.

#### Desarrollo de implementación

##### Temática

Debido a que en la guía se especifica como requerimiento que se escoja alguna temática para su desarrollo, se dispone buscar una `dataset` de un tema en especifico dentro de la plataforma [Kaggle](https://www.kaggle.com/). Dentro de ella se encontró una dataset sobre la predicción de los precios de automóviles, se puede observar en el siguiente enlace [Car Price Prediction Challenge](https://www.kaggle.com/datasets/deepcontractor/car-price-prediction-challenge).

Sin embargo, debido a que en ella se tienen numerosas características, se reduce para proceder con la implementación.

[Nueva `dataset` para implementación](./dataset/car.csv)

##### Creación de la Base de Datos

Aunque no es requerimiento para esta guía, se implementa una base de datos en `MongoDB` para montar los datos de la `dataset` elegida.

Utilizando la línea de comandos se importa la dataset al cluster local de MongoDB con el siguiente comando.

```bash
mongoimport --db cardb --collection cars --type csv --file car.csv --fields 'model,manufacturer,prodYear,price,engineVolume,mileage'
```

Luego, se verifica que se haya creado la base de datos y la colección con la `dataset` suministrada.

Lo siguiente a realizar es hacer la conexión del proyecto a la base de datos, para ello primero se instala los paquetes necesarios de `MongoDb` dentro del proyecto.

```bash
yarn add @nestjs/mongoose mongoose
```

Una vez realizada la instalación, dentro del fichero [app.module.ts](./src/app.module.ts) se hace la configuración para permitir la conexión, el `script` luce de la siguiente manera.

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017/cardb')],
})
export class AppModule {}
```

Con esto se garatiza la conexión entre el `NodeJS` y la base de datos `MongoDB`.

##### Creación Funcionamiento del CRUD

Para iniciar con la creación del funcionamiento del CRUD, se construye el modelo con el que va a funcionar el proyecto. Este se hace a través de unas propiedades de la librería `mongoose`.

###### Crear Esquema Mongoose

Por tanto, se crea un directorio donde se van a almacenar las propiedades del modelo, el cual se llamará `schema`. Como nuestro modelo es sobre los precios de vehículos, el esquema se llamará **Car** y el fichero [car.schema.ts](./src/schema/car.schema.ts).

```typescript
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
```

Después de crear el modelo, se continua creando la lógica para el CRUD. Sin embargo, es necesario especificar el contexto a la aplicación agregando dentro del arreglo de importación el esquema a trabajar dentro del fichero [app.module.ts](./src/app.module.ts).

```typescript
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CarSchema } from './schema/car.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/cardb'),
    MongooseModule.forFeature([{ name: 'Car', schema: CarSchema }]),
  ],
})
export class AppModule {}
```

###### Crear Interface

Una vez creado el modelo con `mongoose`, se crea la interface del esquema para estructurar los datos del objeto. Ahora, se crea un directorio denominado `interface` en donde se creara el fichero [car.interface.ts](./src/interface/car.interface.ts). Y a partir de la clase `Document` de `mongoose` se hereda las propiedades en la interface.

```typescript
import { Document } from 'mongoose';

export interface ICar extends Document {
  readonly model: string;
  readonly manufacturer: string;
  readonly prodYear: number;
  readonly price: number;
  readonly engineVolume: number;
  readonly mileage: string;
}
```

###### Crear Fichero DTO

Además, es necesario crear un **Objeto de Transferencia de Datos** (_DTO, Data Transfer Object_), el cual ayuda a facilitar el acceso al cuerpo de la solicitud y define el formato de los datos a enviar. Sin embargo, antes de implementar los `scripts` se deben instalar ciertas dependencias.

```bash
yarn add class-validator class-transformer
```

Luego, se continua creando un directorio denominado`dto` y ahí crear los ficheros [create-car.dto.ts](./src/dto/create-car.dto.ts) y [update-car.ts](./src/dto/update-car.dto.ts).

- _create-car.dto.ts_

```typescript
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
```

- _update-car.dto.ts_

```typescript
import { PartialType } from '@nestjs/mapped-types';
import { CreateCarDto } from './create-car.dto';

export class UpdateCarDto extends PartialType(CreateCarDto) {}
```

Para efectuar las funcionalidades creadas es necesario registrar en el fichero [main.ts](./src/main.ts) la función `validationPipe`, la cual permitirá que el fichero [create-car.dto.ts](./src/dto/create-car.dto.ts) trabaje.

```typescript
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

###### Crear el Servicio

Un servicio dentro de una estructura de ficheros, tiene la funcionalidad de actuar como puente entre los controladores y la base de datos. Por tanto, como este proyecto integra la base de datos en `MongoDB` es necesario implementar un servicio, así que se crea un directorio `service` y ahí se crea el fichero [car.service.ts](./src/service/car/car.service.ts).

```typescript
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCarDto } from 'src/dto/create-car.dto';
import { UpdateCarDto } from 'src/dto/update-car.dto';
import { ICar } from 'src/interface/car.interface';

@Injectable()
export class CarService {
  constructor(@InjectModel('Car') private carModel: Model<ICar>) {}

  async createCar(createCarDto: CreateCarDto): Promise<ICar> {
    const newCar = await new this.carModel(createCarDto);
    return newCar.save();
  }

  async updateCar(carId: string, updateCarDto: UpdateCarDto): Promise<ICar> {
    const existingCar = await this.carModel.findByIdAndUpdate(
      carId,
      updateCarDto,
      {
        new: true,
      },
    );

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
```

Dado que el servicio es un puente, este debe contener la lógica necesaria para crear, leer, actualizar y eliminar datos dentro de la base de datos para luego ser usados por los controladores. Por dicha razón, el `script` contiene las funciones necesarias para implementar el **CRUD**.

###### Crear el Controlador

Los controladores como ya se menciono anteriormente utilizan las funciones creadas dentro del servicio, por lo cual dentro del controlador es donde se implementa el **CRUD**. Para ello creamos un directorio denominado `controller` y ahí crear el fichero [car.controlador.ts](./src/controller/car/car.controller.ts).

```typescript
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { CreateCarDto } from 'src/dto/create-car.dto';
import { UpdateCarDto } from 'src/dto/update-car.dto';
import { CarService } from 'src/service/car/car.service';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

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
  async updateCar(
    @Res() response,
    @Param('id') carId: string,
    @Body() updateCarDto: UpdateCarDto,
  ) {
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
        message: 'Car found successfully',
        existingCar,
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
        message: 'Car deleted successfully',
        deletedCar,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
```

Por ultimo, dentro del fichero [app.module.ts](./src/app.module.ts) habilitamos en el contexto el controlador del esquema para iniciar a disfrutar de la _aplicación backend_.

###### Probar CRUD en Postman

Para validar que la aplicación está funcionando correctamente, se hacen ciertas pruebas dentro de la plataforma [Postman](https://www.postman.com/). Se ha habilitado un _Workspace_ público para dichas pruebas al servicio [aquí](https://app.getpostman.com/join-team?invite_code=45557ff69b9683c219c9264745c09037&target_code=f072733e9b4cd96a915021a8b9f77d54)

---

## Información Inicial del Framework NEST.js

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

<script id="asciicast-MKE2yer3jaTa09D24R9Jq4exF" src="https://asciinema.org/a/MKE2yer3jaTa09D24R9Jq4exF.js" async></script>
