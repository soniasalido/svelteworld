¡Hola a todos! Bienvenidos a este tutorial donde aprenderemos a crear un proyecto Svelte desde cero en un entorno Linux. Hoy, cubriremos todo lo necesario, desde la instalación de Node.js hasta la creación de nuestro primer proyecto en Svelte. ¡Vamos a empezar!

# Previo: Instalación de Node.js

### Pero, ¿por qué necesitamos Node.js?
Node.js es un entorno de tiempo de ejecución que permite ejecutar código JavaScript fuera de un navegador web. **Node se basa en el motor V8 de Google Chrome y proporciona un conjunto de herramientas y bibliotecas que facilitan el desarrollo de aplicaciones tanto del lado del servidor como del lado del cliente.**

### ¿Qué es el motor V8 de Google Chrome?  
Es un motor de JavaScript de alto rendimiento desarrollado por Google. Es el componente responsable de ejecutar el código JavaScript en el navegador Google Chrome y otros navegadores basados en Chromium, como Microsoft Edge.

### Razones por las que necesitamos Node:
- **Compilación de Svelte:** Svelte no es un framework tradicional de JavaScript que simplemente se ejecuta en el navegador. En su lugar, Svelte convierte los componentes que escribimos en código JavaScript optimizado que luego se ejecuta en el navegador. Este proceso de compilación ocurre en el entorno de desarrollo, no en el navegador, y Node.js es el entorno que se utiliza para ejecutar este proceso. Node.js ejecuta scripts que leen nuestro código fuente de Svelte, lo transforman en el formato final, y preparan todo para ser desplegado en un navegador o en un servidor. El navegador es donde se ejecuta el código final, que ya ha sido compilado y optimizado. El navegador no necesita ni conoce el código original escrito en Svelte, solo recibe el resultado final, que es el código JavaScript, HTML y CSS generado por el proceso de compilación.
- **Herramientas de Desarrollo:** Svelte utiliza herramientas como npm o yarn que son administradores de paquetes que funcionan con Node para instalar dependencias, manejar scripts de construcción, y ejecutar servidores de desarrollo. Estas herramientas requieren Node.js para funcionar.
- **Servidor de Desarrollo:** Durante el desarrollo de una aplicación Svelte, Node.js se utiliza para ejecutar un servidor local que sirve tu aplicación en el navegador. Esto permite hacer cambios y ver los resultados en tiempo real sin tener que compilar manualmente cada vez.
- **Automatización:** Node.js permite el uso de varias herramientas de automatización que son comunes en el desarrollo de aplicaciones modernas, como Webpack, Rollup (el empaquetador que Svelte utiliza por defecto), y otros que facilitan la construcción, optimización y despliegue de la aplicación.

> [!Important]
> **Aunque Svelte es responsable de la compilación del código, Node.js es la plataforma que típicamente se utiliza para manejar todo el proceso de desarrollo.**


Node.js ejecuta scripts que, en muchos casos, invocan el compilador de Svelte. Estos scripts se encargan de:
- Compilar los archivos .svelte.
- Empaquetar el código para producción (incluyendo optimizaciones como la minificación).
  ```sh
  npm run build
  ``` 
  Este comando ejecuta el script de construcción definido en el archivo package.json, que generalmente llama a svelte-kit build.

  Alternativamente, también podemos usar directamente:
  ```sh
  npx svelte-kit build
  ```
  El comando npx svelte-kit build compila, optimiza y empaqueta la aplicación SvelteKit, preparándola para ser desplegada en un entorno de producción. Es una parte esencial del flujo de trabajo cuando estamos listos para lanzar la aplicación al público. Esto compila, optimiza y empaqueta la aplicación SvelteKit en un directorio de salida (normalmente build), dejándola lista para su despliegue en un entorno de producción.

- Verificar y validar el código (linter, pruebas unitarias, etc.).


### ¿Podríamos crear una aplicación Svelte sin usar node?
Sí, es posible hacer un proyecto con Svelte sin usar Node.js, aunque Node.js facilita mucho el desarrollo con Svelte, por lo que evitarlo puede complicar y ralentizar el proceso de desarrollo.

