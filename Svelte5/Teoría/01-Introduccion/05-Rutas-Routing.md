
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
    - **`+page.svelte`:** Cualquier archivo `+page.svelte` dentro de `src/routes/` corresponde a una página. En SvelteKit, un archivo con el nombre `+page.svelte` dentro de una carpeta de rutas representa el componente principal para esa página en particular. SvelteKit lo renderiza cuando el usuario navega a esa ruta. Este archivo define el contenido que se mostrará en la ruta correspondiente. Si está en la carpeta raíz (`/routes/+page.svelte`), esta sería la página principal de nuestra aplicación, que probablemente se cargue cuando un usuario accede a la URL raíz (`/`).
    - **`src/routes/about/+page.svelte:`** Define la ruta /about.
    - **`src/routes/contact/+page.svelte:`** Define la ruta /contact.

- **Rutas dinámicas:** Los nombres de carpeta entre corchetes (`[ ]`) representan rutas dinámicas.
    - `src/routes/[id]/+page.svelte:` Define una ruta dinámica con un parámetro llamado id ("/:id"). Como por ejemplo, /123 o /product.
    - `src/routes/blog/[slug]/+page.svelte:` Define una ruta dinámica con un parámetro `slug` en el contexto del blog ("`/blog/:slug`"). Se puede usar para cargar datos dinámicamente cuando un usuario solicita una página como `/blog/hello-world`.

- **Subrutas:** Las subrutas pueden ser creadas anidando carpetas dentro de src/routes/.
    - **`src/routes/blog/new/+page.svelte:`** Define la ruta `/blog/new`.
    - **`src/routes/blog/[slug]/+page.svelte:`** Define la ruta `/blog/:slug`.

- **Layouts:** Podemos tener layouts específicos dentro de subdirectorios si se necesitan.
    - **`+layout.svelte:`** Los archivos +layout.svelte son plantillas que se comparten entre múltiples rutas. Puedes tener layouts a nivel raíz o específicos para ciertas subrutas.
    - **`src/routes/+layout.svelte:`** Define el layout general para todas las páginas de la aplicación.


## Reglas generales:
- **Enrutamiento automático:** SvelteKit gestiona el enrutamiento basándose en la estructura de directorios y archivos dentro de routes. Un archivo `+page.svelte` es automáticamente una página de la aplicación, y SvelteKit la muestra cuando se navega a la ruta correspondiente.

- **El `+`:** es una convención para marcar archivos que tienen un propósito especial dentro de las rutas de SvelteKit. Estos archivos pueden ser responsables de manejar páginas, funciones del servidor, o layouts, y la ubicación de estos archivos en el directorio `routes` define qué URL manejarán. Tipos de archivos con el prefijo `+`:

    - `+page.svelte`: Define el contenido de una página.
    - `+page.server.js | +page.server.ts`: Este archivo **contiene lógica del lado del servidor** para manejar la carga de datos o acciones para la página correspondiente (como manejar formularios). Aquí podemos definir la `función load` para cargar datos desde el servidor o manejar solicitudes como POST para esa página.
    - `+layout.svelte`: Define un layout compartido para varias páginas. Proporciona una estructura envolvente (como un encabezado o pie de página) que será común a todas las rutas bajo ese directorio.
    - `+layout.server.js | +layout.server.ts`: Contiene lógica del servidor para manejar la carga de datos o acciones a nivel de layout. Aquí podemos manejar la carga de datos o acciones, pero para un layout, aplicando los datos a todas las páginas que comparten el layout.
    - `+server.js | +server.ts`: Se usa para **manejar rutas API o puntos finales en el servidor**. Define rutas API como GET, POST, PUT, etc. Estas rutas no están asociadas con la renderización de una página, sino que manejan la lógica de servidor para datos o acciones.
    - `+error.svelte`: Renderiza una página de error personalizada para una ruta específica. Si ocurre un error en esa ruta, SvelteKit mostrará esta página en lugar de la página de error predeterminada.
  

