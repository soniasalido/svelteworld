La reactividad en Svelte se refiere a la capacidad de los componentes de actualizarse automáticamente cuando los datos cambian. Esto se logra a través del sistema de reactividad de Svelte, que detecta los cambios en las variables y actualiza automáticamente los componentes afectados.


# Mecanismos que Svelte 5 ofrece para manejar la reactividad.

## 1. Reactividad Básica con Variables Reactivas
En Svelte, la reactividad se basa en la detección de cambios en las variables. Cuando una variable cambia, Svelte automáticamente actualiza el DOM para reflejar ese cambio.
```sveltehtml
<script>
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<button on:click={increment}>
  Increment
</button>
<p>The count is {count}</p>
```

En este ejemplo:
- `let count = 0;` define una variable reactiva.
- `{count}` en el HTML se actualiza automáticamente cuando count cambia, gracias a la reactividad de Svelte.
- `increment()` modifica la variable count, y Svelte automáticamente actualiza la parte del DOM que depende de count.

## 2. Reactividad con Runa {$} (Declaraciones Reactivas)
Svelte 5 permite usar la runa {$} para crear declaraciones reactivas, lo que significa que el código se re-ejecutará automáticamente cuando las variables de las que depende cambien.
```sveltehtml
<script>
    let count = 0;
    let doubled;

    $: doubled = count * 2;
</script>

<button on:click={() => count += 1}>
    Increment
</button>
<p>The count is {count}</p>
<p>The doubled count is {doubled}</p>
```

En este ejemplo:
- `$: doubled = count * 2;` es una declaración reactiva que recalcula doubled cada vez que count cambia.
- La variable `doubled` se actualizará automáticamente, y cualquier lugar en el DOM que la use también se actualizará.


## 3. Reactividad Derivada (Stores)
En Svelte, los stores son otra forma de manejar la reactividad, especialmente cuando necesitas compartir estado entre varios componentes. Svelte 5 sigue utilizando stores de manera similar a versiones anteriores.
```sveltehtml
// store.js
import { writable } from 'svelte/store';

export const count = writable(0);
```

```sveltehtml
<script>
    import { count } from './store.js';
</script>

<button on:click={() => $count.update(n => n + 1)}>
    Increment
</button>
<p>The count is {$count}</p>
```

En este ejemplo:
- `writable(0)` crea un store que contiene un valor inicial de 0.
- `$count` desestructura automáticamente el valor del store para hacerlo reactivo en el componente.
- `$count.update(n => n + 1)` es una forma reactiva de actualizar el valor del store.


## 4. Reactividad Avanzada con Desestructuración Reactiva
Svelte 5 introduce mejoras en la reactividad, incluyendo la capacidad de desestructurar valores reactivamente.
```sveltehtml
<script>
    let user = { name: 'Alice', age: 30 };

    $: ({ name, age } = user);
</script>

<p>Name: {name}</p>
<p>Age: {age}</p>
```

En este ejemplo:
- `$: ({ name, age } = user);` es una declaración reactiva que desestructura user en name y age.
- Cuando `user` cambia, las variables `name` y `age` se actualizan automáticamente.



## 5. Reactividad con Contexto
Svelte 5 también admite la reactividad en el contexto, lo que permite compartir datos entre componentes de forma reactiva.
```sveltehtml
// App.svelte
<script>
    import { setContext, getContext } from 'svelte';
    const context = writable('default');
    setContext('key', context);
</script>

<Child />
```

```sveltehtml
// Child.svelte
<script>
    import { getContext } from 'svelte';
    const context = getContext('key');
</script>

<p>Context: {$context}</p>
```

En este ejemplo, `setContext` y `getContext` permiten compartir datos de forma reactiva entre componentes.



## 6. Reactividad con la runa $props()
En Svelte, los props también son reactivos, lo que significa que los componentes se actualizan automáticamente cuando los props cambian.
```sveltehtml
// Child.svelte
<script>
    const { message, count } = $props();
</script>

<p>Message: {message}</p>
<p>Count: {count}</p>
```

