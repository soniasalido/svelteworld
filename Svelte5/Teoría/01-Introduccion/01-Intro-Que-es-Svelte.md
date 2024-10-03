# Que es Svelte
Svelte es un compilador que nos ayuda a construir interfaces de usuario (User Interfaces - UI) en aplicaciones web.

## Svelte como un framework:
A pesar de ser un compilador, Svelte también puede ser considerado un framework en un sentido más amplio. Un framework, en términos generales, es un conjunto de herramientas y prácticas que nos ayudan a construir aplicaciones. Svelte proporciona una estructura para desarrollar aplicaciones de usuario, incluyendo:
- Componentes: Podemos definir componentes reutilizables que encapsulan HTML, CSS y JavaScript.
- Reactividad: Ofrece una manera sencilla de manejar la reactividad de los datos en la interfaz de usuario.
- Enrutamiento y gestión de estado: Aunque no es parte del núcleo de Svelte, existen ecosistemas y librerías dentro del mundo de Svelte (como Sapper o SvelteKit) que permiten gestionar el enrutamiento, estado global, y otras funcionalidades típicas de un framework.

## Svelte es un compilador y no un framework.
> [!Important]
> **A diferencia de otros frameworks como React o Vue, Svelte se diferencia principalmente en que es un compilador y no un framework de tiempo de ejecución.**

**Svelte se identifica principalmente como un compilador porque su enfoque principal es transformar el código fuente que escribimos en JavaScript, HTML y CSS puros (es decir, sin dependencias externas) que se ejecutan directamente en el navegador y que interactúa directamente con el DOM.** Este JavaScript generado es eficiente y optimizado, lo que resulta en una aplicación que no necesita una gran biblioteca de tiempo de ejecución, como ocurre con otros frameworks. Así, **el código resultante puede considerarse "Vanilla JavaScript" porque es JavaScript que no depende de un framework específico** para funcionar en el navegador. **No hay una gran biblioteca en tiempo de ejecución que acompañe a la aplicación,** como ocurre con otros frameworks como React o Angular. En este sentido, **Svelte es un compilador porque "compila" el código en lugar de ejecutarlo directamente en el navegador.**

**Frameworks de tiempo de ejecución (como React o Vue):** React y Vue, por otro lado, son frameworks de tiempo de ejecución. Esto significa que al ejecutar la aplicación en el navegador, hay una biblioteca (React o Vue) que gestiona las actualizaciones de la interfaz de usuario, manteniendo un Virtual DOM (en el caso de React) o un sistema de observación reactiva (en el caso de Vue) para decidir cuándo y cómo actualizar el DOM. Estos frameworks cargan sus bibliotecas en el navegador para manejar el ciclo de vida de los componentes, la reactividad, etc.

# Principales características de Svelte:
- **Es un Compilador. No es un framework en tiempo de ejecución:**
    - En Svelte, los componentes que escribimos son compilados en el momento de la construcción del proyecto en código JavaScript eficiente y optimizado (build time).
    - Este código generado se encarga de actualizar el DOM de manera directa y precisa, eliminando la necesidad de una capa de abstracción como el Virtual DOM, que es común en otros frameworks.

- **Ausencia de Virtual DOM:** Svelte no utiliza un Virtual DOM. En lugar de eso, el código compilado por Svelte actualiza directamente el DOM real. Esto permite que las aplicaciones creadas con Svelte sean rápidas y eficientes, especialmente en términos de rendimiento.

- **Componentes reactivos:** La reactividad en Svelte es uno de sus aspectos más destacados. Las variables en Svelte son reactivas por defecto, lo que significa que cuando una variable cambia, cualquier parte del DOM que dependa de esa variable se actualiza automáticamente.

- **Encapsulamiento de estilos:** Los estilos en Svelte están encapsulados de manera predeterminada, lo que significa que los estilos definidos en un componente solo afectan a ese componente y no se filtran a otros, evitando así problemas de colisión de estilos.

- **Simplicidad y legibilidad:** Svelte promueve un enfoque simple y directo para la creación de componentes. Pero sí es necesario conocer HTML, CSS, y JavaScript.

- **Menor tamaño de bundle:** Como Svelte compila todo en un JavaScript optimizado, el tamaño del bundle final tiende a ser más pequeño en comparación con aplicaciones similares hechas en otros frameworks que incluyen librerías grandes para su tiempo de ejecución.

- **No se arrastran librerías:** A diferencia de frameworks como React o Vue, que requieren que sus bibliotecas (React, ReactDOM, Vue) sean incluidas en la aplicación para gestionar la reactividad, el Virtual DOM, el estado y otros aspectos del framework, Svelte no necesita "arrastrar" o incluir una biblioteca adicional en el bundle final que se ejecuta en el navegador. Todo el trabajo del framework se realiza durante la compilación, y el resultado es un código muy eficiente que no depende de una biblioteca adicional.
  
