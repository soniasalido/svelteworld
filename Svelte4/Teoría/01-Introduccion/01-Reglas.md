# Existen cuatro reglas básicas que debemos seguir al escribir componentes en Svelte:
## 1. Export crea una prop (propiedad) de componente:
Svelte usa la palabra clave export para marcar una declaración de variable como una prop o propiedad, lo que significa que se vuelve accesible para los consumidores del componente.
  ```html
    <script>
        export let name = 'world';
    </script>
  ```
Podemos especificar un valor inicial predeterminado para una propiedad. Se utilizará si el consumidor del componente no especifica la propiedad en el componente (o si su valor inicial no está definido) al crear una instancia del componente. Hay que tener en cuenta que siempre que el consumidor elimine una propiedad, su valor se establecerá en undefined en lugar del valor inicial.

En el modo de desarrollo, se imprimirá una advertencia si no se proporciona un valor inicial predeterminado y el consumidor no especifica un valor. Para eliminar esta advertencia, asegúrese de que se especifique un valor inicial predeterminado, incluso si no está definido.

### Exportar constantes, clases o funciones:
Cuando exportas una constante, clase o función en Svelte, esta se convierte en parte de la API pública del componente. Sin embargo, al hacerlo, estas propiedades son de solo lectura desde fuera del componente, lo que significa que no pueden ser modificadas directamente desde otro componente o desde el código que consume el componente.

### Propiedades de solo lectura y bind:this
Las propiedades que exportas desde un componente pueden ser accedidas desde fuera del componente usando la sintaxis bind:this, la cual vincula una referencia del componente a una variable en el código que lo consume. Esta vinculación permite acceder a las propiedades de solo lectura como propiedades del elemento del componente.

### Expresiones de función como propiedades válidas
Aunque las propiedades exportadas son de solo lectura, esto no impide que se puedan exportar expresiones de función como propiedades válidas. Esto significa que podemos definir funciones dentro del componente y exportarlas para que sean usadas externamente.

## 2. Las Asignaciones son REACTIVAS.
En Svelte, la reactividad es uno de los pilares fundamentales del framework, y se maneja de manera muy directa y sencilla. A diferencia de otros frameworks donde necesitas métodos específicos para actualizar el estado y disparar una nueva representación (render), en Svelte esto se logra simplemente asignando un nuevo valor a una variable local.

Svelte inyecta el código que invalida el estado actual y realiza una actualización del estado por las asignaciones.

Cuando se hace una asignación, Svelte sabe que eso es  un estado y que debe ser reactiva. Por lo tanto, cuando se asigna un nuevo valor a una variable, Svelte detecta el cambio y automáticamente vuelve a renderizar el componente para reflejar el nuevo valor en el DOM.


### Cambiar el estado del componente
Para cambiar el estado de un componente en Svelte y activar una nueva representación (render), simplemente necesitamos asignar un nuevo valor a una variable local que esté declarada en el script del componente. Esta asignación es suficiente para que Svelte detecte el cambio y vuelva a renderizar la parte del DOM que depende de esa variable.
```sveltehtml
<script>
  let count = 0;

  function increment() {
    count += 1;  // Simplemente actualizar la variable provoca la reactividad
  }
</script>

<button on:click={increment}>
  Clicked {count} times
</button>
```
En este ejemplo:
- count es una variable local declarada en el script del componente.
- Cada vez que haces count += 1, Svelte detecta el cambio en count y automáticamente vuelve a renderizar el componente para reflejar el nuevo valor en el DOM.

### Expresiones de actualización y asignaciones de propiedades
Svelte también trata las expresiones de actualización y las asignaciones de propiedades de la misma manera en términos de reactividad.
- Expresiones de actualización: Una expresión de actualización es algo como count += 1, que es simplemente una manera abreviada de escribir count = count + 1. Cualquier actualización de este tipo en Svelte es reactiva.
- Asignaciones de propiedades en objetos: Svelte también es capaz de detectar cambios cuando asignas un valor a una propiedad de un objeto.

```sveltehtml
<script>
  let person = { name: 'Alice' };

  function changeName() {
    person.name = 'Bob';  // Cambiar una propiedad de un objeto también es reactiva
  }
</script>

<button on:click={changeName}>
  Change name to {person.name}
</button>
```

