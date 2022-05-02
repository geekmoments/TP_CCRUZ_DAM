# TP_DAM_CCRUZ_V2
# Trabajo Práctico Final - César Cruz
## Desarrollo de aplicaciones multiplataforma
##  2022

Docente 

* Brian Ducca

## Introducción general

El proyecto es un desarrollo "fullstack", el cual tiene 4 partes:

- frontend basado en Angular
- backend basado en express
- tp-app basado en ionic
- Base de datos SQL implementada en MySQL
  
## configuración previa

# Base de datos

En el archivo backend/bbdd/bbdd.sql , tenemos toda la configuración de la base de datos, es necesario ejecutar primero estos desde un worckbench de Mysql o desde la terminar, con esto tenemos nuestras tablas configuradas.

Como siguiente paso tenemos la generación de datos para que puedan ser consultados y visualisados para ello podemos ejecutar los INSERT que estan disponibles en /backend/bbdd/phpmyadmin.sql

# Backend

Para ejecutar el proyecto backend bastará con clonar el repositorio y ejecutar los siguientes comandos en la terminar ubicandonos en el directorio /backend

```
npm install
```
y ejecutamos nodemon

```
nodemon
```
Verificamos que no haya ningun error y continuamos
# frontend 

El proyecto frontend con angular lo ejecutamos desde la terminal ubicandonos en el directorio /frontend:

```
npm install
```
posteriormente ejecutamos el proyecto con

```
ng serve -o
```
Nos dirigimos a la ruta

http://localhost:4200/
En la sieguiente imagen vemos una vista del proyecto en angular ejecutandose sin estilos
Vista home:
![Screen Shot 2022-05-01 at 12 59 55](https://user-images.githubusercontent.com/70829024/166158431-23aa2ca8-6b94-44ce-9ec8-c778f638ebda.png)

Vista de un dispositivo con los botones de control y botones de acceso a los datos de mediciones y riego:

![Screen Shot 2022-05-01 at 13 01 15](https://user-images.githubusercontent.com/70829024/166158550-bd4fbf6c-a468-432d-a915-26e8320b10d6.png)
En esta ultima iamgen vemos que hay un input el funcionamiento de este input se activa cuando se abre la valvula y la simulación de lectura de datos se carga luego de cerrar la válvula, aqui realizamos varias acciones ya que tambien estamos haciendo un insert en la base de datos para registrar esta captura y al abrir la válvula tenemos una alert donde nos informa que se hizo esta acción con el registro de la misma
![Screen Shot 2022-05-01 at 13 05 17](https://user-images.githubusercontent.com/70829024/166158677-58b98723-2c57-4c90-87f1-684683325fbb.png)

Haciendo click en ver mediciones tenemos un historial de la lectura de datos que son tomados desde la base de datos, ademas se usaron directivas para poder pintar los recuadros para identificar por colores las lecturas del sensor, como se muestra acontinuación
![Screen Shot 2022-05-01 at 13 07 32](https://user-images.githubusercontent.com/70829024/166158735-b9de0791-d601-47b4-b11b-ec8a12d35318.png)

Con el botón de ver riegos, podemos visualizar los datos tomados de la base de datos cuando se registraron los logs, visualizando los estados de cada una de las acciones

![Screen Shot 2022-05-01 at 13 09 19](https://user-images.githubusercontent.com/70829024/166158806-7052fc87-7af1-4257-9004-c2ee0d4f7fda.png)

para el caso de ver mediciones y ver riegos tenemos disponible un boton para poder cerrar esta vista si asi se desea

# Ionic:
Para hacer pruebas de ios se usó el capacitor:
  capacitor core para poder llevar a los emuladores
  capacitor cli para ejecutar los comandos

npm install --save @capacitor/core @capacitor/cli --save-exact

npx cap init
name:tp-app
app package: ionic.dam.com
gestor de dependencias: npm

ejecutamos: ionic build

Añadimos iOS
npm install @capacitor/ios
npx cap add ios
npx cap open ios

para poder sincronizar ios
ionic build
npx cap sync
    npx cap copy
Acontinuación se tienen vistas de la versión en ionic:
## Home:

<img width="552" alt="Screen Shot 2022-05-01 at 18 43 27" src="https://user-images.githubusercontent.com/70829024/166169422-3a37b6b7-6b51-46de-83ed-4eaafe7fd542.png">

## Dispositivo:
<img width="468" alt="Screen Shot 2022-05-01 at 18 45 14" src="https://user-images.githubusercontent.com/70829024/166169508-336df6a9-41f4-42d8-af77-8757ab4ad34b.png">

## Mediciones:
<img width="479" alt="Screen Shot 2022-05-01 at 18 44 39" src="https://user-images.githubusercontent.com/70829024/166169460-0efd003d-1296-4af2-a57f-9378cd857c71.png">

## Riegos:
<img width="476" alt="Screen Shot 2022-05-01 at 18 45 48" src="https://user-images.githubusercontent.com/70829024/166169527-ab20d3a6-7b66-4d67-bb28-9b357cce52ce.png">