- **`+prefijo`:** Cada directorio de ruta contiene uno o más archivos de ruta, que pueden identificarse por su `+prefijo`. Si el archivo está ubicado en `/routes/+page.svelte**, la página será accesible desde la ruta `/`. Si el archivo estuviera en `/routes/about/+page.svelte`, representaría el contenido de la página que se muestra cuando un usuario navega a la ruta `/about`.
  
- **Cada archivo `+page.svelte` en la estructura del directorio representa una página en nuestra aplicación.**

- **Los directorios entre corchetes (`[ ]`) crean rutas dinámicas que capturan valores específicos de la URL.**
  
- **Los archivos `+layout.svelte` son plantillas comunes** para organizar el diseño compartido entre varias páginas. Ejemplos: La ruta `/about`:
    
    Se genera a partir del archivo `src/routes/about/+page.svelte`.  
    Si tenemos un archivo `src/routes/+layout.svelte`, este envolverá el contenido de la página `/about`.

- **Ruta `/blog/:slug`:**
    Se genera a partir de `src/routes/blog/[slug]/+page.svelte`, donde `slug` es dinámico.
    Por ejemplo, `/blog/my-first-post`.

- **Ruta dinámica `/:id`:**
    Se genera a partir de `src/routes/[id]/+page.svelte`.
    Esto puede capturar valores dinámicos en la URL, como `/123`, `/user`, etc.

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


```sveltehtml
// src/routes/blog/[slug]/+page.svelte
<script>
	/** @type {import('./$types').PageData} */
	export let data;
</script>

<h1>{data.title}</h1>
<div>{@html data.content}</div>
```

## +page.js
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

```js
/** @type {import('./$types').LayoutLoad} */
export function load() {
    return {
        sections: [
            { slug: 'profile', title: 'Profile' },
            { slug: 'notifications', title: 'Notifications' }
        ]
    };
}
```

Ejecución de la función load() en `+layout.js`:
- Se ejecuta automáticamente cuando una página o un layout que utiliza ese archivo es cargado.
- Permite obtener y pasar datos al layout o a las páginas hijas. Los datos cargados en un `+layout.js` están disponibles no solo en el layout, sino también en todas las páginas hijas. Esto significa que si tenemos varias páginas bajo el mismo layout, podemos acceder a los mismos datos sin necesidad de hacer múltiples solicitudes.
- Puede hacer lógica del lado del servidor o del cliente, como solicitar datos de una API o acceder a cookies, información de sesión, etc.
- Es útil para compartir datos comunes entre múltiples páginas que dependen del mismo layout, como información del usuario, autenticación, o configuraciones globales.


Caso de uso típico:
- Autenticación de usuario: Podemos verificar si un usuario está autenticado y pasar esa información al layout y a las páginas hijas para mostrar diferentes opciones de navegación o contenido.
- Configuración global: Si tenemos configuraciones globales que deben estar disponibles en varias partes de la aplicación, podemos cargarlas en `+layout.js`.
- Datos compartidos: Podemos hacer que ciertos datos, como un carrito de compras o preferencias del usuario, estén disponibles en toda la aplicación.



### +layout.server.js
El archivo `+layout.server.js` (o +layout.server.ts si usamos TypeScript) es similar a `+layout.js`, pero está diseñado específicamente para ejecutar lógica en el servidor. Esto significa que cualquier código dentro de `+layout.server.js` solo se ejecutará en el servidor, lo cual es útil cuando necesitamos acceder a recursos o datos sensibles, como bases de datos, sesiones, archivos o cualquier otra cosa que no debería estar expuesta al cliente.

El archivo +layout.server.js nos permite realizar tareas relacionadas con la carga de datos que deben ejecutarse de forma segura y controlada desde el lado del servidor. Usos comunes:
- Acceso a bases de datos: Si necesitamos consultar una base de datos directamente, podemos hacerlo en `+layout.server.js` porque este archivo no se ejecutará en el navegador del cliente.
- Autenticación segura: Podemos verificar la autenticación del usuario, manejar tokens o sesiones de forma segura.
- Acceso a recursos protegidos: Cualquier lógica o dato que no debería estar expuesto al cliente (como claves de API o credenciales) puede gestionarse en este archivo.


## +server
El archivo `+server.js` (o `+server.ts` si usamos TypeScript) es un archivo especial que se ejecuta solo en el servidor. Esto significa que cualquier código que pongamos en `+server.js` no se enviará al cliente, lo que lo hace ideal para tareas que deben ejecutarse en el servidor, como acceder a bases de datos, interactuar con el sistema de archivos, o realizar operaciones que no deben ser visibles para el cliente.

En SvelteKit, el archivo +server.js nos permite definir rutas API o puntos finales donde podemos manejar directamente las solicitudes HTTP (GET, POST, etc.) y tener un control total sobre la respuesta que enviamos de vuelta al cliente. Estas rutas no están asociadas a páginas HTML, sino que son puntos de acceso para realizar operaciones como obtener o enviar datos desde el servidor.

### ¿Qué es +server.js?
+server.js: Es un archivo que podemos colocar en cualquier ruta dentro de tu aplicación SvelteKit para manejar solicitudes HTTP directamente (sin pasar por un componente .svelte).
Este archivo exporta funciones para cada uno de los métodos HTTP como GET, POST, PUT, PATCH, DELETE, OPTIONS, y HEAD.
Cada una de estas funciones recibe un RequestEvent, que proporciona información sobre la solicitud que se ha hecho (como los parámetros, el cuerpo de la solicitud, las cookies, etc.) y devuelve un Response para enviar de vuelta al cliente.

### Ejemplo básico de +server.js
Supongamos que queremos crear una API que maneje solicitudes GET y POST en una ruta /api/data.

```cmd
src/
└── routes/
    └── api/
        └── data/
            └── +server.js
