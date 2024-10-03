El SSR (Server-Side Rendering) en SvelteKit es una **característica nativa que permite que las páginas se generen en el servidor antes de ser enviadas al cliente. Esto mejora la velocidad de carga inicial y la optimización para motores de búsqueda (SEO), ya que el HTML pre-renderizado está disponible inmediatamente en lugar de esperar que el JavaScript se ejecute en el navegador.**

## Esquema de SSR (Server-Side Rendering) en SvelteKit
```css
1. Cliente (navegador)                        Servidor (SvelteKit App)   |
     |                                                                   |
     |   (Solicitud HTTP inicial)                                        |
     |  ----------------------->                                         |
     |                                                                   |
2. Servidor procesa la solicitud                                         |
     |                                                                   |
     |   - Ejecuta lógica de pre-renderizado                             |
     |   - Recupera datos desde APIs, BBDD, etc.                         |
     |                                                                   |
3. Renderizado en el servidor                                            |
     |   - Genera HTML con datos                                         |
     |   - Inserta los datos en la plantilla HTML                        |
     |                                                                   |
     |   (Respuesta con HTML renderizado)                                |
     |  <-----------------------                                         |
     |                                                                   |
4. Cliente recibe HTML pre-renderizado                                   |
     |   - HTML es visible inmediatamente                                |
     |   - Se descarga el JavaScript para la interacción dinámica        |
     |                                                                   |
     |   (Hidratación del DOM: convierte el HTML estático en interactivo)|
     |                                                                   |
     |                                                                   |
```

## Explicación de los pasos:
- **Solicitud del cliente (navegador):** Cuando un usuario visita una página en una aplicación SvelteKit con SSR habilitado, el navegador envía una solicitud HTTP al servidor (por ejemplo, cuando accede a una URL como /about).
- **Servidor procesa la solicitud:** El servidor SvelteKit intercepta la solicitud y comienza a procesarla. Durante este proceso, puede ejecutar lógica personalizada, como recuperar datos desde APIs, bases de datos o servicios externos. Esta lógica de carga de datos típicamente se maneja en la función `load()` en los componentes de SvelteKit, que se ejecuta en el servidor durante SSR.
- **Renderizado en el servidor:** SvelteKit usa los datos obtenidos y renderiza la página en el servidor, generando el HTML completo. Esta versión renderizada del HTML ya contiene todo el contenido necesario (como los datos que se obtuvieron). El servidor responde al cliente con este HTML pre-renderizado.
- **Cliente recibe HTML pre-renderizado:** El navegador recibe el HTML y lo muestra inmediatamente, proporcionando una carga más rápida y mejor SEO, ya que el contenido es visible sin depender del JavaScript. Mientras el usuario ve la página, el JavaScript asociado se descarga y ejecuta en segundo plano.
- **Hidratación:** Después de que el JavaScript se carga, Svelte "hidrata" el DOM. Esto significa que el HTML estático se convierte en interactivo, permitiendo la interacción dinámica en la página (por ejemplo, formularios, botones, etc.).

## Función load() en SvelteKit
Para gestionar la carga de datos necesarios para SSR, SvelteKit ofrece la función `load()`, que se ejecuta en el servidor cuando se solicita una página.

```js
// src/routes/about/+page.js
export async function load({ fetch }) {
    const response = await fetch('/api/some-data');
    const data = await response.json();
    
    return {
        props: { data }
    };
}
```

Esta función puede recuperar datos desde APIs externas o endpoints internos. Los datos obtenidos en la función load() se utilizan para renderizar el HTML en el servidor antes de enviarlo al cliente.

## Beneficios de SSR en SvelteKit:
- **Mejora del SEO:** Los motores de búsqueda pueden acceder al contenido pre-renderizado, mejorando el SEO.
- **Velocidad inicial:** El contenido de la página está disponible más rápido ya que el HTML se entrega directamente al navegador.
- **Optimización para dispositivos lentos:** Los usuarios en dispositivos más lentos o con conexiones pobres obtienen una mejor experiencia porque no tienen que esperar a que se cargue el JavaScript.

## Opciones de control de SSR
SvelteKit permite habilitar o deshabilitar el SSR a nivel global o por página específica usando las configuraciones en el archivo `svelte.config.js` o dentro de la función `load()` en los archivos de página. Puedes personalizar cuándo y cómo se habilita el SSR.

Ejemplo de configuración de SSR:
```js
// svelte.config.js
export default {
  kit: {
    ssr: true, // Habilita o deshabilita SSR a nivel global
  }
};
```

