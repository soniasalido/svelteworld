

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


### 2.5 ¿Qué es un AST (Abstract Syntax Tree)?
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
- `markup`: Función que recibe todo el contenido del componente (HTML, `<script>`, y `<style>`).
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
1. `name?: string` (por defecto: 'Component'):
   - Define el nombre de la clase JavaScript generada para el componente.
   - El compilador puede cambiar este nombre si hay conflictos con otras variables en el ámbito del archivo.
   - Normalmente se deduce del nombre del archivo si no se especifica.

2. `filename?: string` (por defecto: null):
   - Se usa para pistas de depuración y para generar sourcemaps.
   - Si usas un bundler como Vite o Webpack, este suele establecer el nombre del archivo automáticamente.

3. `generate?: 'dom' | 'ssr' | false` (por defecto: 'dom'):
   - dom: Genera una clase JavaScript para montar el componente en el DOM.
   - ssr: Genera un objeto con un método render, adecuado para el renderizado en el servidor (Server-Side Rendering).
   - false: No genera JavaScript o CSS, solo devuelve metadatos.

4. `errorMode?: 'throw' | 'warn'` (por defecto: 'throw'):
   - throw: Lanza un error cuando ocurre un problema de compilación.
   - warn: Trata los errores como advertencias, añadiéndolos al informe de advertencias.

5. `varsReport?: 'full' | 'strict' | false` (por defecto: 'strict'):
   - strict: Devuelve un informe de variables que solo incluye aquellas que no son variables globales o internas.
   - full: Devuelve un informe con todas las variables detectadas.
   - false: No devuelve un informe de variables.

6. `sourcemap?: object | string` (por defecto: null):
   - Permite especificar un sourcemap inicial, generalmente proporcionado por un preprocesador, que será fusionado con el sourcemap final generado.

7. `enableSourcemap?: EnableSourcemap` (por defecto: true):
   - Si es true, Svelte genera sourcemaps para los componentes.
   - Puedes pasar un objeto para controlar la generación de sourcemaps en JavaScript (js) o CSS (css) de manera más granular.

8. `outputFilename?: string` (por defecto: null):
   - Especifica el nombre del archivo para el sourcemap de JavaScript.

9. `cssOutputFilename?: string` (por defecto: null):
   - Especifica el nombre del archivo para el sourcemap de CSS.

10. `sveltePath?: string` (por defecto: 'svelte'):
   - La ubicación del paquete de Svelte. Las importaciones de Svelte serán modificadas en consecuencia.

11. `dev?: boolean` (por defecto: false):
   - Si es true, se añaden verificaciones y código adicional para depuración durante el desarrollo.

12. `accessors?: boolean` (por defecto: false):
    - Si es true, se generan getters y setters para las propiedades del componente.
    - Si customElement: true, esto se establece automáticamente en true.

13. `immutable?: boolean` (por defecto: false):
   - Si es true, indica al compilador que no mutarás objetos, lo que le permite ser menos conservador al verificar cambios en los valores.

14. `hydratable?: boolean` (por defecto: false):
    - Si es true al generar código DOM, habilita la opción hydrate: true, permitiendo que el componente actualice el DOM existente en lugar de crear uno nuevo desde cero. 

15. `legacy?: boolean` (por defecto: false):
   - Si es true, genera código compatible con navegadores antiguos como IE9 e IE10.

16. `customElement?: boolean` (por defecto: false):
   - Si es true, genera un constructor de elementos personalizados (Web Components) en lugar de un componente Svelte estándar.

17. `tag?: string` (por defecto: null):
   - Define el nombre de la etiqueta personalizada para el elemento si customElement: true. Debe ser una cadena alfanumérica en minúsculas con al menos un guion (e.g., 'my-element').