### Efecto en la reactividad
El resultado de esta característica es que Svelte hace que la reactividad sea natural y automática. No necesitas llamar a métodos especiales como setState (como en React) o declarar observadores explícitos. Simplemente modificas las variables o propiedades, y Svelte se encarga de actualizar la UI en consecuencia.

### Métodos que mutan matrices u objetos no son reactivos
Es importante tener en cuenta que los métodos que mutan matrices u objetos, como push, pop, shift, unshift, splice, sort, reverse, y métodos similares, no son reactivos en Svelte. Esto significa que si necesitas modificar una matriz u objeto y que la modificación sea reactiva, debes hacerlo de una manera que Svelte pueda detectar el cambio.

```sveltehtml
<script>
  let numbers = [1, 2, 3];

  function addNumber() {
    numbers.push(4);  // Esto no es reactiva
  }

  function addNumberReactive() {
    numbers = [...numbers, 4];  // Esto es reactiva
  }
  
    function addNumberReactive2() {
        numbers = numbers.concat(4);  // Esto es reactiva
    }
</script>

<button on:click={addNumber}>
  Add number (not reactive)
</button>

<button on:click={addNumberReactive}>
  Add number (reactive)
</button>

<button on:click={addNumberReactive2}>
  Add number (reactive)
</button>
```

Otro Ejemplo:
```sveltehtml
<script>
	let arr = [0, 1];

	function handleClick () {
		// this method call does not trigger an update
		arr.push(2);
		// this assignment will trigger an update
		// if the markup references `arr`
		arr = arr
	}
</script>

<button on:click={handleClick}>
    Push 2
</button>
```


## 3. $: Marca una declaración (statement) como reactiva.
### ¿Qué son las declaraciones reactivas?  
Las declaraciones reactivas en Svelte te permiten hacer que cualquier declaración de nivel superior (es decir, fuera de funciones o bloques) se vuelva reactiva. Esto significa que Svelte reevaluará y ejecutará automáticamente estas declaraciones cada vez que cambien los valores de las variables de las que dependen.

### Sintaxis de las declaraciones reactivas
La sintaxis para crear una declaración reactiva en Svelte es muy simple: se antepone la etiqueta $: a una expresión o declaración. Esto convierte esa línea de código en una declaración reactiva.
```js
$:{
    // declaraciones reactivas
    console.log('Count:', count);
}
```
Los valores que aparecen directamente dentro del bloque $: se convertirán en dependencias de la declaración reactiva. En el ejemplo anterior. cada vez que count cambie, Svelte ejecutará la declaración reactiva y actualizará el valor de count en la consola.

Si el bloque de código reactivo tiene sólo una línea, puedes omitir las llaves y la declaración de return. Si el bloque de código reactivo tiene más de una línea, debes usar llaves y la declaración de return.
```sveltehtml
$: console.log('Count:', count);
```


### Funcionamiento de las declaraciones reactivas
- Dependencias automáticas: Svelte detecta automáticamente las dependencias de una declaración reactiva.
- Ejecución: La declaración reactiva se ejecuta cada vez que cualquiera de sus dependencias cambia.
- Orden de ejecución: Las declaraciones reactivas se ejecutan inmediatamente antes de que el componente se actualice en el DOM, asegurando que la UI siempre refleje los valores más recientes.



### Declaración reactiva a una variable que no ha sido declarada
Supongamos que en nuestro código Svelte tenemos una declaración reactiva que intenta asignar un valor a una variable que no hemos declarado explícitamente con let, const o var. Svelte es lo suficientemente inteligente como para darse cuenta de que esta variable necesita existir, y automáticamente declara la variable por nosotros usando let.
```sveltehtml
<script>
  let a = 1;
  let b = 2;

  // No declaramos 'sum', pero Svelte lo hará automáticamente
  $: sum = a + b;
</script>

<p>The sum is {sum}</p>
```

### Declaracion Inline Reactiva
En Svelte, puedes crear declaraciones reactivas en línea, lo que significa que puedes usar la sintaxis de declaración reactiva directamente en el marcado del componente. Esto es útil cuando quieres mostrar un valor calculado en el marcado sin tener que declararlo explícitamente en el script del componente.
```sveltehtml
<script>
  let a = 1;
  let b = 2;
</script>

<p>The sum is {$: a + b}</p>
```

Otro ejemplo:
```sveltehtml
let counter = 0;
$: doubled = counter * 2;
```