- **Los componentes no se atan a versiones específicas:** Debido a que Svelte es un compilador y no una biblioteca de tiempo de ejecución, los componentes que creas no dependen de la versión de Svelte que se utiliza para compilarlos. Una vez que el componente es compilado a JavaScript, HTML y CSS, no depende de Svelte en tiempo de ejecución. Por lo tanto, los componentes que constrimos en Svelte son más resilientes a cambios en el framework mismo.


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

- Compilación: Svelte es un compilador. Cuando escribimos componentes en Svelte, estos se compilan a código JavaScript altamente optimizado durante el proceso de construcción.
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


# Svelte 5 Vs Svelte 4
Svelte 4 y Svelte 5 son versiones sucesivas del popular framework frontend Svelte. A medida que Svelte ha evolucionado, se han introducido mejoras, cambios y nuevas características. Una comparación entre Svelte 4 y Svelte 5:

## Filosofía y Objetivos
- **Svelte 4:** Continuó con la filosofía de Svelte de ofrecer un framework que compila los componentes a código de JavaScript altamente optimizado y sin necesidad de un framework en tiempo de ejecución (runtime). Svelte 4 se centró principalmente en mejorar el rendimiento y la experiencia de desarrollo, reduciendo el tamaño del paquete y mejorando el tiempo de compilación.

- **Svelte 5:** Mantiene la misma filosofía de ofrecer una experiencia de desarrollo sin la carga de un runtime pesado, pero con un enfoque en simplificar aún más el desarrollo y la integración de nuevas características que mejoren la productividad y la capacidad de crear aplicaciones más complejas.

## Rendimiento
- **Svelte 4:** Introdujo mejoras significativas en el rendimiento de compilación y la eficiencia del código generado. Esto incluyó una optimización del tamaño del bundle y mejoras en el manejo del estado y la reactividad.

- **Svelte 5:** Se espera que Svelte 5 continúe mejorando en esta área, con optimizaciones adicionales en la generación de código y la reactividad. Además, es probable que incluya mejoras en el manejo de actualizaciones y la eficiencia en aplicaciones más grandes.

## APIs y Sintaxis
- **Svelte 4:** Mantuvo la mayoría de las APIs y sintaxis introducidas en Svelte 3, con algunas mejoras y ajustes menores para refinar la experiencia del desarrollador. La API fue pulida para mejorar la consistencia y la claridad.

- **Svelte 5:** Es probable que Svelte 5 introduzca algunas nuevas APIs y haga ajustes a las existentes, con un enfoque en simplificar la sintaxis y hacer que las características avanzadas sean más accesibles. Esto puede incluir cambios en cómo se manejan las animaciones, transiciones, o la reactividad.

## Compatibilidad
- **Svelte 4:** Fue principalmente una versión de refinamiento y optimización, lo que significa que la mayoría de las aplicaciones construidas en Svelte 3 pudieron migrar a Svelte 4 sin cambios importantes.

- **Svelte 5:** Aunque aún se espera que la compatibilidad sea alta, se anticipan algunos cambios que podrían requerir ajustes en proyectos existentes. La documentación y herramientas de migración se enfocarán en facilitar este proceso.

## Soporte de Herramientas
- **Svelte 4:** Mejoró la integración con herramientas populares como TypeScript, y potenció el ecosistema alrededor de SvelteKit y otras herramientas relacionadas.

- **Svelte 5:** Se espera que amplíe este soporte, posiblemente introduciendo nuevas integraciones o mejoras en las existentes, y facilitando aún más el uso de tecnologías modernas como serverless, edge computing, y frameworks de pruebas.

## Nuevas Características
- **Svelte 4:** Introdujo algunas características nuevas, pero principalmente se enfocó en optimizar y mejorar las existentes.

- **Svelte 5:** Es probable que Svelte 5 introduzca características más innovadoras o ajustes significativos en la forma en que se construyen aplicaciones con Svelte, tal vez haciendo que sea más fácil trabajar con datos dinámicos o integraciones complejas.

## Comunidad y Ecosistema
- Svelte 4: Aumentó la popularidad de Svelte y la adopción dentro de la comunidad de desarrolladores, con un ecosistema creciente y herramientas como SvelteKit ganando tracción.

- Svelte 5: Con la base establecida por Svelte 4, Svelte 5 está en posición de expandir este ecosistema, ofreciendo más recursos y soporte para desarrolladores, y posiblemente atrayendo a una audiencia más amplia.

## Migración
- **Svelte 4:** La migración de Svelte 3 a Svelte 4 fue generalmente sencilla, enfocándose en mejoras de rendimiento y pequeñas refactorizaciones.

- **Svelte 5:** Dependiendo de las nuevas características y cambios, la migración de Svelte 4 a Svelte 5 podría requerir más atención, especialmente si hay cambios significativos en la API o en la forma de gestionar ciertos aspectos del desarrollo.
