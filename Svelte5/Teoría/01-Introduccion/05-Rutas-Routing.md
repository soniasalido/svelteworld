
El enrutamiento basado en el sistema de archivos es una característica clave de SvelteKit, la cual permite que las rutas en una aplicación se generen automáticamente según la estructura de carpetas y archivos en el directorio src/routes/. Las rutas de nuestra aplicación son las rutas URL a las que pueden acceder los usuarios que visitan nuestra aplicación. Estas rutas se definene por los directorios que se encuentran dentro del directorio `/src`.

Podemos cambiar src/routes a un directorio diferente editando la configuración del proyecto en el fichero `svelte.config.js`.

## Esquema de Enrutamiento Basado en Sistema de Archivos en SvelteKit
```
src/
└── routes/
    ├── +layout.svelte
    ├── +page.svelte          ->  "/"
    ├── about/
    │   ├── +page.svelte      ->  "/about"
    ├── blog/
    │   ├── +page.svelte      ->  "/blog"
    │   ├── [slug]/
    │   │   └── +page.svelte  ->  "/blog/:slug"
    │   ├── new/
    │   │   └── +page.svelte  ->  "/blog/new"
    ├── contact/
    │   └── +page.svelte      ->  "/contact"
    └── [id]/
        └── +page.svelte      ->  "/:id"
```

- **src/routes/:** Es la ruta raíz. Este directorio contiene la estructura de carpetas y archivos que define las rutas de nuestra aplicación. El directorio routes en SvelteKit representa el enrutamiento de nuestra aplicación. Cada archivo o carpeta dentro de routes se mapea automáticamente a una ruta en la URL.

- **Páginas básicas:**
    - **+page.svelte:** Cualquier archivo +page.svelte dentro de src/routes/ corresponde a una página. En SvelteKit, un archivo con el nombre +page.svelte dentro de una carpeta de rutas representa el componente principal para esa página en particular. SvelteKit lo renderiza cuando el usuario navega a esa ruta. Este archivo define el contenido que se mostrará en la ruta correspondiente. Si está en la carpeta raíz (/routes/+page.svelte), esta sería la página principal de nuestra aplicación, que probablemente se cargue cuando un usuario accede a la URL raíz (/).
    - **src/routes/about/+page.svelte:** Define la ruta /about.
    - **src/routes/contact/+page.svelte:** Define la ruta /contact.

- **Rutas dinámicas:** Los nombres de carpeta entre corchetes ([ ]) representan rutas dinámicas.
    - src/routes/[id]/+page.svelte: Define una ruta dinámica con un parámetro llamado id ("/:id"). Esto puede ser, por ejemplo, /123 o /product.
    - src/routes/blog/[slug]/+page.svelte: Define una ruta dinámica con un parámetro slug en el contexto del blog ("/blog/:slug"). Se puede usar para cargar datos dinámicamente cuando un usuario solicita una página como/blog/hello-world.

- **Subrutas:** Las subrutas pueden ser creadas anidando carpetas dentro de src/routes/.
    - **src/routes/blog/new/+page.svelte:** Define la ruta /blog/new.
    - **src/routes/blog/[slug]/+page.svelte:** Define la ruta /blog/:slug.

- **Layouts:** Podemos tener layouts específicos dentro de subdirectorios si se necesitan.
    - **+layout.svelte:** Los archivos +layout.svelte son plantillas que se comparten entre múltiples rutas. Puedes tener layouts a nivel raíz o específicos para ciertas subrutas.
    - **src/routes/+layout.svelte:** Define el layout general para todas las páginas de la aplicación.


## Reglas generales:
- **Enrutamiento automático:** SvelteKit gestiona el enrutamiento basándose en la estructura de directorios y archivos dentro de routes. Un archivo +page.svelte es automáticamente una página de la aplicación, y SvelteKit la muestra cuando se navega a la ruta correspondiente.

- **`+prefijo`:** Cada directorio de ruta contiene uno o más archivos de ruta, que pueden identificarse por su `+prefijo`. Si el archivo está ubicado en /routes/+page.svelte, la página será accesible desde la ruta /. Si el archivo estuviera en /routes/about/+page.svelte, representaría el contenido de la página que se muestra cuando un usuario navega a la ruta /about.
  
- **Cada archivo +page.svelte en la estructura del directorio representa una página en nuestra aplicación.**

- **Los directorios entre corchetes ([ ]) crean rutas dinámicas que capturan valores específicos de la URL.**
  
