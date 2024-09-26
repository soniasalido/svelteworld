# ¿Hay alguien que piense en el desarrollador? Olvídate de React | Vue && Pásate a Svelte.

La respuesta es sencilla, ni la industria ni los clientes piensan en el desarrollador. En los ámbitos en los que el desarrollador pueda elegir la tecnología que usará para hacer un producto, sería interesante que evaluara la opción de usar Svelte, ya que es una herramienta que le permitirá hacer productos de calidad en menos tiempo.


"¿Estás pensando en aprender un nuevo framework o quieres mejorar tus aplicaciones web? Hoy vamos a explorar por qué Svelte podría ser la mejor opción frente a React, uno de los frameworks más populares actualmente."

## Diferencia en el enfoque: Svelte es un compilador, React es un framework.
Primero, hablemos de la diferencia fundamental. **React es un framework basado en componentes que necesita un motor de renderizado en el navegador.** Svelte, por otro lado, es un compilador. Y aquí es donde Svelte brilla.

> [!Important]
> **A diferencia de otros frameworks como React o Vue, Svelte se diferencia principalmente en que es un compilador y no un framework de tiempo de ejecución.**

[Animación mostrando React con un Virtual DOM en acción, seguido por una animación que muestra cómo Svelte compila el código en JavaScript puro sin necesidad de un framework adicional en el navegador.]

Svelte se identifica principalmente como un compilador porque su enfoque principal es transformar el código fuente que escribimos en JavaScript, HTML y CSS puros (es decir, sin dependencias externas) que se ejecutan directamente en el navegador y que interactúa directamente con el DOM. Este JavaScript generado es eficiente y optimizado, lo que resulta en una aplicación que no necesita una gran biblioteca de tiempo de ejecución, como ocurre con otros frameworks. Así, el código resultante puede considerarse "Vanilla JavaScript" porque es JavaScript que no depende de un framework específico para funcionar en el navegador. No hay una gran biblioteca en tiempo de ejecución que acompañe a la aplicación, como ocurre con otros frameworks como React, Angular o Vue. En este sentido, Svelte es un compilador porque "compila" el código en lugar de ejecutarlo directamente en el navegador.

## Menor tamaño de archivo
"¿Sabías que las aplicaciones creadas con Svelte son mucho más ligeras? Comparémoslo."

[Comparación lado a lado del tamaño de los archivos JavaScript finales para una simple aplicación en Svelte y React.]

Menor tamaño de bundle: Como Svelte compila todo en un JavaScript optimizado, el tamaño del bundle final tiende a ser más pequeño en comparación con aplicaciones similares hechas en otros frameworks que incluyen librerías grandes para su tiempo de ejecución.



## Tu aplicación NO carga con mochilas de librerías
No se arrastran librerías: A diferencia de frameworks como React o Vue, que requieren que sus bibliotecas (React, ReactDOM, Vue) sean incluidas en la aplicación para gestionar la reactividad, el Virtual DOM, el estado y otros aspectos del framework, Svelte no necesita "arrastrar" o incluir una biblioteca adicional en el bundle final que se ejecuta en el navegador. Todo el trabajo del framework se realiza durante la compilación, y el resultado es un código muy eficiente que no depende de una biblioteca adicional.

Esto significa que cuando usamos Svelte, no estamos cargando una biblioteca adicional en el navegador. El código resultante es más pequeño y rápido.

## Los componentes NO se atan a versiones específicas
Debido a que Svelte es un compilador y no una biblioteca de tiempo de ejecución, los componentes que creas no dependen de la versión de Svelte que se utiliza para compilarlos. Una vez que el componente es compilado a JavaScript, HTML y CSS, no depende de Svelte en tiempo de ejecución. Por lo tanto, los componentes que construimos en Svelte son más resilientes a cambios en el framework mismo.

## Simplicidad en el código

Veamos el código. Uno de los puntos fuertes de Svelte es la simplicidad.

[Muestra un componente React básico junto a un componente equivalente en Svelte.]

En React, necesitas manejar JSX, hooks, y estados de manera explícita. Con Svelte, el enfoque es mucho más sencillo. El código es más fácil de leer y mantener porque no necesitas tanta infraestructura para manejar el estado o las actualizaciones de la interfaz.