```sveltehtml
// Parent.svelte
<script>
    import Child from './Child.svelte';
    let message = 'Hello';
    let count = 0;
</script>

<Child message={message} count={count} />
```

Aquí, `$props()` proporciona un objeto reactivo que contiene todas las propiedades pasadas al componente, permitiendo que la UI se actualice automáticamente cuando estas cambian.


## 7. Reactividad con la runa $state()
En Svelte 5, la runa $state() introduce una forma novedosa y poderosa de manejar la reactividad, permitiendo que los desarrolladores trabajen con un estado reactivo de manera más explícita y controlada.

### ¿Qué es $state() en Svelte 5?
La runa $state() es una función que permite crear un objeto de estado reactivo. Este objeto encapsula el estado del componente y permite que los cambios en sus propiedades se reflejen automáticamente en el DOM. Al modificar las propiedades del objeto retornado por $state(), Svelte detecta estos cambios y actualiza la UI en consecuencia.

### Sintaxis Básica y Uso
```sveltehtml
<script>
    const state = $state({ count: 0, message: 'Hello, Svelte 5!' });

    function increment() {
        state.count += 1;
    }
</script>

<button on:click={increment}>
    Increment
</button>
<p>{state.message}</p>
<p>Count is: {state.count}</p>
```
En este ejemplo:
- `$state({ count: 0, message: 'Hello, Svelte 5!' })` crea un objeto de estado reactivo con dos propiedades: count y message.
- `state.count += 1;` incrementa el valor de count. Debido a la naturaleza reactiva del objeto state, cualquier cambio en state.count hace que el DOM se actualice automáticamente.
- `{state.message}` y `{state.count}` en el HTML se actualizan automáticamente cuando cambian las propiedades message y count del estado.

### Ventajas de $state()
- Encapsulación del Estado: $state() permite encapsular todo el estado de un componente en un solo objeto, lo que puede hacer que la gestión del estado sea más organizada y menos propensa a errores.
- Simplicidad y Limpieza: En lugar de tener múltiples variables reactivas separadas, podemos agruparlas dentro de un solo objeto de estado, simplificando el código y haciéndolo más legible.
- Fácil Migración: Podemos migrar fácilmente proyectos anteriores a Svelte 5 usando $state() para gestionar el estado, lo que facilita la transición a nuevas versiones sin necesidad de reestructurar completamente el código.


Ejemplo de cómo crear un input y mostrar su valor en Svelte 5, con la runa `$state()`:
```sveltehtml
<script>
    let value = $state("Default");
</script>

<input type="text" bind:value={value} />
<p>El valor del input es: {value}</p>
```
En este ejemplo, el valor "Default" que pasamos a $state es el valor inicial. La llamada bind:value no tiene que cambiar en absoluto: Svelte sabe cómo usar una runa en ese contexto.


### Reactividad Derivada con $state()
Además de manejar variables de estado simples, puedes utilizar $state() para gestionar reactividad derivada, donde una propiedad del estado depende de otra.
```sveltehtml
<script>
    const state = $state({ count: 0, doubled: 0 });

    $: state.doubled = state.count * 2;

    function increment() {
        state.count += 1;
    }
</script>

<button on:click={increment}>
    Increment
</button>
<p>Count is: {state.count}</p>
<p>Doubled count is: {state.doubled}</p> 
```

En este ejemplo:
- `$: state.doubled = state.count * 2;` es una declaración reactiva que recalcula state.doubled cada vez que state.count cambia.
- Cuando se incrementa `state.count`, tanto state.count como state.doubled se actualizan automáticamente en la UI.


## 8. Reactividad con la runa $derived()

### ¿Qué es $derived() en Svelte 5?
$derived es una runa que permite crear valores reactivos derivados de otros valores reactivos o stores. Es útil cuando necesitas calcular un valor basado en otros valores que cambian, y quieres que este valor derivado se actualice automáticamente cada vez que cambien los valores de los que depende.

