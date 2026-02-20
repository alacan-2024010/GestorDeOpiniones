# Gestor de Opiniones
// Este proyecto está compuesto por dos APIs independientes:
//**API de Autenticación**
//**API Gestor de Opiniones**

# AuthServiceGestorOpiniones
//Primero se ubica en la carpeta de autenticación:

    C:\GestorDeOpiniones\AuthServiceGestorOpiniones

**Importante: Crear el archivo .env**

/El archivo .env no está incluido en el repositorio, por lo tanto debe crearse manualmente

**Paso 1: Crear el archivo** 

/Dentro de la carpeta AuthServiceGestorOpiniones, crear un archivo llamado: **.env**

**Paso 2: Agregar la siguiente configuración**
    
    NODE_ENV=development
    PORT=3006

    DB_HOST=localhost
    DB_PORT=5438
    DB_NAME=GestorOpinionesAuth
    DB_USERNAME=root
    DB_PASSWORD=admin
    DB_SQL_LOGGING=false


    JWT_SECRET=MyVerySecretKeyForJWTTokenAuthenticationWith256Bits!
    JWT_EXPIRES_IN=30m

    EMAIL_USER=GestorOpiniones@gmail.com
    EMAIL_PASS=mcxn yjee itdb awnc 

    JWT_ISSUER=AuthService
    JWT_AUDIENCE=AuthService

    CLOUDINARY_CLOUD_NAME=dadsac1uk
    CLOUDINARY_API_KEY=266141661998574
    CLOUDINARY_API_SECRET=W8o6QMSUOqCyqMciErR7PlwaxOg
    CLOUDINARY_BASE_URL=https://res.cloudinary.com/dadsac1uk/image/upload/
    CLOUDINARY_FOLDER=auth_service_opiniones/profiles

    # Frontend URL
    FRONTEND_URL=http://localhost:5173

    # Security
    ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
    ADMIN_ALLOWED_ORIGINS=http://localhost:5173

**Esta API trabaja con PostgreSQL utilizando Docker**

**Pasos para ejecutar la API**

**1. Abrir Docker Desktop**

**2. Instalar dependencias: pnpm install**

**3. Levantar el contenedor de Docker: docker compose up -d**

**4. Verificar que el contenedor esté activo en Docker Desktop**

**5. Iniciar la API: pnpm run dev**

**Endpoints para probar en Postman**

/-RegisterUser(POST)

/-VerificationUser(GET)

/-VerifyUser(POST)

/-Perfil(GET)

/-ChangePassword(PUT)

/-ChangeUsername(PUT)

/-ChangePhoto(PUT)

**Importante**
1. Al registrarse con su correo en **RegisterUser**, recibirá un token por correo electrónico.

2. Ese token deberá utilizarlo en el endpoint:
    **VerificationUser**

3. Después de verificarse correctamente, el sistema generará un nuevo token.

4. Ese nuevo token será el que deberá usar para poder probar los endpoints de la segunda API:
    **API Gestor de Opiniones**


# GestorOpiniones
/Esta API permite crear, editar, eliminar y visualizar opiniones de usuarios previamente autenticados.

**Importante**
/Para poder usar esta API, el usuario debe:
1. Estar registrado
2. Haber verificado su cuenta en la API de Autenticación
3. Usar el token generado después de la verificación

//Ubicarse en la carpeta de GestorOpiniones:

    C:\GestorDeOpiniones\GestorOpiniones

**Paso 1: Crear el archivo** 
/Dentro de la carpeta GestorOpiniones, crear un archivo llamado: **.env**

**Paso 2: Agregar la siguiente configuración**

    NODE_ENV = development
    PORT = 3005

    URI_MONGO=mongodb://localhost:27017/GestorOpiniones

    JWT_SECRET=MyVerySecretKeyForJWTTokenAuthenticationWith256Bits!
    JWT_ISSUER=AuthService
    JWT_AUDIENCE=AuthService

    CLOUDINARY_CLOUD_NAME=dadsac1uk
    CLOUDINARY_API_KEY=266141661998574
    CLOUDINARY_API_SECRET=W8o6QMSUOqCyqMciErR7PlwaxOg
    CLOUDINARY_BASE_URL=https://res.cloudinary.com/dadsac1uk/image/upload/
    CLOUDINARY_FOLDER=gestor_opiniones/publications

**Esta API trabaja con MongoDB**

**Pasos para ejecutar la API**

**1. Instalar dependencias: pnpm install**

**2. Verificar que MongoDB esté ejecutándose**

**3. Iniciar el proyecto: pnpm run dev**

**Endpoints para probar en Postman**
**En algunos de estos endpoints tienes que usar el token que se genera cuando verificas tu cuenta**

**Uso del token**

1. Ir a la pestaña Authorization

2. En el campo Type, seleccionar Bearer Token

3. En el campo Token, pegar el token generado después de verificar la cuenta

**Si el token no es válido o ha expirado, la API dara error**

## Importante sobre la subida de imágenes

Los endpoints que permiten subir imágenes (ChangePhoto y CreatePublication) requieren que el usuario cargue una imagen nueva desde su propia computadora

No utilizar la imagen que aparece guardada en la colección de Postman, ya que esa ruta corresponde a un archivo local de otra computadora y generará error

Para subir correctamente una imagen:

1. Ir al endpoint correspondiente

2. En Body seleccionar form-data

3. En el campo tipo File, hacer clic en "Select Files"

4. Elegir una imagen desde su computadora

5. Enviar la solicitud

**Endpoints de Publications**

/-CreatePublication(POST)**Requiere Token**

/-GetPublications(GET)

/-GetPublicationsById(GET)**Requiere Token**

/-Perfil(GET)

/-UpdatePublication(PUT)**Requiere Token**

/-DeletePublication(DELETE)**Requiere Token**

**Endpoints de Comments**

/-CreateComment(POST)**Requiere Token**

/-GetYourComments(GET)**Requiere Token**

/-UpdateComment(PUT)**Requiere Token**

/-DeleteComment(DELETE)**Requiere Token**

**Uso del programa**
1. Sin token válido → acceso denegado

2. Solo usuarios autenticados pueden crear opiniones

3. Solo el usuario creador puede editar o eliminar su opinión


**Endpoints de Postman**
/Dentro de la carpeta /postman se encuentra la colección exportada lista para importar en Postman.

**El link que proporciona postman al subir una imagen se puede copiar y pegar en un navegador para ver la foto ya subida**