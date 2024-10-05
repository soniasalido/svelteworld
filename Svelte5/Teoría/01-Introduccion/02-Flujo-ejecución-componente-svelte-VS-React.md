

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


## 3. Preprocesar (Preprocessing)

### 3.1. La función `preprocess()`:
```sveltehtml
function preprocess(
source: string,
preprocessor: PreprocessorGroup | PreprocessorGroup[],
options?:
| {
        filename?: string | undefined;
}
| undefined
): Promise<Processed>;
```

La función `preprocess()` en Svelte es utilizada para preprocesar el código fuente de un componente antes de que se compile, permitiendo realizar transformaciones en el código de manera personalizada o usando herramientas de la comunidad, como TypeScript, SCSS, PostCSS, entre otras. 

- `source`: El primer parámetro es una cadena que contiene el código fuente del componente Svelte. Este es el código que queremos preprocesar.
- `preprocessor`: El segundo parámetro puede ser uno o más preprocesadores (un objeto o un array de objetos). Un preprocesador es un conjunto de funciones que pueden transformar el código antes de que sea compilado.
- `options` (opcional): Un objeto con configuraciones adicionales. Por ejemplo, podemos especificar el nombre del archivo (por si queremos saber de dónde viene el código).

### 3.2 2. ¿Qué es un preprocesador?
Un preprocesador es un objeto con un nombre y una o más funciones opcionales para procesar el código de un componente en Svelte. Puede tener las siguientes funciones:
- `markup`: Función que recibe todo el contenido del componente (HTML, <script>, y <style>).
- `script`: Función que recibe solo el contenido dentro de la etiqueta `<script>`.
- `style`: Función que recibe solo el contenido dentro de la etiqueta `<style>`.

Estas funciones permiten transformar el código según nuestras necesidades antes de que llegue al compilador de Svelte. Por ejemplo, podemos usar un preprocesador para transformar código Sass en CSS.

### 3.3. Uso de preprocesadores en Svelte
La función `preprocess()` facilita ganchos (hooks) para transformar el código del componente antes de la compilación. Esto es útil para procesar sintaxis que Svelte no entiende de manera nativa, como TypeScript, SCSS, Less, PostCSS, etc.

Existen plugins oficiales y de la comunidad que ya implementan estos preprocesadores. Podemos configurar nuestro proyecto para usarlos directamente o escribir nuestros propios preprocesadores personalizados.

### 3.4. Ejemplo de un preprocesador común (SCSS):
Supongamos que queremos usar SCSS para nuestros estilos en un componente Svelte. En este caso, podemos usar un preprocesador que convierta el código dentro de `<style lang="scss">` a CSS estándar.
```html
<style lang="scss">
   $color: red;
   div {
      color: $color;
   }
</style>
```
El preprocesador transformará este bloque SCSS en CSS normal antes de que Svelte compile el componente.


### 3.5. Escribir un preprocesador personalizado
Si queremos crear nuestro propio preprocesador, usaremos la API de `svelte.preprocess`. Aquí podemos definir cómo transformar el código antes de que se compile. Un preprocesador personalizado tiene las siguientes funciones disponibles:
- `markup()`: Esta función recibe todo el código fuente del componente, incluyendo el HTML, <script>, y <style>. También recibe el nombre del archivo si está disponible.
- `script()`: Esta función recibe solo el contenido del bloque `<script>` dentro del componente, así como los atributos que están presentes en la etiqueta `<script>`.
- `style()`: Esta función recibe solo el contenido dentro de la etiqueta `<style>` y sus atributos (como lang="scss").


Cada una de estas funciones debe devolver un objeto con:
- `code`: El código transformado, es decir, el resultado después del procesamiento.
- `dependencies` (opcional): Un array con archivos que deben ser observados por cambios. Esto es útil si el preprocesador depende de otros archivos (como archivos parciales de SCSS).
- `map` (opcional): Un mapa de origen (source map) que permita rastrear las transformaciones al código original. Esto es útil para depurar el código preprocesado.


### 3.6. Ejemplo de un preprocesador personalizado:
Supongamos que queremos crear un preprocesador que simplemente transforma los estilos en minúsculas (como un ejemplo simple):
```js
const customStylePreprocessor = {
   style({ content, attributes }) {
      return {
         code: content.toLowerCase()  // Convierte el CSS a minúsculas
      };
   }
};

const result = await preprocess(source, [customStylePreprocessor]);
```

En este ejemplo, el preprocesador personalizado recibe el contenido de los estilos y simplemente lo convierte a minúsculas. Luego, pasamos este preprocesador a la función `preprocess()` para que se ejecute antes de la compilación del componente.