- **Los archivos +layout.svelte son plantillas comunes** para organizar el diseño compartido entre varias páginas.
    Ejemplos:
    Ruta /about:
    
    Se genera a partir del archivo src/routes/about/+page.svelte.
    Si tenemos un archivo src/routes/+layout.svelte, este envolverá el contenido de la página /about.

- **Ruta /blog/:slug:**
    Se genera a partir de src/routes/blog/[slug]/+page.svelte, donde slug es dinámico.
    Por ejemplo, /blog/my-first-post.

- **Ruta dinámica /:id:**
    Se genera a partir de src/routes/[id]/+page.svelte.
    Esto puede capturar valores dinámicos en la URL, como /123, /user, etc.

- **Funcionamiento del enrutamiento de SvelteKit:**
    - Todos los archivos pueden ejecutarse en el servidor.
    - Todos los archivos se ejecutan en el cliente excepto los archivos `+server`.
    - Los archivos `+layout` y `+error` se aplican tanto a los subdirectorios como al directorio en el que se encuentran.

## +page.svelte
Un `+page.svelte` componente define una página de nuestra aplicación. De forma predeterminada, las páginas se muestran tanto en el servidor (SSR) para la solicitud inicial como en el navegador (CSR) para la navegación posterior.
```js
// src/routes/+page.svelte
<h1>Hello and welcome to my site!</h1>
<a href="/about">About my site</a>
```

```js
// src/routes/about/+page.svelte
<h1>About this site</h1>
<p>TODO...</p>
<a href="/">Home</a>
```


```js
// src/routes/blog/[slug]/+page.svelte
<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1>{data.title}</h1>
<div>{@html data.content}</div>
```

## +página.js
A menudo, una página necesitamos cargar algunos datos antes de poder renderizarse. Para ello, agregamos un módulo `+page.js` que exporta una función `load`:
```js
// src/routes/blog/[slug]/+page.js
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	if (params.slug === 'hello-world') {
		return {
			title: 'Hello world!',
			content: 'Welcome to our blog. Lorem ipsum dolor sit amet...'
		};
	}

	error(404, 'Not found');
}
```

Esta función se ejecuta junto con `+page.svelte`, lo que significa que se ejecuta en el servidor durante la representación del lado del servidor y en el navegador durante la navegación del lado del cliente. 


Además de `load y `+page.js` podemos exportar valores que configuran el comportamiento de la página:
- `export const prerender = true` or `false` or `auto`
- `export const ssr = true` or `false`
- export const csr = true` or `false`

## +page.server.js
Si nuestra `load` función solo puede ejecutarse en el servidor (por ejemplo, si necesitamos obtener datos de una base de datos o necesitamos acceder a variables de entorno privadas como claves API), podemos cambiar el nombre `+page.js` a `+page.server.js` y cambiar el `PageLoad` a `PageServerLoad`.

```js
// src/routes/blog/[slug]/+page.server.js
import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const post = await getPostFromDatabase(params.slug);

	if (post) {
		return post;
	}

	error(404, 'Not found');
}
```

Durante la navegación del lado del cliente, SvelteKit cargará estos datos desde el servidor, lo que significa que el valor devuelto debe ser serializable mediante devalue .

Un fichero `+page.server.js` también puede exportar acciones. Si `load` nos permite leer datos del servidor, `actions` nos permite escribir datos en el servidor mediante el elemento `<form>`.


## +error
Si se produce un error durante la ejecución `load`, SvelteKit mostrará una página de error predeterminada. Podemos personalizar esta página de error para cada ruta agregando un archivo `+error.svelte`.

### Manejo de errores en SvelteKit
Específicamente cuando se produce un error durante la ejecución de una función `load`, que generalmente se utiliza para cargar datos antes de que se renderice una página.

- **Página de error predeterminada:**
	- Cuando ocurre un error en SvelteKit durante la ejecución de load, como cuando no se puede cargar datos necesarios para una página, SvelteKit muestra una página de error predeterminada.
	- Sin embargo, puedes personalizar esta página de error creando un archivo especial llamado +error.svelte dentro del directorio de la ruta afectada.

- **Archivo +error.svelte personalizado:** El archivo +error.svelte contiene el diseño personalizado que deseas mostrar cuando se produzca un error en esa ruta en particular.
	```js
	// src/rutas/blog/[slug]/+error.svelte
	<script>
		import { page } from '$app/stores';
	</script>
	
	<h1>{$page.status}: {$page.error.message}</h1>
	```

	Este archivo +error.svelte muestra el código de estado (por ejemplo, 404 o 500) y el mensaje de error, accediendo a los datos de la tienda page.


