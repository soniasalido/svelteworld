Hola a Todos!
En el vídeo anterior vimos en detalle el proceso de compilación de Svelte, es decir, cómo transpila los componentes Svelte a código JavaScript optimizado. En este vídeo, vamos a comparar el flujo de ejecución de un componente en Svelte con el de un componente en React. Ambos frameworks son muy populares y ampliamente utilizados en el desarrollo web, pero tienen diferencias significativas en cómo manejan la creación y actualización de la interfaz de usuario. Vamos a ver cómo se ejecuta un componente en Svelte y cómo se compara con el proceso en React. ¡Vamos a ello!

# Flujo de ejecución de un componente en Svelte
````cmd
Componente Svelte ➝ Transpilación (Svelte Compiler) ➝ Código optimizado en JavaScript vanilla ➝
Bundler ➝ Código ejecutable por el navegador
````
## 1. Componente Svelte:
Se escribe un componente en un archivo `.svelte`, que incluye el HTML, CSS y JavaScript encapsulados.

## 2. Transpilación (Svelte Compiler):
- Svelte no depende de un virtual DOM como React, sino que compila los componentes directamente en JavaScript vanilla en tiempo de desarrollo.
- El compilador de Svelte convierte el código Svelte en código JavaScript altamente optimizado, que manipula directamente el DOM.
- Este proceso genera el código necesario para crear los elementos del DOM, aplicar estilos y gestionar la reactividad del componente.
- En este paso de Transpilación (cuando se ejecuta el Compilador de Svelte), Svelte **inyecta el código necesario para:**
  - manejar la reactividad y los cambios en el DOM, sin depender de un runtime como React.
  - no depender de librerías externas ni de versiones. 
- Aquí radica una de las diferencias clave de Svelte frente a frameworks como React o Vue. Mientras que React y Vue tienen un "runtime" que se carga junto con la aplicación para gestionar el estado y el DOM, **Svelte genera todo el código necesario en tiempo de compilación**, lo que hace que la aplicación final sea más ligera y eficiente.

## 3. Bundler (Webpack, Rollup, Vite, etc.):
- El bundler se encarga de agrupar los archivos JavaScript, CSS y otros recursos en un paquete o varios archivos optimizados.
- En este punto, el código JavaScript ya ha sido generado y optimizado por el compilador de Svelte.
- El bundler también puede aplicar optimizaciones adicionales, como la minificación del código y tree shaking (eliminar código no utilizado) para generar archivos más pequeños y rápidos de cargar..

## 4. Código ejecutable por el navegador:
- El código JavaScript empaquetado (el resultado del bundler) es directamente ejecutable por el navegador. 
- No hay una segunda fase de transpilación o bundling. El navegador simplemente carga y ejecuta el código JavaScript generado previamente.
- Sin runtime adicional: Esta es una característica clave de Svelte. A diferencia de frameworks como React o Vue, no hay un runtime adicional que se cargue en el navegador para gestionar la lógica del framework. Todo el código necesario para la reactividad y la actualización del DOM ya se ha generado en tiempo de compilación.

## Pasos
1. Componente Svelte: Escribes un archivo .svelte que contiene tu lógica, estructura y estilos encapsulados.
2. Transpilación (Svelte Compiler): Svelte convierte este archivo `.svelte` en código JavaScript directo y optimizado. Este código es altamente eficiente porque no necesita un virtual DOM; actualiza el DOM directamente.
3. Bundler: Herramientas como Webpack, Rollup o Vite agrupan el código JavaScript generado por Svelte, junto con cualquier dependencia externa (por ejemplo, módulos, imágenes, CSS).
4. Código ejecutable: El código resultante del bundler ya está listo para ser ejecutado por el navegador sin necesidad de más procesamiento.


# Flujo de ejecución de un componente en React
1. Componente React (JSX):Un componente en React se escribe en un archivo `.jsx` o .`js` utilizando `JSX`, que es una extensión de sintaxis que permite escribir HTML-like dentro de JavaScript. Los archivos .jsx pueden contener:
   - Lógica: Funciones, hooks, manejo del estado, etc.
   - Estructura: La representación visual del componente, que se describe en JSX.
   - Estilos: Aunque los estilos no suelen estar directamente en el archivo JSX (a menos que se usen soluciones como styled-components), pueden estar importados o inyectados.

2. Transpilación (Babel): JSX no es código JavaScript válido, por lo que necesita ser transpilado. Herramientas como Babel se utilizan para convertir el código JSX a JavaScript estándar (ES5 o ES6), que el navegador puede entender.
   - JSX a JavaScript: Babel convierte el código JSX en JavaScript estándar que el navegador puede entender. Por ejemplo, una expresión JSX como `<div>Hello</div>` se convierte en una llamada a `React.createElement('div', null, 'Hello')`.
   - `ES5` o `ES6`: Además de convertir JSX, Babel también puede transpirar código ES6 o más reciente a ES5, que es compatible con más navegadores antiguos.
   