Desarrollar sin Node.js significará que no podremos usar herramientas comunes como **Hot Module Replacement (HMR)**, que nos permite ver los cambios en tiempo real, ni podremos usar fácilmente otros paquetes del ecosistema de Node.js.


### Vídeo muy interesante sobre node:
https://www.youtube.com/watch?v=e8n_9N-ZyFE

# Instalación de Node.js en Linux
 
Vamos a instalar Node.js en Linux:  
  
Usaremos el gestor de paquetes apt para instalar Node.js en distribuciones basadas en Debian/Ubuntu. Ejecutamos el siguiente comando en la terminal:
```sh
sudo apt update
sudo apt install nodejs npm
``` 
Este comando actualizará nuestra lista de paquetes y luego instalará Node.js junto con npm, que es el gestor de paquetes de Node.
 
Una vez completada la instalación, vamos a verificar que Node.js y npm se instalaron correctamente. Usamos los siguientes comandos:
```sh
node -v
npm -v
```

Deberíamos ver las versiones instaladas de Node.js y npm en la terminal. 


# Formas de crear un proyecto Svelte 5 en Linux

## 1. Crear un Nuevo Proyecto Svelte 5 con SvelteKit Version Estable
### Esta opción es ideal cuando:
- Queremos construir aplicaciones web con todas las características avanzadas de SvelteKit, como SSR, enrutamiento avanzado, y despliegue optimizado. Es más adecuado para aplicaciones complejas y de mayor escala.
- Ideal para proyectos en producción.

### Svelte recomienda utilizar SvelteKit
El marco de aplicación oficial del equipo Svelte que permite configurar rápidamente un proyecto con las mejores prácticas y opciones configurables.  

Ahora, crearemos un nuevo proyecto Svelte 5 utilizando el comando `npm create`. Este comando genera un proyecto Svelte utilizando las herramientas proporcionadas por Svelte directamente.
```sh
# Crear un nuevo proyecto Svelte (comando antiguo, ahora deprecado)
# npm create svelte@latest my-svelte-app 
# 🚨 Nota: Este comando ya no se recomienda, ya que `create-svelte` ha sido reemplazado.

# Crear un nuevo proyecto Svelte con el comando actualizado
npx sv create registroCivil
# ✅ Nota: Este es el nuevo comando recomendado para iniciar proyectos con Svelte.
```
Aquí, `my-svelte-app` es el nombre del proyecto. Podemos cambiarlo al nombre que prefiramos.  

Este comando utilizará la plantilla oficial de Svelte para crear un nuevo proyecto con Svelte 5. Después de ejecutar el comando, se nos presentará un asistente interactivo que nos guiará para configurar algunas opciones iniciales para nuestro proyecto. Aquí es donde eligimos entre:
- SvelteKit: Una opción más avanzada que incluye características adicionales.
- ??Svelte Standalone: Una opción más básica que simplemente nos proporciona los componentes y herramientas necesarios para trabajar con Svelte sin ninguna configuración adicional.??

### Características que obtendremos si elegimos SvelteKit durante la configuración:
- **Enrutamiento Basado en el Sistema de Archivos:** Los archivos en el directorio src/routes automáticamente se convierten en rutas de nuestra aplicación. No necesitamos configurar un enrutador por separado.
- **Renderizado en el Servidor (SSR):** SvelteKit soporta SSR de forma nativa, lo que significa que nuestra aplicación puede renderizarse en el servidor antes de enviarse al cliente, mejorando el rendimiento y la optimización para motores de búsqueda (SEO).
- **Despliegue Sencillo:** SvelteKit está diseñado para facilitar el despliegue en plataformas modernas como serverless, Vercel, Netlify, y más. Proporciona configuraciones preestablecidas que hacen que el proceso sea más simple.
- **Soporte de API:** Podemos crear endpoints API directamente dentro de nuestro proyecto SvelteKit, lo que nos permite manejar tanto el frontend como el backend en un solo lugar. Un endpoint API es una URL en nuestro servidor que maneja solicitudes (requests) y devuelve respuestas (responses). Estos endpoints son donde el frontend envía datos o solicita información. Por ejemplo, si tenemos una aplicación que necesita obtener datos de una base de datos, podemos crear un endpoint que maneje esa solicitud y devuelva los datos al frontend.
- **Manejo de Frontend y Backend Juntos:** Esta capacidad de crear endpoints API dentro de nuestro proyecto SvelteKit significa que no necesitamos un servidor separado para manejar la lógica del backend. Todo el código puede residir en el mismo proyecto, y SvelteKit se encargará de gestionar tanto las solicitudes del frontend como las respuestas del backend.
- **Herramientas Adicionales:** Durante la configuración, podemos optar por incluir herramientas como ESLint (para analizar el código y encontrar problemas), Prettier (para formatear el código), TypeScript (para usar tipos estáticos en JavaScript), entre otras. Estas herramientas se integran automáticamente en tu proyecto si decides usarlas.


