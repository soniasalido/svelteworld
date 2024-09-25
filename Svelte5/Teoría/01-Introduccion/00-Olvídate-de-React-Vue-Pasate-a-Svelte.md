# ¿Hay alguien que piense en el desarrollador? Olvídate de React | Vue && Pásate a Svelte.

La respuesta es sencilla, ni la industria ni los clientes piensan en el desarrollador. En los ámbitos en los que el desarrollador pueda elegir la tecnología que usará para hacer un producto, sería interesante que evaluara la opción de usar Svelte, ya que es una herramienta que le permitirá hacer productos de calidad en menos tiempo.


A ellos solo les intre en el producto final. Por lo que es responsabilidad del desarrollador elegir la mejor herramienta para el trabajo.

"¿Estás pensando en aprender un nuevo framework o quieres mejorar tus aplicaciones web? Hoy vamos a explorar por qué Svelte podría ser la mejor opción frente a React, uno de los frameworks más populares actualmente."

## Diferencia en el enfoque
Narrador:

"Primero, hablemos de la diferencia fundamental. React es un framework basado en componentes que necesita un motor de renderizado en el navegador. Svelte, por otro lado, es un compilador. Y aquí es donde Svelte brilla."

> [!Important]
> **A diferencia de otros frameworks como React o Vue, Svelte se diferencia principalmente en que es un compilador y no un framework de tiempo de ejecución.**

Visual: Animación mostrando React con un Virtual DOM en acción, seguido por una animación que muestra cómo Svelte compila el código en JavaScript puro sin necesidad de un framework adicional en el navegador.

Narrador:
"Esto significa que cuando usas Svelte, no estás cargando una biblioteca adicional en el navegador. El código resultante es más pequeño y rápido."

Svelte se identifica principalmente como un compilador porque su enfoque principal es transformar el código fuente que escribimos en JavaScript, HTML y CSS puros (es decir, sin dependencias externas) que se ejecutan directamente en el navegador y que interactúa directamente con el DOM. Este JavaScript generado es eficiente y optimizado, lo que resulta en una aplicación que no necesita una gran biblioteca de tiempo de ejecución, como ocurre con otros frameworks. Así, el código resultante puede considerarse "Vanilla JavaScript" porque es JavaScript que no depende de un framework específico para funcionar en el navegador. No hay una gran biblioteca en tiempo de ejecución que acompañe a la aplicación, como ocurre con otros frameworks como React o Angular. En este sentido, Svelte es un compilador porque "compila" el código en lugar de ejecutarlo directamente en el navegador.

## Menor tamaño de archivo
Narrador:

"¿Sabías que las aplicaciones creadas con Svelte son mucho más ligeras? Comparémoslo."

Visual: Comparación lado a lado del tamaño de los archivos JavaScript finales para una simple aplicación en Svelte y React.


Menor tamaño de bundle: Como Svelte compila todo en un JavaScript optimizado, el tamaño del bundle final tiende a ser más pequeño en comparación con aplicaciones similares hechas en otros frameworks que incluyen librerías grandes para su tiempo de ejecución.

## Tu aplicación con carga con mochilas de librerías
No se arrastran librerías: A diferencia de frameworks como React o Vue, que requieren que sus bibliotecas (React, ReactDOM, Vue) sean incluidas en la aplicación para gestionar la reactividad, el Virtual DOM, el estado y otros aspectos del framework, Svelte no necesita "arrastrar" o incluir una biblioteca adicional en el bundle final que se ejecuta en el navegador. Todo el trabajo del framework se realiza durante la compilación, y el resultado es un código muy eficiente que no depende de una biblioteca adicional.

## Los componentes no se atan a versiones específicas
Debido a que Svelte es un compilador y no una biblioteca de tiempo de ejecución, los componentes que creas no dependen de la versión de Svelte que se utiliza para compilarlos. Una vez que el componente es compilado a JavaScript, HTML y CSS, no depende de Svelte en tiempo de ejecución. Por lo tanto, los componentes que constrimos en Svelte son más resilientes a cambios en el framework mismo.

## Simplicidad en el código
Narrador:

"Veamos el código. Uno de los puntos fuertes de Svelte es la simplicidad."

Visual: Muestra un componente React básico junto a un componente equivalente en Svelte.

Narrador:
"En React, necesitas manejar JSX, hooks, y estados de manera explícita. Con Svelte, el enfoque es mucho más sencillo. El código es más fácil de leer y mantener porque no necesitas tanta infraestructura para manejar el estado o las actualizaciones de la interfaz."

Visual: Muestra cómo en Svelte simplemente declaras una variable, y el estado se actualiza de forma reactiva sin necesidad de useState() o useEffect().


## Reactividad automática
Narrador:

"Hablando de reactividad, Svelte es reactivo por diseño. Solo necesitas declarar tus variables, y cuando cambian, la interfaz se actualiza automáticamente. En React, tienes que aprender hooks como useState() y useEffect() para lograr lo mismo."

Visual: Muestra un contador simple que se incrementa en ambas bibliotecas. En Svelte, se ve el código simple y directo, mientras que en React se muestra la implementación con hooks.


## Mejor rendimiento
Narrador:

"Gracias a su enfoque sin Virtual DOM, Svelte tiene mejor rendimiento en muchas situaciones. Especialmente en aplicaciones pequeñas y medianas, Svelte puede superar a React en términos de velocidad de carga y rendimiento en tiempo de ejecución."