Este ejemplo, si lo pasamos con las llaves {} en el marcado, se vería así:
```sveltehtml
let counter = 0;
$: {
    doubled = counter * 2;
}
```
En este ejemplo, al dejar de ser inline, deja de ser declaracion reactiva y se convierte en un bloque de código reactivo. Esto provocaría un ERROR ya que es necesario declarar la variable doubled antes de asignarle un valor. 
```sveltehtml
let counter = 0;
let doubled;
$: {
    doubled = counter * 2;
}
```


### Declaraciones reactivas con múltiples dependencias
Las declaraciones reactivas en Svelte pueden tener múltiples dependencias. Esto significa que puedes usar más de una variable en una declaración reactiva y Svelte se encargará de rastrear todas las dependencias y actualizar la declaración cuando cualquiera de las dependencias cambie.
```sveltehtml
<script>
  let a = 1;
  let b = 2;

  $: sum = a + b;
  $: product = a * b;
</script>

<p>The sum is {sum}</p>
<p>The product is {product}</p>
```

### Declaraciones reactivas con expresiones condicionales
Las declaraciones reactivas en Svelte también pueden contener expresiones condicionales. Esto significa que puedes usar operadores ternarios u otras expresiones condicionales en una declaración reactiva para calcular un valor basado en una condición.
```sveltehtml
<script>
  let count = 0;

  $: message = count === 1 ? 'time' : 'times';
</script>

<p>Clicked {count} {message}</p>
```

### Declaraciones reactivas con funciones
Las declaraciones reactivas en Svelte también pueden contener llamadas a funciones. Esto significa que puedes llamar a funciones dentro de una declaración reactiva para calcular un valor basado en el resultado de la función.
```sveltehtml
<script>
  let count = 0;

  function getMessage() {
    return count === 1 ? 'time' : 'times';
  }

  $: message = getMessage();
</script>

<p>Clicked {count} {message}</p>
```

### Declaraciones reactivas con funciones flecha
Las declaraciones reactivas en Svelte también pueden contener funciones flecha. Esto significa que puedes usar funciones flecha en lugar de funciones regulares para calcular un valor basado en una condición.
```sveltehtml
<script>
  let count = 0;

  const getMessage = () => count === 1 ? 'time' : 'times';

  $: message = getMessage();
</script>

<p>Clicked {count} {message}</p>
```


### Declaraciones reactivas con operadores lógicos
Las declaraciones reactivas en Svelte también pueden contener operadores lógicos. Esto significa que puedes usar operadores lógicos como &&, ||, y ! en una declaración reactiva para calcular un valor basado en una condición.
```sveltehtml
<script>
  let count = 0;

  $: isPositive = count > 0;
</script>

<p>Is count positive? {isPositive ? 'Yes' : 'No'}</p>
```

### Declaraciones reactivas con operadores aritméticos
Las declaraciones reactivas en Svelte también pueden contener operadores aritméticos. Esto significa que puedes usar operadores aritméticos como +, -, *, y / en una declaración reactiva para calcular un valor basado en una expresión matemática.
```sveltehtml
<script>
  let a = 10;
  let b = 5;

  $: sum = a + b;
  $: difference = a - b;
  $: product = a * b;
  $: quotient = a / b;
</script>

<p>Sum: {sum}</p>
<p>Difference: {difference}</p>
<p>Product: {product}</p>
<p>Quotient: {quotient}</p>
```

### Declaraciones reactivas con operadores de comparación
Las declaraciones reactivas en Svelte también pueden contener operadores de comparación. Esto significa que puedes usar operadores de comparación como ===, !==, <, >, <=, y >= en una declaración reactiva para calcular un valor basado en una comparación.
```sveltehtml
<script>
  let a = 10;
  let b = 5;

  $: isEqual = a === b;
  $: isNotEqual = a !== b;
  $: isGreater = a > b;
  $: isLess = a < b;
  $: isGreaterOrEqual = a >= b;
  $: isLessOrEqual = a <= b;
</script>

<p>Is equal? {isEqual ? 'Yes' : 'No'}</p>

<p>Is not equal? {isNotEqual ? 'Yes' : 'No'}</p>

<p>Is greater? {isGreater ? 'Yes' : 'No'}</p>

<p>Is less? {isLess ? 'Yes' : 'No'}</p>

<p>Is greater or equal? {isGreaterOrEqual ? 'Yes' : 'No'}</p>

<p>Is less or equal? {isLessOrEqual ? 'Yes' : 'No'}</p>
```

