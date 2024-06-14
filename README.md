# Instrucciones para desplegar el frontend del proyecto

## Requisitos previos:

- Nodejs 18.12.0 o superior.

### Instalar Nodejs con nvm (recomendable):

[Nvm 1.12.0](https://github.com/coreybutler/nvm-windows#readme)

![img.png](imgs/instalacion_nvm.png)

- Listar todas las versiones de node (En caso de querer usar otra distinta):

```
$ nvm ls-remote
```

- Instalar la versión deseada:

```
$ nvm install 18.12.0
  ```

- Cambiar la versión de node:

```
$ nvm use 18.12.0
  ```

### Instalar nodejs desde el instalador oficial (alternativa):

- Descargar [Nodejs](https://nodejs.org/en/download/package-manager)

## Instrucciones:

1. Clonar el proyecto:

```
$ git clone https://github.com/Sergioig37/ProperSell-front
```

2. Arrancar la base de datos: [epositorio](https://github.com/Sergioig37/Docker)
3. Arrancar el back: [repositorio](https://github.com/Sergioig37/ProperSell-back)
4. Abrir un cmd e instalar dependencias:
```
$ npm install
```
5. Arrancar el proyecto
```
$ npm run dev
```