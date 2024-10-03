
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
