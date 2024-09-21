
Svelte mejora la sintaxis de las plantillas de HTML con características adicionales que permiten la creación de aplicaciones web interactivas y reactivas. Usa una sintáxis especial llamada HTMLx en svelte, que actúa como una mejora de HTML con características adicionales para manejar la reactividad y la lógica de renderizado..

---
title: Template syntax
---



# Tags | Etiquetas

---
Una etiqueta en minúsculas, como `<div>`, denota un elemento HTML regular. Una etiqueta en mayúsculas, como `<Widget>` o `<Namespace.Widget>`, indica un *componente*.


```sveltehtml
<script>
	import Widget from './Widget.svelte';
</script>

<div>
	<Widget/>
</div>
```


# Atributos y props

---

Por defecto, los atributos funcionan exactamente como sus contrapartes de HTML.
```sveltehtml
<div class="foo">
	<button disabled>can't touch this</button>
</div>
```

---


Como en HTML, los valores pueden no estar entre comillas.

```sveltehtml
<input type=checkbox>
```

---


Atributos y valores pueden contener expresiones de JavaScript.
```sveltehtml
<a href="page/{p}">page {p}</a>
```

---

O pueden *ser* expresiones de JavaScript.
```sveltehtml
<button disabled={!clickable}>...</button>
```

---


Atributos booleanos se incluyen en el elemento si su valor es verdadero [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) y se excluyen si es falso [falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy).