### 3.7. Resultado de la función `preprocess()`: `Processed`
La función `preprocess()` devuelve una promesa que, al resolverse, contiene un objeto `Processed` con el código fuente modificado y otros datos importantes.

El objeto `Processed` incluye:
- `code`: El código fuente del componente transformado, que ahora será procesado por el compilador de Svelte.
- `dependencies`: Archivos adicionales que el compilador debería observar por si hay cambios.


### 3.8 Uso de varios preprocesadores a la vez:
Podemos usar varios preprocesadores en un proyecto de Svelte. Los preprocesadores permiten transformar diferentes partes de un componente (como el marcado HTML, el código JavaScript o los estilos CSS) antes de que se compile.

Si tenemos varios preprocesadores, el resultado del primer preprocesador se pasa como entrada al segundo preprocesador. Esto crea una cadena en la que cada preprocesador aplica transformaciones sobre el código modificado por el anterior.

Orden de ejecución dentro de un preprocesador:
- `markup` (el HTML del componente): Primero se transforma el marcado del componente.
- `script` (el código JavaScript en <script>): Después se procesa el contenido del bloque `<script>`.
- `style` (el CSS o Sass en `<style>`): Por último, se procesan los estilos en el bloque `<style>`.

En Svelte 3, todas las funciones de preprocesamiento de markup (de todos los preprocesadores) se ejecutaban primero, luego todas las funciones de script, y finalmente todas las funciones de style. Esto significaba que, si tenías varios preprocesadores, primero se procesaba todo el marcado HTML (de todos los preprocesadores), luego todo el JavaScript, y luego todos los estilos.

En Svelte 4, este comportamiento cambió. Ahora, dentro de cada preprocesador, se sigue el orden markup -> `script` -> `style`. Es decir, cada preprocesador aplica sus transformaciones completas antes de que el siguiente preprocesador entre en acción. Este cambio permite una mayor coherencia en cómo se aplican las transformaciones, ya que cada preprocesador maneja el componente completo de una vez, en lugar de solo partes específicas en cada paso.


## 4. La función `walk()`
La función `walk()` proporcionada por el compilador de Svelte para recorrer (o "caminar") los árboles de sintaxis abstracta (AST, por sus siglas en inglés) que son generados por el parser (analizador sintáctico) de Svelte. La función `walk()` utiliza una instancia del paquete `estree-walker`, que es una herramienta estándar para caminar por un AST.


### 4.1. ¿Qué es el AST (Árbol de Sintaxis Abstracta)?
Un AST (Abstract Syntax Tree) es una representación estructurada del código fuente. Cada nodo en el AST representa una construcción dentro del código, como una etiqueta HTML, un bloque de JavaScript, una declaración de variable, etc. En el caso de Svelte, el AST es una forma de representar los componentes de Svelte después de que han sido analizados por el parser.

### 4. 2. Función walk()
La función `walk()` es una herramienta que permite recorrer o navegar por los nodos de este AST, examinando o manipulando cada nodo que representa una parte del código fuente.

Caminar por un AST implica visitar cada nodo en el árbol y, potencialmente, realizar acciones en esos nodos. Esto es útil si queremos analizar o modificar el código fuente. En el contexto de Svelte, podemos usar `walk()` para:
- Inspeccionar o analizar el contenido de un componente Svelte.
- Modificar o transformar ciertos nodos del componente antes de que sea compilado.
- Aplicar optimizaciones al código o generar advertencias para los desarrolladores.


## 5. Constante Version

La constante llamada VERSION se puede importar desde el módulo svelte/compiler. Esta constante contiene la versión actual de Svelte que está siendo utilizada, la cual está definida en el archivo package.json del paquete de Svelte y es útil para depurar o verificar que estamos usando la versión correcta en nuestro proyecto.

```js
const VERSION: string;
```
Es una constante de tipo string (cadena de texto) que contiene la versión de Svelte en uso.

Ejemplo de un archivo package.json:
```cmd
	"devDependencies": {
		"svelte": "^5.0.0-next.1",
		"svelte-check": "^3.6.0",
		"typescript": "^5.0.0",
		"typescript-eslint": "^8.0.0",
		"vite": "^5.0.3",
		"vitest": "^2.0.0"
	},
```

En este caso, la constante VERSION contendría el valor "5.0.0-next.1".


## 6. Tipos

