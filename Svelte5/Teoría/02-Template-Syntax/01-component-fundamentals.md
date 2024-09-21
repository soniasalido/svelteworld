---
title: Component fundamentals
---

- script (module) / template / style (rough overview)
- `$props` / `$state` (in the context of components)


Los componentes son los bloques de construcción de las aplicaciones Svelte. Se escriben en archivos `.svelte`, utilizando un subconjunto de HTML.


Esas tres secciones son opcionales, pero al menos una de ellas debe estar presente en un componente.


Svelte mejora la sintaxis de las plantillas de HTML con características adicionales que permiten la creación de aplicaciones web interactivas y reactivas. Usa una sintáxis especial llamada HTMLx en svelte, que actúa como una mejora de HTML con características adicionales para manejar la reactividad y la lógica de renderizado..


```sveltehtml
<script>
	// logic goes here
</script>

<!-- markup (zero or more items) goes here -->

<style>
	/* styles go here */
</style>
```

# Runes en Svelte 5
Svelte 5 ha introducido nuevas características y conceptos, incluyendo "runes" y $props, que son pistas especiales para el compilador de Svelte.


Las "runes" en Svelte 5 parecen ser una nueva forma de declarar reactividad. En lugar de la reactividad basada en el operador $:, las runes podrían ofrecer una API más flexible o declarativa para gestionar la reactividad en Svelte.

## &lt;script&gt;

Un bloque `<script>` contiene JavaScript (o TypeScript, cuando se agrega el atributo `lang="ts"`) que se ejecuta cuando se crea una instancia del componente. Las variables declaradas (o importadas) en el nivel superior son 'visibles' desde el marcado del componente.
 



## API pública de un componente

Svelte usa el rune `$props` para declarar _propiedades_ o _props_, lo que significa describir la interfaz pública del componente que se vuelve accesible para los consumidores del componente.

> `$props` es uno de varios runes, que son pistas especiales para el compilador de Svelte para hacer que las cosas sean reactivas.

```sveltehtml
<script>
	let { foo, bar, baz } = $props();

	// Values that are passed in as props
	// are immediately available
	console.log({ foo, bar, baz });
</script>
```

Puedes especificar un valor predeterminado para una prop. Se usará si el consumidor del componente no especifica la prop en el componente al instanciar el componente, o si el valor pasado es `undefined` en algún momento.

```sveltehtml
<script>
	let { foo = 'optional default initial value' } = $props();
</script>
```


Para obtener todas las propiedades, usamos la sintaxis con el operador rest (`...`).:
```sveltehtml
<script>
	let { a, b, c, ...everythingElse } = $props();
</script>
```


Puedes usar palabras reservadas como nombres de propiedades.
```sveltehtml
<script>
	// creates a `class` property, even
	// though it is a reserved word
	let { class: className } = $props();
</script>
```

Si estás usando TypeScript, puedes declarar los tipos de propiedades:
```sveltehtml
<script lang="ts">
	interface Props {
		required: string;
		optional?: number;
		[key: string]: unknown;
	}

	let { required, optional, ...everythingElse }: Props = $props();
</script>
```


Si estás usando JavaScript, puedes declarar los tipos de propiedades usando JSDoc:
```sveltehtml
<script>
	/** @type {{ x: string }} */
	let { x } = $props();

	// or use @typedef if you want to document the properties:

	/**
	 * @typedef {Object} MyProps
	 * @property {string} y Some documentation
	 */

	/** @type {MyProps} */
	let { y } = $props();
</script>
```


Si exportas una constante, clase o función, es de solo lectura desde fuera del componente.

```sveltehtml
<script>
	export const thisIs = 'readonly';

	export function greet(name) {
		alert(`hello ${name}!`);
	}
</script>
```


Las propiedades de solo lectura se pueden acceder como propiedades en el elemento, vinculadas al componente usando la sintaxis [`bind:this`](/docs/component-directives#bind-this).


## Variables Reactivas


Para cambiar el estado del componente y volver a renderizar, simplemente asigna a una variable declarada localmente que se declaró usando la runa `$state`.

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

Si deseas reaccionar a los cambios de una prop, usa las runas `$derived` o `$effect` en su lugar.
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


## &lt;script context="module"&gt;

Una etiqueta `<script>` con un atributo `context="module"` se ejecuta una vez cuando el módulo se evalúa por primera vez, en lugar de para cada instancia de componente. Los valores declarados en este bloque son accesibles desde un `<script>` regular (y el marcado del componente) pero no viceversa.


Puedes `export` enlaces desde este bloque, y se convertirán en exportaciones del módulo compilado.

No puedes `export default`, ya que la exportación predeterminada es el propio componente.

```sveltehtml
<script context="module">
	let totalComponents = 0;

	// the export keyword allows this function to imported with e.g.
	// `import Example, { alertTotal } from './Example.svelte'`
	export function alertTotal() {
		alert(totalComponents);
	}
</script>

<script>
	totalComponents += 1;
	console.log(`total number of times this component has been created: ${totalComponents}`);
</script>
```

## &lt;style&gt;
CSS dentro de un bloque `<style>` se aplicará solo a ese componente.

```sveltehtml
<style>
	p {
		/* this will only affect <p> elements in this component */
		color: burlywood;
	}
</style>
```


Para obtener más información sobre estilos, lee la documentación sobre [styles and classes](styles-and-classes).

