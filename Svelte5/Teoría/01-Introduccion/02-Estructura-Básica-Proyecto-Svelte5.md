# 1. Estructura Básica de un proyecto svelte 5 creado con sveltekit

Una estructura típica de un proyecto Svelte 5 creado con SvelteKit incluye varios archivos y carpetas que definen la configuración, el contenido y la lógica de la aplicación. A continuación, se describen algunos de los archivos y carpetas más importantes que se encuentran en un proyecto SvelteKit:
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

También podemos encontrar otros ficheros como .gitignore, .prettierrc, .eslintrc, etc. que son usados para configurar el proyecto. 


# 1. La carpeta /src
La carpeta /src es el directorio principal donde se almacena el código fuente de la aplicación. Contiene subdirectorios y archivos que definen la estructura, la lógica y el contenido de la aplicación.
Según la documentación oficial de SvelteKit, todo es opcional **excepto src/routes y src/app.html.**


## 1.1 Fichero /src/app.html
```svelte
<!doctype html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

**El archivo app.html en un proyecto de SvelteKit es un template HTML que define la estructura base de la aplicación web.** Es el punto de partida sobre el cual SvelteKit monta el contenido dinámico y los componentes. 

**El archivo app.html contiene marcadores de posición que SvelteKit reemplaza con contenido dinámico en tiempo de ejecución.** Estos marcadores permiten a SvelteKit gestionar y generar dinámicamente el contenido de la aplicación.

- ### \<body data-sveltekit-preload-data="hover">
Es un atributo que le dice a SvelteKit que pre-cargue los datos de las rutas cuando el usuario pasa el ratón por encima de un enlace que lleva a esa ruta. Mejora la experiencia de usuario al reducir el tiempo de espera entre clics y la carga de nuevas páginas.


### Marcadores de posición:
Este sistema de marcadores de posición facilita la creación de plantillas HTML dinámicas y seguras en aplicaciones SvelteKit.

- ### %sveltekit.head%
	Este marcador de posición será reemplazado por el contenido que SvelteKit genere para la etiqueta <head>. Esto incluye títulos dinámicos, meta tags, hojas de estilos y cualquier otra información que varíe entre las diferentes páginas de nuestra aplicación.
	
	Este marcador de posición incluye los elementos necesarios para que la aplicación funcione correctamente, como los `<link>` (para hojas de estilo o favicons) y `<script>` (para JavaScript). También incluye cualquier contenido que definamos en el componente <svelte:head> de nuestra aplicación.

- ### %sveltekit.body%
	Este es el lugar donde se va a insertar el contenido dinámico generado por SvelteKit, incluyendo todos los componentes de Svelte que forman las diferentes páginas de la aplicación. SvelteKit renderiza el contenido y lo reemplaza en este marcador.
	
	Contiene el HTML generado por SvelteKit para nuestra página. Se recomienda colocarlo dentro de un elemento contenedor (como un `<div>`), en lugar de directamente dentro del `<body>`. Esto evita conflictos con extensiones del navegador que podrían inyectar contenido de manera inesperada, lo que afectaría el comportamiento de la aplicación.

- ### %sveltekit.assets%
	Este marcador indica la ruta a los recursos (assets) como imágenes, fuentes, etc. Si definimos una ruta específica (paths.assets), SvelteKit usará esa; si no, calculará una ruta relativa basada en paths.base.


- ### %sveltekit.nonce%
	Es un "nonce" (número de uso único) para incluir manualmente enlaces y scripts, si se usa.
	%sveltekit.env.[NAME]% — esto será reemplazado en tiempo de renderizado con la variable de entorno [NAME], que debe comenzar con el prefijo público (generalmente PUBLIC_). Si no coincide, se utilizará '' (cadena vacía) como valor por defecto.
	
	Si usamos una política de seguridad de contenido (CSP), este marcador se utilizará para insertar un nonce en los enlaces y scripts, lo que permite que solo los scripts y estilos con ese nonce sean ejecutados, mejorando la seguridad.


- ### %sveltekit.env.[NAME]%
	Permite acceder a variables de entorno en el lado del cliente. Las variables deben comenzar con un prefijo público (normalmente PUBLIC_) para garantizar que solo se expongan variables seguras al cliente. Si no existe la variable, será reemplazada por una cadena vacía.

> [!IMPORTANT]
> En definitiva, app.html es un esqueleto HTML en el que SvelteKit insertará el contenido de las páginas y componentes en tiempo de ejecución, mientras que los marcadores %sveltekit.head% y %sveltekit.body% permiten a SvelteKit gestionar y generar dinámicamente el contenido de nuestra aplicación.


## 1.2. El archivo /src/app.d.ts
```typescript
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
```

El archivo app.d.ts es un archivo de declaración de tipos en TypeScript que SvelteKit proporciona para definir las interfaces globales y personalizarlas según las necesidades del proyecto.

- ### declare global { ... }
Esto indica que el contenido dentro del bloque afecta al alcance global del proyecto. En este caso, se usa para declarar tipos globales relacionados con SvelteKit, lo que permite extender o definir tipos personalizados para ciertas partes del framework.

- ### namespace App { ... }
Dentro de este espacio de nombres (namespace), podemos definir o extender las interfaces que SvelteKit utiliza para la aplicación. Estas interfaces son útiles para que SvelteKit conozca las formas de ciertos objetos o estructuras de datos que se manejan a lo largo de la aplicación.

- ### Las interfaces comentadas sirven para personalizar distintos aspectos de la aplicación:
  - **interface Error {}:** Podemos definir aquí la forma de los errores que se manejarán en nuestra aplicación. Si deseamos tener un tipo específico de error o propiedades adicionales, podemos extender esta interfaz.
  - **interface Locals {}:** Esta interfaz nos permite definir qué tipo de datos estarán disponibles en el objeto locals del servidor (por ejemplo, información del usuario autenticado, configuraciones personalizadas, etc.).
  - **interface PageData {}:** Aquí definimos el tipo de los datos que se envían a las páginas (load function) y que son accesibles en los componentes de la página a través del objeto page.data.
  - **interface PageState {}:** Aunque no se usa comúnmente, nos permite definir tipos para el estado de la página.
  - **interface Platform {}:** Se utiliza para especificar el entorno o plataforma donde se ejecuta la aplicación (por ejemplo, si estamos usando un servicio específico como Cloudflare Workers o Deno).
  - **export {}:** Esta línea final asegura que el archivo sea tratado como un módulo de TypeScript, lo que impide que las declaraciones globales definidas en este archivo contaminen el ámbito de otros archivos de declaración.

### ¿Para qué sirve este archivo?
Este archivo es útil cuando estamos desarrollando en TypeScript y queremos personalizar o ampliar el comportamiento de la aplicación en aspectos clave como el manejo de errores, datos globales, o las estructuras específicas que SvelteKit maneja. Nos permite añadir tipos y estructura a las partes importantes de la aplicación, ayudándonos a que el código sea más seguro, mantenible y autocompletado por el editor.


## 1.3. El fichero /src/routes/+page.svelte
El archivo /routes/+page.svelte en un proyecto de SvelteKit es el componente que define el contenido de una página dentro de la estructura de rutas del proyecto.

```svelte
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
```
Este código genera una página con un título y un enlace a la documentación de SvelteKit. El contenido dentro de un archivo +page.svelte es HTML y código Svelte que se renderiza como parte de la interfaz de usuario de la página.


## ¿Qué representa este archivo?
- /routes: El directorio routes en SvelteKit representa el enrutamiento de nuestra aplicación. **Cada archivo o carpeta dentro de routes se mapea automáticamente a una ruta en la URL.**
- +page.svelte: En SvelteKit, un archivo con el nombre +page.svelte dentro de una carpeta de rutas representa el componente principal para esa página en particular. SvelteKit lo renderiza cuando el usuario navega a esa ruta.


## ¿Para qué sirve este archivo?
- Definir el contenido de la página: Este archivo define el contenido que se mostrará en la ruta correspondiente. Si está en la carpeta raíz (/routes/+page.svelte), esta sería la página principal de nuestra aplicación, que probablemente se cargue cuando un usuario accede a la URL raíz (/).

- Usar la sintaxis de Svelte: Este archivo puede contener no solo HTML estático, como en el ejemplo, sino también lógica y componentes dinámicos de Svelte. Esto permite crear interfaces interactivas y dinámicas.

- Enrutamiento automático: SvelteKit gestiona el enrutamiento basándose en la estructura de directorios y archivos dentro de routes. Un archivo +page.svelte es automáticamente una página de la aplicación, y SvelteKit la muestra cuando se navega a la ruta correspondiente.

## Ejemplo de cómo se relaciona con la ruta
Si el archivo está ubicado en /routes/+page.svelte, la página será accesible desde la ruta /. Si el archivo estuviera en /routes/about/+page.svelte, representaría el contenido de la página que se muestra cuando un usuario navega a la ruta /about.


## 1.4. El fichero /src/lib/index.ts
El archivo /src/lib/index.ts en un proyecto de SvelteKit sirve como un punto de entrada para cualquier módulo o archivo que se coloque en la carpeta /src/lib. En SvelteKit, el alias $lib se utiliza para importar archivos que se encuentran en esta carpeta de forma más sencilla y organizada.
```js
// place files you want to import through the `$lib` alias in this folder.
```

Propósito del archivo /src/lib/index.ts
- Centralizar importaciones: Este archivo es un lugar donde podemos centralizar las exportaciones de cualquier componente, función, constante, o utilidad que coloquemos dentro de la carpeta /src/lib. Al tener un único archivo de entrada, podemos controlar qué partes de nuestra biblioteca interna exponemos al resto de la aplicación o a otros módulos.

- Alias $lib: SvelteKit proporciona el alias $lib para hacer referencia a la carpeta /src/lib. Esto nos permite importar archivos desde cualquier parte de nuestro proyecto usando rutas más cortas y legibles.
	- Por ejemplo, en lugar de escribir import { something } from '../../../lib/someModule';, podríamos escribir import { something } from '$lib/someModule';.

- Buenas prácticas de organización: Es una buena práctica colocar en la carpeta /src/lib aquellos componentes, utilidades, constantes, o cualquier código que deseemos reutilizar en varias partes de la aplicación. El archivo index.ts facilita el reexportar estos recursos para mantener un código organizado y fácil de mantener.

### ¿Qué hacer con este archivo?
Este archivo es un lugar donde podemos exportar diferentes módulos que coloquemos en la carpeta /src/lib. Por ejemplo, si tenemos un archivo de utilidades y un componente que deseamos compartir entre varios archivos de la aplicación, podríamos hacer algo como esto:

- Imaginamos que tienes dos archivos en /src/lib:  
/src/lib/utils.ts  
/src/lib/MyComponent.svelte  

- En index.ts, podríamos reexportarlos de la siguiente manera:
```typescript
export * from './utils';
export { default as MyComponent } from './MyComponent.svelte';
```

- Ahora, en otras partes de nuestra aplicación, podemos importar estos módulos usando el alias $lib:
```typescript
import { someUtilityFunction } from '$lib/utils';
import { MyComponent } from '$lib';
```

Esto es útil para proyectos grandes o cuando necesitas compartir y reutilizar varios componentes o funciones entre diferentes partes de la aplicación.



# 2. Estructura de un proyecto svelte 5 NO creado con sveltekit
En un proyecto Svelte 5 que no utiliza SvelteKit, la estructura de directorios y archivos puede variar significativamente en comparación con un proyecto de SvelteKit. A continuación, se describen algunos de los archivos y carpetas más comunes que se encuentran en un proyecto Svelte 5 sin SvelteKit:

```bash
my-svelte-project/
├ public/
│ ├ favicon.ico
│ └ ...
├ lib/
│ ├ components/
│ │ ├ Button.svelte
│ │ ├ Input.svelte
│ │ └ ...
├ src/
│ ├ assets/
│ │ ├ images/
│ │ ├ styles/
│ │ └ ...
│ ├ App.svelte
│ ├ main.js
│ └ ...
├ index.html
├ package.json
├ rollup.config.js
└ ...
```

En un proyecto Svelte 5 sin SvelteKit, la estructura de directorios y archivos puede ser más simple y directa, ya que no hay una capa de abstracción adicional proporcionada por SvelteKit. A continuación, se describen algunos de los archivos y carpetas más comunes que se encuentran en un proyecto Svelte 5 sin SvelteKit:

- ### public/:
El directorio public/ contiene archivos estáticos y recursos que se sirven directamente al navegador. Esto incluye archivos HTML, imágenes, fuentes, hojas de estilo y otros recursos estáticos que forman parte de la interfaz de usuario de la aplicación.

- ### src/:
El directorio src/ es el directorio principal donde se almacena el código fuente de la aplicación. Contiene archivos Svelte, JavaScript y otros recursos que definen la lógica y la interfaz de usuario de la aplicación.
 
- ### App.svelte:
El archivo App.svelte es el componente principal de la aplicación que define la estructura y el contenido de la interfaz de usuario. Es el punto de entrada de la aplicación y se utiliza para montar y renderizar otros componentes de Svelte.
 
- ### main.js:
El archivo main.js es el punto de entrada de la aplicación donde se inicializa y configura la aplicación. Se utiliza para importar y montar el componente principal de la aplicación (App.svelte) en el DOM.

- ### package.json:
El archivo package.json es un archivo de configuración de npm que define las dependencias, scripts y metadatos de la aplicación. Contiene información sobre el proyecto, las dependencias de desarrollo y producción, y los scripts de construcción y ejecución.

- ### rollup.config.js:
El archivo rollup.config.js es un archivo de configuración de Rollup, que es una herramienta de empaquetado utilizada para compilar y construir la aplicación. Contiene la configuración de Rollup, como los plugins, las entradas y las salidas de la aplicación.

- ### Otros archivos y carpetas:
Además de los archivos mencionados anteriormente, un proyecto Svelte 5 sin SvelteKit puede contener otros archivos y carpetas, como archivos de configuración adicionales, archivos de estilos, archivos de pruebas, y otros recursos necesarios para el desarrollo y la construcción de la aplicación.

- ### Comparación con un proyecto SvelteKit:
En comparación con un proyecto Svelte 5 creado con SvelteKit, un proyecto Svelte 5 sin SvelteKit puede tener una estructura de directorios y archivos más simple y directa, ya que no hay una capa de abstracción adicional proporcionada por SvelteKit. Sin embargo, ambos tipos de proyectos comparten conceptos y patrones comunes en el desarrollo de aplicaciones Svelte.

- ### Resumen:
En resumen, un proyecto Svelte 5 sin SvelteKit puede tener una estructura de directorios y archivos más simple y directa, con archivos como App.svelte, main.js, package.json y rollup.config.js que definen la lógica y la interfaz de usuario de la aplicación. Aunque la estructura puede variar según las necesidades del proyecto, estos archivos y carpetas son comunes en muchos proyectos Svelte 5 sin SvelteKit.

Un proyecto Svelte creado sin SvelteKit usa un punto de anclaje en el archivo index.html, donde el componente principal (como App.js) se monta en un elemento del DOM mediante un punto de referencia, como un `<div id="app"></div>`.

## Si usamos SvelteKit en Svelte 5:
- No veremos un archivo index.html tradicional, ya que SvelteKit se encarga del enrutamiento y la configuración automática.
- En su lugar, el componente principal se renderiza en un punto dentro de las plantillas gestionadas por el framework, utilizando los marcadores de posición %sveltekit.body%, como mencionamos antes. Este marcador es el equivalente a donde se renderiza el contenido de tu aplicación, similar a cómo funcionaba el punto de anclaje en versiones anteriores.

## Si no usamos SvelteKit (como por ejemplo vite):
- Existe un punto de anclaje y podemos especificarlo en el archivo index.html.
```sveltehtml
<div id="app"></div>
<script>
  import App from './App.svelte';

  const app = new App({
    target: document.getElementById('app'), // Este es el punto de anclaje
  });

  export default app;
</script>
```

> [!TIP]
> Más Profundidad sobre las rutas: [05-Rutas-Routing.md](05-Rutas-Routing.md)