### Declaraciones reactivas con operadores de asignación

Las declaraciones reactivas en Svelte también pueden contener operadores de asignación. Esto significa que puedes usar operadores de asignación como +=, -=, *=, y /= en una declaración reactiva para actualizar una variable basada en una operación aritmética.
```sveltehtml
<script>
  let count = 0;

  $: count += 1;
</script>

<p>Count: {count}</p>
```

### Declaraciones reactivas con operadores de incremento y decremento
Las declaraciones reactivas en Svelte también pueden contener operadores de incremento y decremento. Esto significa que puedes usar operadores de incremento (++) y decremento (--) en una declaración reactiva para aumentar o disminuir el valor de una variable.
```sveltehtml
<script>
  let count = 0;

  $: count++;
</script>

<p>Count: {count}</p>
```




## 4. Antepon a los stores el signo $ para acceder a sus valores.

### ¿Qué son los stores en Svelte?
Los stores en Svelte son objetos reactivos que permiten compartir y gestionar el estado de la aplicación entre componentes. Los stores son una forma de almacenar y compartir datos de manera global en una aplicación Svelte, lo que los hace útiles para compartir datos entre componentes que no tienen una relación directa entre sí.

Un Store es una característica que permite manejar el estado compartido de manera reactiva entre diferentes componentes. Los stores son especialmente útiles cuando necesitas compartir datos entre múltiples componentes sin tener que pasar los valores a través de propiedades (props) manualmente.

Un store es un contenedor reactivo para un valor, que puede ser utilizado por diferentes partes de nuestra aplicación. Cuando el valor dentro de un store cambia, todos los lugares que están utilizando ese valor se actualizan automáticamente.

### Acceder a los valores de los stores
Para acceder a los valores de un store en Svelte, simplemente usamos el prefijo `$` seguido del nombre del store. Esto nos permite acceder a los valores de los stores en cualquier parte de nuestro componente, incluyendo declaraciones reactivas, funciones, y el marcado.

```sveltehtml
<script>
  import { writable } from 'svelte/store';

  // Creamos un store con un valor inicial de 0
  let count = writable(0);

  function increment() {
  count.update(n => n + 1);
}
</script>

<!-- Usamos el prefijo $ para acceder al valor del store -->
<p>Current count: {$count}</p>
<button on:click={increment}>Increment</button>

```

###  Prefix stores with $ to access their values
Un store es un objeto que permite el acceso reactivo a un valor a través de un simple contrato de store. El módulo svelte/store contiene implementaciones mínimas de stores que cumplen con este contrato.

Cada vez que tienes una referencia a un store, puedes acceder a su valor dentro de un componente anteponiéndole el carácter $. Esto hace que Svelte declare la variable con el prefijo $, se suscriba a la store durante la inicialización del componente y se desuscriba cuando sea apropiado.

Las asignaciones a variables con prefijo $ requieren que la variable sea un store escribible, y resultarán en una llamada al método .set de la store.

Ten en cuenta que la store debe declararse en el nivel superior del componente — no dentro de un bloque if o una función, por ejemplo.

Las variables locales (que no representan valores de store) no deben tener un prefijo $.

### ¿Qué hace exactamente el prefijo $?
Cuando usas el prefijo $ antes de un store en Svelte:
- Acceso automático al valor: Svelte automáticamente accede al valor contenido en el store sin necesidad de llamar explícitamente a métodos como .get().
- Reactividad automática: Svelte reactiva cualquier parte del DOM que dependa de un store, lo que significa que cualquier cambio en el valor del store actualiza automáticamente la UI donde se esté utilizando ese valor.

Sin el prefijo $:
- Si usas un store sin el prefijo $, estarías manipulando el store como objeto, no el valor que contiene.

```sveltehtml
<script>
  import { writable } from 'svelte/store';

  let count = writable(0);

  function increment() {
    count.update(n => n + 1);
  }

  // Esto es incorrecto si lo que quieres es mostrar el valor del store
  // No hace lo mismo que {$count}
  // Simplemente mostraría que count es un objeto, no el valor almacenado.
  // <p>Current count: {count}</p>
</script>
```
