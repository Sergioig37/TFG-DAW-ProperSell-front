# Instrucciones para desplegar el frontend del proyecto

## Requisitos previos:


- Nodejs 18.12.0 o superior

### Instalar Nodejs con nvm (recomendable):

- Nvm 1.12.0: [Descarga](https://github.com/coreybutler/nvm-windows#readme)
    ![img.png](img.png)

#### Instalar npm y Nodejs (Con nvm):

#### Node 18.12.0 o superior:

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

### Instalar nodejs desde el instalador oficial:

- Descargar Nodejs [aquí](https://nodejs.org/en/download/package-manager)

## Instrucciones:
### Clonar el proyecto:
```
$ git clone https://github.com/Sergioig37/ProperSell-front
```

### Arrancar las base de datos: [Ver repositorio](https://github.com/Sergioig37/Docker)
### Arrancar el back: [Ver repositorio](https://github.com/Sergioig37/ProperSell-back)

### Abrir el proyecto con un editor de código:
#### Abrir un cmd e instalar dependencias:
```
$ npm install
```
### Arrancar el proyecto
```
$ npm run dev
```