### Navegamos al proyecto
Una vez creado el proyecto, navegamos al directorio del proyecto recién creado con el siguiente comando:
```sh
cd my-svelte-app
```

### Instalar Dependencias y Ejecutar el Proyecto
Antes de ejecutar el proyecto, necesitamos instalar todas las dependencias necesarias. Para ello, ejecutamos:
```sh
npm install
```
Este comando descarga e instala todas las bibliotecas necesarias para que nuestro proyecto Svelte funcione.

Abrimos el fichero package.json para ver las dependencias de nuestro proyecto:
```sh
{
	"name": "my-svelte-app",
	"version": "0.0.1",
	"private": true,
	"scripts": {
		"dev": "vite dev",
		"build": "vite build",
		"preview": "vite preview",
		"check": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json",
		"check:watch": "svelte-kit sync && svelte-check --tsconfig ./tsconfig.json --watch"
	},
	"devDependencies": {
		"@sveltejs/adapter-auto": "^3.0.0",
		"@sveltejs/kit": "^2.0.0",
		"@sveltejs/vite-plugin-svelte": "^4.0.0-next.6",
		"svelte": "^5.0.0-next.1",
		"svelte-check": "^3.6.0",
		"typescript": "^5.0.0",
		"vite": "^5.0.3"
	},
	"type": "module"
}
```

Podemos verificar que esté Svelte 5 funcionando y solventar problemas de compatibilidad en las dependencias:
```sh
npm list svelte
```

### Opcional: Integrar Git para control de versiones:
```sh
git init && git add -A && git commit -m "Initial commit"
```

### Ejecutar el proyecto
Con las dependencias instaladas, ya podemos ejecutar nuestro proyecto. Para iniciar el servidor de desarrollo, usamos el siguiente comando:
```sh
npm run dev -- --open
```
Esto iniciará un servidor local y abrirá en el navegador la aplicación Svelte ya en funcionamiento.


### Ve la aplicación en el navegador  
¡Deberíamos ver la página de bienvenida de Svelte! Desde aquí, podemos empezar a editar tu proyecto y ver los cambios en tiempo real.


### Estructura del Proyecto Svelte
Vamos a echar un vistazo rápido a la estructura del proyecto. En nuestro editor de código favorito, abrimos la carpeta my-svelte-app.
```bash
my-project/
├ src/
│ ├ lib/
│ │ ├ server/
│ │ │ └ [your server-only lib files]
│ │ └ [your lib files]
│ ├ params/
│ │ └ [your param matchers]
│ ├ routes/
│ │ └ [your routes]
│ ├ app.html
│ ├ error.html
│ ├ hooks.client.js
│ ├ hooks.server.js
│ └ service-worker.js
├ static/
│ └ [your static assets]
│ └ robots.txt
│ └ favicon.png
├ tests/
│ └ [your tests]
├ package.json
├ svelte.config.js
├ tsconfig.json
└ vite.config.js
```
- src es la carpeta que contiene el código fuente de la aplicación.
- src/routes/+page.svelte es el archivo principal de la página.
- src/index.html es un template HTML que define la estructura base de la aplicación web. Es el punto de partida sobre el cual SvelteKit monta el contenido dinámico y los componentes.
- public/ es donde se colocan los activos estáticos como imágenes o fuentes.
- package.json gestiona las dependencias y scripts de nuestro proyecto.  


## 2. Usando SvelteKit Version de Desarrollo
Con la opción `@next` nos permite crear un proyecto Svelte utilizando la versión de desarrollo o futura (prelanzamiento) de Svelte. next se refiere a la próxima versión de Svelte que aún no ha sido lanzada oficialmente como estable, pero está disponible para pruebas y experimentación.

