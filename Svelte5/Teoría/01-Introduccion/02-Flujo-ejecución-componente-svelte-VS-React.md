

# Conceptos Previos:
## Bundler
Un bundler es una herramienta que combina múltiples archivos (JavaScript, CSS, imágenes, etc.) en uno o varios archivos que luego pueden ser utilizados por el navegador. La idea es agrupar y optimizar los recursos para que se reduzcan las solicitudes HTTP, mejorando el rendimiento de la web. Ejemplos de bundlers incluyen Webpack, Parcel, Rollup, Vite...

## Transpilar
Transpilar se refiere a convertir código escrito en un lenguaje o versión de un lenguaje a otro. En el contexto de JavaScript, transpilar usualmente significa convertir código moderno de JavaScript (como ECMAScript 6 o superior) a una versión más antigua (como ECMAScript 5) que pueda ser compatible con más navegadores. Una herramienta popular para transpilar es Babel, que convierte el código para que pueda ejecutarse en entornos que no soportan las características más nuevas.

## Normalmente no interactuamos directamente con el compilador
Como desarrollador, normalmente no tendremos que usar el compilador de Svelte de manera manual o directa. Svelte es un compilador que transforma los componentes escritos en un formato específico de Svelte en JavaScript estándar, que luego puede ser ejecutado por los navegadores.

En lugar de interactuar directamente con el compilador, Svelte se integra con nuestro flujo de trabajo a través de un sistema de construcción o bundler (herramientas como Vite, Webpack, o Rollup, que agrupan y optimizan los archivos de nuestra aplicación).

**En lugar de compilar manualmente nuestros archivos Svelte, usamos un plugin dentro de nuestro bundler (como Vite o Webpack) que se encarga de invocar al compilador de Svelte automáticamente** cuando sea necesario. Estos plugins son responsables de transformar nuestros componentes de Svelte en un formato que los navegadores puedan entender.

**El equipo de Svelte recomienda el plugin para Vite llamado `vite-plugin-svelte`.** Vite es una herramienta moderna de desarrollo que ofrece compilaciones rápidas y es muy eficiente. Este plugin permite integrar Svelte fácilmente con Vite y simplifica el proceso de construcción de aplicaciones.

**`SvelteKit` es un framework basado en Svelte**, que se usa para crear aplicaciones completas. Utiliza `vite-plugin-svelte` bajo el capó para manejar la compilación y construcción de los componentes Svelte de forma eficiente. SvelteKit no solo facilita la creación de aplicaciones, sino que también proporciona herramientas para empaquetar bibliotecas de componentes.

Si no quieres usar Vite, hay otros plugins disponibles para integrarse con otras herramientas populares de construcción como `Rollup` y `Webpack`. La comunidad de Svelte mantiene una lista de estos plugins.

Aunque normalmente no interactuamos directamente con el compilador, es útil entender cómo funciona, ya que los plugins que usamos con Vite, Rollup o Webpack suelen exponer opciones del compilador. Esto nos permite ajustar configuraciones como el nivel de optimización, el manejo de estilos, o cómo manejar la reactividad de los componentes.


## 1. Compilar

### 1.1 La función `compile()`:
```sveltehtml
function compile(
        source: string,
        options?: CompileOptions
): CompileResult;
```

La función `compile()` es la responsable de transformar el código fuente de nuestro componente Svelte (escrito en el lenguaje específico de Svelte) en un módulo JavaScript estándar.

Recibe dos parámetros principales:
   - `source`: Es una cadena de texto que contiene el código fuente del componente Svelte.
   - `options`: Opcionalmente, podemos pasarle un objeto CompileOptions que contiene configuraciones adicionales para el proceso de compilación (como optimizaciones, generación de mapas de origen, etc.).


### 1.2. El proceso de compilación: Aquí es donde ocurre la magia.
- Aquí es donde **el compilador transforma el código fuente en un módulo JavaScript que exporta una clase. Esa clase es la que usará el navegador para crear y manejar el componente en la aplicación.**
- **La compilación convierte el código Svelte en un módulo JavaScript. Este módulo contendrá una clase que representa el componente y que se podrá instanciar en el navegador o en otro entorno.**

### 1.3. Uso de compile() en código:
```js
import { compile } from 'svelte/compiler';

const result = compile(source, {
// options
});
```