18. `css?: 'injected' | 'external' | 'none' | boolean` (por defecto: 'injected'):
    - injected: Los estilos CSS se inyectan en el JavaScript y se aplican en tiempo de ejecución.
    - external: El CSS se devuelve como un archivo separado en el resultado de la compilación, lo que mejora el rendimiento en grandes aplicaciones.
    - none: No se genera ningún CSS.
    
19. `loopGuardTimeout?: number` (por defecto: 0):
   - Establece un número en milisegundos para que Svelte interrumpa un bucle si bloquea el hilo principal por demasiado tiempo, útil para evitar bucles infinitos en desarrollo.

20. `namespace?: string` (por defecto: 'html'):
   - Especifica el espacio de nombres para los elementos, como "svg" o "mathml".

21. `cssHash?: CssHashGetter` (por defecto: undefined):
   - Una función que genera el nombre de clase para el CSS con scope basado en un hash del contenido CSS.

22. `preserveComments?: boolean` (por defecto: false):
   - Si es true, conserva los comentarios HTML durante el renderizado en el servidor.

23. `preserveWhitespace?: boolean` (por defecto: false):
   - Si es true, conserva los espacios en blanco dentro y entre los elementos HTML, en lugar de colapsarlos.

24. `discloseVersion?: boolean` (por defecto: true):
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


### 6.3 Obtención de hash CSS (CssHashGetter)
```sveltehtml
type CssHashGetter = (args: {
        name: string;
        filename: string | undefined;
        css: string;
        hash: (input: string) => string;
}) => string;
```
El tipo CssHashGetter en Svelte se refiere a una función que se utiliza para generar un nombre de clase CSS con un hash único. Esta función toma como entrada varios parámetros relacionados con el componente, el archivo CSS y el contenido, y devuelve una cadena de texto que representa el nombre de clase generado.

Este tipo es útil en Svelte para manejar el scoping de CSS (alcance de los estilos) de manera que los estilos aplicados a un componente no interfieran con los de otros componentes o partes de la página. El nombre de clase generado incluye un hash basado en el contenido CSS para asegurar que sea único.

La función CssHashGetter recibe un objeto con las siguientes propiedades:
- `name`: El nombre del componente o del archivo CSS.
- `filename`: El nombre del archivo CSS, si está disponible.
- `css`: El contenido CSS del componente.
- `hash`: Una función que toma una cadena de texto y devuelve un hash único. Esta función se utiliza para generar el hash que se agrega al nombre de clase CSS.
- La función CssHashGetter devuelve una cadena de texto que representa el nombre de clase CSS con el hash único incluido.
- Esta función es útil para generar nombres de clase CSS únicos y evitar conflictos de estilos en aplicaciones Svelte.
- El hash se basa en el contenido del CSS, lo que garantiza que el nombre de clase generado sea único para cada componente o archivo CSS.
- Al utilizar esta función, Svelte puede aplicar estilos de manera segura y evitar problemas de colisión entre los estilos de diferentes componentes.


Ejemplo de uso: Supongamos que tienes un componente Svelte con el siguiente contenido CSS:
```sveltehtml
<style>
.button {
   color: red;
}
</style>
```

El compilador Svelte genera automáticamente una clase CSS con un hash para que sea única, algo como:
```css
.button.svelte-123abc {
   color: red;
}
```

El CssHashGetter te permite personalizar cómo se genera ese hash y el nombre de la clase. Un ejemplo de cómo podrías implementar un CssHashGetter:
```js
const customCssHash: CssHashGetter = ({ name, filename, css, hash }) => {
   // Combina el nombre del componente con el hash del contenido CSS
   return `${name}-${hash(css)}`;
};
```
El propósito principal es garantizar que los nombres de clases sean únicos, evitando conflictos de estilo entre componentes, especialmente cuando diferentes componentes puedan tener nombres de clases similares.

### 6.4 EnableSourcemap
El tipo EnableSourcemap en Svelte se utiliza para configurar cómo se generan los sourcemaps (mapas de origen) durante el proceso de compilación. Un sourcemap es un archivo que asocia el código compilado (el JavaScript o CSS generado) con el código fuente original, lo que facilita la depuración, ya que permite rastrear los errores o advertencias en el código compilado hacia las líneas originales en el código fuente.