[Muestra cómo en Svelte simplemente declaras una variable, y el estado se actualiza de forma reactiva sin necesidad de useState() o useEffect().]


## Reactividad automática
Hablando de reactividad, Svelte es reactivo por diseño. Solo necesitamos declarar las variables, y cuando cambian, la interfaz se actualiza automáticamente. En React, tenemos que aprender hooks como `useState()` y `useEffect()` para lograr lo mismo."

[Mostrar un contador simple que se incrementa en ambas bibliotecas. En Svelte, se ve el código simple y directo, mientras que en React se muestra la implementación con hooks.]


## Mejor rendimiento
Gracias a su enfoque sin Virtual DOM, Svelte tiene mejor rendimiento en muchas situaciones. Especialmente en aplicaciones pequeñas y medianas, Svelte puede superar a React en términos de velocidad de carga y rendimiento en tiempo de ejecución.

[Comparación visual de tiempos de carga en dos aplicaciones sencillas, una en Svelte y otra en React. Los números de carga en Svelte son más rápidos.]

Svelte optimiza el código en tiempo de compilación, mientras que React hace su magia en el navegador, lo que puede generar más sobrecarga.

Con Svelte, no necesitas cargar un Virtual DOM en cada aplicación. Esto puede hacer una diferencia notable en el rendimiento y el tamaño del archivo, especialmente en dispositivos móviles o conexiones lentas.

Svelte no utiliza un Virtual DOM. En lugar de eso, el código compilado por Svelte actualiza directamente el DOM real. Esto permite que las aplicaciones creadas con Svelte sean rápidas y eficientes, especialmente en términos de rendimiento.


## CSS y estilos encapsulados
En Svelte, el manejo de estilos también es más limpio. Los estilos CSS en Svelte son locales por defecto.

[Muestra cómo se aplican los estilos en un componente Svelte y cómo estos se encapsulan localmente sin la necesidad de módulos CSS o styled-components como en React.]

No necesitamoss preocuparnos por clases globales o conflictos de nombres. Todo está encapsulado en el propio componente.

## Ecosistema de herramientas y plugins
Aunque el ecosistema de React es más maduro y amplio, Svelte tiene un crecimiento impresionante en su ecosistema de herramientas y plugins.

[Mostrar SvelteKit, la herramienta oficial de Svelte para crear aplicaciones robustas con routing, manejo de datos, y renderizado en el servidor.]

Con SvelteKit, podemos crear aplicaciones completas con renderizado en el servidor, rutas dinámicas y más, de una manera muy eficiente.


## Comunidad y soporte
Svelte tiene una comunidad creciente y muy activa. Aunque React tiene una comunidad más grande, Svelte está ganando terreno rápidamente.

[Comparar los crecimientos en popularidad y las estrellas en GitHub de Svelte y React, con una animación que muestre el progreso reciente de Svelte.]

Svelte es una excelente opción si buscas un framework moderno, con una curva de aprendizaje suave y una comunidad que sigue expandiéndose.



# Manejo del DOM en Svelte vs. React:
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


# Nota:
## Bundler
Un bundler es una herramienta que combina múltiples archivos (JavaScript, CSS, imágenes, etc.) en uno o varios archivos que luego pueden ser utilizados por el navegador. La idea es agrupar y optimizar los recursos para que se reduzcan las solicitudes HTTP, mejorando el rendimiento de la web. Ejemplos de bundlers incluyen Webpack, Parcel y Rollup.

## Transpilar
Transpilar se refiere a convertir código escrito en un lenguaje o versión de un lenguaje a otro. En el contexto de JavaScript, transpilar usualmente significa convertir código moderno de JavaScript (como ECMAScript 6 o superior) a una versión más antigua (como ECMAScript 5) que pueda ser compatible con más navegadores. Una herramienta popular para transpilar es Babel, que convierte el código para que pueda ejecutarse en entornos que no soportan las características más nuevas.


# Flujo de ejecución de un componente en Svelte
## 1. Componente Svelte:
Se escribe un componente en un archivo `.svelte`, que incluye el HTML, CSS y JavaScript encapsulados.

