# Gestor de Opiniones

// Este proyecto está compuesto por dos APIs independientes:
//**API de Autenticación**
//**API Gestor de Opiniones**

//Primero se ubica en la carpeta de autenticación:
// PS C:\GestorDeOpiniones> cd GestorOpiniones

//Instalar dependencias: **pnpm install**
//Levantar el contenedor de docker: **docker compose up -d**
//Ejecutar el proyecto: **pnpm run dev**

//Luego probar los endpoints:
//-RegisterUser(POST)
//-VerificationUser(GET)
//-VerifyUser(POST)
//-Perfil(GET)
//-ChangePassword(PUT)
//-ChangeUsername(PUT)
//-ChangePhoto(PUT)

**Importante**
Al registrarse con su correo, le llegará un token por correo.

Ese token debe usarlo en el endpoint llamado VerificationUser.

Al verificarse, se le generará un nuevo token.

Ese nuevo token deberá usarlo para poder probar los endpoints de la otra API (Gestor de Opiniones).
