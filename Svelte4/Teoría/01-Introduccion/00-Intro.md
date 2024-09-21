# Que es Svelte
Svelte es un framework moderno para construir interfaces de usuario (User Interfaces - UI) en aplicaciones web.

## Svelte es un compilador y no y framework.
> [!Important]
> A diferencia de otros frameworks como React o Vue, Svelte se diferencia principalmente en que es un compilador y no un framework de tiempo de ejecución.

**Svelte** se comporta como un compilador que convierte el código fuente en JavaScript, HTML y CSS altamente optimizados en el momento de la construcción (build time). Cuando escribimos una aplicación en Svelte, el código se compila en un conjunto eficiente de instrucciones que interactúan directamente con el DOM. Esto significa que **no hay una biblioteca pesada ejecutándose en el navegador** que maneje actualizaciones, sino que el código generado es lo más liviano posible y realiza actualizaciones directamente en el DOM sin intermediarios.

**Frameworks de tiempo de ejecución (como React o Vue):** React y Vue, por otro lado, son frameworks de tiempo de ejecución. Esto significa que al ejecutar la aplicación en el navegador, hay una biblioteca (React o Vue) que gestiona las actualizaciones de la interfaz de usuario, manteniendo un Virtual DOM (en el caso de React) o un sistema de observación reactiva (en el caso de Vue) para decidir cuándo y cómo actualizar el DOM. Estos frameworks cargan sus bibliotecas en el navegador para manejar el ciclo de vida de los componentes, la reactividad, etc.

# Principales características de Svelte:
- **Es un Compilador. No es un framework en tiempo de ejecución:**
    - En Svelte, los componentes que escribimos son compilados en el momento de la construcción del proyecto en Jcódigo JavaScript eficiente y optimizado (build time).
    - Este código generado se encarga de actualizar el DOM de manera directa y precisa, eliminando la necesidad de una capa de abstracción como el Virtual DOM, que es común en otros frameworks.

- **Ausencia de Virtual DOM:** Svelte no utiliza un Virtual DOM. En lugar de eso, el código compilado por Svelte actualiza directamente el DOM real. Esto permite que las aplicaciones creadas con Svelte sean rápidas y eficientes, especialmente en términos de rendimiento.

- **Componentes reactivos:** La reactividad en Svelte es uno de sus aspectos más destacados. Las variables en Svelte son reactivas por defecto, lo que significa que cuando una variable cambia, cualquier parte del DOM que dependa de esa variable se actualiza automáticamente.

- **Encapsulamiento de estilos:** Los estilos en Svelte están encapsulados de manera predeterminada, lo que significa que los estilos definidos en un componente solo afectan a ese componente y no se filtran a otros, evitando así problemas de colisión de estilos.

- **Simplicidad y legibilidad:** Svelte promueve un enfoque simple y directo para la creación de componentes. No necesitas aprender mucha sintaxis nueva o conceptos complejos; puedes empezar a escribir componentes rápidamente usando HTML, CSS, y JavaScript estándar.

- **Menor tamaño de bundle:** Como Svelte compila todo en un JavaScript optimizado, el tamaño del bundle final tiende a ser más pequeño en comparación con aplicaciones similares hechas en otros frameworks que incluyen librerías grandes para su tiempo de ejecución.

- **No se arrastran librerías:** A diferencia de frameworks como React o Vue, que requieren que sus bibliotecas (React, ReactDOM, Vue) sean incluidas en la aplicación para gestionar la reactividad, el Virtual DOM, el estado y otros aspectos del framework, Svelte no necesita "arrastrar" o incluir una biblioteca adicional en el bundle final que se ejecuta en el navegador. Todo el trabajo del framework se realiza durante la compilación, y el resultado es un código muy eficiente que no depende de una biblioteca adicional.
  
- **Los componentes no se atan a versiones específicas:** Debido a que Svelte es un compilador y no una biblioteca de tiempo de ejecución, los componentes que creas no dependen de la versión de Svelte que utilizaste para compilarlos. Una vez que tu componente es compilado a JavaScript, HTML y CSS, no depende de Svelte en tiempo de ejecución. Por lo tanto, los componentes que construyes en Svelte son más resilientes a cambios en el framework mismo.


# Svelte sólo aparece como dependencia de desarrollo
Svelte es un framework de compilación que convierte los componentes en JavaScript puro, eliminando la necesidad de un framework en tiempo de ejecución. Esto significa que el código de Svelte se convierte en código JavaScript estándar antes de que la aplicación se despliegue. Por esta razón, **una vez que hemos compilado nuestra aplicación, ya no se necesita Svelte en el entorno de producción.**

