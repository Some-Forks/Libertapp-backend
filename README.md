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

Este proyecto es/sera (en caso de que se aprueve por los owners de la idea) el backend de la aplicacion https://github.com/Las-Fuerzas-Del-Cielo/Sistema-Anti-Fraude-Electoral

### Tecnologias
- NestJS
- TypeORM
- Postgres
- Docker
- Docker-compose
- RabbitMQ - (TODO)
- S3 (AWS) - (TODO)

## Installation

```bash
$ npm install
```

## Running the app
Para poder ejecutar el proyecto se debe tener instalado docker y docker-compose, luego se debe ejecutar el siguiente comando para levantar la base de datos
```bash
$ docker-compose up -d
```
El archivo .env.local unicamente sera utilizado para el entorno de desarrollo, ya se encuentra configurado y listo para utilizar.

Siguiente: Se deben correr las migrations para crear las tablas en la base de datos, para esto se debe ejecutar el siguiente comando
```bash
$ npm run typeorm:local migration:run
```

Si quiere ver las migraciones que se van a ejecutar o ya se ejecutaron, se debe ejecutar el siguiente comando
```bash
$ npm run typeorm:local migration:show
```

Para poder ejecutar el proyecto se debe ejecutar el siguiente comando
```bash
$ npm run start:local
```

### MIGRATIONS (IMPORTANTE)
Explicacion de las migraciones: https://typeorm.io/#/migrations

### Estructura del Proyecto

La estructura de este proyecto sigue una organización clara basada en tres componentes principales: Controllers, Services y Daos. Este enfoque proporciona una separación efectiva de responsabilidades y facilita la escalabilidad y el mantenimiento del código.

#### Controllers

Los controladores son responsables de manejar las solicitudes HTTP y actuar como intermediarios entre las rutas de la API y los servicios. Aquí se definen las rutas, se procesan las solicitudes entrantes y se envían las respuestas adecuadas. Los controladores son la primera capa de interacción con el cliente.

```bash
/src/controllers
```

#### Services
Los servicios contienen la lógica de negocio principal de la aplicación. Se encargan de realizar operaciones específicas, como la manipulación de datos, la validación y la interacción con bases de datos u otros servicios externos. Los servicios son invocados por los controladores para llevar a cabo tareas específicas.

```bash
/src/services
```
#### Daos
Los Daos (Data Access Objects) se utilizan para interactuar con la capa de almacenamiento de datos, como bases de datos o sistemas de archivos. Aquí se definen las consultas y operaciones de acceso a datos. Los servicios a menudo utilizan los Daos para realizar operaciones de lectura y escritura en la base de datos.

```bash
/src/daos
```


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