```sveltehtml
type EnableSourcemap = 
    | boolean
    | { js: boolean; css: boolean };
```
Los sourcemaps son cruciales en el desarrollo porque permiten depurar el código compilado. Si tu código fuente es transformado (por ejemplo, desde Svelte a JavaScript estándar), los mapas de origen permiten rastrear los errores o advertencias que ocurren en el código transformado y ver de dónde provienen en el código fuente original.

Ejemplo:
```js
enableSourcemap: { js: true, css: false }  // Sourcemaps solo para JavaScript
```
En este caso, se generan sourcemaps solo para el código JavaScript, pero no para el CSS. Esto puede ser útil si solo necesitas depurar el JavaScript y no el CSS en la aplicación.

### 6.5 MarkupPreprocessor
El MarkupPreprocessor en Svelte es un tipo de preprocesador que se utiliza para manipular o transformar el contenido completo de un archivo Svelte antes de que sea compilado. Este preprocesador recibe el contenido de todo el archivo como una cadena de texto y puede devolver una versión modificada de ese contenido.

```sveltehtml
type MarkupPreprocessor = (options: {
    <!--The whole Svelte file content-->
    content: string;

    <!--The filename of the Svelte file-->
    filename?: string;
}) => Processed | void | Promise<Processed | void>;
```

Este tipo define una función que recibe un objeto con dos propiedades:
- `content: string`: El contenido completo del archivo Svelte (todo el código HTML, <script>, <style>, etc.).
- `filename?: string`: El nombre del archivo Svelte que se está procesando (opcional).

La función puede devolver uno de los siguientes valores:
- `Processed`: Un objeto que contiene el código transformado y, opcionalmente, un sourcemap.
- `void`: Si no se devuelve nada, significa que el contenido no fue modificado.
- `Promise<Processed | void>`: La función también puede devolver una promesa, lo que permite hacer operaciones asíncronas dentro del preprocesador (por ejemplo, cargar o procesar archivos externos). La promesa puede resolver a un objeto Processed o a void.

Ejemplo básico de un MarkupPreprocessor: Imaginemos que queremos escribir un preprocesador que busque y reemplace todas las ocurrencias de la palabra "foo" en el código por "bar". Devuelve un objeto Processed con el contenido modificado:
```js
const markupPreprocessor = ({ content, filename }) => {
  // Reemplaza todas las ocurrencias de 'foo' por 'bar'
  const modifiedContent = content.replace(/foo/g, 'bar');
  
  // Devuelve el contenido modificado
  return { code: modifiedContent };
};
```

### 6.6 Preprocessor
Un Preprocessor en Svelte es una función que se utiliza para procesar el contenido de las etiquetas <script> o <style> en un archivo Svelte antes de que se compile. Esta función recibe varios datos relacionados con la etiqueta que se va a procesar y devuelve una versión procesada del contenido.

**Ejemplo de uso:** Un preprocesador de Sass podría transformar el contenido del bloque <style lang="scss"> a CSS antes de que Svelte compile el componente. Para crear un preprocesador de Sass que transforme el contenido del bloque <style lang="scss"> a CSS en un archivo Svelte antes de que se compile, puedes usar la función preprocess() de Svelte junto con la librería sass para realizar la conversión.
1. Instala la librería sass:
```cmd
npm install sass
```