Svelte solamente se usa durante el desarrollo y la compilación, es por ello que se instala como una dependencia de desarrollo. En producción, la aplicación solo necesita el código compilado, no la herramienta que lo generó.

Ejemplo: En el fichero package.json, veremos algo así:
```json
{
  "devDependencies": {
    ...
    "svelte": "^5.0.0-next.1",
    ...
  }
}
```

Beneficios: Esto mantiene nuestro entorno de producción más ligero, ya que solo incluimos las dependencias estrictamente necesarias para ejecutar la aplicación en ese entorno.


# Svelte no utiliza virtual DOM
Esto es una de las características que diferencia a Svelte de otros frameworks de frontend como React o Vue.

## ¿Qué es el virtual DOM?
El virtual DOM es una representación ligera en memoria del DOM real. Es una técnica utilizada por frameworks como React y Vue para optimizar las actualizaciones del DOM. En lugar de manipular directamente el DOM real (lo cual puede ser costoso en términos de rendimiento), estos frameworks crean un virtual DOM y realizan comparaciones entre la versión antigua y la nueva (un proceso conocido como diffing). Luego, aplican solo los cambios necesarios al DOM real.

## ¿Cómo funciona Svelte sin un virtual DOM?
En lugar de usar un virtual DOM, Svelte adopta un enfoque diferente:

- Compilación: Svelte es un compilador. Cuando escribes componentes en Svelte, estos se compilan a código JavaScript altamente optimizado durante el proceso de construcción.
- Actualizaciones precisas: Durante la compilación, Svelte genera código que actualiza el DOM real de manera directa y precisa, sin necesidad de un virtual DOM intermedio. Esto significa que, cuando cambia el estado de nuestra aplicación, Svelte sabe exactamente qué partes del DOM necesitan actualizarse y lo hace de manera eficiente.

## Ventajas de no usar virtual DOM:
- Rendimiento: Dado que Svelte genera código que actualiza el DOM de manera directa, puede ser más eficiente que los frameworks que dependen de un virtual DOM, especialmente en aplicaciones más simples o con actualizaciones muy específicas.
- Menos abstracción: Al eliminar la capa de abstracción que es el virtual DOM, el código generado por Svelte tiende a ser más pequeño y más rápido en tiempo de ejecución.



## Manejo del DOM en Svelte vs. React:
### En Svelte.
Como Svelte no utiliza un Virtual DOM, sino que genera código altamente optimizado que interactúa directamente con el DOM, no tiene la sobrecarga de mantener copias del DOM en memoria. En su lugar, Svelte tiene referencias directas a elementos del DOM, lo que le permite realizar actualizaciones de manera más directa y eficiente.

En lugar de actualizar el DOM, Svelte reacciona a los cambios en el estado de la aplicación y actualiza el DOM directamente. Esto significa que no hay sobrecarga de memoria y que las actualizaciones son más rápidas. Hay punteros a elementos del DOM en lugar de copias virtuales de los mismos. 

Svelte cambia los nodos justo en el momento en el que se cambia el estado. Esto significa que no hay necesidad de comparar nodos y hacer cambios en el DOM. Svelte sabe exactamente qué nodos cambiar y cuándo hacerlo.


### En React.
En React, el Virtual DOM actúa como una capa intermedia. React crea y mantiene una copia en memoria del DOM llamada Virtual DOM, y las actualizaciones se aplican a esta copia antes de reflejarse en el DOM real. Este enfoque tiene sus ventajas, como la capacidad de optimizar actualizaciones y realizar redibujos en lote, pero también puede generar una sobrecarga en términos de memoria y procesamiento.


# Reactividad en Svelte vs. React:
## El sistema de reactividad en Svelte.
Está integrado directamente en el compilador. Cuando definimos una variable reactiva en Svelte, cualquier cambio en esa variable provoca automáticamente una actualización en la interfaz de usuario (UI) sin necesidad de utilizar un "setState" o métodos similares. Svelte compila el código de la aplicación e inyecta el código necesario para actualizar el DOM directamente cuando cambian los estados. Esto reduce la sobrecarga en comparación con enfoques como el de React, donde las actualizaciones se planifican y optimizan antes de aplicarse al DOM.

## El sistema de reactividad en React.
En React, la reactividad está manejada mediante un ciclo de vida basado en el estado y las propiedades. Cuando cambiamos el estado en React utilizando setState (en componentes de clase) o el hook useState (en componentes funcionales), React planifica una actualización que luego se aplica al DOM. Esta actualización se gestiona a través de un proceso llamado reconciliation, donde React compara un Virtual DOM con el estado actual del DOM real y aplica las diferencias necesarias. Este proceso, aunque eficiente y optimizado, introduce cierta latencia y sobrecarga en la gestión de cambios, ya que React no actualiza el DOM inmediatamente, sino que decide el mejor momento para hacerlo.


