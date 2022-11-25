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