Visual: Comparación visual de tiempos de carga en dos aplicaciones sencillas, una en Svelte y otra en React. Los números de carga en Svelte son más rápidos.

Narrador:
"Svelte optimiza el código en tiempo de compilación, mientras que React hace su magia en el navegador, lo que puede generar más sobrecarga."

Narrador:
"Con Svelte, no necesitas cargar un Virtual DOM en cada aplicación. Esto puede hacer una diferencia notable en el rendimiento y el tamaño del archivo, especialmente en dispositivos móviles o conexiones lentas."

Svelte no utiliza un Virtual DOM. En lugar de eso, el código compilado por Svelte actualiza directamente el DOM real. Esto permite que las aplicaciones creadas con Svelte sean rápidas y eficientes, especialmente en términos de rendimiento.


## CSS y estilos encapsulados
Narrador:

"En Svelte, el manejo de estilos también es más limpio. Los estilos CSS en Svelte son locales por defecto."

Visual: Muestra cómo se aplican los estilos en un componente Svelte y cómo estos se encapsulan localmente sin la necesidad de módulos CSS o styled-components como en React.

Narrador:
"No necesitas preocuparte por clases globales o conflictos de nombres. Todo está encapsulado en el propio componente."

## Ecosistema de herramientas y plugins
Narrador:

"Aunque el ecosistema de React es más maduro y amplio, Svelte tiene un crecimiento impresionante en su ecosistema de herramientas y plugins."

Visual: Muestra SvelteKit, la herramienta oficial de Svelte para crear aplicaciones robustas con routing, manejo de datos, y renderizado en el servidor.

Narrador:
"Con SvelteKit, puedes crear aplicaciones completas con renderizado en el servidor, rutas dinámicas y más, de una manera muy eficiente."

## Comunidad y soporte
Narrador:

"Svelte tiene una comunidad creciente y muy activa. Aunque React tiene una comunidad más grande, Svelte está ganando terreno rápidamente."

Visual: Comparar los crecimientos en popularidad y las estrellas en GitHub de Svelte y React, con una animación que muestre el progreso reciente de Svelte.

Narrador:
"Svelte es una excelente opción si buscas un framework moderno, con una curva de aprendizaje suave y una comunidad que sigue expandiéndose."



# Manejo del DOM en Svelte vs. React:
### En Svelte.
Como Svelte no utiliza un Virtual DOM, sino que genera código altamente optimizado que interactúa directamente con el DOM, no tiene la sobrecarga de mantener copias del DOM en memoria. En su lugar, Svelte tiene referencias directas a elementos del DOM, lo que le permite realizar actualizaciones de manera más directa y eficiente.

En lugar de actualizar el DOM, Svelte reacciona a los cambios en el estado de la aplicación y actualiza el DOM directamente. Esto significa que no hay sobrecarga de memoria y que las actualizaciones son más rápidas. Hay punteros a elementos del DOM en lugar de copias virtuales de los mismos.

Svelte cambia los nodos justo en el momento en el que se cambia el estado. Esto significa que no hay necesidad de comparar nodos y hacer cambios en el DOM. Svelte sabe exactamente qué nodos cambiar y cuándo hacerlo.


### En React.
En React, el Virtual DOM actúa como una capa intermedia. React crea y mantiene una copia en memoria del DOM llamada Virtual DOM, y las actualizaciones se aplican a esta copia antes de reflejarse en el DOM real. Este enfoque tiene sus ventajas, como la capacidad de optimizar actualizaciones y realizar redibujos en lote, pero también puede generar una sobrecarga en términos de memoria y procesamiento.


# Reactividad en Svelte vs. React:
## El sistema de reactividad en Svelte.
Está integrado directamente en el compilador. Cuando definimos una variable reactiva en Svelte, cualquier cambio en esa variable provoca automáticamente una actualización en la interfaz de usuario (UI) sin necesidad de utilizar un "setState" o métodos similares. Svelte compila el código de la aplicación e inyecta el código necesario para actualizar el DOM directamente cuando cambian los estados. Esto reduce la sobrecarga en comparación con enfoques como el de React, donde las actualizaciones se planifican y optimizan antes de aplicarse al DOM.

## El sistema de reactividad en React.
En React, la reactividad está manejada mediante un ciclo de vida basado en el estado y las propiedades. Cuando cambiamos el estado en React utilizando setState (en componentes de clase) o el hook useState (en componentes funcionales), React planifica una actualización que luego se aplica al DOM. Esta actualización se gestiona a través de un proceso llamado reconciliation, donde React compara un Virtual DOM con el estado actual del DOM real y aplica las diferencias necesarias. Este proceso, aunque eficiente y optimizado, introduce cierta latencia y sobrecarga en la gestión de cambios, ya que React no actualiza el DOM inmediatamente, sino que decide el mejor momento para hacerlo.



## Conclusión
Narrador:

"En resumen, Svelte es una gran alternativa a React si buscas un framework ligero, rápido y fácil de usar. Aunque React sigue siendo una excelente herramienta, Svelte puede ofrecerte una mejor experiencia de desarrollo y rendimiento en proyectos donde la simplicidad y la velocidad son cruciales."

Visual: Muestra un resumen visual de las ventajas de Svelte (rendimiento, simplicidad, menor tamaño) sobre React.

Narrador:
"¿Qué framework te gusta más? ¡Déjanos tu opinión en los comentarios! Y si te ha gustado el video, no olvides suscribirte y darle like."