2. Define el preprocesador de Sass: Implementamos un preprocesador para convertir Sass a CSS antes de que Svelte compile el archivo:
```js
import sass from 'sass';  // Importa la librería Sass
import { preprocess } from 'svelte/compiler';

const sassPreprocessor = {
  style: async ({ content, attributes, filename }) => {
    // Solo procesa bloques <style lang="scss">
    if (attributes.lang !== 'scss') return;

    try {
      const result = sass.renderSync({
        data: content, // El contenido del <style>
        file: filename, // El nombre del archivo para mejor manejo de errores
        includePaths: ['src'], // Rutas adicionales que Sass podría necesitar
      });

      return {
        code: result.css.toString(), // Devuelve el CSS transformado
        map: result.map?.toString(), // Si Sass generó un source map
      };
    } catch (err) {
      console.error('Error compilando Sass:', err);
    }
  },
};

// Exporta el preprocesador
export default {
  preprocess: [sassPreprocessor],
};
```

- `sass.renderSync()`: Esta función de sass toma el contenido de Sass y lo convierte en CSS. El código CSS resultante se devuelve en result.css.toString().
- `attributes.lang !== 'scss'`: Se verifica si el bloque `<style>` tiene el atributo `lang="scss"` para asegurarse de que solo se procese Sass.
- `includePaths: ['src']`: Esta opción permite especificar rutas adicionales para Sass, donde buscar archivos parciales o mixins. Aquí podemos ajustar según la estructura de tu proyecto.
- Devuelve `code` y `map`: Devuelve el código CSS compilado y el source map (si se generó), lo que facilita la depuración.

3. Integración con Svelte: Este preprocesador debe integrarse en la configuración de Svelte, dependiendo del bundler que estés usando (por ejemplo, Vite o Rollup). A continuación, se muestra cómo integrar el preprocesador en un proyecto Svelte con Vite:
```js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import sassPreprocessor from './path-to-preprocessor-file';  // Importa tu preprocesador de Sass

export default defineConfig({
  plugins: [
    svelte({
      preprocess: sassPreprocessor  // Usa el preprocesador de Sass
    }),
  ],
});
```


### 6.7 PreprocessorGroup
Un PreprocessorGroup en Svelte es un conjunto de preprocesadores que se aplican a un archivo Svelte para procesar diferentes partes del archivo antes de su compilación. Este grupo puede incluir preprocesadores para el marcado HTML, los estilos CSS y el código JavaScript.

Componentes principales del PreprocessorGroup:
- `name?: string`: El nombre del grupo de preprocesadores. Actualmente es opcional, pero será obligatorio en la próxima versión importante de Svelte.
- `markup?: MarkupPreprocessor`: Un preprocesador para el marcado HTML del archivo Svelte (el contenido total del archivo, incluyendo las etiquetas `<script>`, `<style>`, y HTML).
- `style?: Preprocessor`: Un preprocesador para los bloques de estilo (`<style>`) dentro del archivo Svelte. Se utiliza para procesar estilos como Sass, Less, etc.
- `script?: Preprocessor`: Un preprocesador para los bloques de script (`<script>`) en el archivo Svelte. Se puede utilizar para procesar TypeScript o cualquier otro lenguaje de scripts.

Uso: Un PreprocessorGroup permite combinar estos tres tipos de preprocesadores (markup, style y script) en un solo objeto, lo que facilita el procesamiento de diferentes partes del archivo Svelte de manera organizada.

Por ejemplo, un grupo de preprocesadores puede tener un preprocesador de Sass para los estilos y otro de TypeScript para los scripts.

### 6.8 Processed
Processed es una interfaz que define el resultado de la ejecución de un preprocesador en Svelte. Si un preprocesador devuelve un objeto Processed, indica que el código ha sido transformado de alguna manera. Si no devuelve nada, se asume que el código no ha cambiado.

