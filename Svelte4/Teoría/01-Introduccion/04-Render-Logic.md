En Svelte, los bloques de render logic (bloques de lógica de renderizado) te permiten controlar de manera condicional o iterativa cómo se representa el contenido en la interfaz de usuario. Estos bloques son similares a las estructuras de control de flujo que puedes encontrar en JavaScript, como if, else, each, y await, pero están integrados directamente en la sintaxis de las plantillas de Svelte para manejar la renderización del DOM.

# Tipos de bloques de render logic en Svelte

## 1. {#if} - Bloque condicional
Se utilizan para mostrar o no mostrar secciones del DOM basadas en condiciones booleanas.
```sveltehtml
{#if condition}
    <p>Render this content if condition is true</p>
    {:else if anotherCondition}
        <p>Render this content if anotherCondition is true</p>
{:else}
    <p>Render this content if condition is false</p>
{/if}
```

```sveltehtml
<script>
  let isLoggedIn = false;
</script>

{#if isLoggedIn}
  <p>Welcome back, user!</p>
{:else}
  <p>Please log in.</p>
{/if}

<button on:click={() => isLoggedIn = !isLoggedIn}>
  {isLoggedIn ? 'Log out' : 'Log in'}
</button>
```

## 2. {#each} - Bloque iterativo
Se utilizan para renderizar listas de elementos basados en un array o un objeto iterable.
```sveltehtml
{#each array as item, index (key)}
    <p>{item} at index {index}</p>
{/each}
```

Es buena práctica, especificar una key única para cada elemento en la lista para ayudar a Svelte a identificar qué elementos han cambiado y necesitan ser actualizados.
```sveltehtml
{#each array as item, index (item.id)}
    <p>{item.name} at index {index}</p>
{/each}
```

Ver ejemplo de comportamiento extraño si no se define una key única en el tutorial de Svelte: https://learn.svelte.dev/tutorial/keyed-each-blocks


```sveltehtml
<script>
  let fruits = ['apple', 'banana', 'cherry'];
</script>

<ul>
  {#each fruits as fruit, index}
    <li>{fruit} at index {index}</li>
  {/each}
</ul>
```

En este ejemplo, el bloque each itera sobre la lista items y genera un elemento de lista <li> para cada fruta.

## 3. {#await} - Bloque de espera
Se utiliza para manejar promesas de manera declarativa en la plantilla. Permite mostrar diferentes contenidos mientras se espera que una promesa se resuelva.

```sveltehtml
{#await promise}
    <p>Loading...</p>
{:then value}
    <p>{value}</p>
{:catch error}
    <p>Error: {error.message}</p>
{/await}
```

En este ejemplo, el bloque await muestra "Loading..." mientras la promesa está pendiente, muestra el valor resuelto si la promesa se resuelve correctamente, y muestra un mensaje de error si la promesa se rechaza.


Otro ejemplo:
```sveltehtml
<script>
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data loaded!'), 2000);
  });
</script>

{#await promise}
  <p>Loading...</p>
{:then data}
  <p>{data}</p>
{:catch error}
  <p>Failed to load: {error.message}</p>
{/await}
```

En este ejemplo, se crea una promesa que se resuelve después de 2 segundos. Mientras la promesa está pendiente, se muestra "Loading...". Una vez que la promesa se resuelve, se muestra el mensaje "Data loaded!". Si la promesa se rechaza, se muestra un mensaje de error.

## 4. {#key} - Bloque de clave
Se utiliza para forzar la re-renderización de una sección específica del DOM cuando cambia una clave (key).
Útil cuando necesitamos que Svelte recree completamente un elemento del DOM en lugar de simplemente actualizarlo.

```sveltehtml
{#key expression}
    <!-- content to re-render when expression changes -->
{/key}
```

Un ejemplo:
```sveltehtml
<script>
  let key = 0;

  function refresh() {
    key += 1;
  }
</script>

<button on:click={refresh}>Refresh</button>

{#key key}
  <p>{new Date().toLocaleTimeString()}</p>
{/key}
```

En este ejemplo, el bloque key se utiliza para forzar la re-renderización del elemento <p> cuando la variable key cambia. Al hacer clic en el botón "Refresh", la función refresh incrementa la variable key, lo que hace que el bloque key se vuelva a renderizar y actualice la hora mostrada en la interfaz de usuario.

## 5. {#await then} - Bloque de espera con then
Se utiliza para manejar promesas de manera declarativa en la plantilla, mostrando diferentes contenidos mientras se espera que una promesa se resuelva y accediendo al valor resuelto directamente en el bloque.

```sveltehtml
{#await promise then value}
    <p>{value}</p>
{:catch error}
    <p>Error: {error.message}</p>
{/await}
```

En este ejemplo, el bloque await muestra el valor resuelto directamente en el bloque then si la promesa se resuelve correctamente, y muestra un mensaje de error si la promesa se rechaza.

## 6. {#key each} - Bloque de clave con each
Se utiliza para forzar la re-renderización de una sección específica del DOM cuando cambia una clave (key) en un bloque each.

```sveltehtml
{#key expression each array as item}
    <!-- content to re-render when expression changes -->
{/key}
```

Un ejemplo:
```sveltehtml
<script>
  let key = 0;
  let fruits = ['apple', 'banana', 'cherry'];

  function refresh() {
    key += 1;
  }
</script>

<button on:click={refresh}>Refresh</button>

{#key key each fruits as fruit}
  <p>{fruit}</p>
{/key}
```

En este ejemplo, el bloque key se utiliza para forzar la re-renderización de los elementos <p> en el bloque each cuando la variable key cambia. Al hacer clic en el botón "Refresh", la función refresh incrementa la variable key, lo que hace que el bloque key se vuelva a renderizar y actualice la lista de frutas mostrada en la interfaz de usuario.


