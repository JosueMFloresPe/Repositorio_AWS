# Guía de Integración AWS - Sistema de Cobros

Este documento detalla los pasos de infraestructura en la nube necesarios para completar el despliegue del sistema. Asegúrate de configurar los siguientes servicios y de compartir las credenciales o URLs generadas para integrarlas al backend.

## 1. Integración de AWS S3 (Archivos Estáticos)

Necesitamos que el logo oficial del sistema y el ícono de la pestaña (favicon) carguen directamente desde el bucket de almacenamiento público.

* Buscar la etiqueta `<img>` con la clase `header-logo` dentro del código de `views/dashboard.html` y `views/deudas.html`.
* Reemplazar el atributo `src` temporal con la URL pública definitiva generada en tu bucket S3.
* Actualizar el atributo `href` en la etiqueta `<link rel="icon">` ubicada en el `<head>` de ambas vistas para cargar el icono de la pestaña.

## 2. Base de Datos en AWS RDS (PostgreSQL)

El backend local ya está estructurado con el paquete `pg` de Node.js. Ahora debemos levantar el motor en la nube para probar el CRUD en un entorno real.

* Crear una instancia de base de datos PostgreSQL seleccionando la plantilla de **Nivel Gratuito (Free Tier)** para evitar bloqueos del Sandbox.
* Habilitar obligatoriamente la opción de **Acceso Público** en la sección de conectividad para permitir que el código local se comunique con AWS.
* Ejecutar el script SQL en la nueva base de datos para levantar el esquema de las tablas `users`, `clients` y `debts`.
* Compartir el Endpoint (URL del host), el usuario y la contraseña maestra para inyectarlos en el archivo `.env` de nuestro proyecto local y probar la conexión.

## 3. Función AWS Lambda (Logging)

Para cumplir con el bonus del laboratorio, implementaremos un microservicio que registre un evento cada vez que un usuario inicie sesión correctamente.

* Crear una función Lambda sencilla en Node.js que reciba un nombre de usuario e imprima un mensaje de éxito en los registros.
* Añadir un desencadenador de **API Gateway** a la función Lambda para exponerla a través de internet de forma segura.
* Proporcionar la URL pública generada por el API Gateway; esta URL será consumida mediante una petición HTTP desde nuestro controlador de autenticación justo después de un login exitoso.

## Inicialización del Proyecto

Para levantar el servidor Node.js (ya sea en tu entorno local o dentro de la instancia EC2 de AWS), sigue estos pasos:

1. **Instalar dependencias:** Abre la terminal en la raíz del proyecto y ejecuta:
    ```bash
    npm install
    ```


2. **Configurar variables de entorno:** Crea un archivo llamado `.env` en la raíz del proyecto (al mismo nivel que `server.js`) y agrega las credenciales de conexión (reemplazando con los datos de AWS RDS una vez creado):
    ```env
    PORT=80
    DB_USER=tu_usuario_maestro
    DB_PASSWORD=tu_contraseña_segura
    DB_HOST=tu_endpoint_rds.amazonaws.com
    DB_PORT=5432
    DB_NAME=sistema_cobros
    ```


3. **Arrancar el servidor:** Ejecuta el siguiente comando para iniciar la aplicación:
    ```bash
    npm run dev
    ```

## Material de Exposición

* **Nota importante para la entrega:** El video que grabé demostrando el funcionamiento del proyecto y las imágenes/capturas de pantalla de las interfaces y consolas de AWS, deben ser guardados obligatoriamente dentro de la carpeta `resources_expo` en la raíz de este repositorio para tener todo listo para la presentación.