```

Código en +server.js:
```js
// Maneja solicitudes GET
export async function GET({ request }) {
  // Aquí podemos devolver datos, como un JSON
  return new Response(JSON.stringify({ message: 'Este es un GET' }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}

// Maneja solicitudes POST
export async function POST({ request }) {
  // Obtener el cuerpo de la solicitud POST
  const body = await request.json();

  // Procesar los datos y devolver una respuesta
  return new Response(JSON.stringify({ message: 'Datos recibidos', data: body }), {
    headers: { 'Content-Type': 'application/json' },
    status: 201
  });
}
```

1. Manejador GET. Get handler:
- La función GET se ejecuta cuando alguien hace una solicitud GET a /api/data.
- La respuesta es un objeto JSON con un mensaje que se envía de vuelta al cliente.

2. Manejador POST. Post handler:
- La función POST se ejecuta cuando alguien hace una solicitud POST a /api/data.
- Obtenemos el cuerpo de la solicitud con `request.json()`, procesamos los datos y enviamos de vuelta una respuesta JSON con los datos recibidos.

### El objeto RequestEvent
Cada función en +server.js recibe un RequestEvent como argumento. Este objeto contiene toda la información de la solicitud, como:
- `request`: La solicitud entrante, que podemos usar para obtener datos como el cuerpo, las cabeceras, la URL, etc.
- `params`: Los parámetros de la ruta (si la ruta contiene variables dinámicas).
- `cookies`: Para acceder y modificar cookies.
- `url`: La URL completa de la solicitud.

Ejemplo con parámetros de URL y cookies:
```js
export async function GET({ params, cookies }) {
  const userId = params.id;  // Obtener un parámetro dinámico de la URL
  const sessionId = cookies.get('session_id');  // Leer una cookie llamada session_id

  return new Response(JSON.stringify({ userId, sessionId }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}
```

### Uso común de +server.js
- Crear APIs: Es ideal para crear rutas API que interactúan con la base de datos, manejan autenticación, o cualquier otra lógica del servidor.
- Manejo de formularios: Podemos manejar solicitudes POST que provienen de formularios de nuestra aplicación.
- Redirecciones: Podemos redirigir a los usuarios después de procesar una solicitud.
- CRUD: Realizar operaciones CRUD (Crear, Leer, Actualizar, Eliminar) usando métodos HTTP como POST, GET, PUT, PATCH, y DELETE.


### Respuestas HTTP
Cada función en +server.js debe devolver un objeto Response, que es la respuesta que se enviará de vuelta al cliente. Este objeto Response puede contener:
- `body`: El cuerpo de la respuesta, que puede ser un objeto, una cadena de texto, un ArrayBuffer, un Blob, etc.
    ```js
    return new Response('Hola, mundo!', { status: 200 });
    ```
- `headers`: Las cabeceras de la respuesta, que pueden incluir información como el tipo de contenido, la longitud del contenido, etc.
  ```js
  return new Response(JSON.stringify({ message: 'Hola' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
  });
  ```
- `status`: El código de estado HTTP es una parte importante de la respuesta. Valores comunes son 200 para éxito, 404 para no encontrado, y 500 para errores internos del servidor.
    ```js
    return new Response('Hola, mundo!', { status: 200 });
    ```
- `ok`: Un booleano que indica si la respuesta fue exitosa (códigos de estado 200-299).
- `clone()`: Una función para clonar la respuesta.
- `error()`: Una función para crear una respuesta de error.
- `redirect()`: Una función para redirigir la solicitud a otra URL.
- `arrayBuffer()`: Una función para leer el cuerpo de la respuesta como un ArrayBuffer.
- `blob()`: Una función para leer el cuerpo de la respuesta como un Blob.
- `formData()`: Una función para leer el cuerpo de la respuesta como FormData.
- `json()`: Una función para leer el cuerpo de la respuesta como JSON.
- `text()`: Una función para leer el cuerpo de la respuesta como texto.
- `get()`: Una función para obtener un encabezado de la respuesta.
- `has()`: Una función para verificar si la respuesta tiene un encabezado específico.
- `set()`: Una función para establecer un encabezado en la respuesta.
- `delete()`: Una función para eliminar un encabezado de la respuesta.
- `forEach()`: Una función para iterar sobre todos los encabezados de la respuesta.
    ```js
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('X-Custom-Header', 'valor');

    return new Response(JSON.stringify({ data: 'Ejemplo' }), { headers });
    ```

Ejemplo:
```js
return new Response('Cuerpo de la respuesta', {
  status: 200,
  headers: { 'Content-Type': 'text/plain' }
});
```

### Ejemplo práctico con varias rutas:
- GET: Para obtener un recurso (por ejemplo, /api/users).
- POST: Para crear un nuevo recurso (por ejemplo, enviar datos de un formulario).
- DELETE: Para eliminar un recurso (por ejemplo, /api/users/123).


```js
// Obtener todos los usuarios
export async function GET({ request }) {
  const users = await getUsersFromDB();  // Función simulada para obtener usuarios
  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' }
  });
}

// Crear un nuevo usuario
export async function POST({ request }) {
  const data = await request.json();
  await createUserInDB(data);  // Función simulada para crear un usuario
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
    status: 201
  });
}

// Eliminar un usuario
export async function DELETE({ params }) {
  const userId = params.id;
  await deleteUserFromDB(userId);  // Función simulada para eliminar un usuario
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}
```

## Recibiendo datos en +server.js

Al exportar los manejadores (handlers) POST/ PUT/ PATCH/ DELETE/ OPTIONS/ HEAD, `+server.js` los archivos se pueden usar para crear una API completa:

Ejemplo src/rutas/agregar/+pagina.svelte:
```js
<script>
	let a = 0;
	let b = 0;
	let total = 0;

	async function add() {
		const response = await fetch('/api/add', {
			method: 'POST',
			body: JSON.stringify({ a, b }),
			headers: {
				'content-type': 'application/json'
			}
		});

		total = await response.json();
	}
</script>

<input type="number" bind:value={a}> +
<input type="number" bind:value={b}> =
{total}

<button on:click={add}>Calculate</button>
```

Ejemplo src/rutas/api/add/+server.js:
```js
import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }) {
    const { a, b } = await request.json();
    return json(a + b);
}
```

>![Important]  
> En general, las acciones de formulario son una mejor manera de enviar datos desde el navegador al servidor.  
> 
> En lugar de usar fetch, podemos enviar datos de formulario con un formulario HTML normal y manejarlos en +server.js.

> Las acciones de formulario manejan automáticamente la serialización de datos y la configuración de encabezados, y también manejan errores de red y validación de formulario.
> 
> Sin embargo, fetch es útil cuando necesitamos enviar datos de forma programática o cuando necesitamos más control sobre la solicitud.


> En el ejemplo anterior, fetch se usa para enviar datos de forma programática a la ruta /api/add, donde se manejan en +server.js.  
> 
> La función POST en +server.js recibe los datos enviados desde el navegador, los procesa y devuelve el resultado al navegador. En este caso, la función POST en +server.js simplemente suma dos números y devuelve el resultado.
> 
> El resultado se muestra en la página web en tiempo real, sin necesidad de recargar la página.
> 
> Este es un ejemplo simple de cómo podemos usar +server.js para manejar solicitudes POST y devolver resultados al navegador.


### Negociación de Contenidos en SvelteKit: +server.js y +page.svelte
En SvelteKit, podemos tener tanto un archivo +server.js como un archivo +page.svelte en el mismo directorio para manejar diferentes tipos de solicitudes a la misma ruta. Esto permite que una ruta pueda funcionar como página (para ser visualizada en el navegador) o como punto final de API (para manejar datos). El proceso de negociación de contenidos es lo que determina cómo se maneja cada solicitud según el método HTTP y los headers (encabezados) de la solicitud.

#### ¿Cómo SvelteKit decide si una solicitud debe ser manejada por `+server.js` o `+page.svelte`?
1. Rutas y archivos: `+server.js` y `+page.svelte`.  
   Cuando tenemos tanto un archivo `+server.js` como un archivo `+page.svelte` en la misma ruta, SvelteKit decide cuál manejará la solicitud en función del método HTTP y de los encabezados Accept de la solicitud.
    - `+server.js`: Se usa para manejar rutas API o solicitudes no relacionadas directamente con la interfaz de usuario (por ejemplo, una solicitud de datos en formato JSON o una acción en el servidor como PUT, DELETE).
    - `+page.svelte`: Maneja las solicitudes que requieren renderizar una página HTML (por ejemplo, cuando un navegador hace una solicitud GET para visualizar una página).

2. Reglas para determinar cómo se maneja la solicitud: SvelteKit aplica las siguientes reglas para decidir si la solicitud debe ser manejada por +server.js o por la página:
   - Métodos PUT / PATCH / DELETE / OPTIONS:
     - Las solicitudes que usan estos métodos siempre serán manejadas por `+server.js`, ya que estos métodos están generalmente asociados con operaciones CRUD (actualizar, eliminar) o consultas de preconfiguración como OPTIONS.
     - Ejemplo: Si hacemos una solicitud PUT o DELETE a una ruta, SvelteKit la manejará en `+server.js` porque estas solicitudes no están relacionadas con la carga de una página HTML.
    
    ```js
    // +server.js
    export async function DELETE() {
        // Maneja la eliminación de un recurso
        return new Response('Recurso eliminado', { status: 200 });
    }
    ```

    - Métodos GET / POST / HEAD:
        - Si el header Accept de la solicitud prioriza text/html (es decir, el cliente espera una página HTML, como lo haría un navegador), la solicitud se trata como una solicitud de página y se manejará por `+page.svelte`.
        - Si el header Accept prioriza otros tipos de contenido (por ejemplo, application/json), la solicitud será manejada por `+server.js` como un punto final de API.
        - Esto significa que:
          - Las solicitudes de página del navegador (como visitar una URL en el navegador) serán manejadas por `+page.svelte`. 
          - Las solicitudes de datos (como una solicitud GET o POST para obtener o enviar datos) serán manejadas por `+server.js` si el header Accept no incluye text/html como prioridad.

    Solicitudes de página (GET para ver una página HTML):
    ```js
    <!-- +page.svelte -->
    <h1>Página de ejemplo</h1>
    <p>Este es un ejemplo de página HTML.</p>
    ```
    
    Solicitudes de API (GET para obtener datos en formato JSON):
    ```js
    // +server.js
    export async function GET() {
        const data = { message: 'Esta es una respuesta JSON' };
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' },
            status: 200
        });
    }
    ```
       
3. Encabezado `Vary: Accept` en las respuestas GET: Cuando SvelteKit maneja una solicitud GET que puede devolver diferentes tipos de contenido (por ejemplo, HTML o JSON), agrega un header Vary: Accept a la respuesta.
    El encabezado Vary le dice a los servidores proxy y a los navegadores que el contenido de la respuesta puede variar según el valor del header Accept de la solicitud.


#### Ejemplo completo con +server.js y +page.svelte en la misma ruta
Estructura de archivos:
```cmd
src/routes/
└── api/
    └── users/
        ├── +server.js  (maneja API)
        └── +page.svelte (maneja página HTML)
