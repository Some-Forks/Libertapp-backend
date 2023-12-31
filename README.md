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
LEER ATENTAMENTE ANTES DE COMENZAR A TRABAJAR EN EL PROYECTO

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

---

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
---

### DER (Diagrama Entidad Relacion)
https://dbdiagram.io/d/DER-LFDC-653e9f15ffbf5169f0ae0558
![DER](./public/DER-LFDC.png)

---

### Trabajando con la rama `develop`
Este proyecto sigue un flujo de trabajo basado en ramas para mantener un desarrollo organizado y controlado. Asegúrate de seguir estas pautas al colaborar en el proyecto:

`Clona el Repositorio:` Comienza clonando el repositorio a tu máquina local:
  
```bash
git clone <url del repo>
```

`Checkout a develop:` Cambia a la rama `develop` con el siguiente comando:

```bash
git checkout develop
git pull origin develop
```

`Crea una rama:` Crea una rama local con un nombre descriptivo de la funcionalidad que vas a desarrollar. Utiliza el siguiente comando para crear una nueva rama y cambiar a ella:

```bash
git checkout -b <nombre de la rama>
```

`Realiza los cambios:` Realiza los cambios necesarios en el código para implementar la funcionalidad que estás desarrollando. Y luego hacer el push a la rama creada. (tu rama creada)

```bash
git add .
git commit -m "mensaje descriptivo de los cambios realizados"
git push origin <nombre de la rama>
```

En caso de que otros colaboradores hayan realizado cambios en la rama `develop` mientras trabajabas en tu rama, deberás actualizar tu rama con los últimos cambios antes de hacer el push. Para ello, cambia a la rama `develop` y ejecuta el siguiente comando:

```bash
git pull origin develop
```

`Crea un Pull Request:` Cuando hayas terminado de implementar la funcionalidad, crea un Pull Request (PR) a la rama `develop` para que tus cambios sean revisados y aprobados por los colaboradores del proyecto. Asegúrate de seguir las siguientes pautas al crear un PR:

- El título del PR debe ser descriptivo y conciso.
- El cuerpo del PR debe describir los cambios realizados y explicar cómo se implementó la funcionalidad.
- El PR debe ser revisado por al menos dos colaboradores antes de ser aprobado.


## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
