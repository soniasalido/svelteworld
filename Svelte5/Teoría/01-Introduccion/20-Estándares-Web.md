

SvelteKit, en lugar de crear nuevas API propietarias o métodos únicos para hacer las cosas, se basa en las API web estándar ya disponibles en el desarrollo web moderno. 

# 1. Uso de APIs Web Estándar
Veremos referencias a las API web estándar sobre las que se basa SvelteKit: SvelteKit se construye sobre las mismas tecnologías web que ya estamos acostumbrados a usar (por ejemplo, Fetch API, DOM API, etc.). Estas APIs ya están integradas en los navegadores modernos y permiten una fácil adopción para desarrolladores con experiencia previa en desarrollo web.

En lugar de crear soluciones completamente nuevas o personalizadas para la funcionalidad del framework, SvelteKit aprovecha las soluciones estándar que ya existen en la "plataforma" (es decir, en el navegador y entornos de ejecución modernos). Esto implicará que no tenemos que aprender formas nuevas y complicadas de hacer las cosas. Por ejemplo, si ya conocemos las API estándar de la web, como fetch, localStorage, o la manipulación del DOM, podemos aplicar esos conocimientos al usar SvelteKit sin necesidad de aprender cosas completamente nuevas.

En entornos basados en Node.js (por ejemplo, AWS Lambda), donde algunas de estas APIs web aún no son compatibles de manera nativa, SvelteKit utiliza polyfills. Un polyfill es un fragmento de código que añade soporte para una funcionalidad que un entorno no tiene de manera nativa, para asegurarse de que la aplicación funcione de manera consistente.

Node.js está evolucionando y añadiendo soporte para más estándares web, lo que significa que en el futuro se necesitarán menos polyfills para ejecutar aplicaciones basadas en APIs web estándar en Node.

## 1.1 Fetch APIs
Fetch API es una interfaz moderna para realizar solicitudes HTTP en JavaScript. Es una alternativa más poderosa y flexible a XMLHttpRequest, y es compatible con Promesas, lo que facilita el manejo de solicitudes asíncronas.

SvelteKit utiliza la Fetch API para manejar solicitudes de red tanto en el servidor como en el navegador, además de proporcionar detalles sobre cómo usarla en varias situaciones específicas dentro del framework.

SvelteKit utiliza la API de fetch estándar de JavaScript para obtener datos desde la red, tanto en el lado del servidor como en el lado del cliente (navegador). La función fetch permite hacer solicitudes HTTP para recuperar recursos como datos JSON de una API o archivos.

### La función fetch está disponible en diferentes partes de una aplicación SvelteKit:
- **Hooks:** Son funciones que podemos usar para interceptar y manejar solicitudes antes de que lleguen a nuestra aplicación.
- **Rutas del servidor (+server.js):** Son archivos donde podemos definir controladores para manejar solicitudes HTTP.
- **Navegador:** Además de usar fetch en el servidor, también lo podemos usar en el cliente para hacer solicitudes desde el navegador.


### SvelteKit ofrece una versión especial de fetch cuando hacemos solicitudes dentro de:
- **Funciones load:** Estas funciones se ejecutan antes de que una página o componente se renderice, permitiendo recuperar datos de forma anticipada.
- **Hooks del servidor:** Son funciones que permiten modificar las solicitudes antes de que lleguen a las rutas o el cliente.
- **Rutas API:** Son archivos del servidor donde definimos las respuestas a las solicitudes HTTP, como GET o POST.


Cuando SvelteKit está haciendo renderizado del lado del servidor (SSR), esta versión especial de fetch permite hacer solicitudes sin realizar realmente una llamada HTTP a través de la red. Esto significa que **podemos invocar directamente las rutas de nuestra API sin necesidad de hacer una solicitud de red "real", lo que mejora el rendimiento.** Además, puede preservar credenciales como cookies o cabeceras de autorización.