3. Bundler (Webpack, Rollup, Vite, etc.): Una vez que Babel transpila el código JSX a JavaScript, un bundler como Webpack, Rollup o Vite se encarga de:
   - Agrupar archivos: Combinar los diferentes módulos de JavaScript, estilos, imágenes y otras dependencias en uno o varios archivos empaquetados.
   - Optimización: El bundler aplica optimizaciones como:
     - Minificación: Reducir el tamaño de los archivos eliminando espacios, renombrando variables y otros procesos.
     - Tree shaking: Eliminar el código no utilizado para hacer el paquete más pequeño.

4. Código ejecutable por el navegador: El archivo de salida del bundler (generalmente un archivo .js o varios archivos) se sirve al navegador. 
   - El navegador ejecuta el código JavaScript empaquetado, que incluye las llamadas a `React.createElement` (convertidas por Babel) para crear la representación del virtual DOM.
   - React gestiona la reactividad y la actualización eficiente del DOM real en el navegador mediante su algoritmo de reconciliación. El virtual DOM le permite a React comparar la representación actual del DOM con la nueva representación y actualizar solo las partes necesarias. 

````cmd
Componente React (JSX) ➝ Transpilación (Babel) ➝ Código JavaScript estándar ➝ Bundler ➝ 
Código optimizado ➝ Código ejecutable por el navegador
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
1. Durante la transpilación (Babel): JSX a JavaScript estándar: JSX no es un código JavaScript válido y debe ser transpilado a JavaScript estándar utilizando Babel. Durante esta fase, Babel convierte el JSX en llamadas a la función React.createElement().

   Dependencia de React inyectada en la transpilación: Durante la transpilación, se introduce una dependencia de React, ya que React.createElement() es una función fundamental que React utiliza para crear los elementos del virtual DOM. Esto significa que el código resultante de la transpilación necesita tener React disponible en el entorno de ejecución.

   Ejemplo de JSX antes de la transpilación:
    ```jsx
    <h1>Hello World</h1>
    ```

   Código JavaScript después de la transpilación con Babel:
    ```js
    React.createElement('h1', null, 'Hello World');
    ```

   Como podemos ver, el código transpilado ahora utiliza la función `React.createElement()`, que es proporcionada por la librería de React. Esto significa que **React inyecta dependencia en la librería react en este punto**, ya que `React.createElement()` es una función fundamental que React utiliza para crear los elementos del DOM virtual.


2. Ejecución en el navegador (React y ReactDOM): Durante la ejecución en el navegador, cuando React utiliza su runtime y las librerías de React y ReactDOM. Cuando el código se ejecuta en el navegador, se utilizan las librerías de React y ReactDOM que ya han sido incluidas como dependencias en el proyecto y referenciadas en el código final.

   React no manipula el DOM directamente en el código transpilado. En cambio, delega esta tarea a ReactDOM, la cual es otra librería que React utiliza para interactuar con el DOM real. Esta es la fase donde la dependencia de React y ReactDOM se vuelve crítica.

   ReactDOM.render() es el método que se utiliza para montar el componente raíz en el DOM. Este código no se genera durante la transpilación de Babel, sino que lo incluimos nosotros en el punto de entrada (por ejemplo, index.js):
    ```js
    import React from 'react';
    import ReactDOM from 'react-dom';
    import App from './App';

    ReactDOM.render(<App />, document.getElementById('root'));
    ```

En este punto, React y ReactDOM ya están cargados como librerías externas (como parte del bundle final) y dependen de la versión específica de React que estés utilizando. La función ReactDOM.render() inicia el proceso de renderizado en el navegador utilizando el virtual DOM, y se mantiene la dependencia en la librería para manejar la actualización del DOM de manera eficiente. Virtual DOM vs. DOM real: React no manipula directamente el DOM real; en su lugar, actualiza el virtual DOM y luego, usando ReactDOM, compara las diferencias entre el virtual DOM y el DOM real para realizar las actualizaciones de manera eficiente.

## Dependencia de las versiones de React y ReactDOM:
- React y ReactDOM deben estar presentes en el bundle porque son esenciales para la ejecución. Esto genera una dependencia explícita en la versión de las librerías que estés utilizando (por ejemplo, react@17.0.0 o react@18.0.0).
- La compatibilidad y el comportamiento del código dependen de la versión específica de React y ReactDOM. Por ejemplo, algunas características como los hooks (useState, useEffect) fueron introducidas en React 16.8. Si estás utilizando una versión anterior, no tienes acceso a ellas.

# Diferencias clave respecto a Svelte:
- React necesita transpilación de JSX mediante Babel, mientras que Svelte no necesita transpilación porque Svelte compila directamente a JavaScript.
- React utiliza un virtual DOM para gestionar las actualizaciones de la interfaz de usuario, mientras que Svelte actualiza el DOM directamente sin virtual DOM.