### 6.1 Opciones de Compilación (CompileOptions)
La interfaz CompileOptions en el compilador de Svelte define una serie de opciones que podemos configurar al compilar un componente Svelte. Estas opciones controlan diversos aspectos del proceso de compilación, como el tipo de salida (DOM o SSR), la generación de sourcemaps, la depuración, entre otros. Vamos a desglosarlo para entender qué hace cada opción.

La interfaz CompileOptions permite controlar numerosos aspectos del proceso de compilación en Svelte, incluyendo la depuración, la generación de sourcemaps, cómo se gestionan los estilos CSS, la creación de elementos personalizados y las verificaciones de desarrollo. Estas opciones ofrecen una gran flexibilidad al momento de configurar la salida del compilador para adaptarse a diferentes entornos y casos de uso.

Opciones principales de CompileOptions:
1. name?: string (por defecto: 'Component'):
   - Define el nombre de la clase JavaScript generada para el componente.
   - El compilador puede cambiar este nombre si hay conflictos con otras variables en el ámbito del archivo.
   - Normalmente se deduce del nombre del archivo si no se especifica.

2. filename?: string (por defecto: null):
   - Se usa para pistas de depuración y para generar sourcemaps.
   - Si usas un bundler como Vite o Webpack, este suele establecer el nombre del archivo automáticamente.

3. generate?: 'dom' | 'ssr' | false (por defecto: 'dom'):
   - dom: Genera una clase JavaScript para montar el componente en el DOM.
   - ssr: Genera un objeto con un método render, adecuado para el renderizado en el servidor (Server-Side Rendering).
   - false: No genera JavaScript o CSS, solo devuelve metadatos.

4. errorMode?: 'throw' | 'warn' (por defecto: 'throw'):
   - throw: Lanza un error cuando ocurre un problema de compilación.
   - warn: Trata los errores como advertencias, añadiéndolos al informe de advertencias.

5. varsReport?: 'full' | 'strict' | false (por defecto: 'strict'):
   - strict: Devuelve un informe de variables que solo incluye aquellas que no son variables globales o internas.
   - full: Devuelve un informe con todas las variables detectadas.
   - false: No devuelve un informe de variables.

6. sourcemap?: object | string (por defecto: null):
   - Permite especificar un sourcemap inicial, generalmente proporcionado por un preprocesador, que será fusionado con el sourcemap final generado.

7. enableSourcemap?: EnableSourcemap (por defecto: true):
   - Si es true, Svelte genera sourcemaps para los componentes.
   - Puedes pasar un objeto para controlar la generación de sourcemaps en JavaScript (js) o CSS (css) de manera más granular.

8. outputFilename?: string (por defecto: null):
   - Especifica el nombre del archivo para el sourcemap de JavaScript.

9. cssOutputFilename?: string (por defecto: null):
   - Especifica el nombre del archivo para el sourcemap de CSS.

10. sveltePath?: string (por defecto: 'svelte'):
   - La ubicación del paquete de Svelte. Las importaciones de Svelte serán modificadas en consecuencia.

11. dev?: boolean (por defecto: false):
   - Si es true, se añaden verificaciones y código adicional para depuración durante el desarrollo.

12. accessors?: boolean (por defecto: false):
    - Si es true, se generan getters y setters para las propiedades del componente.
    - Si customElement: true, esto se establece automáticamente en true.

13. immutable?: boolean (por defecto: false):
   - Si es true, indica al compilador que no mutarás objetos, lo que le permite ser menos conservador al verificar cambios en los valores.

14. hydratable?: boolean (por defecto: false):
    - Si es true al generar código DOM, habilita la opción hydrate: true, permitiendo que el componente actualice el DOM existente en lugar de crear uno nuevo desde cero. 

15. legacy?: boolean (por defecto: false):
   - Si es true, genera código compatible con navegadores antiguos como IE9 e IE10.

16. customElement?: boolean (por defecto: false):
   - Si es true, genera un constructor de elementos personalizados (Web Components) en lugar de un componente Svelte estándar.

17. tag?: string (por defecto: null):
   - Define el nombre de la etiqueta personalizada para el elemento si customElement: true. Debe ser una cadena alfanumérica en minúsculas con al menos un guion (e.g., 'my-element').

18. css?: 'injected' | 'external' | 'none' | boolean (por defecto: 'injected'):
    - injected: Los estilos CSS se inyectan en el JavaScript y se aplican en tiempo de ejecución.
    - external: El CSS se devuelve como un archivo separado en el resultado de la compilación, lo que mejora el rendimiento en grandes aplicaciones.
    - none: No se genera ningún CSS.
    
