
Los datos que se pasan de un componente (padre) a otro componente (hijo) se llaman `props`. 

En Svelte, los `props` (abreviatura de "properties") son la forma en que los componentes pueden recibir datos desde un componente padre. Son un mecanismo fundamental para pasar información de un componente a otro y para crear componentes reutilizables y configurables.


# ¿Qué son los props?
Los props son variables que se definen en un componente hijo y que se pueden "llenar" con valores desde un componente padre. En otras palabras, el componente padre envía datos al componente hijo a través de estas propiedades. Estos valores pueden ser cualquier tipo de dato, como cadenas de texto, números, objetos, funciones, e incluso otros componentes.

# Cómo definir en el componente hijo
En Svelte, para definir una prop en un componente hijo, usas la palabra clave `export` delante de una variable en el script del componente. Esto indica que la variable es una prop que puede ser recibida desde un componente padre.
```sveltehtml
<!-- Child.svelte -->
<script>
  export let name = 'world';
</script>

<p>Hello, {name}!</p>
```
En este ejemplo, name es una prop que puede recibir un valor desde un componente padre. Si no se pasa ningún valor, la prop name tomará su valor por defecto, que en este caso es 'world'.

```sveltehtml
<!-- App.svelte -->
<script>
  import Child from './Child.svelte';
</script>

<Child name="Svelte" />
```
En este ejemplo, el componente padre está pasando el valor 'Svelte' a la prop name del componente hijo Child. Como resultado, el componente hijo mostrará el mensaje "Hello, Svelte!".
Padre sobreescribe el valor por defecto de la prop name del componente hijo Child.


# Paso de props desde el componente padre
Para pasar un valor a una prop desde un componente padre, simplemente defines el nombre de la prop como un atributo del componente hijo y le asignas el valor que deseas pasar.
```sveltehtml
<!-- App.svelte -->
<script>
  import Child from './Child.svelte';
</script>

<Child name="Svelte" />
```
Aquí, el componente App.svelte está pasando el valor 'Svelte' a la prop name del componente Child. Como resultado, el componente Child mostrará "Hello, Svelte!" en lugar de "Hello, world!".


# Uso de props dentro del componente:
Una vez que una prop es recibida en un componente, se puede usar dentro del componente como cualquier otra variable local. Puedes utilizarla en el HTML, en funciones, en expresiones reactivas, o en cualquier lugar dentro del componente.
```sveltehtml
<!-- Child.svelte -->
<script>
  export let firstName;
  export let lastName;
</script>

<p>Hello, {firstName} {lastName}!</p>
```

Y en el componente padre:
```sveltehtml
<!-- App.svelte -->
<script>
  import Child from './Child.svelte';
</script>

<Child firstName="John" lastName="Doe" />
```

En este caso, el componente padre está pasando los valores 'John' y 'Doe' a las props firstName y lastName del componente hijo Child. Como resultado, el componente hijo mostrará "Hello, John Doe!".

![Flujo-Svelte.jpg](Assets/Flujo-Svelte.jpg)

# Props dinámicas
Las props en Svelte pueden ser dinámicas, lo que significa que puedes cambiar su valor en tiempo de ejecución. Esto es útil cuando necesitas actualizar el valor de una prop basado en alguna lógica o evento en el componente padre.
```sveltehtml
<!-- App.svelte -->
<script>
  import Child from './Child.svelte';

  let name = 'Svelte';

  function changeName() {
    name = 'React';
  }
</script>

<button on:click={changeName}>Change Name</button>
<Child name={name} />
```

En este ejemplo, el componente padre App.svelte tiene una prop name que se inicializa con el valor 'Svelte'. Cuando se hace clic en el botón "Change Name", el valor de la prop name se actualiza a 'React', y el componente hijo Child mostrará "Hello, React!" en lugar de "Hello, Svelte!".


# Props con valores reactivos
Las props en Svelte son reactivas, lo que significa que si una prop cambia en el componente padre, el componente hijo se actualizará automáticamente para reflejar ese cambio. Esto es posible gracias al sistema de reactividad de Svelte, que detecta los cambios en las variables y actualiza automáticamente los componentes afectados.
```sveltehtml
<!-- App.svelte -->
<script>
  import Child from './Child.svelte';

  let name = 'Svelte';

  function changeName() {
    name = 'React';
  }
</script>

<button on:click={changeName}>Change Name</button>
<Child name={name} />
```


# Props con valores estáticos
Las props en Svelte también pueden tener valores estáticos, lo que significa que no cambian una vez que se han establecido. Esto es útil cuando necesitas pasar un valor constante a un componente hijo que no cambiará durante la vida útil del componente.
```sveltehtml
<!-- App.svelte -->
<script>
  import Child from './Child.svelte';
</script>

<Child name="Svelte" />
```

En este ejemplo, el valor de la prop name del componente hijo Child es 'Svelte', y no cambiará durante la vida útil del componente. Esto es útil cuando necesitas pasar un valor constante a un componente hijo que no cambiará.


# Props y validación
Svelte no tiene una validación de tipos estricta para las props como en otros frameworks (por ejemplo, PropTypes en React), pero puedes implementar validaciones de manera manual si es necesario, lanzando errores o advertencias si los valores pasados no cumplen ciertos criterios.

# Props con funciones y eventos
También puedes pasar funciones como props para manejar eventos o ejecutar lógica en el componente hijo. Esto es útil para manejar la comunicación inversa (del hijo al padre) o para delegar cierta lógica.
```sveltehtml
<!-- Child.svelte -->
<script>
  export let handleClick;
</script>

<button on:click={handleClick}>Click me</button>
```

Y en el componente padre:
```sveltehtml
<!-- App.svelte -->
<script>
  import Child from './Child.svelte';

  function sayHello() {
    alert('Hello!');
  }
</script>

<Child handleClick={sayHello} />
```
En este ejemplo, cuando se hace clic en el botón del componente Child, se ejecuta la función sayHello definida en el componente padre.


# Props predeterminados
Puedes establecer valores predeterminados para las props directamente en su declaración usando la sintaxis export let propName = value. Esto asegura que, si un valor no es pasado desde el componente padre, el componente hijo aún tendrá un valor con el que trabajar.
```sveltehtml
<!-- Child.svelte -->
<script>
  export let name = 'world';
</script>

<p>Hello, {name}!</p>
```

En este ejemplo, si el componente padre no pasa un valor para la prop name, el valor predeterminado 'world' se utilizará en su lugar.