Normalmente, cuando hacemos una solicitud desde el servidor, necesitamos especificar una URL completa (como https://api.example.com). Sin embargo, con esta versión especial de fetch, podemos hacer solicitudes relativas (por ejemplo, /api/data), lo que es más conveniente y evita errores cuando cambiamos de entornos (como de desarrollo a producción).

### Fetch API: Request, Response, Headers
La Fetch API está compuesta por tres interfaces importantes que son clave para manejar solicitudes y respuestas HTTP:
- **Request:**
  - En hooks y rutas del servidor, tenemos acceso a una instancia de la clase Request a través de `event.request`. Esta instancia contiene información sobre la solicitud entrante.
  - Los métodos como `request.json()` and `request.formData()` nos permiten extraer datos de una solicitud, como los datos JSON o los datos de un formulario que fueron enviados a través de una solicitud POST.

- **Response:**
  - Cuando hacemos una solicitud fetch, obtenemos una instancia de la clase Response, que contiene los datos devueltos por el servidor. Podemos usar métodos como `response.json()` para trabajar con los datos de la respuesta.
  - La aplicación SvelteKit puede verse como un mecanismo que recibe solicitudes (Request) y devuelve respuestas (Response). Este ciclo es esencial para cualquier aplicación web.

- **Headers:**
  - La interfaz Headers nos permite acceder a las cabeceras de las solicitudes entrantes (`request.headers`) y establecer cabeceras en las respuestas que envías al cliente (`response.headers`).

### Ejemplo con Headers, Request, y Response
```js
src/routes/what-is-my-user-agent/+server.js
import { json } from '@sveltejs/kit';

/** @type {import('./$types').RequestHandler} */
export function GET({ request }) {
    // log all headers
    console.log(...request.headers);

    // create a JSON Response using a header we received
    return json({
        // retrieve a specific header
        userAgent: request.headers.get('user-agent')
    }, {
        // set a header on the response
        headers: { 'x-custom-header': 'potato' }
    });
}
```
En este ejemplo:
- Primero se imprimen todas las cabeceras (request.headers) de la solicitud recibida.
- Luego, se crea una respuesta JSON (`json()` es una función de conveniencia de SvelteKit) que incluye el valor de una cabecera específica: la cabecera `user-agent`, que contiene información sobre el navegador del usuario.
- Finalmente, se establece una cabecera personalizada ('x-custom-header': 'potato') en la respuesta.

## 1.2 FormData
FormData es una interfaz que permite construir y enviar fácilmente datos de formulario en una solicitud HTTP. Es útil para enviar datos de formulario en solicitudes POST o PUT, y es compatible con Fetch API.

Cómo manejar envíos de formularios HTML nativos en una aplicación SvelteKit utilizando la API de FormData.

FormData es una API de JavaScript que proporciona una manera fácil de construir pares clave/valor que representan los campos de un formulario y sus valores. En este caso, SvelteKit usa esta API para capturar y manejar los datos del formulario enviado mediante POST.

Algunas de las características importantes de FormData:
- Podemos obtener valores específicos de los campos de formulario mediante `formData.get()`.
- También permite trabajar con archivos.

```js
import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function POST(event) {
    const body = await event.request.formData();

    // log all fields
    console.log([...body]);
    
    return json({
        // get a specific field's value
        // name: body.get('name') ?? 'world'
    });
}
```
En este código, SvelteKit procesa los datos enviados por un formulario HTML nativo utilizando la API de FormData. Los datos se obtienen a través del objeto `event.request.formData()` en el servidor. Este código registra todos los datos enviados y devuelve una respuesta JSON con un campo específico del formulario, en este caso `name`. Si no se encuentra el campo, se utiliza un valor predeterminado ('world').

Es una forma eficiente y moderna de manejar envíos de formularios en SvelteKit, aprovechando APIs estándar de la web.


## 1.3 Stream APIs
Stream API es una API moderna que permite trabajar con flujos de datos, como leer y escribir datos de manera eficiente. Es útil para trabajar con datos grandes o en tiempo real, como la transmisión de archivos.

En Svelte, cuando trabajamos con datos que deben ser enviados o recibidos en porciones, podemos aprovechar la Stream API. Esto es especialmente útil cuando necesitamos manejar grandes cantidades de datos que no pueden cargarse en la memoria de una sola vez o cuando los datos se entregan en partes (chunks).


La Stream API es una API de JavaScript que nos permite trabajar con datos de forma incremental, a medida que se transmiten, lo que significa que no necesitamos cargar todo el contenido en memoria de una vez. Los tipos principales de streams son:
- **ReadableStream:** Nos permite leer datos en fragmentos a medida que están disponibles.
- **WritableStream:** Nos permite escribir datos en fragmentos.
- **TransformStream:** Nos permite transformar los datos entre una ReadableStream y una WritableStream.

SvelteKit, que se basa en las tecnologías estándar de la plataforma web, permite que las respuestas de los endpoints utilicen streams para enviar datos en partes. Esto se puede usar para enviar archivos grandes, generar respuestas dinámicas, o simplemente manejar datos de gran tamaño.


## 1.4 URL APIs
URL API proporciona una interfaz para trabajar con URLs, como analizar, construir y manipular URLs de manera programática. Es útil para trabajar con rutas y parámetros de URL en aplicaciones web.

La URL API es una API estándar del navegador y del entorno Node.js que proporciona una interfaz para interactuar con URLs. SvelteKit aprovecha esta API para que los desarrolladores puedan acceder a diferentes partes de la URL en distintos lugares de la aplicación, lo cual es útil para hacer redireccionamientos, obtener información sobre la ubicación actual del usuario en la aplicación, manejar la navegación y más.

Propiedades comunes de la URL API:
- **origin:** La parte de la URL que incluye el protocolo y el dominio. Ejemplo: https://example.com.
- **pathname:** La ruta del recurso dentro del dominio. Ejemplo: /about o /products/123.
- **search:** La cadena de consulta (query string) que comienza con ?. Ejemplo: ?id=123.
- **searchParams:** Un objeto que te permite acceder a los parámetros de consulta de forma más estructurada. Ejemplo: event.url.searchParams.get('id').
- **hash:** La parte de la URL después del # que se usa para anclar o marcar una posición en la página. Ejemplo: #section1.

```js
// src/routes/products/+server.js
export async function GET(event) {
  // Obtener el parámetro de consulta ?id=123
  const productId = event.url.searchParams.get('id');

  // Hacer algo con el productId, como buscar en la base de datos
  const product = await getProductById(productId);

  return new Response(JSON.stringify(product), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

En este ejemplo, SvelteKit utiliza la URL API para acceder a los parámetros de consulta de la URL en una ruta del servidor. El código extrae el parámetro de consulta id de la URL y lo utiliza para buscar un producto en la base de datos. Luego, se devuelve una respuesta JSON con los datos del producto.
- `event.url.searchParams.get('id')`: Extrae el valor del parámetro id en la URL (por ejemplo, si la URL es /products?id=123, el valor de id será 123).
- Luego, ese valor se usa para buscar un producto en la base de datos y devolverlo como respuesta JSON.

## 1.5 Web Crypto
Web Crypto API proporciona una interfaz para trabajar con operaciones criptográficas, como cifrado, descifrado, firma y verificación de datos. Es útil para aplicaciones que requieren seguridad y privacidad, como la autenticación y el cifrado de datos.

La Web Crypto API en Svelte y SvelteKit proporciona funciones criptográficas seguras directamente a través del objeto global crypto. Este API es parte del estándar de JavaScript y está diseñado para permitir operaciones criptográficas, como generar números aleatorios seguros, crear claves de cifrado y realizar firmas digitales.

En el contexto de SvelteKit, la Web Crypto API se utiliza internamente para cosas como generar encabezados de Content Security Policy (CSP), pero también está disponible para que la uses en tus propias necesidades, como la generación de UUIDs o el manejo de otras operaciones criptográficas.
