
La reactividad en Svelte se refiere a la capacidad de los componentes de actualizarse automáticamente cuando los datos cambian. Esto se logra a través del sistema de reactividad de Svelte, que detecta los cambios en las variables y actualiza automáticamente los componentes afectados.

# Cómo se obtiene la reactividad en Svelte

## 1. Reactive Assigmmets |  Asignaciones Reactivas
Cualquier asignación a una variable en Svelte es reactiva. 
```sveltehtml
<script>
    let count = 0;
</script>
<button on:click={() => {count += 1}}>Clicked {count} times</button>
```

En este ejemplo, la variable count es reactiva. Cada vez que se hace clic en el botón, el valor de count se incrementa en 1 y el componente se actualiza automáticamente para reflejar el nuevo valor.

## 2. Reactive Declarations | Declaraciones Reactivas | Inline
Utilizando la sintaxis '$:' para declarar variabes y expresions que deben actualizarse automáticamente cuando las variables en las que dependen cambian (dependencias).

Una reactive declaration define una variable derivada (calculada) que se actualiza automáticamente cuando cambian las variables en las que depende.

Las reactive declarations pueden también depender de otros reactive declarations.

```sveltehtml
<script>
    // No es necesario declarar la variable double
    // double se define de manera reactiva. 
    let count = 0;
</script>

$: double = count * 2;
<button on:click={() => {count += 1}}>Increment</button>
```

## 3. Reactive Statements | Declaraciones Reactivas en Bloque
Las declaraciones reactivas en bloque también utilizan la sintaxis '$:' para envolver bloques de código que debn ejecutarse cada vez que cambian las variables en las que dependen.

Las Reactive Statements definen un bloque que debe volver a ejecutarse cada vez que cambien sus dependencias.

Cada variable que aparece en el bloque de un Reactive Statement se de sólo lectura (no es escribible) - para calcular el resultado. Es una dependencia.

Las Reactive Statements son un superconjunto de las Reactive Declarations (Declaraciones Reactivas). Podemos escribir todas las Reactive Declaration como una Reactive Statement, pero no al revés.

```sveltehtml

<script>
    // Es necesario declarar la variable double
    let double;
    let count = 0;
</script>

$: {
        double = count * 2;
}

<button on:click={() => {count += 1}}>Increment</button>
```

### Orden de ejecución
Svelte en tiempo de compilación mira las declaraciones reactivas y las ordena de manera que las dependencias se ejecuten antes que las dependencias. Da igual cómo lo escribamos nosotros, el orden lo determina Svelte. Esto se llama ordenamiento topológico con respecto a las variables.

Ordenamiento topológico: Svelte realiza un análisis estático del código para construir un grafo de dependencias entre las variables. Luego, ordena las declaraciones reactivas de manera que una declaración que depende de otra se ejecute después de que se haya ejecutado la que le proporciona su valor.

Evita errores: El ordenamiento topológico asegura que las declaraciones reactivas se ejecuten en el orden necesario para evitar cálculos incorrectos.


## 4. Stores | Almacenes
Los stores proporcionan una manera de manejar el estado reactivo compartido entre componentes. Las variables derivadas de stores también se actualizan automáticamente cuando cambian los datos del store.
```sveltehtml
<!-- store.js -->
import { writable } from 'svelte/store';

export const count = writable(0);

<!-- Component.svelte -->
<script>
    import { count } from './store.js';
</script>

<button on:click={() => $count += 1}>Clicked {$count} times</button>
```

En este ejemplo, el store count se inicializa con un valor de 0 y se importa en el componente Component.svelte. Cada vez que se hace clic en el botón, el valor del store count se incrementa en 1 y el componente se actualiza automáticamente para reflejar el nuevo valor.

Aquí, count es un store que se puede compartir entre diferentes componentes. La reactividad se consigue utilizando el prefijo $ para acceder al valor del store. Cuando se hace clic en el botón, el valor de count se incrementa y cualquier componente que esté observando count se actualizará automáticamente.

## 5. Vinculación bidireccional (bind:)
Svelte permite la vinculación bidireccional entre variables y propiedades de elementos del DOM utilizando la directiva bind:. Esto es especialmente útil para manejar formularios y entradas de usuario.
```sveltehtml
<script>
  let name = '';
</script>

<input bind:value={name} placeholder="Enter your name" />
<p>Hello, {name}!</p>
```

Al vincular el valor del \<input> a la variable name, cualquier cambio en el campo de entrada actualiza automáticamente la variable name, y viceversa. El párrafo que muestra "Hello, {name}!" se actualiza en tiempo real a medida que el usuario escribe.


## 6. Eventos personalizados y despachadores (dispatch)
Svelte permite que los componentes hijos envíen eventos personalizados a los componentes padres mediante un despachador de eventos. Esto permite una comunicación reactiva entre componentes.
```sveltehtml
<!-- Child.svelte -->
<script>
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  function sendMessage() {
    dispatch('message', { text: 'Hello from Child' });
  }
</script>

<button on:click={sendMessage}>Send Message</button>

<!-- Parent.svelte -->
<script>
  import Child from './Child.svelte';

  function handleMessage(event) {
    alert(event.detail.text);
  }
</script>

<Child on:message={handleMessage} />
```

En este ejemplo, el componente Child.svelte envía un evento personalizado 'message' al componente padre Parent.svelte cuando se hace clic en el botón. El componente padre maneja el evento y muestra una alerta con el texto enviado desde el componente hijo.

Cuando el Child despacha el evento message, el componente Parent lo captura y ejecuta la función handleMessage, que muestra una alerta con el mensaje enviado desde el hijo.