```

Código en +server.js (para solicitudes API):
```js
// src/routes/api/users/+server.js

// Maneja solicitudes GET (API)
export async function GET() {
  const users = [{ id: 1, name: 'Juan' }, { id: 2, name: 'Ana' }];
  return new Response(JSON.stringify(users), {
    headers: { 'Content-Type': 'application/json' },
    status: 200
  });
}

// Maneja solicitudes DELETE
export async function DELETE() {
  // Código para eliminar un usuario
  return new Response('Usuario eliminado', { status: 200 });
}
```

Código en +page.svelte (para solicitudes de página):
```sveltehtml
<!-- src/routes/api/users/+page.svelte -->

<script>
  export let data;
</script>

<h1>Lista de usuarios</h1>
<p>Esta es una página que muestra usuarios en HTML.</p>

<ul>
  {#each data as user}
    <li>{user.name}</li>
  {/each}
</ul>
```

Flujo de cómo SvelteKit maneja las solicitudes:
- Solicitud GET desde un navegador:
    - Si visitamos /api/users en el navegador, el header Accept priorizará text/html, y SvelteKit servirá la página HTML (+page.svelte).
- Solicitud GET desde una API (fetch, Postman, etc.):
    - Si hacemos una solicitud GET a /api/users con un header Accept: application/json, SvelteKit devolverá la respuesta de `+server.js` en formato JSON.
  - Solicitud DELETE desde un cliente:
    - Si enviamos una solicitud DELETE a /api/users, será manejada directamente por `+server.js`, ya que las solicitudes DELETE siempre son manejadas por `+server.js`.


## $types
En SvelteKit, cuando usamoss TypeScript o JavaScript con anotaciones de tipo JSDoc, podemos aprovechar los tipos generados automáticamente para asegurarnos de que los datos y funciones tienen los tipos correctos. Estos tipos se generan en un archivo llamado `$types.d.ts`, que es creado por SvelteKit en un directorio oculto para ayudarnos a mejorar la seguridad de tipos en la aplicación.

### ¿Qué es $types.d.ts?
- SvelteKit genera un archivo `$types.d.ts` en el que define todos los tipos que podemos usar en nuestro proyecto.
- Este archivo contiene tipos que SvelteKit crea automáticamente para nosotros en función de las rutas, los parámetros y los datos que se devuelven en las funciones load.
- Aunque no lo veamos directamente en el proyecto, SvelteKit se asegura de que nuestro editor de código (como VS Code) tenga acceso a estos tipos para ofrecerte autocompletado y verificación de tipos.


### Importar datos desde `$types.d.ts`:
- Podemos importar tipos de `$types.d.ts` para asegurarnos de que los datos que estamos utilizando en nuestra aplicación tengan los tipos correctos.
- Importamos los tipos desde el archivo generado `$types.d.ts` utilizando la ruta `./$types`.

```js
<script>
  /** @type {import('./$types').PageData} */
  export let data;
</script>
```

- `import('./$types').PageData`: Este es el tipo generado automáticamente para los datos devueltos desde la función `load` en el archivo `+page.server.js`.
- `export let data`: Usamos este tipo para asegurarnos de que `data` tenga la forma correcta y los campos esperados. Aquí estamos usando el tipo `PageData` para asegurarnos de que `data` contiene exactamente los datos que esperamos, basados en lo que la función `load` devuelve.

### Tipos comunes generados por SvelteKit:
- PageData: El tipo que describe los datos que se inyectan en +page.svelte a través de la función load.
- PageLoad y PageServerLoad: Tipos que aseguran que la función load en archivos como +page.js o +page.server.js esté correctamente tipada.
- LayoutData: Similar a PageData, pero para datos inyectados en un archivo +layout.svelte.
- LayoutLoad y LayoutServerLoad: Tipos que aseguran que las funciones load en +layout.js y +layout.server.js tienen los tipos correctos.


## Otros Archivos
SvelteKit ignora cualquier otro archivo dentro de un directorio de ruta. Esto significa que puedes colocar componentes y módulos de utilidad con las rutas que los necesitan.

Si varias rutas necesitan componentes y módulos, es una buena idea colocarlos en $lib.