- Importamos la función `compile` desde el paquete svelte/compiler.
- Llamamos a la función `compile()` pasando el código fuente del componente Svelte como el parámetro `source` y opcionalmente un objeto `options` con las configuraciones de compilación.
- El resultado de la compilación es un objeto que contiene el código JavaScript y otros elementos útiles que describe más abajo.


### 1.4. Objeto resultado de la compilación (`CompileResult`):
El objeto que devuelve `compile()` incluye varios elementos, no solo el código JavaScript del componente, sino también información adicional (metadatos) que puede ser útil durante el desarrollo.

Ejemplo de cómo obtener los diferentes elementos del resultado:
```js
const { js, css, ast, warnings, vars, stats } = compile(source);
```
Estos son los elementos que podemos obtener:
- `js`: Es el código JavaScript resultante de la compilación. Este código es el que el navegador puede ejecutar para renderizar el componente.
- `css`: Si el componente incluye estilos CSS, este campo contendrá el código CSS generado.
- `ast`: Es el Árbol de Sintaxis Abstracta (AST), una representación estructurada del código fuente del componente. Esto es útil si queremos realizar análisis o transformaciones sobre el código fuente.
- `warnings`: Contiene las advertencias generadas durante la compilación, que pueden ser útiles para depurar problemas.
- `vars`: Información sobre las variables reactivas y las propiedades del componente.
- `stats`: Estadísticas sobre el proceso de compilación, como el tiempo que tardó y el tamaño del código generado.



### 1.5. CompileOptions y CompileResult:
- `CompileOptions`: Este es el objeto que podemos pasar como segundo parámetro a la función `compile()`. Incluye configuraciones como la generación de mapas de origen (source maps), el formato de salida, la compatibilidad con versiones antiguas de JavaScript, etc. Consulta CompileOptions para conocer todas las opciones disponibles 🠮 https://svelte.dev/docs/svelte-compiler#types-compileoptions
- `CompileResult`: Es el objeto que contiene los resultados de la compilación, como el código JavaScript (js), el CSS, el AST, y otros elementos como advertencias y estadísticas. Consulta CompileResult para obtener una descripción completa del resultado de la compilación 🠮 https://svelte.dev/docs/svelte-compiler#types-compileresult 


Aunque generalmente no usaremos esta función directamente (porque los plugins de bundlers lo hacen por nosotros), entenderla nos permite personalizar el proceso de compilación si es necesario.


## 2. Analizar gramaticalmente (Parsing)
### 2.1. La función `parse()`:
```sveltehtml
function parse(
template: string,
options?: ParserOptions
): Ast;
```

La función parse() en el contexto del compilador de Svelte se usa para analizar el código fuente de un componente y devolver su árbol de sintaxis abstracta (AST, por sus siglas en inglés). El AST es una representación estructurada del código que permite entender su organización y contenido a nivel sintáctico, pero sin llegar a compilar o validar el código.

- `parse()` es una función que toma como entrada el código fuente de un componente Svelte (en el parámetro template) y devuelve el AST del componente.
- Los parámetros que recibe son:
  - `template`: Este es el código fuente del componente, que generalmente será una cadena de texto que contiene el HTML, CSS y JavaScript específicos de un componente Svelte.
  - `options` (opcional): Este es un objeto de tipo `ParserOptions` que puede incluir configuraciones adicionales, como el nombre del archivo (por ejemplo, App.svelte) o el modo en el que se quiere realizar el parsing.


### 2.2 Proceso de análisis (parsing):
La función `parse()` se encarga de leer el código fuente y devolver solo el AST. El AST es una estructura en forma de árbol que organiza el código fuente de acuerdo con su estructura sintáctica.

Por ejemplo, en un archivo Svelte, se identificarían las secciones de `<script>`, `<style>`, y el marcado HTML, y cada uno de estos elementos sería representado como un nodo en el árbol.

A diferencia de la opción `generate: false` que se usa en el proceso de compilación para generar el AST pero también hacer validaciones, **`parse()` solo genera el árbol de sintaxis abstracta, sin realizar ninguna validación o análisis adicional sobre el código. Solo se enfoca en analizar y estructurar el código en un formato de árbol.**

No verifica errores ni genera código ejecutable, solo interpreta la sintaxis.


### 2.3 Advertencia sobre el AST:
**El AST devuelto por `parse()` no es una API pública oficial**, lo que significa que la forma y estructura del árbol pueden cambiar en futuras versiones del compilador de Svelte. Es importante tener esto en cuenta si quieres usar el AST directamente en el código, ya que esos cambios pueden romper la implementación en el futuro.