## 2. Transpilación (Svelte Compiler):
- Svelte no depende de un virtual DOM como React, sino que compila los componentes directamente en JavaScript vanilla en tiempo de desarrollo.
- El compilador de Svelte convierte el código Svelte en código JavaScript altamente optimizado, que manipula directamente el DOM.
- Este proceso genera el código necesario para crear los elementos del DOM, aplicar estilos y gestionar la reactividad del componente.
- En este paso de Transpilación (cuando se ejecuta el Compilador de Svelte), Svelte **inyecta el código necesario para no depender de librerías externas ni de versiones**. Aquí es donde se diferencia de otros frameworks como React o Vue, ya que Svelte NO incluye un runtime o librerías adicionales que deban cargarse junto con la aplicación.

## 3. Bundler (Webpack, Rollup, Vite, etc.):
- El bundler se encarga de agrupar los archivos JavaScript, CSS y otros recursos en un paquete o varios archivos optimizados.
- En este punto, el código JavaScript ya ha sido generado y optimizado por el compilador de Svelte.
- El bundler también puede aplicar optimizaciones adicionales, como la minificación del código y tree shaking (eliminar código no utilizado).

## 4. Código ejecutable por el navegador:
- El código JavaScript empaquetado (el resultado del bundler) es directamente ejecutable por el navegador.
- No hay una segunda fase de transpilación o bundling. El navegador simplemente carga y ejecuta el código JavaScript generado previamente.

````cmd
Componente Svelte ➝ Transpilación (Svelte Compiler) ➝ Código optimizado en JavaScript vanilla ➝ Bundler ➝ Código ejecutable por el navegador
````

## Pasos
1. Componente Svelte: Escribes un archivo .svelte que contiene tu lógica, estructura y estilos encapsulados. 
2. Transpilación (Svelte Compiler): Svelte convierte este archivo .svelte en código JavaScript directo y optimizado. Este código es altamente eficiente porque no necesita un virtual DOM; actualiza el DOM directamente. 
3. Bundler: Herramientas como Webpack, Rollup o Vite agrupan el código JavaScript generado por Svelte, junto con cualquier dependencia externa (por ejemplo, módulos, imágenes, CSS). 
4. Código ejecutable: El código resultante del bundler ya está listo para ser ejecutado por el navegador sin necesidad de más procesamiento.


# Flujo de ejecución de un componente en React
1. Componente React (JSX):

    Se escribe un componente en un archivo .jsx o .js utilizando JSX (una sintaxis similar a HTML dentro de JavaScript). Este archivo puede contener lógica, estructura y estilos.  

2. Transpilación (Babel):  
   JSX no es código JavaScript válido, por lo que necesita ser transpilado. Herramientas como Babel se utilizan para convertir el código JSX a JavaScript estándar (ES5 o ES6), que el navegador puede entender.

3. Bundler (Webpack, Rollup, Vite, etc.):  
   El bundler toma el código JavaScript transpilado por Babel, junto con otros archivos y dependencias, y los agrupa en uno o varios archivos optimizados.
   El bundler también realiza optimizaciones como minificación y tree shaking (eliminación de código no utilizado) para reducir el tamaño del archivo. 

4. Código ejecutable por el navegador:  
   El archivo de salida del bundler (generalmente un archivo .js o varios archivos) se sirve al navegador.
   El navegador ejecuta el código JavaScript empaquetado, que incluye las llamadas a `React.createElement` para renderizar el contenido y gestionar el estado mediante el virtual DOM. 

````cmd
Componente React (JSX) ➝ Transpilación (Babel) ➝ Código JavaScript estándar ➝ Bundler ➝ Código optimizado ➝ Código ejecutable por el navegador
````

## Pasos
1. Componente React (JSX):  
    Se escribe el componente en JSX, lo cual incluye la lógica del componente, estado, hooks, y la estructura de la UI en una sintaxis que parece HTML, pero no es JavaScript válido.

2. Transpilación (Babel):  
    Babel convierte el JSX en código JavaScript estándar usando la función React.createElement. Esta función genera los nodos del DOM virtual de React.