`npm create svelte@next` es ideal si queremos experimentar con las nuevas características de Svelte antes de que sean lanzadas oficialmente o si estamos interesados en contribuir al desarrollo de Svelte probando versiones preestablecidas y reportando errores.


## 3. Partiendo de un proyecto de Svelte 4 para avanzarlo a Svelte5:

Actualizar las Dependencias: Modificamos el archivo package.json para actualizar Svelte a la versión 5. Asumiendo que Svelte 5 esté disponible, el cambio sería algo como:

```
"dependencies": {
    ....
    "@sveltejs/vite-plugin-svelte": "^4.0.0-next.6",
    "svelte": "^5.0.0-next.1",
	....
}
```

Verificar que esté Svelte 5 funcionando y solventar problemas de compatibilidad en las dependencias:
```bash
npm list svelte
```


-----

-----
# Credenciales en un Proyecto
Tener las credenciales de una base de datos en el mismo proyecto donde se manejan tanto el frontend como el backend es una preocupación válida en términos de seguridad. Sin embargo, existen prácticas recomendadas que puedes seguir para mitigar los riesgos y proteger esas credenciales. Aquí te explico cómo manejar esta situación de manera segura:

## 1. Variables de Entorno
Las credenciales de la base de datos, como el nombre de usuario y la contraseña, no deben estar hardcoded (escritas directamente) en tu código. En su lugar, debes utilizar variables de entorno. Las variables de entorno permiten almacenar información sensible en un archivo separado (.env), que no se debe incluir en el control de versiones (como Git).

Ejemplo de un archivo .env:
```plaintext
DB_HOST=localhost
DB_USER=mi_usuario
DB_PASSWORD=mi_contraseña_segura
DB_NAME=mi_base_de_datos
```

Luego, en tu código de SvelteKit, puedes acceder a estas variables de la siguiente manera:
```js
import { env } from '$env/dynamic/private';

const dbHost = env.DB_HOST;
const dbUser = env.DB_USER;
const dbPassword = env.DB_PASSWORD;
const dbName = env.DB_NAME;

// Conectar a la base de datos usando estas variables
```

## 2. Archivo .env en .gitignore
Asegúrate de que el archivo .env esté incluido en tu archivo .gitignore para que no se suba al repositorio de código fuente, lo que evitaría exponer las credenciales en plataformas como GitHub.

Ejemplo de .gitignore:
```plaintext
.env
```

## 3. Configuración del Servidor
Cuando despliegas tu aplicación en un entorno de producción, como Vercel, Netlify, o un servidor dedicado, estos servicios suelen ofrecer un método seguro para configurar variables de entorno. De esta manera, las credenciales nunca se exponen directamente en el código ni en el repositorio.

## 4. Uso de Secretos en el Despliegue
Si estás utilizando una plataforma de despliegue, muchas de ellas tienen mecanismos para gestionar "secretos" o variables sensibles. Puedes configurar las variables de entorno directamente en la plataforma, asegurándote de que las credenciales solo sean accesibles desde el entorno de producción.

## 5. Manejo del Backend
El código que interactúa con la base de datos debe estar en el lado del servidor y no debe ser accesible directamente desde el frontend. En SvelteKit, esto significa que las llamadas a la base de datos deben realizarse dentro de los endpoints API o en hooks específicos del servidor, que no son accesibles desde el navegador.

## 6. Restricciones de Acceso en la Base de Datos
Configura la base de datos para que el usuario que utilices tenga los permisos mínimos necesarios. Por ejemplo, si la aplicación solo necesita leer datos, utiliza un usuario que solo tenga permisos de lectura.

## 7. Usar Conexiones Seguras
Asegúrate de que las conexiones a la base de datos utilicen protocolos seguros (como SSL/TLS) para evitar que las credenciales sean interceptadas durante la transmisión.

# Resumen
La seguridad de las credenciales de la base de datos es crítica, pero se puede gestionar de manera efectiva siguiendo buenas prácticas como el uso de variables de entorno, la configuración adecuada del servidor y asegurándose de que las credenciales no se expongan en el código fuente. De esta forma, puedes mantener la seguridad incluso cuando manejas tanto el frontend como el backend en un solo proyecto SvelteKit.