### Sintaxis y Uso de $derived
La runa $derived toma una o más dependencias y una función que produce el valor derivado. Svelte se encargará de recalcular este valor cada vez que alguna de las dependencias cambie.
```sveltehtml
<script>
    import { writable } from 'svelte/store';

    // Definimos un store básico
    const count = writable(0);

    // Usamos $derived para crear un valor derivado
    const doubled = $derived(count, $count => $count * 2);

    function increment() {
        count.update(n => n + 1);
    }
</script>

<button on:click={increment}>
    Increment
</button>
<p>Count is: {$count}</p>
<p>Doubled count is: {$doubled}</p>
```
En este ejemplo:
- `count` es un store reactivo que contiene un número.
- `$derived(count, $count => $count * 2)` crea un nuevo valor derivado llamado `doubled`. Cada vez que `count` cambia, `doubled` se recalcula automáticamente.
- `$count` es el valor reactivo dentro del store, que se pasa a la función derivada


###  Múltiples Dependencias con $derived
$derived también puede aceptar múltiples dependencias, lo que es útil si el valor derivado depende de más de un store o variable reactiva.
```sveltehtml
<script>
    import { writable } from 'svelte/store';

    const count = writable(0);
    const factor = writable(2);

    // $derived con múltiples dependencias
    const multiplied = $derived([count, factor], ([$count, $factor]) => $count * $factor);

    function increment() {
        count.update(n => n + 1);
    }

    function changeFactor() {
        factor.set(Math.floor(Math.random() * 10));
    }
</script>

<button on:click={increment}>
    Increment Count
</button>
<button on:click={changeFactor}>
    Change Factor
</button>

<p>Count is: {$count}</p>
<p>Factor is: {$factor}</p>
<p>Multiplied count is: {$multiplied}</p>
```

En este ejemplo:
- `$derived([count, factor], ([$count, $factor]) => $count * $factor)` crea un valor derivado llamado `multiplied` que se actualiza cada vez que `count` o `factor` cambian.
- `[$count, $factor]` es una matriz que contiene los valores actuales de los stores `count` y `factor`.


### Ventajas de Usar $derived
- Claridad: Al utilizar $derived, se hace explícito que un valor depende de otros, lo que mejora la legibilidad y mantenibilidad del código.
- Eficiencia: Svelte optimiza automáticamente las actualizaciones del valor derivado, asegurando que solo se recalcula cuando es necesario, lo que mejora el rendimiento.
- Centralización del Cálculo: En lugar de calcular valores derivados en múltiples lugares del código, podemos centralizarlos en un único lugar usando $derived, lo que reduce la duplicación de lógica.



### Reaccionar a los cambios de una prop
Podemos usar las runas `$derived` o `$effect` para reaccionar a los cambios de una prop.
```sveltehtml
<script>
	let count = $state(0);

	let double = $derived(count * 2);

	$effect(() => {
		if (count > 10) {
			alert('Too high!');
		}
	});
</script>
```

## 9. Reactividad con la runa $effect()
En Svelte 5, la runa $effect() es una característica avanzada que permite ejecutar efectos secundarios de manera controlada y reactiva en respuesta a cambios en el estado o en las propiedades de un componente. A diferencia de las reactividades más automáticas y declarativas de Svelte, $effect() te da un control explícito sobre cuándo y cómo quieres que se ejecuten ciertos fragmentos de código en respuesta a cambios en valores reactivos.

### ¿Qué es $effect() en Svelte 5?
`$effect()` es una runa que se utiliza para ejecutar código imperativo en respuesta a cambios en valores reactivos. Es útil cuando necesitamos realizar efectos secundarios, como realizar una solicitud HTTP, interactuar con APIs del navegador (como manipulación del DOM directamente), o cualquier otra operación que no se limite simplemente a actualizar la UI.


### Debemos evitar Efectos Secundarios No Deseados
Los efectos secundarios dentro de $effect() deben ser cuidadosamente gestionados, especialmente si involucran interacciones con el DOM o solicitudes de red. Asegúrate de que las funciones de limpieza `(return () => { ... })` estén bien implementadas para evitar problemas como fugas de memoria o comportamientos inesperados.

Un efecto secundario en programación se refiere a cualquier operación realizada por una función que afecta algo fuera del ámbito local de la función misma. Es decir, un efecto secundario es cualquier cambio en el estado del sistema o interacción con el entorno que ocurre como resultado de ejecutar una función, aparte de devolver un valor.