3. Bundler (Webpack, Vite, etc.):
    Herramientas como Webpack o Vite toman el código JavaScript transpilado y lo agrupan con todas las dependencias (como otros componentes, bibliotecas, archivos CSS e imágenes) en archivos optimizados para la web. También realizan optimizaciones como minificación y tree shaking para mejorar el rendimiento.

4. Código ejecutable por el navegador:
    El archivo JavaScript generado y optimizado es cargado por el navegador.  React se ejecuta y monta la aplicación en el DOM utilizando su virtual DOM, actualizando de manera eficiente solo los elementos que han cambiado en respuesta a las interacciones del usuario o cambios de estado.

## React inyecta el código que depende de las librerías y de las versiones en dos momentos clave:
1. Durante la transpilación (Babel): cuando se convierte JSX en código JavaScript estándar. JSX no es código JavaScript válido y necesita ser transformado en código estándar usando Babel. En esta fase, Babel convierte cada elemento JSX en llamadas a la función React.createElement(), que es parte de la librería React.

    Ejemplo de JSX antes de la transpilación:  
    ```jsx
    <h1>Hello World</h1>
    ```

    Código JavaScript después de la transpilación con Babel:
    ```js
    React.createElement('h1', null, 'Hello World');
    ```

    Como podemos ver, el código transpilado ahora utiliza la función `React.createElement()`, que es proporcionada por la librería de React. Esto significa que **React inyecta dependencia en la librería react en este punto**, ya que `React.createElement()` es una función fundamental que React utiliza para crear los elementos del DOM virtual.  


2. Durante la ejecución en el navegador, cuando React utiliza su runtime y las librerías de React y ReactDOM. Cuando el código se ejecuta en el navegador, se utilizan las librerías de React y ReactDOM que ya han sido incluidas como dependencias en el proyecto y referenciadas en el código final.

   React no manipula el DOM directamente en el código transpilado. En cambio, delega esta tarea a ReactDOM, la cual es otra librería que React utiliza para interactuar con el DOM real. Esta es la fase donde la dependencia de React y ReactDOM se vuelve crítica.

    ReactDOM.render() es el método que se utiliza para montar el componente raíz en el DOM. Este código no se genera durante la transpilación de Babel, sino que lo incluimos nosotros en el punto de entrada (por ejemplo, index.js):
    ```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    ReactDOM.render(<App />, document.getElementById('root'));
    ```

En este punto, React y ReactDOM ya están cargados como librerías externas (como parte del bundle final) y dependen de la versión específica de React que estés utilizando. La función ReactDOM.render() inicia el proceso de renderizado en el navegador utilizando el virtual DOM, y se mantiene la dependencia en la librería para manejar la actualización del DOM de manera eficiente.

## Dependencia de las versiones de React y ReactDOM:
- React y ReactDOM deben estar presentes en el bundle porque son esenciales para la ejecución. Esto genera una dependencia explícita en la versión de las librerías que estés utilizando (por ejemplo, react@17.0.0 o react@18.0.0).
- La compatibilidad y el comportamiento del código dependen de la versión específica de React y ReactDOM. Por ejemplo, algunas características como los hooks (useState, useEffect) fueron introducidas en React 16.8. Si estás utilizando una versión anterior, no tendrás acceso a ellas.


# Diferencias clave respecto a Svelte:
- React necesita transpilación de JSX mediante Babel, mientras que Svelte no necesita transpilación porque Svelte compila directamente a JavaScript.
- React utiliza un virtual DOM para gestionar las actualizaciones de la interfaz de usuario, mientras que Svelte actualiza el DOM directamente sin virtual DOM.


# Conclusión
En resumen, Svelte es una gran alternativa a React si buscas un framework ligero, rápido y fácil de usar. Aunque React sigue siendo una excelente herramienta, Svelte puede ofrecerte una mejor experiencia de desarrollo y rendimiento en proyectos donde la simplicidad y la velocidad son cruciales.

[Muestra un resumen visual de las ventajas de Svelte (rendimiento, simplicidad, menor tamaño) sobre React.]

¿Qué framework te gusta más? ¡Déjanos tu opinión en los comentarios! Y si te ha gustado el video, no olvides suscribirte y darle like. Nos vemos en el próximo vídeo. 