Componentes principales de Processed:
- `code: string`: El nuevo código resultante después de que el preprocesador haya aplicado sus transformaciones.
- `map?: string | object`: Un sourcemap opcional que relaciona el código transformado con el código fuente original. Esto facilita la depuración permitiendo rastrear los cambios.
- `dependencies?: string[]`: Una lista opcional de archivos adicionales que el compilador debe observar en busca de cambios. Es útil si el preprocesador depende de otros archivos (como archivos parciales de Sass).
- `attributes?: Record<string, string | boolean>`: Solo para los preprocesadores de `<script>`` y `<style>`. Indica los atributos actualizados que deben establecerse en la etiqueta. Si no se devuelve nada, los atributos permanecen sin cambios.
- `toString?: () => string`: Una función opcional que devuelve una representación en cadena del objeto Processed.

El objeto Processed contiene el código transformado, un sourcemap opcional, archivos adicionales que deben observarse y atributos actualizados (para `<script>` y `<style>`). Si un preprocesador modifica el código, devolverá este objeto para que los cambios se apliquen en el proceso de compilación de Svelte.

### 6.9 SveltePreprocessor
La interfaz SveltePreprocessor es un tipo utilitario en Svelte que se utiliza para extraer el tipo de un preprocesador a partir de un grupo de preprocesadores (PreprocessorGroup). Permite tipificar el preprocesador específico que quieres extraer del grupo, como los preprocesadores para markup, `style` o `script`.

Desglose de SveltePreprocessor:
```sveltehtml
interface SveltePreprocessor<
    PreprocessorType extends keyof PreprocessorGroup,
    Options = any