```sveltehtml
let count = 0;

function increment() {
        count += 1;  // Esto es un efecto secundario
}

increment();  // Ahora count es 1
```
Si una función cambia una variable global o una variable que fue definida fuera de ella, está produciendo un efecto secundario.



### Sintaxis y Uso de $effect()
La función $effect() toma una función que se ejecutará automáticamente cada vez que alguna de las variables reactivas que se usan dentro de esa función cambie.
```sveltehtml
<script>
    let count = 0;

    // Incrementa el contador cada segundo
    $effect(() => {
        const interval = setInterval(() => {
            count += 1;
        }, 1000);

        // Cleanup function to clear the interval
        return () => {
            clearInterval(interval);
        };
    });
</script>

<p>Count: {count}</p>
```

En este ejemplo:
- `$effect(() => { ... })`: El código dentro de $effect() se ejecutará cada vez que alguna de las variables reactivas utilizadas en él cambie. En este caso, se ejecutará una vez inicialmente, ya que no depende de otras variables reactivas.
- `setInterval` se utiliza para incrementar count cada segundo.
- `return () => { clearInterval(interval); }`: Esta es una función de limpieza que se ejecuta cuando el componente se destruye o cuando se vuelve a ejecutar `$effect()` debido a un cambio en sus dependencias. Aquí, se usa para limpiar el intervalo.


### Dependencias Automáticas y Limpieza
Cualquier valor reactivo usado dentro de la función pasada a $effect() se convierte automáticamente en una dependencia de ese efecto. Svelte observará esos valores y volverá a ejecutar el efecto cada vez que alguno de ellos cambie.
```sveltehtml
<script>
    let count = 0;

    function increment() {
        count += 1;
    }

    // Efecto que reacciona al cambio de `count`
    $effect(() => {
        console.log(`The count is now ${count}`);

        // Este efecto no tiene una función de limpieza específica
        // porque solo se necesita hacer algo cuando `count` cambia
    });
</script>

<button on:click={increment}>
    Increment
</button>
<p>Check the console for updates.</p>
```

En este ejemplo:
- `$effect()` se ejecuta automáticamente cada vez que count cambia.
- `console.log(...)` imprime el valor actual de count en la consola cada vez que count cambia.


### Efectos con Múltiples Dependencias
Si tu efecto depende de múltiples valores reactivos, $effect() se ejecutará cada vez que cualquiera de esos valores cambie.
```sveltehtml
<script>
    let count = 0;
    let factor = 2;

    function increment() {
        count += 1;
    }

    function changeFactor() {
        factor = Math.floor(Math.random() * 10) + 1;
    }

    // Efecto que depende tanto de `count` como de `factor`
    $effect(() => {
        console.log(`Count: ${count}, Factor: ${factor}, Product: ${count * factor}`);
    });
</script>

<button on:click={increment}>
    Increment Count
</button>
<button on:click={changeFactor}>
    Change Factor
</button>
<p>Check the console for updates.</p>
```

En este ejemplo:
- `$effect()` depende de `count` y `factor`, y se ejecuta cada vez que cualquiera de estas variables cambia.
- `console.log(...)` imprime los valores actuales de `count`, `factor`, y su producto.



---
## Variables Reactivas
Para cambiar el estado del componente y volver a renderizar, simplemente asignamos a una variable declarada localmente que se declaró usando la runa `$state`.

Actualizaciones de expresiones (`count += 1`) y asignaciones de propiedades (`obj.x = y`) tienen el mismo efecto.
```sveltehtml
<script>
	let count = $state(0);

	function handleClick() {
		// calling this function will trigger an
		// update if the markup references `count`
		count = count + 1;
	}
</script>
```

El bloque `<script>` de Svelte es ejecutado solo cuando el componente es creado, por lo que las asignaciones dentro de un bloque `<script>` no se ejecutan automáticamente de nuevo cuando una prop se actualiza.
```sveltehtml
<script>
	let { person } = $props();
	// this will only set `name` on component creation
	// it will not update when `person` does
	let { name } = person;
</script>
```