Todos los demás atributos se incluyen a menos que su valor sea [nullish](https://developer.mozilla.org/en-US/docs/Glossary/Nullish) (`null` o `undefined`).
```sveltehtml
<input required={false} placeholder="This input field is not required">
<div title={null}>This div has no title attribute</div>
```

---
Una expresión puede incluir caracteres que harían que el resaltado de sintaxis fallara en HTML regular, por lo que se permite citar el valor. Las comillas no afectan cómo se analiza el valor:
```sveltehtml
<button disabled="{number !== 42}">...</button>
```

---


Cuando el nombre del atributo y el valor coinciden (`name={name}`), se pueden reemplazar por `{name}`.
```sveltehtml
<!-- These are equivalent -->
<button disabled={disabled}>...</button>
<button {disabled}>...</button>
```

---


Por convención, los valores pasados a los componentes se denominan *propiedades* o *props* en lugar de *atributos*, que son una característica del DOM.

Como con los elementos, `name={name}` se puede reemplazar por el atajo `{name}`.
```sveltehtml
<Widget foo={bar} answer={42} text="hello"/>
```

---


*Spread attributes* | Propagar Atributos permite pasar muchos atributos o propiedades a un elemento o componente a la vez.

Un elemento o componente puede tener múltiples atributos de expansión, intercalados con los regulares.
```sveltehtml
<Widget {...things}/>
```

---

*`$$props`* referencia todas las props que se pasan a un componente, incluidas las que no se declaran con `export`. Generalmente no se recomienda, ya que es difícil de optimizar. Pero puede ser útil en casos raros, por ejemplo, cuando no se sabe en tiempo de compilación qué props podrían pasarse a un componente.
```sveltehtml
<Widget {...$$props}/>
```

---
*`$$restProps`* contiene solo las props que no se declaran con `export`. Se puede usar para pasar otros atributos desconocidos a un elemento en un componente. Comparte los mismos problemas de optimización que *`$$props`*, y por lo tanto tampoco se recomienda.
```sveltehtml
<input {...$$restProps}>
```

> El atributo `value` de un elemento `input` o sus elementos secundarios `option` no debe establecerse con atributos de expansión al usar `bind:group` o `bind:checked`. Svelte necesita poder ver el `value` del elemento directamente en el marcado en estos casos para poder vincularlo a la variable vinculada.


---

# Expresiones de texto

```sveltehtml
{expression}
```

---

Texto puede contener expresiones de JavaScript.
```sveltehtml
<h1>Hello {name}!</h1>
<p>{a} + {b} = {a + b}.</p>

<div>{(/^[A-Za-z ]+$/).test(value) ? x : y}</div>
```

> Si estás usando una expresión regular (`RegExp`) [notación literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#literal_notation_and_constructor), necesitarás envolverla entre paréntesis.



# Comentarios

---


Puedes usar comentarios HTML dentro de los componentes.
```sveltehtml
<!-- this is a comment! -->
<h1>Hello world</h1>
```

---

Comentarios que comienzan con `svelte-ignore` deshabilitan las advertencias para el siguiente bloque de marcado. Por lo general, estas son advertencias de accesibilidad; asegúrate de deshabilitarlas por una buena razón.
```sveltehtml
<!-- svelte-ignore a11y-autofocus -->
<input bind:value={name} autofocus>
```


# {#if ...}

```sveltehtml
{#if expression}...{/if}
```
---

```sveltehtml
{#if expression}...{:else if expression}...{/if}
```
---
```sveltehtml
{#if expression}...{:else}...{/if}
```

---

Contenido que se renderiza condicionalmente puede envolverse en un bloque if.

```sveltehtml
{#if answer === 42}
    <p>what was the question?</p>
{/if}
```

---

Condiciones adicionales pueden ser añadidas con `{:else if expression}`, opcionalmente terminando en una cláusula `{:else}`.

```sveltehtml
{#if porridge.temperature > 100}
    <p>too hot!</p>
{:else if 80 > porridge.temperature}
    <p>too cold!</p>
{:else}
    <p>just right!</p>
{/if}
```


# {#each ...}

```sveltehtml
{#each expression as name}...{/each}
```
```sveltehtml
{#each expression as name, index}...{/each}
```
```sveltehtml
{#each expression as name (key)}...{/each}
```
```sveltehtml
{#each expression as name, index (key)}...{/each}
```
```sveltehtml
{#each expression as name}...{:else}...{/each}
```

---


Iterando sobre listas de valores se puede hacer con un bloque each.

```sveltehtml
<h1>Shopping list</h1>
<ul>
	{#each items as item}
		<li>{item.name} x {item.qty}</li>
	{/each}
</ul>
```

Tu puedes usar bloques each para iterar sobre cualquier array o valor similar a un array — es decir, cualquier objeto con una propiedad `length`.

---

Cada bloque each puede especificar un *key*, equivalente al segundo argumento en un callback de `array.map(...)`.
```sveltehtml
{#each items as item, i}
    <li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```

---

Si una expresión *key* es proporcionada — la cual debe identificar de manera única cada elemento de la lista — Svelte la usará para diferenciar la lista cuando los datos cambien, en lugar de añadir o remover elementos al final. La clave puede ser cualquier objeto, pero se recomiendan cadenas y números ya que permiten que la identidad persista cuando los objetos mismos cambian.

```sveltehtml
{#each items as item (item.id)}
    <li>{item.name} x {item.qty}</li>
{/each}

<!-- or with additional index value -->
{#each items as item, i (item.id)}
	<li>{i + 1}: {item.name} x {item.qty}</li>
{/each}
```

---

Puedes usar destructuración y patrones rest en bloques each.

```sveltehtml
{#each items as { id, name, qty }, i (id)}
    <li>{i + 1}: {name} x {qty}</li>
{/each}

{#each objects as { id, ...rest }}
    <li><span>{id}</span><MyComponent {...rest}/></li>
{/each}

{#each items as [id, ...rest]}
    <li><span>{id}</span><MyComponent values={rest}/></li>
{/each}
```

---

Un bloque each también puede tener una cláusula `{:else}`, que se renderiza si la lista está vacía.

```sveltehtml
{#each items as item}
    <p>{item.text}</p>
{:else}
    <p>No tasks today!</p>
{/each}
```


# {#await ...}

```sveltehtml
{#await expression}...{:then name}...{:catch name}...{/await}
```
```sveltehtml
{#await expression}...{:then name}...{/await}
```
```sveltehtml
{#await expression then name}...{/await}
```
```sveltehtml
{#await expression catch name}...{/await}
```

---

Los bloques await te permiten ramificar en los tres posibles estados de una promesa: pendiente, cumplida o rechazada. En el modo SSR, solo se renderizará el estado pendiente en el servidor.

```sveltehtml
{#await promise}
    <!-- promise is pending -->
    <p>waiting for the promise to resolve...</p>
{:then value}
    <!-- promise was fulfilled -->
    <p>The value is {value}</p>
{:catch error}
    <!-- promise was rejected -->
    <p>Something went wrong: {error.message}</p>
{/await}
```

---

El bloque `catch` se puede omitir si no necesitas renderizar nada cuando la promesa se rechaza (o no es posible ningún error).

```sveltehtml
{#await promise}
	<!-- promise is pending -->
	<p>waiting for the promise to resolve...</p>
{:then value}
	<!-- promise was fulfilled -->
	<p>The value is {value}</p>
{/await}
```

---

Si no te importa el estado pendiente, también puedes omitir el bloque inicial.

```sveltehtml
{#await promise then value}
    <p>The value is {value}</p>
{/await}
```

---

Igualmente, si solo deseas mostrar el estado de error, puedes omitir el bloque `then`.

```sveltehtml
{#await promise catch error}
    <p>Something went wrong: {error.message}</p>
{/await}
```

# {#key ...}

```sveltehtml
{#key expression}...{/key}
```


El bloque key destruye y recrea su contenido cuando el valor de una expresión cambia.

```sveltehtml
{#key key}
    <p>{new Date().toLocaleTimeString()}</p>
{/key}
```

---


Esto es útil si deseas que un elemento reproduzca su transición cada vez que un valor cambia.

```sveltehtml
{#key value}
    <div transition:fade>{value}</div>
{/key}
```

---


Cuando se usa alrededor de componentes, esto hará que se re-instancien y se vuelvan a inicializar.

```sveltehtml
{#key value}
    <Component />
{/key}
```

# {@html ...}

```sveltehtml
{@html expression}
```

---


En una expresión de texto, los caracteres como `<` y `>` se escapan; sin embargo, con expresiones HTML, no lo están.

La expresión debe ser HTML independiente válido — `{@html "<div>"}content{@html "</div>"}` no funcionará, porque `</div>` no es HTML válido. Tampoco compilará el código de Svelte.


> Svelte no desinfecta las expresiones antes de inyectar HTML. Si los datos provienen de una fuente no confiable, debe desinfectarlos o estará exponiendo a sus usuarios a una vulnerabilidad XSS.

```sveltehtml
<div class="blog-post">
	<h1>{post.title}</h1>
	{@html post.content}
</div>
```


# {@debug ...}

```sveltehtml
{@debug}
```
```sveltehtml
{@debug var1, var2, ..., varN}
```

---


La etiqueta `{@debug ...}` ofrece una alternativa a `console.log(...)`. Registra los valores de variables específicas cada vez que cambian y pausa la ejecución del código si tienes las herramientas de desarrollo abiertas.

```sveltehtml
<script>
	let user = {
		firstname: 'Ada',
		lastname: 'Lovelace'
	};
</script>

{@debug user}

<h1>Hello {user.firstname}!</h1>
```

---


`{@debug ...}` acepta una lista de nombres de variables separados por comas (no expresiones arbitrarias).

```sveltehtml
<!-- Compiles -->
{@debug user}
{@debug user1, user2, user3}

<!-- WON'T compile -->
{@debug user.firstname}
{@debug myArray[0]}
{@debug !isReady}
{@debug typeof user === 'object'}
```


La etiqueta `{@debug}` sin argumentos insertará una declaración `debugger` que se activará cuando cambie *cualquier* estado, en lugar de las variables especificadas.
```sveltehtml
{@debug}
```


# {@const ...}

```sveltehtml
{@const assignment}
```

---

La etiqueta `{@const ...}` define una constante local.

```sveltehtml
<script>
	export let boxes;
</script>

{#each boxes as box}
	{@const area = box.width * box.height}
	{box.width} * {box.height} = {area}
{/each}
```

`{@const}` está permitido solo como hijo directo de `{#if}`, `{:else if}`, `{:else}`, `{#each}`, `{:then}`, `{:catch}`, `<Component />` o `<svelte:fragment />`.




# Directivas de elementos
Además de los atributos, los elementos pueden tener *directivas*, que controlan el comportamiento del elemento de alguna manera.

Las directivas de elementos son atributos especiales que puedes usar en los elementos HTML dentro de tus componentes para agregar comportamiento o manipular el DOM de manera declarativa. Estas directivas te permiten realizar acciones como enlazar datos, manejar eventos, aplicar transiciones, o agregar otros tipos de comportamiento específico a los elementos.

## 1. on:*eventname*
- Permite agregar controladores de eventos a los elementos HTML de manera declarativa.
- Podemos manejar cualquier evento del DOM (como click, input, submit) directamente en la plantilla.

```sveltehtml
on:eventname={handler}
```
```sveltehtml
on:eventname|modifiers={handler}
```

---

Usamos la directiva `on:` para escuchar eventos del DOM.

```sveltehtml
<script>
	let count = 0;

	function handleClick(event) {
		count += 1;
	}
</script>

<button on:click={handleClick}>
	count: {count}
</button>
```

---

Handlers (Manejadores) pueden ser declarados en línea sin penalización de rendimiento. Al igual que con los atributos, los valores de las directivas pueden ser citados para el bien de los resaltadores de sintaxis.

```sveltehtml
<button on:click="{() => count += 1}">
	count: {count}
</button>
```

---

Añadir *modificadores* a los eventos del DOM con el carácter `|`.

```sveltehtml
<form on:submit|preventDefault={handleSubmit}>
	<!-- the `submit` event's default is prevented,
	     so the page won't reload -->
</form>
```


Los siguientes modificadores están disponibles:
* `preventDefault` — calls `event.preventDefault()` before running the handler
* `stopPropagation` — calls `event.stopPropagation()`, preventing the event reaching the next element
* `passive` — improves scrolling performance on touch/wheel events (Svelte will add it automatically where it's safe to do so)
* `nonpassive` — explicitly set `passive: false`
* `capture` — fires the handler during the *capture* phase instead of the *bubbling* phase
* `once` — remove the handler after the first time it runs
* `self` — only trigger handler if `event.target` is the element itself
* `trusted` — only trigger handler if `event.isTrusted` is `true`. I.e. if the event is triggered by a user action.

Modificadores pueden encadenarse, por ejemplo, `on:click|once|capture={...}`.

---


Si la directiva `on:` se usa sin un valor, el componente *reenviará* el evento, lo que significa que un consumidor del componente puede escucharlo.

```sveltehtml
<button on:click>
	The component itself will emit the click event
</button>
```

---


Es posible tener múltiples escuchadores de eventos para el mismo evento:

```sveltehtml
<script>
	let counter = 0;
	function increment() {
		counter = counter + 1;
	}

	function track(event) {
		trackEvent(event)
	}
</script>

<button on:click={increment} on:click={track}>Click me!</button>
```

## 2. bind:*property*
En Svelte, la directiva bind: se utiliza para crear una sincronización bidireccional entre una propiedad de un elemento del DOM y una variable en el componente Svelte. Esta sincronización permite que cualquier cambio en la propiedad del elemento se refleje automáticamente en la variable, y viceversa.
```sveltehtml
bind:property={variable}
```

---
```sveltehtml
<script>
    let name = '';
</script>

<input bind:value={name} placeholder="Enter your name" />
<p>Hello, {name}!</p>
```
Explicación: bind:value={name} vincula el valor del campo de entrada input con la variable name. Cualquier cambio en el campo de entrada actualizará name automáticamente y viceversa.


---


Los datos fluyen normalmente de arriba hacia abajo, de padre a hijo. La directiva `bind:` permite que los datos fluyan en la dirección opuesta, de hijo a padre. La mayoría de las vinculaciones son específicas de elementos particulares.

El ejemplo más simple es `bind:value`, que vincula el valor de un elemento de formulario a una variable.

```sveltehtml
<input bind:value={name}>
<textarea bind:value={text}></textarea>

<input type="checkbox" bind:checked={yes}>
```

---


Si el nombre coincide con el valor, puedes usar un atajo.

```sveltehtml
<!-- These are equivalent -->
<input bind:value={value}>
<input bind:value>
```

---

 

Los valores de entrada numéricos se coercen; aunque `input.value` es una cadena en lo que respecta al DOM, Svelte lo tratará como un número. Si la entrada está vacía o es inválida (en el caso de `type="number"`), el valor es `undefined`.

```sveltehtml
<input type="number" bind:value={num}>
<input type="range" bind:value={num}>
```

---

En elementos `<input>` con `type="file"`, puedes usar `bind:files` para obtener la lista de archivos seleccionados. Es de solo lectura.

```sveltehtml
<label for="avatar">Upload a picture:</label>
<input
	accept="image/png, image/jpeg"
	bind:files
	id="avatar"
	name="avatar"
	type="file"
/>
```

---


Si estás usando directivas `bind:` junto con directivas `on:`, el orden en que se definen afecta el valor de la variable vinculada cuando se llama al manejador de eventos.

```sveltehtml
<script>
	let value = 'Hello World';
</script>

<input
	on:input="{() => console.log('Old value:', value)}"
	bind:value
	on:input="{() => console.log('New value:', value)}"
/>
```


Aquí estamos vinculando al valor de un input de texto, que usa el evento `input`. Las vinculaciones en otros elementos pueden usar diferentes eventos como `change`.

### Binding `<select>` value

---


El valor de un `<select>` vinculado corresponde a la propiedad `value` en la opción seleccionada, que puede ser cualquier valor (no solo cadenas, como es normalmente el caso en el DOM).

```sveltehtml
<select bind:value={selected}>
	<option value={a}>a</option>
	<option value={b}>b</option>
	<option value={c}>c</option>
</select>
```

---

A `<select multiple>` element behaves similarly to a checkbox group.

```sveltehtml
<select multiple bind:value={fillings}>
	<option value="Rice">Rice</option>
	<option value="Beans">Beans</option>
	<option value="Cheese">Cheese</option>
	<option value="Guac (extra)">Guac (extra)</option>
</select>
```

---

When the value of an `<option>` matches its text content, the attribute can be omitted.

```sveltehtml
<select multiple bind:value={fillings}>
	<option>Rice</option>
	<option>Beans</option>
	<option>Cheese</option>
	<option>Guac (extra)</option>
</select>
```

---

Elements with the `contenteditable` attribute support `innerHTML` and `textContent` bindings.

```sveltehtml
<div contenteditable="true" bind:innerHTML={html}></div>
```

---

`<details>` elements support binding to the `open` property.

```sveltehtml
<details bind:open={isOpen}>
	<summary>Details</summary>
	<p>
		Something small enough to escape casual notice.
	</p>
</details>
```

### Media element bindings

---

Media elements (`<audio>` and `<video>`) have their own set of bindings — six *readonly* ones...

* `duration` (readonly) — the total duration of the video, in seconds
* `buffered` (readonly) — an array of `{start, end}` objects
* `played` (readonly) — ditto
* `seekable` (readonly) — ditto
* `seeking` (readonly) — boolean
* `ended` (readonly) — boolean

...and five *two-way* bindings:

* `currentTime` — the current playback time in the video, in seconds
* `playbackRate` — how fast or slow to play the video, where 1 is 'normal'
* `paused` — this one should be self-explanatory
* `volume` — a value between 0 and 1
* `muted` — a boolean value indicating whether the player is muted

Videos additionally have readonly `videoWidth` and `videoHeight` bindings.

```sv
<video
	src={clip}
	bind:duration
	bind:buffered
	bind:played
	bind:seekable
	bind:seeking
	bind:ended
	bind:currentTime
	bind:playbackRate
	bind:paused
	bind:volume
	bind:muted
	bind:videoWidth
	bind:videoHeight
></video>
```

### Block-level element bindings

---

Block-level elements have 4 readonly bindings, measured using a technique similar to [this one](http://www.backalleycoder.com/2013/03/18/cross-browser-event-based-element-resize-detection/):

* `clientWidth`
* `clientHeight`
* `offsetWidth`
* `offsetHeight`

```sv
<div
	bind:offsetWidth={width}
	bind:offsetHeight={height}
>
	<Chart {width} {height}/>
</div>
```

## bind:group

```sv
bind:group={variable}
```

---

Inputs that work together can use `bind:group`.

```sv
<script>
	let tortilla = 'Plain';
	let fillings = [];
</script>

<!-- grouped radio inputs are mutually exclusive -->
<input type="radio" bind:group={tortilla} value="Plain">
<input type="radio" bind:group={tortilla} value="Whole wheat">
<input type="radio" bind:group={tortilla} value="Spinach">

<!-- grouped checkbox inputs populate an array -->
<input type="checkbox" bind:group={fillings} value="Rice">
<input type="checkbox" bind:group={fillings} value="Beans">
<input type="checkbox" bind:group={fillings} value="Cheese">
<input type="checkbox" bind:group={fillings} value="Guac (extra)">
```

## 3. bind:this

```sv
bind:this={dom_node}
```

---

To get a reference to a DOM node, use `bind:this`.

```sv
<script>
	import { onMount } from 'svelte';

	let canvasElement;

	onMount(() => {
		const ctx = canvasElement.getContext('2d');
		drawStuff(ctx);
	});
</script>

<canvas bind:this={canvasElement}></canvas>
```


#### class:*name*

```sv
class:name={value}
```
```sv
class:name
```

---

A `class:` directive provides a shorter way of toggling a class on an element.

```sv
<!-- These are equivalent -->
<div class="{active ? 'active' : ''}">...</div>
<div class:active={active}>...</div>

<!-- Shorthand, for when name and value match -->
<div class:active>...</div>

<!-- Multiple class toggles can be included -->
<div class:active class:inactive={!active} class:isAdmin>...</div>
```

### style:*property*

```sv
style:property={value}
```
```sv
style:property="value"
```
```sv
style:property
```

---

The `style:` directive provides a shorthand for setting multiple styles on an element.

```sv
<!-- These are equivalent -->
<div style:color="red">...</div>
<div style="color: red;">...</div>

<!-- Variables can be used -->
<div style:color={myColor}>...</div>

<!-- Shorthand, for when property and variable name match -->
<div style:color>...</div>

<!-- Multiple styles can be included -->
<div style:color style:width="12rem" style:background-color={darkMode ? "black" : "white"}>...</div>
```

---

When `style:` directives are combined with `style` attributes, the directives will take precedence:

```sv
<div style="color: blue;" style:color="red">This will be red</div>
```



## 4. use:*action*
- Permite aplicar una acción personalizada a un elemento del DOM. 
- Las acciones son funciones que puedes escribir para manipular un elemento cuando se monta o desmonta, o en respuesta a cambios de parámetros.

```sv
use:action
```
```sv
use:action={parameters}
```

```js
action = (node: HTMLElement, parameters: any) => {
	update?: (parameters: any) => void,
	destroy?: () => void
}
```

---

Actions are functions that are called when an element is created. They can return an object with a `destroy` method that is called after the element is unmounted:

```sv
<script>
	function foo(node) {
		// the node has been mounted in the DOM

		return {
			destroy() {
				// the node has been removed from the DOM
			}
		};
	}
</script>

<div use:foo></div>
```

---

An action can have a parameter. If the returned value has an `update` method, it will be called whenever that parameter changes, immediately after Svelte has applied updates to the markup.

> Don't worry about the fact that we're redeclaring the `foo` function for every component instance — Svelte will hoist any functions that don't depend on local state out of the component definition.

```sv
<script>
	export let bar;

	function foo(node, bar) {
		// the node has been mounted in the DOM

		return {
			update(bar) {
				// the value of `bar` has changed
			},

			destroy() {
				// the node has been removed from the DOM
			}
		};
	}
</script>

<div use:foo={bar}></div>
```


## 5. transition:*fn*

```sv
transition:fn
```
```sv
transition:fn={params}
```
```sv
transition:fn|local
```
```sv
transition:fn|local={params}
```


```js
transition = (node: HTMLElement, params: any) => {
	delay?: number,
	duration?: number,
	easing?: (t: number) => number,
	css?: (t: number, u: number) => string,
	tick?: (t: number, u: number) => void
}
```

---

A transition is triggered by an element entering or leaving the DOM as a result of a state change.

When a block is transitioning out, all elements inside the block, including those that do not have their own transitions, are kept in the DOM until every transition in the block has completed.

The `transition:` directive indicates a *bidirectional* transition, which means it can be smoothly reversed while the transition is in progress.

```sv
{#if visible}
	<div transition:fade>
		fades in and out
	</div>
{/if}
```

> By default intro transitions will not play on first render. You can modify this behaviour by setting `intro: true` when you [create a component](/docs#run-time-client-side-component-api).

### Transition parameters

---

Like actions, transitions can have parameters.

(The double `{{curlies}}` aren't a special syntax; this is an object literal inside an expression tag.)

```sv
{#if visible}
	<div transition:fade="{{ duration: 2000 }}">
		fades in and out over two seconds
	</div>
{/if}
```

### Custom transition functions

---

Transitions can use custom functions. If the returned object has a `css` function, Svelte will create a CSS animation that plays on the element.

The `t` argument passed to `css` is a value between `0` and `1` after the `easing` function has been applied. *In* transitions run from `0` to `1`, *out* transitions run from `1` to `0` — in other words `1` is the element's natural state, as though no transition had been applied. The `u` argument is equal to `1 - t`.

The function is called repeatedly *before* the transition begins, with different `t` and `u` arguments.

```sv
<script>
	import { elasticOut } from 'svelte/easing';

	export let visible;

	function whoosh(node, params) {
		const existingTransform = getComputedStyle(node).transform.replace('none', '');

		return {
			delay: params.delay || 0,
			duration: params.duration || 400,
			easing: params.easing || elasticOut,
			css: (t, u) => `transform: ${existingTransform} scale(${t})`
		};
	}
</script>

{#if visible}
	<div in:whoosh>
		whooshes in
	</div>
{/if}
```

---

A custom transition function can also return a `tick` function, which is called *during* the transition with the same `t` and `u` arguments.

> If it's possible to use `css` instead of `tick`, do so — CSS animations can run off the main thread, preventing jank on slower devices.

```sv
<script>
	export let visible = false;

	function typewriter(node, { speed = 1 }) {
		const valid = (
			node.childNodes.length === 1 &&
			node.childNodes[0].nodeType === Node.TEXT_NODE
		);

		if (!valid) {
			throw new Error(`This transition only works on elements with a single text node child`);
		}

		const text = node.textContent;
		const duration = text.length / (speed * 0.01);

		return {
			duration,
			tick: t => {
				const i = ~~(text.length * t);
				node.textContent = text.slice(0, i);
			}
		};
	}
</script>

{#if visible}
	<p in:typewriter="{{ speed: 1 }}">
		The quick brown fox jumps over the lazy dog
	</p>
{/if}
```

If a transition returns a function instead of a transition object, the function will be called in the next microtask. This allows multiple transitions to coordinate, making [crossfade effects](/tutorial/deferred-transitions) possible.


### Transition events

---

An element with transitions will dispatch the following events in addition to any standard DOM events:

* `introstart`
* `introend`
* `outrostart`
* `outroend`

```sv
{#if visible}
	<p
		transition:fly="{{ y: 200, duration: 2000 }}"
		on:introstart="{() => status = 'intro started'}"
		on:outrostart="{() => status = 'outro started'}"
		on:introend="{() => status = 'intro ended'}"
		on:outroend="{() => status = 'outro ended'}"
	>
		Flies in and out
	</p>
{/if}
```

---

Local transitions only play when the block they belong to is created or destroyed, *not* when parent blocks are created or destroyed.

```sv
{#if x}
	{#if y}
		<p transition:fade>
			fades in and out when x or y change
		</p>

		<p transition:fade|local>
			fades in and out only when y changes
		</p>
	{/if}
{/if}
```


### in:*fn*/out:*fn*

```sv
in:fn
```
```sv
in:fn={params}
```
```sv
in:fn|local
```
```sv
in:fn|local={params}
```

```sv
out:fn
```
```sv
out:fn={params}
```
```sv
out:fn|local
```
```sv
out:fn|local={params}
```

---

Similar to `transition:`, but only applies to elements entering (`in:`) or leaving (`out:`) the DOM.

Unlike with `transition:`, transitions applied with `in:` and `out:` are not bidirectional — an in transition will continue to 'play' alongside the out transition, rather than reversing, if the block is outroed while the transition is in progress. If an out transition is aborted, transitions will restart from scratch.

```sv
{#if visible}
	<div in:fly out:fade>
		flies in, fades out
	</div>
{/if}
```



## 5. animate:*fn*

```sv
animate:name
```

```sv
animate:name={params}
```

```js
animation = (node: HTMLElement, { from: DOMRect, to: DOMRect } , params: any) => {
	delay?: number,
	duration?: number,
	easing?: (t: number) => number,
	css?: (t: number, u: number) => string,
	tick?: (t: number, u: number) => void
}
```

```js
DOMRect {
	bottom: number,
	height: number,
	​​left: number,
	right: number,
	​top: number,
	width: number,
	x: number,
	y: number
}
```

---

An animation is triggered when the contents of a [keyed each block](/docs#template-syntax-each) are re-ordered. Animations do not run when an element is added or removed, only when the index of an existing data item within the each block changes. Animate directives must be on an element that is an *immediate* child of a keyed each block.

Animations can be used with Svelte's [built-in animation functions](/docs#run-time-svelte-animate) or [custom animation functions](/docs#template-syntax-element-directives-animate-fn-custom-animation-functions).

```sv
<!-- When `list` is reordered the animation will run-->
{#each list as item, index (item)}
	<li animate:flip>{item}</li>
{/each}
```

#### Animation Parameters

---

As with actions and transitions, animations can have parameters.

(The double `{{curlies}}` aren't a special syntax; this is an object literal inside an expression tag.)

```sv
{#each list as item, index (item)}
	<li animate:flip="{{ delay: 500 }}">{item}</li>
{/each}
```

### Custom animation functions

---

Animations can use custom functions that provide the `node`, an `animation` object and any `parameters` as arguments. The `animation` parameter is an object containing `from` and `to` properties each containing a [DOMRect](https://developer.mozilla.org/en-US/docs/Web/API/DOMRect#Properties) describing the geometry of the element in its `start` and `end` positions. The `from` property is the DOMRect of the element in its starting position, the `to` property is the DOMRect of the element in its final position after the list has been reordered and the DOM updated.

If the returned object has a `css` method, Svelte will create a CSS animation that plays on the element.

The `t` argument passed to `css` is a value that goes from `0` and `1` after the `easing` function has been applied. The `u` argument is equal to `1 - t`.

The function is called repeatedly *before* the animation begins, with different `t` and `u` arguments.


```sv
<script>
	import { cubicOut } from 'svelte/easing';

	function whizz(node, { from, to }, params) {

		const dx = from.left - to.left;
		const dy = from.top - to.top;

		const d = Math.sqrt(dx * dx + dy * dy);

		return {
			delay: 0,
			duration: Math.sqrt(d) * 120,
			easing: cubicOut,
			css: (t, u) =>
				`transform: translate(${u * dx}px, ${u * dy}px) rotate(${t*360}deg);`
		};
	}
</script>

{#each list as item, index (item)}
	<div animate:whizz>{item}</div>
{/each}
```

---


A custom animation function can also return a `tick` function, which is called *during* the animation with the same `t` and `u` arguments.

> If it's possible to use `css` instead of `tick`, do so — CSS animations can run off the main thread, preventing jank on slower devices.

```sv
<script>
	import { cubicOut } from 'svelte/easing';

	function whizz(node, { from, to }, params) {

		const dx = from.left - to.left;
		const dy = from.top - to.top;

		const d = Math.sqrt(dx * dx + dy * dy);

		return {
		delay: 0,
		duration: Math.sqrt(d) * 120,
		easing: cubicOut,
		tick: (t, u) =>
			Object.assign(node.style, {
				color: t > 0.5 ? 'Pink' : 'Blue'
			});
	};
	}
</script>

{#each list as item, index (item)}
	<div animate:whizz>{item}</div>
{/each}
```


# Directivas de Componentes
En Svelte, las directivas de componentes son mecanismos que te permiten interactuar de manera especial con componentes desde otros componentes. Estas directivas facilitan la vinculación de datos, la manipulación directa de componentes hijos y la propagación de eventos. Las directivas de componentes son esenciales para crear aplicaciones modulares y reutilizables, donde los componentes pueden comunicarse de manera eficiente entre sí.

# 1. on:*eventname*

```sv
on:eventname={handler}
```

---

Components can emit events using [createEventDispatcher](/docs#run-time-svelte-createeventdispatcher), or by forwarding DOM events. Listening for component events looks the same as listening for DOM events:

```sv
<SomeComponent on:whatever={handler}/>
```

---

As with DOM events, if the `on:` directive is used without a value, the component will *forward* the event, meaning that a consumer of the component can listen for it.

```sv
<SomeComponent on:whatever/>
```

#### --style-props

```sv
--style-props="anycssvalue"
```

---

You can also pass styles as props to components for the purposes of theming, using CSS custom properties.

Svelte's implementation is essentially syntactic sugar for adding a wrapper element. This example:

```sv
<Slider
  bind:value
  min={0}
  --rail-color="black"
  --track-color="rgb(0, 0, 255)"
/>
```

---

Desugars to this:

```sv
<div style="display: contents; --rail-color: black; --track-color: rgb(0, 0, 255)">
  <Slider
    bind:value
    min={0}
    max={100}
  />
</div>
```

**Note**: Since this is an extra `<div>`, beware that your CSS structure might accidentally target this. Be mindful of this added wrapper element when using this feature.

---

Svelte's CSS Variables support allows for easily themable components:

```sv
<!-- Slider.svelte -->
<style>
  .potato-slider-rail {
    background-color: var(--rail-color, var(--theme-color, 'purple'));
  }
</style>
```

---

So you can set a high level theme color:

```css
/* global.css */
html {
  --theme-color: black;
}
```

---

Or override it at the consumer level:

```sv
<Slider --rail-color="goldenrod"/>
```

## 2. bind:*property*

```sv
bind:property={variable}
```

---

You can bind to component props using the same syntax as for elements.

```sv
<Keypad bind:value={pin}/>
```

## 3. bind:this

```sv
bind:this={component_instance}
```

---

Components also support `bind:this`, allowing you to interact with component instances programmatically.

> Note that we can't do `{cart.empty}` since `cart` is `undefined` when the button is first rendered and throws an error.

```sv
<ShoppingCart bind:this={cart}/>

<button on:click={() => cart.empty()}>
	Empty shopping cart
</button>
```



## 4. `<slot>`

```sv
<slot><!-- optional fallback --></slot>
```
```sv
<slot name="x"><!-- optional fallback --></slot>
```
```sv
<slot prop={value}></slot>
```

---

Components can have child content, in the same way that elements can.

The content is exposed in the child component using the `<slot>` element, which can contain fallback content that is rendered if no children are provided.

```sv
<!-- Widget.svelte -->
<div>
	<slot>
		this fallback content will be rendered when no content is provided, like in the first example
	</slot>
</div>

<!-- App.svelte -->
<Widget></Widget> <!-- this component will render the default content -->

<Widget>
	<p>this is some child content that will overwrite the default slot content</p>
</Widget>
```

#### `<slot name="`*name*`">`

---

Named slots allow consumers to target specific areas. They can also have fallback content.

```sv
<!-- Widget.svelte -->
<div>
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer"></slot>
</div>

<!-- App.svelte -->
<Widget>
	<h1 slot="header">Hello</h1>
	<p slot="footer">Copyright (c) 2019 Svelte Industries</p>
</Widget>
```

Components can be placed in a named slot using the syntax `<Component slot="name" />`.
In order to place content in a slot without using a wrapper element, you can use the special element `<svelte:fragment>`.

```sv
<!-- Widget.svelte -->
<div>
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer"></slot>
</div>

<!-- App.svelte -->
<Widget>
	<HeaderComponent slot="header" />
	<svelte:fragment slot="footer">
		<p>All rights reserved.</p>
		<p>Copyright (c) 2019 Svelte Industries</p>
	</svelte:fragment>
</Widget>
```


#### `$$slots`

---

`$$slots` is an object whose keys are the names of the slots passed into the component by the parent. If the parent does not pass in a slot with a particular name, that name will not be present in `$$slots`. This allows components to render a slot (and other elements, like wrappers for styling) only if the parent provides it.

Note that explicitly passing in an empty named slot will add that slot's name to `$$slots`. For example, if a parent passes `<div slot="title" />` to a child component, `$$slots.title` will be truthy within the child.

```sv
<!-- Card.svelte -->
<div>
	<slot name="title"></slot>
	{#if $$slots.description}
		<!-- This <hr> and slot will render only if a slot named "description" is provided. -->
		<hr>
		<slot name="description"></slot>
	{/if}
</div>

<!-- App.svelte -->
<Card>
	<h1 slot="title">Blog Post Title</h1>
	<!-- No slot named "description" was provided so the optional slot will not be rendered. -->
</Card>
```

#### `<slot key={`*value*`}>`

---

Slots can be rendered zero or more times, and can pass values *back* to the parent using props. The parent exposes the values to the slot template using the `let:` directive.

The usual shorthand rules apply — `let:item` is equivalent to `let:item={item}`, and `<slot {item}>` is equivalent to `<slot item={item}>`.

```sv
<!-- FancyList.svelte -->
<ul>
	{#each items as item}
		<li class="fancy">
			<slot prop={item}></slot>
		</li>
	{/each}
</ul>

<!-- App.svelte -->
<FancyList {items} let:prop={thing}>
	<div>{thing.text}</div>
</FancyList>
```

---

Named slots can also expose values. The `let:` directive goes on the element with the `slot` attribute.

```sv
<!-- FancyList.svelte -->
<ul>
	{#each items as item}
		<li class="fancy">
			<slot name="item" {item}></slot>
		</li>
	{/each}
</ul>

<slot name="footer"></slot>

<!-- App.svelte -->
<FancyList {items}>
	<div slot="item" let:item>{item.text}</div>
	<p slot="footer">Copyright (c) 2019 Svelte Industries</p>
</FancyList>
```


### `<svelte:self>`

---

The `<svelte:self>` element allows a component to include itself, recursively.

It cannot appear at the top level of your markup; it must be inside an if or each block or passed to a component's slot to prevent an infinite loop.

```sv
<script>
	export let count;
</script>

{#if count > 0}
	<p>counting down... {count}</p>
	<svelte:self count="{count - 1}"/>
{:else}
	<p>lift-off!</p>
{/if}
```

### `<svelte:component>`

```sv
<svelte:component this={expression}/>
```

---

The `<svelte:component>` element renders a component dynamically, using the component constructor specified as the `this` property. When the property changes, the component is destroyed and recreated.

If `this` is falsy, no component is rendered.

```sv
<svelte:component this={currentSelection.component} foo={bar}/>
```

### `<svelte:element>`

```sv
<svelte:element this={expression}/>
```

---

The `<svelte:element>` element lets you render an element of a dynamically specified type. This is useful for example when displaying rich text content from a CMS. Any properties and event listeners present will be applied to the element.

The only supported binding is `bind:this`, since the element type specific bindings that Svelte does at build time (e.g. `bind:value` for input elements) does not work with a dynamic tag type.

If `this` has a nullish value, the element and its children will not be rendered.

If `this` is the name of a void tag (e.g., `br`) and `<svelte:element>` has child elements, a runtime error will be thrown in development mode.

```sv
<script>
	let tag = 'div';
	export let handler;
</script>

<svelte:element this={tag} on:click={handler}>Foo</svelte:element>
```

### `<svelte:window>`

```sv
<svelte:window on:event={handler}/>
```
```sv
<svelte:window bind:prop={value}/>
```

---

The `<svelte:window>` element allows you to add event listeners to the `window` object without worrying about removing them when the component is destroyed, or checking for the existence of `window` when server-side rendering.

Unlike `<svelte:self>`, this element may only appear at the top level of your component and must never be inside a block or element.

```sv
<script>
	function handleKeydown(event) {
		alert(`pressed the ${event.key} key`);
	}
</script>

<svelte:window on:keydown={handleKeydown}/>
```

---

You can also bind to the following properties:

* `innerWidth`
* `innerHeight`
* `outerWidth`
* `outerHeight`
* `scrollX`
* `scrollY`
* `online` — an alias for window.navigator.onLine

All except `scrollX` and `scrollY` are readonly.

```sv
<svelte:window bind:scrollY={y}/>
```

> Note that the page will not be scrolled to the initial value to avoid accessibility issues. Only subsequent changes to the bound variable of `scrollX` and `scrollY` will cause scrolling. However, if the scrolling behaviour is desired, call `scrollTo()` in `onMount()`.

### `<svelte:body>`

```sv
<svelte:body on:event={handler}/>
```

---

Similarly to `<svelte:window>`, this element allows you to add listeners to events on `document.body`, such as `mouseenter` and `mouseleave`, which don't fire on `window`. It also lets you use [actions](/docs#template-syntax-element-directives-use-action) on the `<body>` element.

As with `<svelte:window>`, this element may only appear the top level of your component and must never be inside a block or element.

```sv
<svelte:body
	on:mouseenter={handleMouseenter}
	on:mouseleave={handleMouseleave}
	use:someAction
/>
```


### `<svelte:head>`

```sv
<svelte:head>...</svelte:head>
```

---

This element makes it possible to insert elements into `document.head`. During server-side rendering, `head` content is exposed separately to the main `html` content.

As with `<svelte:window>` and `<svelte:body>`, this element may only appear at the top level of your component and must never be inside a block or element.

```sv
<svelte:head>
	<link rel="stylesheet" href="/tutorial/dark-theme.css">
</svelte:head>
```


### `<svelte:options>`

```sv
<svelte:options option={value}/>
```

---

The `<svelte:options>` element provides a place to specify per-component compiler options, which are detailed in the [compiler section](/docs#compile-time-svelte-compile). The possible options are:

* `immutable={true}` — you never use mutable data, so the compiler can do simple referential equality checks to determine if values have changed
* `immutable={false}` — the default. Svelte will be more conservative about whether or not mutable objects have changed
* `accessors={true}` — adds getters and setters for the component's props
* `accessors={false}` — the default
* `namespace="..."` — the namespace where this component will be used, most commonly "svg"; use the "foreign" namespace to opt out of case-insensitive attribute names and HTML-specific warnings
* `tag="..."` — the name to use when compiling this component as a custom element

```sv
<svelte:options tag="my-custom-element"/>
```

### `<svelte:fragment>`

The `<svelte:fragment>` element allows you to place content in a [named slot](/docs#template-syntax-slot-slot-name-name) without wrapping it in a container DOM element. This keeps the flow layout of your document intact.

```sv
<!-- Widget.svelte -->
<div>
	<slot name="header">No header was provided</slot>
	<p>Some content between header and footer</p>
	<slot name="footer"></slot>
</div>

<!-- App.svelte -->
<Widget>
	<h1 slot="header">Hello</h1>
	<svelte:fragment slot="footer">
		<p>All rights reserved.</p>
		<p>Copyright (c) 2019 Svelte Industries</p>
	</svelte:fragment>
</Widget>
```