# Formato de Componente (Component Format) - Estructura que sigue un archivo de componente de Svelte
Cada componente en Svelte se define en un archivo con la extensión .svelte y sigue un formato particular que organiza el código en tres secciones principales: script, style, y markup (HTML). Estas secciones se utilizan para definir la lógica, los estilos y el contenido visual del componente.

## Estructura de un archivo .svelte
```sveltehtml
<script>
  // logic goes here
</script>

<!-- markup (zero or more items) goes here -->

<style>
  /* styles go here */
</style>
```

Un ejemplo completo:
```sveltehtml
<script>
  let count = 0;

  function increment() {
    count += 1;
  }
</script>


<!-- HTML markup -->
<button on:click={increment}>
  Clicked {count} {count === 1 ? 'time' : 'times'}
</button>


<style>
    button {
        background-color: lightblue;
        padding: 10px;
        border: none;
        cursor: pointer;
    }
</style>
```

## \<script>
- Aquí es donde definimos la lógica del componente. Podemos declarar variables, importar dependencias, escribir funciones, manejar eventos, y definir el estado del componente.
- El código dentro de la etiqueta \<script> puede ser estándar de JavaScript o TypeScript.
- Podemos usar la directiva context="module" para definir código que solo se ejecute una vez cuando el módulo es cargado, y no cada vez que se instancia el componente.
- Un bloque \<script> contiene JavaScript que se ejecuta cuando se crea una instancia de componente. Las variables declaradas (o importadas) en el nivel superior son "visibles" desde el marcado del componente.



## \<style>
- Aquí es donde definimos los estilos CSS del componente. Podemos escribir estilos en formato CSS, SCSS, LESS, o cualquier otro preprocesador CSS, configurando nuestro proyecto previamente.
- Los estilos definidos en la etiqueta \<style> son locales al componente, lo que significa que no afectan a otros componentes en la aplicación.
- Svelte también permite definir estilos globales que afectan a toda la aplicación.


## HTML markup
- HTML Markup se refiere al código escrito en HTML (HyperText Markup Language), que es el lenguaje estándar utilizado para crear y estructurar el contenido en páginas web.
- En el HTML Markup es donde definimos la estructura visual del componente utilizando HTML. Podemos incluir elementos HTML, atributos, directivas, y expresiones Svelte.
> [!Important]
> - **Podemos usar las variables y funciones que fueron definidas en la sección \<script> dentro del HTML Markup utilizando la sintaxis de {}.**


# \<script context="module">
Una etiqueta \<script> con un atributo context="module" se ejecuta una vez cuando el módulo se evalúa por primera vez, en lugar de para cada instancia de componente. Los valores declarados en este bloque son accesibles desde un \<script> normal (y el marcado del componente), pero no al revés.

Puede exportar enlaces desde este bloque y se convertirán en exportaciones del módulo compilado.

No puede exportar valores predeterminados, ya que la exportación predeterminada es el componente en sí.

Las variables definidas en los scripts del módulo no son reactivas: reasignarlas no activará una nueva representación, aunque la variable en sí se actualizará. Para los valores compartidos entre varios componentes, considere usar un almacén.