- Podemos trabajar con el AST de un componente Svelte usando la API del compilador, pero si solo nos interesa el AST, la función más adecuada es `parse()`.
- La función `compile()` es más adecuada cuando buscamos compilar un componente completo, y aunque devuelve el AST, su objetivo principal es generar código ejecutable.
- El AST no es parte de la API pública estable de Svelte, por lo que puede sufrir cambios en futuras versiones.



### 2.4 Uso de la función `parse()`:
```js
import { parse } from 'svelte/compiler';

const ast = parse(source, { filename: 'App.svelte' });
```

- `source`: Es una cadena de texto que contiene el código fuente del componente, por ejemplo, el contenido del archivo App.svelte.
- `options`: Aquí se le está pasando una opción que especifica el nombre del archivo (filename: 'App.svelte'). Esto puede ser útil para depuración o análisis, aunque no es obligatorio.

El resultado es el AST del componente:
```sveltehtml
const ast = parse(source);
```
En este caso, ast contendrá la representación estructurada del código en forma de árbol, que podemos inspeccionar o usar para realizar análisis más profundos del código.


### 2.5 5. ¿Qué es un AST (Abstract Syntax Tree)?
Un Árbol de Sintaxis Abstracta es una representación intermedia del código fuente. Cada nodo del árbol representa una construcción dentro del código (como etiquetas HTML, bloques de JavaScript, etc.). Por ejemplo:
- Un nodo podría representar una etiqueta HTML como `<div>`.
- Otro nodo podría representar una variable en un bloque de JavaScript.
- Un nodo también podría representar un bloque de estilo CSS.

- El AST es útil en diversas herramientas que necesitan comprender la estructura del código fuente sin necesariamente ejecutarlo o validarlo.



# Poceso de transpilación del compilador de Svelte
Transforma componentes Svelte en código JavaScript optimizado.

## Esquema del Proceso de Transpilación en Svelte
1. Entrada: Componente Svelte: Archivos con extensión `.svelte` que contienen:
   - HTML: Estructura del componente.
   - CSS: Estilos específicos.
   - JavaScript: Lógica del componente.

2. Análisis Sintáctico (Parsing): El compilador analiza el código fuente y genera un AST (Abstract Syntax Tree) que representa la estructura del componente.

3. Transformación: El AST se transforma en un nuevo AST que optimiza el código para mejorar el rendimiento. Esto incluye:
   - Eliminación de código muerto.
   - Reorganización de la lógica para eficiencia.

4. Generación de Código: Se genera el código JavaScript a partir del nuevo AST optimizado, que incluye:
   - Funciones reactivas para manejar el estado.
   - Manipulación del DOM utilizando la API de Svelte.

5. Salida 🠮 Código JavaScript: El resultado es un archivo .js que puede ser ejecutado en el navegador o en un entorno de Node.js.

6. Integración con el Entorno: El código generado se integra con otras partes de la aplicación, permitiendo su uso en frameworks como React o Vue si es necesario.


```cmd
[Inicio] --> [Escribir código en Svelte]
               |
               v
      [Compilación en Svelte]
               |
               v
   [Optimización del código JavaScript]
               |
               v
   [Tamaño del bundle final pequeño]
    (Debido a que Svelte no necesita un runtime,
    el tamaño del bundle resultante es más pequeño.)
               |
               v
[Comparación con frameworks que incluyen librerías grandes en runtime]
               |
               v
 [Resultado: Bundle final de Svelte más pequeño]
```


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
Componente Svelte ➝ Transpilación (Svelte Compiler) ➝ Código optimizado en JavaScript vanilla ➝
Bundler ➝ Código ejecutable por el navegador
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
- La compatibilidad y el comportamiento del código dependen de la versión específica de React y ReactDOM. Por ejemplo, algunas características como los hooks (useState, useEffect) fueron introducidas en React 16.8. Si estás utilizando una versión anterior, no tienes acceso a ellas.


# Diferencias clave respecto a Svelte:
- React necesita transpilación de JSX mediante Babel, mientras que Svelte no necesita transpilación porque Svelte compila directamente a JavaScript.
- React utiliza un virtual DOM para gestionar las actualizaciones de la interfaz de usuario, mientras que Svelte actualiza el DOM directamente sin virtual DOM.
