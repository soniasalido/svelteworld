---
title: Basic markup
---

- [basically what we have in the Svelte docs today](https://svelte.dev/docs/basic-markup)

#  Tags | Etiquetas

Una etiqueta en minúsculas, como `<div>`, denota un elemento HTML regular. Una etiqueta en mayúsculas, como `<Widget>` o `<Namespace.Widget>`, indica un *componente*.

```sveltehtml
<script>
	import Widget from './Widget.svelte';
</script>

<div>
	<Widget />
</div>
```

# Atributos y props

Por defecto, los atributos funcionan exactamente como sus contrapartes de HTML.

```sveltehtml
<div class="foo">
	<button disabled>can't touch this</button>
</div>
```
---

Como en HTML, los valores pueden no estar entre comillas.

```sveltehtml
<!-- prettier-ignore -->
<input type=checkbox />
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
<input required={false} placeholder="This input field is not required" />
<div title={null}>This div has no title attribute</div>
```

---

Citar una expresión singular no afecta cómo se analiza el valor, pero en Svelte 6 lo hará:
```sveltehtml
<button disabled="{number !== 42}">...</button>
```

---

Cuando el nombre del atributo y el valor coinciden (`name={name}`), se pueden reemplazar con `{name}`.
```sveltehtml
<button {disabled}>...</button>
<!-- equivalent to
<button disabled={disabled}>...</button>
-->
```

---

Por convención, los valores pasados a los componentes se denominan _propiedades_ o _props_ en lugar de _atributos_, que son una característica del DOM.


Como con los elementos, `name={name}` se puede reemplazar con la forma abreviada `{name}`.
```sveltehtml
<Widget foo={bar} answer={42} text="hello" />
```
---

_Spread attributes_ |  Propagar atributos permiten pasar muchos atributos o propiedades a un elemento o componente a la vez.


Un elemento o componente puede tener múltiples atributos de propagación, intercalados con atributos regulares.
```sveltehtml
<Widget {...things} />
```


> El atributo `value` de un elemento `input` o sus elementos hijos `option` no debe establecerse con atributos de propagación al usar `bind:group` o `bind:checked`. Svelte necesita poder ver el `value` del elemento directamente en el marcado en estos casos para poder vincularlo a la variable vinculada.


> A veces, el orden de los atributos importa ya que Svelte establece los atributos secuencialmente en JavaScript. Por ejemplo, `<input type="range" min="0" max="1" value={0.5} step="0.1"/>`, Svelte intentará establecer el valor en `1` (redondeando desde 0.5 ya que el paso por defecto es 1), y luego establecer el paso en `0.1`. Para solucionar esto, cámbialo a `<input type="range" min="0" max="1" step="0.1" value={0.5}/>`.


> Otro ejemplo es `<img src="..." loading="lazy" />`. Svelte establecerá el `src` de la imagen antes de hacer que el elemento `img` tenga `loading="lazy"`, lo cual probablemente sea demasiado tarde. Cambia esto a `<img loading="lazy" src="...">` para que la imagen se cargue de forma perezosa.


# Eventos


Escuchando eventos del DOM es posible agregando atributos al elemento que comienzan con `on`. Por ejemplo, para escuchar el evento `click`, agregue el atributo `onclick` a un botón:

```sveltehtml
<button onclick={() => console.log('clicked')}>click me</button>
```

Los eventos de atributos son sensibles a mayúsculas y minúsculas. `onclick` escucha el evento `click`, `onClick` escucha el evento `Click`, que es diferente. Esto asegura que puedas escuchar eventos personalizados que tengan caracteres en mayúsculas.


Porque los eventos son solo atributos, se aplican las mismas reglas que para los atributos:
- puedes usar la forma abreviada: `<button {onclick}>click me</button>`
- puedes propagarlos: `<button {...thisSpreadContainsEventAttributes}>click me</button>`
- eventos de componentes son solo propiedades (callbaks) y no necesitan un concepto separado


En cuanto al tiempo, los atributos de eventos siempre se disparan después de los eventos de las vinculaciones (por ejemplo, `oninput` siempre se dispara después de una actualización de `bind:value`). Bajo el capó, algunos manejadores de eventos se adjuntan directamente con `addEventListener`, mientras que otros son _delegados_.


## Delegación de Eventos

Para reducir la huella de memoria y aumentar el rendimiento, Svelte utiliza una técnica llamada delegación de eventos. Esto significa que para ciertos eventos —ver la lista a continuación— un solo escuchador de eventos en la raíz de la aplicación se encarga de ejecutar cualquier manejador en la ruta del evento.


Hay algunas cosas a tener en cuenta:
- cuando manualmente despachas un evento con un escuchador delegado, asegúrate de establecer la opción `{ bubbles: true }` o no llegará a la raíz de la aplicación.
- cuando se usa `addEventListener` directamente, evita llamar a `stopPropagation` o el evento no llegará a la raíz de la aplicación y los manejadores no se invocarán. De manera similar, los manejadores agregados manualmente dentro de la raíz de la aplicación se ejecutarán _antes_ de los manejadores agregados de forma declarativa más profundo en el DOM (con, por ejemplo, `onclick={...}`), en ambas fases de captura y burbujeo. Por estas razones, es mejor usar la función `on` importada de `svelte/events` en lugar de `addEventListener`, ya que se asegurará de que se preserve el orden y se maneje correctamente `stopPropagation`.



Los siguientes manejadores de eventos son delegados:
- `beforeinput`
- `click`
- `change`
- `dblclick`
- `contextmenu`
- `focusin`
- `focusout`
- `input`
- `keydown`
- `keyup`
- `mousedown`
- `mousemove`
- `mouseout`
- `mouseover`
- `mouseup`
- `pointerdown`
- `pointermove`
- `pointerout`
- `pointerover`
- `pointerup`
- `touchend`
- `touchmove`
- `touchstart`


# Text expressions
Una expresión de JavaScript se puede incluir como texto rodeándola con llaves.

```sveltehtml
{expression}
```

LLaves se pueden incluir en una plantilla de Svelte usando sus cadenas de [entidades HTML](https://developer.mozilla.org/docs/Glossary/Entity): `&lbrace;`, `&lcub;`, o `&#123;` para `{` y `&rbrace;`, `&rcub;`, o `&#125;` para `}`.

Si estás usando una expresión regular (`RegExp`) [notación literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp#literal_notation_and_constructor), necesitarás envolverla en paréntesis.

```sveltehtml
{(/^[A-Za-z ]+$/).test(value) ? x : y}
```

```sveltehtml
<h1>Hello {name}!</h1>
<p>{a} + {b} = {a + b}.</p>

<div>{(/^[A-Za-z ]+$/).test(value) ? x : y}</div>
```


La expresión se convertirá en una cadena y escapada para evitar inyecciones de código. Si deseas renderizar HTML, usa la etiqueta `{@html}` en su lugar.
```sveltehtml
{@html potentiallyUnsafeHtmlString}
```


> Debemos asegurarnos escapar la cadena pasada o solo poblarla con valores que estén bajo tu control para prevenir [ataques XSS](https://owasp.org/www-community/attacks/xss/)

# Commentarios

Puedes usar comentarios HTML dentro de los componentes.

```sveltehtml
<!-- this is a comment! --><h1>Hello world</h1>
```

Comentarios que comienzan con `svelte-ignore` deshabilitan las advertencias para el siguiente bloque de marcado. Por lo general, estas son advertencias de accesibilidad; asegúrate de deshabilitarlas por una buena razón.
```sveltehtml
<!-- svelte-ignore a11y-autofocus -->
<input bind:value={name} autofocus />
```


Puedes añadir un comentario especial que comience con `@component` que se mostrará al pasar el ratón sobre el nombre del componente en otros archivos.
````sveltehtml
<!--
@component
- You can use markdown here.
- You can also use code blocks here.
- Usage:
  ```html
  <Main name="Arethra">
  ```
-->
<script>
	let { name } = $props();
</script>

<main>
	<h1>
		Hello, {name}
	</h1>
</main>
````