- **Jerarquía de búsqueda de límites de error:**
	- SvelteKit "recorre el árbol de directorios" en busca del límite de error más cercano. Si ocurre un error en una página, buscará un archivo +error.svelte en la misma ruta. Si no lo encuentra, subirá un nivel y buscará un archivo +error.svelte en el directorio superior.
	- Si no hay un archivo +error.svelte en ningún lugar del árbol de directorios, finalmente mostrará la página de error predeterminada de SvelteKit.

- **Error en el +layout(.server).js**
	- Si el error ocurre en la función load de un archivo de diseño +layout(.server).js, SvelteKit buscará el archivo +error.svelte que esté "encima" de ese layout en la estructura de directorios, no uno que esté a su lado. Esto se debe a que los layouts afectan a múltiples rutas y están en un nivel jerárquico superior en la estructura de las páginas.

- **Error 404:**
	- Si un usuario intenta acceder a una ruta que no existe, se genera un error 404. Para estos casos, SvelteKit buscará el archivo src/routes/+error.svelte para manejar el error. Si este archivo no existe, mostrará la página de error predeterminada.

- **Personalización de la página de error estática de respaldo:**
	- Si fallan todos los intentos de encontrar un archivo +error.svelte, SvelteKit mostrará una página de error estática de respaldo. Esta página también puede ser personalizada creando un archivo src/error.html.

>![Important]  
>`+error.svelte` no se utiliza cuando se produce un error dentro de handle un controlador de solicitud `+server.js`.


## +layout
En SvelteKit, los archivos `+layout.svelte` permiten crear diseños compartidos para varias páginas. El archivo `+layout.svelte` sirve para definir estos elementos que se mantienen constantes en todas las páginas que lo usan. Los layouts se definen por rutas, y cada página dentro de una ruta puede heredar ese layout.

Uso de layouts: Si queremos que algunos elementos (como una barra de navegación o un pie de página) se mantengan visibles en todas las páginas sin necesidad de repetir el código en cada archivo +page.svelte, podemos crear un archivo `+layout.svelte`. Este archivo será el "envoltorio" alrededor de las páginas. De esta manera, cada vez que naveguemos, solo se actualizará el contenido de la página, pero el layout se mantendrá.

Estructura de ejemplo:
```cmd
src/
├── routes/
│   ├── +layout.svelte  # Layout que se comparte entre las páginas de esta ruta
│   ├── index.svelte    # Página en la ruta raíz
│   ├── about/
│   │   └── +page.svelte # Otra página con el mismo layout
```

Un ejemplo de archibo `+layout.svelte`:
```js
<!-- +layout.svelte -->
<nav>
  <!-- Barra de navegación que estará en todas las páginas -->
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<slot />
<!-- Aquí se renderizan las páginas individuales -->
```

Cuando navegamos entre index.svelte y about/+page.svelte, el layout (barra de navegación) se mantiene, pero solo el contenido específico de la página dentro del `<slot />` cambia.


### Layouts anidados
SvelteKit permite tener layouts anidados, lo que significa que podemos tener un layout global que envuelva a otros layouts más específicos para ciertas secciones de nuestra aplicación.
```cmd
src/
├── routes/
│   ├── +layout.svelte   # Layout global
│   ├── admin/
│   │   ├── +layout.svelte  # Layout específico para la sección 'admin'
│   │   ├── dashboard.svelte
│   │   ├── users.svelte
```

En este caso, el layout `admin/+layout.svelte` envuelve a las páginas `dashboard.svelte` y `users.svelte`, y a su vez, `admin/+layout.svelte` se envuelve en el layout global `+layout.svelte`.


### +layout.svelte
Si queremos crear un diseño que se aplique a todas las páginas de nuestra aplicación, podemos hacerlo creando un archivo llamado src/routes/+layout.svelte. Este archivo define el diseño general de nuestra aplicación y se aplica a todas las páginas de la aplicación.

Estructura del diseño predeterminado (el que usa SvelteKit si no usas uno propio):
```js
<slot></slot>
```

Este código esencialmente dice: "Aquí es donde se renderizará el contenido de cada página". El `<slot></slot>` es un espacio reservado para el contenido dinámico de las páginas individuales.

