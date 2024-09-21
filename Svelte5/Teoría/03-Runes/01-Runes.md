

Svelte 5 introduce varias características nuevas y conceptos que amplían la funcionalidad del framework, enfocándose principalmente en mejorar la reactividad y la gestión del estado en los componentes.

Svelte 5 introduce mejoras bajo el capó, como componentes funcionales y el uso de "señales" para gestionar la reactividad. Sin embargo, estas mejoras son en su mayoría incrementales, excepto por la nueva característica llamada Runas.

Una runa es una función precedida por un carácter de dólar. Como desarrollador, utilizas estas funciones especiales casi de la misma manera que lo harías con cualquier otra función. Luego, el motor de Svelte se encarga de implementar la acción deseada de la runa por ti tras bambalinas.

# Runes en Svelte 5

## ¿Qué son las Runas?
En Svelte 5, las runas son funciones especiales que comienzan con un símbolo de dólar ($). Estas runas le indican al compilador de Svelte cómo manejar ciertos aspectos reactivos de los componentes. El término "runa" proviene de un concepto mágico que denota algo con poderes especiales.

## Simplicidad y Modularidad
Aunque las runas pueden parecer una adición compleja, en realidad simplifican cómo se manejan las propiedades y el estado dentro de los componentes, haciéndolo de una manera más modular y clara.

Las runas son tokens especiales que le dicen al compilador de Svelte que trabaje tras bambalinas de maneras específicas para hacer que las cosas sucedan. Esto significa que los desarrolladores pueden centrarse en la lógica de su aplicación y dejar que Svelte se encargue de la reactividad y el estado.

# Runas principales introducidas en Svelte 5:
## $state():

- Funcionalidad: Es similar al hook useState() de React. Se utiliza para declarar variables de estado reactivo dentro de un componente.
- Ventajas:
  - Aumenta la claridad del código al hacer explícito qué variables son reactivas.
  - Puede ser usado en cualquier lugar, no solo en el nivel superior de un componente.
- Ejemplo: En lugar de usar let text = "Default", se usa let text = $state("Default") para declarar una variable de estado que Svelte manejará de forma reactiva.


Ejemplo de cómo crear un input y mostrar su valor en Svelte 4, sin runas. Usando la sintaxis bind:value={text}, que te da una manera simple de hacer un enlace bidireccional a un input:
```sveltehtml
<script>
    let value = "Default";
</script>

<input type="text" bind:value={value} />
<p>El valor del input es: {value}</p>
```

Ejemplo de cómo crear un input y mostrar su valor en Svelte 5, con runas:
```sveltehtml
<script>
    let value = $state("Default");
</script>

<input type="text" bind:value={value} />
<p>El valor del input es: {value}</p>
```
En este ejemplo, el valor "Default" que pasamos a $state es el valor inicial. La llamada bind:value no tiene que cambiar en absoluto: Svelte sabe cómo usar una runa en ese contexto.

    

## $derived():
- Funcionalidad: Similar a las propiedades derivadas, permite crear variables que dependen de otras variables de estado. Reemplaza la sintaxis $: que se usaba anteriormente en Svelte.

- Ejemplo: let sentence = $derived(greeting + " " + name); actualizará sentence cada vez que cambien greeting o name.


## $effect():
- Funcionalidad: Similar al hook useEffect() de React, esta runa permite ejecutar efectos secundarios que dependen de ciertas variables reactivas.
- Ejemplo: Puedes usar $effect(() => { /* código */ }); para ejecutar un bloque de código cuando ciertas variables cambien o cuando el componente se monte/desmonte.


## $props():
- Funcionalidad: Proporciona una nueva manera de manejar y declarar las propiedades que un componente recibe, reemplazando la necesidad de exportar variables directamente con export let.
- Ejemplo: En un componente, puedes usar let { prop1 = "default", prop2 } = $props(); para manejar los props del componente.

## $inspect():
- Funcionalidad: Es una runa que facilita la depuración al emitir automáticamente logs a la consola cuando las variables especificadas cambian.
- Ejemplo: $inspect(count, message); registrará automáticamente los valores de count y message en la consola cada vez que cambien.


# Señales: El Motor Reactivo de Svelte 5
Señales: Son el mecanismo interno que Svelte 5 usa para gestionar la reactividad de las runas. Esto permite que las actualizaciones de estado sean "en vivo" y evita problemas donde el estado podría volverse obsoleto, lo cual era un problema en versiones anteriores de Svelte.

# Conclusión
- Simplificación de la API: Aunque puede haber una curva de aprendizaje con las runas, el objetivo es simplificar y hacer más explícita la API de Svelte para manejar la reactividad. 
- Facilidad de Migración: Svelte 5 ofrece herramientas más elegantes y eficientes para manejar la reactividad, lo que puede requerir un ajuste al principio, pero simplifica la gestión de estado y reactividad en proyectos más grandes y complejos.


