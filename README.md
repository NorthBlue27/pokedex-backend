<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Ejecutar en desarrollo
1. Ejecutar
```
npm install
```
2. Tener el CLI de Nest
```
npm i -g @nestjs/cli
```
3. Clonar el archivo __.env.template__ y renombra la copia __.env.__
4. Llenar las variable de entorno definidas en el __.env__
5. Ejecutar la aplicacion
```
npm run start:dev
``` 
6. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/seed/:limit
```