En Svelte, <slot></slot> y <slot /> son equivalentes. Ambos son una forma de definir un "slot" o espacio reservado en el componente donde se insertará contenido dinámico.

### Nota: ¿Qué es `<slot />`?
- En el contexto de Svelte, `<slot />` es un marcador de posición especial que se utiliza para definir dónde debe insertarse el contenido dinámico dentro de un componente. Cuando un componente que tiene un `<slot />` es utilizado, el contenido que se pasa a ese componente será "insertado" en el lugar donde se encuentra el `<slot />`.
- En el contexto del layout en SvelteKit, el `<slot />` en un archivo `+layout.svelte` indica dónde se debe renderizar el contenido de la página específica (es decir, el contenido del `+page.svelte` correspondiente) dentro de ese layout.


+layot.svelte
```js
<nav>
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>

<footer>© 2024 - Mi Sitio</footer>

<!-- Este es el lugar donde se insertará el contenido de cada página -->
<slot />
```

index.svelte: (en la ruta raíz /)
```js
<h1>Página de Inicio</h1>
<p>Bienvenido a la página principal de mi sitio web.</p>
```

about/+page.svelte: (en la ruta /about)
```js
<h1>Sobre Nosotros</h1>
<p>Este es el contenido de la página de "Sobre Nosotros".</p>
```

En este caso, el contenido de index.svelte se insertará en el lugar del `<slot />` en el layout, y el contenido de about/+page.svelte se insertará en el mismo lugar cuando se navegue a la ruta /about.


### +layout.js
El archivo `+layout.js` (o `+layout.ts` si usamos TypeScript) es el encargado de manejar la lógica asociada a los layouts de nuestra aplicación. Mientras que el archivo +layout.svelte define la estructura visual y el diseño que se aplica a las páginas, el archivo `+layout.js` se usa para gestionar datos, realizar lógica del lado del servidor (o cliente) y pasar información a todas las páginas que usan ese layout.

`+layout.js` exporta funciones para personalizar el comportamiento del layout. Por ejemplo, podemos exportar una función `load` para cargar datos que se utilizan en el layout, o una función `actions` para manejar eventos específicos del layout.

Ejecución de la función load() en `+layout.js`:
- Se ejecuta automáticamente cuando una página o un layout que utiliza ese archivo es cargado.
- Permite obtener y pasar datos al layout o a las páginas hijas. Los datos cargados en un `+layout.js` están disponibles no solo en el layout, sino también en todas las páginas hijas. Esto significa que si tenemos varias páginas bajo el mismo layout, podemos acceder a los mismos datos sin necesidad de hacer múltiples solicitudes.
- Puede hacer lógica del lado del servidor o del cliente, como solicitar datos de una API o acceder a cookies, información de sesión, etc.
- Es útil para compartir datos comunes entre múltiples páginas que dependen del mismo layout, como información del usuario, autenticación, o configuraciones globales.


Caso de uso típico:
- Autenticación de usuario: Podemos verificar si un usuario está autenticado y pasar esa información al layout y a las páginas hijas para mostrar diferentes opciones de navegación o contenido.
- Configuración global: Si tenemos configuraciones globales que deben estar disponibles en varias partes de la aplicación, podemos cargarlas en `+layout.js`.
- Datos compartidos: Podemos hacer que ciertos datos, como un carrito de compras o preferencias del usuario, estén disponibles en toda la aplicación.



https://kit.svelte.dev/docs/routing


### +layout.server.js
El archivo `+layout.server.js` (o +layout.server.ts si usamos TypeScript) es similar a `+layout.js`, pero está diseñado específicamente para ejecutar lógica en el servidor. Esto significa que cualquier código dentro de `+layout.server.js` solo se ejecutará en el servidor, lo cual es útil cuando necesitamos acceder a recursos o datos sensibles, como bases de datos, sesiones, archivos o cualquier otra cosa que no debería estar expuesta al cliente.

El archivo +layout.server.js nos permite realizar tareas relacionadas con la carga de datos que deben ejecutarse de forma segura y controlada desde el lado del servidor. Usos comunes:
- Acceso a bases de datos: Si necesitamos consultar una base de datos directamente, podemos hacerlo en `+layout.server.js` porque este archivo no se ejecutará en el navegador del cliente.
- Autenticación segura: Podemos verificar la autenticación del usuario, manejar tokens o sesiones de forma segura.
- Acceso a recursos protegidos: Cualquier lógica o dato que no debería estar expuesto al cliente (como claves de API o credenciales) puede gestionarse en este archivo.