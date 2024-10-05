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