# Formas de crear un proyecto svelte 4
## 1. Usando SvelteKit:
Svelte recomienda utilizar SvelteKit, el marco de aplicación oficial del equipo Svelte que permite configurar rápidamente un proyecto con las mejores prácticas y opciones configurables.
```bash

````

## 2. Usando Svelte con Vite:
Al usar `npm create vite@latest` svelte, estamos configurando un proyecto que utiliza Svelte de forma básica, sin las características avanzadas de SvelteKit. Es un proyecto simple de Svelte que se beneficia del rápido tiempo de inicio y la experiencia de desarrollo optimizada de Vite, pero no incluye herramientas como SSR o enrutamiento avanzado por defecto.

Este entorno es ideal para proyectos más simples o prototipos rápidos donde no necesitas las características completas de SvelteKit. Es excelente para aplicaciones de una sola página (SPA) o componentes simples.

Las herramientas como TypeScript, ESLint, etc, no están incluidas de manera predeterminada. Es un entorno más ligero y minimalista.

```bash
npm create vite@latest my-svelte-project
cd my-svelte-project
npx svelte-add tailwindcss  // Opcional: Añadir TailwindCSS para el diseño de la aplicación.
npx svelte-add eslint       // Opcional: Añadir ESLint para asegurarnos de que nuestro código sigue buenas prácticas y estilos consistentes.
npx svelte-add prettier     // Opcional: Integrar Prettier para formatear automáticamente el código.
npm install
git init && git add -A && git commit -m "Initial commit" // Opcional: Integrar Git para control de versiones.
npm run dev -- --open
```



# Formas de crear un proyecto Svelte 5 en Linux

¡Hola a todos! Bienvenidos a este tutorial donde aprenderemos a crear un proyecto Svelte desde cero en un entorno Linux. Hoy, cubriremos todo lo necesario, desde la instalación de Node.js hasta la creación de tu primer proyecto en Svelte. ¡Vamos a empezar!

### SECCIÓN 1: Instalación de Node.js
Primero, necesitamos instalar Node.js, que es el entorno de tiempo de ejecución necesario para ejecutar y desarrollar aplicaciones Svelte. Vamos a abrir nuestra terminal en Linux.

[Texto en pantalla]  
"Instalar Node.js en Linux"  

[Comando en pantalla]  
Vamos a usar el gestor de paquetes apt para instalar Node.js en distribuciones basadas en Debian/Ubuntu. Ejecutamos el siguiente comando en tu terminal:
```sh
sudo apt update
sudo apt install nodejs npm
```

[Explicación]  
Este comando actualizará nuestra lista de paquetes y luego instalará Node.js junto con npm, que es el gestor de paquetes de Node.

[Verificación de la instalación]  
Una vez completada la instalación, vamos a verificar que Node.js y npm se instalaron correctamente. Usa los siguientes comandos:
```bash
node -v
npm -v
```

Deberíamos ver las versiones instaladas de Node.js y npm en tu terminal. Si vemos algo similar a 'v18.x.x' para Node.js, ¡estás listo para continuar!

### SECCIÓN 2: Crear un Nuevo Proyecto Svelte
[Texto en pantalla]  

Crear un proyecto Svelte  
[Comando en pantalla]  
Ahora, crearemos un nuevo proyecto Svelte utilizando el comando npm init. Este comando genera un proyecto Svelte desde una plantilla. Ejecuta el siguiente comando en la terminal:
```bash
npm create vite@latest my-svelte-app --template svelte
```

Aquí, 'my-svelte-app' es el nombre de nuestro proyecto. Podemos cambiarlo al nombre que prefieramos.  
Este comando utilizará Vite, que es una herramienta de desarrollo rápida, para crear un proyecto Svelte. El flag --template svelte indica que queremos una plantilla de Svelte.  

[Navegar al proyecto]  
Una vez creado el proyecto, navegamos al directorio del proyecto recién creado con el siguiente comando:  
```bash
cd my-svelte-app
```


### SECCIÓN 3: Instalar Dependencias y Ejecutar el Proyecto
[Texto en pantalla]  

"Instalar dependencias"  
Antes de ejecutar el proyecto, necesitamos instalar todas las dependencias necesarias. Para ello, ejecutamos:  
```bash
npm install
```


Este comando descarga e instala todas las bibliotecas necesarias para que nuestro proyecto Svelte funcione.  
[Ejecutar el proyecto]  

Con las dependencias instaladas, ya podemos ejecutar nuestro proyecto. Para iniciar el servidor de desarrollo, usamos el siguiente comando:
```bash
npm run dev
```

Esto iniciará un servidor local y nos dará una URL que podemo abrir en el navegador para ver nuestra aplicación Svelte en funcionamiento.  
[Demostración en el navegador]  


Abrimos nuestro navegador y visitamos la URL http://localhost:5173. ¡Deberíamos ver la página de bienvenida de Svelte! Desde aquí, podemos empezar a editar nuestro proyecto y ver los cambios en tiempo real.  

### SECCIÓN 4: Explicación del Estructura del Proyecto   
[Texto en pantalla]  

Estructura del proyecto Svelte  
[Explicación]  

Vamos a echar un vistazo rápido a la estructura del proyecto. En nuestro editor de código favorito, abrimos la carpeta my-svelte-app.  
[Componentes clave]  

src/App.svelte es el componente principal de la aplicación.
src/main.js es el archivo que inicializa la aplicación.
public/ es donde se colocan los activos estáticos como imágenes o fuentes.
package.json gestiona las dependencias y scripts de nuestro proyecto.


### CONCLUSIÓN
[Presentador en pantalla]  
¡Y eso es todo! Hemos configurado con éxito un proyecto Svelte desde cero en un entorno Linux. Ahora podemos empezar a construir increíbles aplicaciones con Svelte. Si te ha gustado este video, no olvides darle like y suscribirte para más contenido. ¡Nos vemos en el próximo Vídeo!



