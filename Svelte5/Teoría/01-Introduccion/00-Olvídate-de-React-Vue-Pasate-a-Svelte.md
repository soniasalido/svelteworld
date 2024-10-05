¡Hola a todos! Bienvenidos a este tutorial donde exploraremos las virtudes de Svelte y te explicaremos por qué deberías usarlo. ¡Vamos a empezar!

# ¿Hay alguien que piense en el desarrollador? Olvídate de React | Vue && Pásate a Svelte.

La respuesta es sencilla, ni la industria ni los clientes piensan en el desarrollador. Si el desarrollador pudiera elegir la tecnología que usará para hacer un producto, sería interesante que evaluara la opción de usar Svelte, ya que es una herramienta que le permitirá hacer productos de calidad en menos tiempo.


"¿Estás pensando en aprender un nuevo framework o quieres mejorar tus aplicaciones web? Hoy vamos a explorar por qué Svelte podría ser la mejor opción frente a React, uno de los frameworks más populares actualmente."

## Diferencia en el enfoque: Svelte es un compilador, React es un framework.
Primero, hablemos de la diferencia fundamental. **React es un framework basado en componentes que necesita un motor de renderizado en el navegador.** Svelte, por otro lado, es un compilador. Y aquí es donde Svelte brilla.

> [!Important]
> **A diferencia de otros frameworks como React o Vue, Svelte se diferencia principalmente en que es un compilador y no un framework de tiempo de ejecución.**

[Animación mostrando React con un Virtual DOM en acción, seguido por una animación que muestra cómo Svelte compila el código en JavaScript puro sin necesidad de un framework adicional en el navegador.]

Svelte se identifica principalmente como un **compilador** porque su enfoque principal es **transformar el código fuente que escribimos en JavaScript, HTML y CSS puros (es decir, sin dependencias externas) que se ejecutan directamente en el navegador y que interactúa directamente con el DOM**. Este JavaScript generado es eficiente y optimizado, lo que resulta en una aplicación que no necesita una gran biblioteca de tiempo de ejecución, como ocurre con otros frameworks. Así, el código resultante puede considerarse **`"Vanilla JavaScript"`** porque **es JavaScript que no depende de un framework específico para funcionar en el navegador**. No hay una gran biblioteca en tiempo de ejecución que acompañe a la aplicación, como ocurre con otros frameworks como React, Angular o Vue.

> [!Important]
> **Svelte es un compilador porque "compila" el código en lugar de ejecutarlo directamente en el navegador.**

## Un proyecto Svelte tiene un menor tamaño de archivo
¿Sabías que las aplicaciones creadas con Svelte son mucho más ligeras? Comparémoslo.

Menor tamaño de bundle: Como Svelte compila todo en un JavaScript optimizado, el tamaño del bundle final tiende a ser más pequeño en comparación con aplicaciones similares hechas en otros frameworks que incluyen librerías grandes para su tiempo de ejecución.


## Una aplicación en Svelte NO carga con mochilas de librerías
No se arrastran librerías: A diferencia de frameworks como React o Vue, que requieren que sus bibliotecas (React, ReactDOM, Vue) sean incluidas en la aplicación para gestionar la reactividad, el Virtual DOM, el estado y otros aspectos del framework, Svelte no necesita "arrastrar" o incluir una biblioteca adicional en el bundle final que se ejecuta en el navegador. Todo el trabajo del framework se realiza durante la compilación, y el resultado es un código muy eficiente que no depende de una biblioteca adicional.

Esto significa que cuando usamos Svelte, no estamos cargando una biblioteca adicional en el navegador. El código resultante es más pequeño y rápido.

## Los componentes en Svelte NO se atan a versiones específicas
Debido a que Svelte es un compilador y no una biblioteca de tiempo de ejecución, los componentes que creas no dependen de la versión de Svelte que se utiliza para compilarlos. Una vez que el componente es compilado a JavaScript, HTML y CSS, no depende de Svelte en tiempo de ejecución. Por lo tanto, los componentes que construimos en Svelte son más resilientes a cambios en el framework mismo.

## Svelte es sinónimo de Simplicidad en el código

En React, necesitas manejar JSX, hooks, y estados de manera explícita. Con Svelte, el enfoque es mucho más sencillo. El código es más fácil de leer y mantener porque no necesitas tanta infraestructura para manejar el estado o las actualizaciones de la interfaz.


## Svelte tiene Reactividad nativa y automática
Hablando de reactividad, Svelte es reactivo por diseño. Solo necesitamos declarar las variables, y cuando cambian, la interfaz se actualiza automáticamente. En React, tenemos que aprender hooks como `useState()` y `useEffect()` para lograr lo mismo.

Cuando definimos una variable reactiva en Svelte, cualquier cambio en esa variable provoca automáticamente una actualización en la interfaz de usuario (UI) sin necesidad de utilizar un "setState" o métodos similares. Svelte compila el código de la aplicación e inyecta el código necesario para actualizar el DOM directamente cuando cambian los estados. Esto reduce la sobrecarga en comparación con enfoques como el de React, donde las actualizaciones se planifican y optimizan antes de aplicarse al DOM.


## Svelte tiene un mejor rendimiento
Gracias a su enfoque sin Virtual DOM, Svelte tiene mejor rendimiento en muchas situaciones. Especialmente en aplicaciones pequeñas y medianas, Svelte puede superar a React en términos de velocidad de carga y rendimiento en tiempo de ejecución.

Svelte optimiza el código en tiempo de compilación, mientras que React hace su magia en el navegador, lo que puede generar más sobrecarga.

Con Svelte, no necesitamos cargar un Virtual DOM en cada aplicación. Esto puede hacer una diferencia notable en el rendimiento y el tamaño del archivo, especialmente en dispositivos móviles o conexiones lentas.

Svelte no utiliza un Virtual DOM. En lugar de eso, el código compilado por Svelte actualiza directamente el DOM real. Esto permite que las aplicaciones creadas con Svelte sean rápidas y eficientes, especialmente en términos de rendimiento.


## Svelte tiene CSS y estilos encapsulados
En Svelte, el manejo de estilos también es más limpio. Los estilos CSS en Svelte son locales por defecto.

No necesitamoss preocuparnos por clases globales o conflictos de nombres. Todo está encapsulado en el propio componente.

## Svelte: Ecosistema de herramientas y plugins
Aunque el ecosistema de React es más maduro y amplio, Svelte tiene un crecimiento impresionante en su ecosistema de herramientas y plugins.

Con SvelteKit, podemos crear aplicaciones completas con renderizado en el servidor, rutas dinámicas y más, de una manera muy eficiente.


## Svelte: Comunidad y soporte
Svelte tiene una comunidad creciente y muy activa. Aunque React tiene una comunidad más grande, Svelte está ganando terreno rápidamente.

Svelte es una excelente opción si buscas un framework moderno, con una curva de aprendizaje suave y una comunidad que sigue expandiéndose.






# Conclusión
En resumen, Svelte es una gran alternativa a React si buscas un framework ligero, rápido y fácil de usar. Aunque React sigue siendo una excelente herramienta, Svelte puede ofrecerte una mejor experiencia de desarrollo y rendimiento en proyectos donde la simplicidad y la velocidad son cruciales.