> {
        (options?: Options): Required<Pick<PreprocessorGroup, PreprocessorType>>;
}
```

SveltePrepocessor  es útil cuando necesitas extraer y tipificar un preprocesador específico de un grupo de preprocesadores. Permite asegurarte de que el preprocesador que estás utilizando sigue la estructura correcta de acuerdo con la clave de preprocesador que selecciones (`markup`, `style`, o `script`).


# Poceso de transpilación del compilador de Svelte
¿Cómo se transforman los componentes Svelte en código JavaScript optimizado?

Como desarrolladores, normalmente no tendremos que usar el compilador de Svelte de manera manual o directa. Svelte es un compilador que transforma los componentes Svelte en Vanilla JavaScript, que luego puede ser directamente ejecutado por los navegadores.

En lugar de compilar manualmente nuestros archivos Svelte, usamos un plugin dentro de nuestro bundler (como Vite o Webpack) que se encarga de invocar al compilador de Svelte automáticamente cuando sea necesario. Estos plugins son responsables de transformar nuestros componentes de Svelte en un formato que los navegadores puedan entender.

El equipo de Svelte recomienda el plugin para Vite llamado `vite-plugin-svelte`. Vite es una herramienta moderna de desarrollo que ofrece compilaciones rápidas y es muy eficiente. Este plugin permite integrar Svelte fácilmente con Vite y simplifica el proceso de construcción de aplicaciones.

Si no quieres usar Vite, hay otros plugins disponibles para integrarse con otras herramientas populares de construcción como Rollup y Webpack. La comunidad de Svelte mantiene una lista de estos plugins.

## Esquema del Proceso de Transpilación en Svelte
### 1. Entrada: Componente Svelte: Archivos con extensión `.svelte` que contienen:
   - HTML: Estructura del componente.
   - CSS: Contiene los estilos específicos del componente, generalmente encapsulados para que no afecten a otros componentes.
   - JavaScript: Define la lógica del componente, incluidas variables reactivas, eventos, y funciones.

### 2. La función `compile()`: El compilador de Svelte toma el código fuente del componente y lo transforma en un objeto CompileResult que contiene:
   - Código JavaScript: El código JavaScript optimizado que representa el componente.
   - Código CSS: Los estilos CSS generados a partir de los estilos definidos en el componente.
   - Árbol de Sintaxis Abstracta (AST): Una representación estructurada del código fuente del componente.
   - Advertencias: Posibles problemas o errores detectados durante la compilación.
   - Variables: Información sobre las variables declaradas en el componente.
   - Estadísticas: Datos de tiempo de compilación.

>![Important]  
> El compilador transforma el código fuente en un módulo JavaScript que exporta una clase. Esa clase es la que usará el navegador para crear y manejar el componente en la aplicación.  
> La compilación convierte el código Svelte en un módulo JavaScript. Este módulo contendrá una clase que representa el componente y que se podrá instanciar en el navegador o en otro entorno.

### 3. Análisis Sintáctico (Parsing):
La función parse() en el contexto del compilador de Svelte se usa para analizar el código fuente de un componente y devolver su árbol de sintaxis abstracta (AST, por sus siglas en inglés). El AST es una representación estructurada del código que permite entender su organización y contenido a nivel sintáctico, pero sin llegar a compilar o validar el código. Solo se enfoca en analizar y estructurar el código en un formato de árbol. Este AST incluye la representación del HTML, CSS y JavaScript del componente.

**Advertencia sobre el AST:** El AST devuelto por parse() no es una API pública oficial, lo que significa que la forma y estructura del árbol pueden cambiar en futuras versiones del compilador de Svelte. Es importante tener esto en cuenta si quieres usar el AST directamente en el código, ya que esos cambios pueden romper la implementación en el futuro.

### 4. Transformación:
El AST es transformado y optimizado. Esto puede incluir:
   - Eliminación de código muerto: Svelte detecta y elimina código que no es necesario para la ejecución.
   - Reorganización de la lógica para mejorar la eficiencia del código generado, como reducir el número de actualizaciones del DOM.

### 5. Generación de Código:
Se genera el código JavaScript a partir del nuevo AST optimizado, que incluye:
   - Funciones reactivas que permiten manejar el estado del componente y las actualizaciones automáticas del DOM cuando el estado cambia.
   - Manipulación directa del DOM utilizando la API optimizada de Svelte, que evita el uso de virtual DOM (a diferencia de React o Vue).
   - Código necesario para no depender de librerías externas ni de versiones.

### 6. Salida 🠮 Código JavaScript:
El resultado final es un archivo JavaScript (normalmente un archivo .js) que puede ejecutarse en el navegador o en entornos como Node.js. Este archivo contiene todo lo necesario para renderizar el componente Svelte y manejar la lógica reactiva.


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
- En este paso de Transpilación (cuando se ejecuta el Compilador de Svelte), Svelte **inyecta el código necesario para:**
  - manejar la reactividad y los cambios en el DOM, sin depender de un runtime como React.
  - no depender de librerías externas ni de versiones**. 
- Aquí radica una de las diferencias clave de Svelte frente a frameworks como React o Vue. Mientras que React y Vue tienen un "runtime" que se carga junto con la aplicación para gestionar el estado y el DOM, **Svelte genera todo el código necesario en tiempo de compilación**, lo que hace que la aplicación final sea más ligera y eficiente.

## 3. Bundler (Webpack, Rollup, Vite, etc.):
- El bundler se encarga de agrupar los archivos JavaScript, CSS y otros recursos en un paquete o varios archivos optimizados.
- En este punto, el código JavaScript ya ha sido generado y optimizado por el compilador de Svelte.
- El bundler también puede aplicar optimizaciones adicionales, como la minificación del código y tree shaking (eliminar código no utilizado) para generar archivos más pequeños y rápidos de cargar..

## 4. Código ejecutable por el navegador:
- El código JavaScript empaquetado (el resultado del bundler) es directamente ejecutable por el navegador. 
- No hay una segunda fase de transpilación o bundling. El navegador simplemente carga y ejecuta el código JavaScript generado previamente.
- Sin runtime adicional: Esta es una característica clave de Svelte. A diferencia de frameworks como React o Vue, no hay un runtime adicional que se cargue en el navegador para gestionar la lógica del framework. Todo el código necesario para la reactividad y la actualización del DOM ya se ha generado en tiempo de compilación.

````cmd
Componente Svelte ➝ Transpilación (Svelte Compiler) ➝ Código optimizado en JavaScript vanilla ➝
Bundler ➝ Código ejecutable por el navegador
````

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