19. loopGuardTimeout?: number (por defecto: 0):
   - Establece un número en milisegundos para que Svelte interrumpa un bucle si bloquea el hilo principal por demasiado tiempo, útil para evitar bucles infinitos en desarrollo.

20. namespace?: string (por defecto: 'html'):
   - Especifica el espacio de nombres para los elementos, como "svg" o "mathml".

21. cssHash?: CssHashGetter (por defecto: undefined):
   - Una función que genera el nombre de clase para el CSS con scope basado en un hash del contenido CSS.

22. preserveComments?: boolean (por defecto: false):
   - Si es true, conserva los comentarios HTML durante el renderizado en el servidor.

23. preserveWhitespace?: boolean (por defecto: false):
   - Si es true, conserva los espacios en blanco dentro y entre los elementos HTML, en lugar de colapsarlos.

24. discloseVersion?: boolean (por defecto: true):
    - Si es true, expone la versión de Svelte en el navegador, agregándola a un Set en window.__svelte.v.



### 6.2 CompileResult
El resultado de la función `compile()` del compilador de Svelte, que devuelve un objeto de tipo CompileResult. Este objeto contiene varios detalles sobre el proceso de compilación del componente, como el código JavaScript generado, el código CSS, el árbol de sintaxis abstracta (AST), advertencias, y otros metadatos. Desglosamos cada parte de este resultado:

```sveltehtml
interface CompileResult {…}
```
1. `js: {...}`: El código JavaScript resultante de la compilación del componente.
- `code: string`: Este campo contiene el código JavaScript del componente como una cadena de texto. Este es el código compilado que se ejecutará en el navegador o en el servidor, dependiendo de cómo hayas configurado el proceso de compilación.

- `map: any`: El mapa de origen (source map) generado durante la compilación del JavaScript. Los mapas de origen son útiles para depurar el código, ya que permiten a las herramientas de desarrollo rastrear la correspondencia entre el código original (escrito en Svelte) y el código compilado.

2. `css: CssResult`: El código CSS resultante de la compilación del componente. Este campo contiene el CSS generado a partir de los estilos definidos en el componente Svelte. Al igual que con el JavaScript, puede incluir un mapa de origen para el CSS y el código resultante.

3. `ast: Ast`: El árbol de sintaxis abstracta (AST) que representa la estructura del componente.  El AST es una representación estructurada del código fuente del componente. Aunque normalmente no interactuarás directamente con el AST, es útil si necesitas hacer análisis o modificaciones programáticas al código.

4. `warnings: Warning[]`: Un arreglo de advertencias generadas durante la compilación. Cada advertencia es un objeto con varias propiedades:
   - `code`: Una cadena que identifica la categoría de la advertencia. Es un código breve que describe el tipo de problema que se ha encontrado.
   - `message`: Un mensaje en lenguaje comprensible que describe el problema. Esto te ayuda a entender qué está mal en el código.
   - `start` y `end`: Si la advertencia se refiere a una ubicación específica del código, estos objetos contienen las propiedades line, column, y character que indican la ubicación del problema en el archivo fuente.
   - `frame`: Si es aplicable, este campo incluye una cadena con un fragmento del código que muestra la línea problemática, junto con los números de línea, para que sea más fácil ubicar y entender el problema.

5. `vars: Var[]`: Un arreglo de las declaraciones de variables del componente. Esta información es útil para herramientas del ecosistema, como plugins de ESLint, que pueden usar este arreglo para inferir más información sobre el componente y hacer análisis estático del código.

6. `stats: { timings: { total: number; } }`: Estadísticas sobre el tiempo de compilación.

   - Este objeto incluye estadísticas que el equipo de desarrollo de Svelte utiliza para diagnosticar el rendimiento del compilador.
   - `total`: Es el tiempo total que tomó la compilación (en milisegundos).
      
Aunque esta información es útil para los desarrolladores de Svelte, no es recomendable depender de este campo en tu propio código, ya que podría cambiar en futuras versiones de Svelte.


Resumen del objeto CompileResult: Cuando compilamos un componente Svelte usando la función compile(), obtenemos un objeto con:
- js: El código JavaScript compilado y su mapa de origen.
- css: El CSS generado, si hay estilos en el componente.
- ast: El árbol de sintaxis abstracta del componente.
- warnings: Un arreglo de advertencias generadas durante la compilación, con detalles sobre la ubicación del problema.
- vars: Información sobre las variables declaradas en el componente, útil para herramientas de análisis estático.
- stats: Datos de tiempo de compilación, usados principalmente por el equipo de Svelte para diagnósticos.


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
