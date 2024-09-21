
# Crea tus propios stores
Svelte proporciona una serie de stores predefinidos, como writable, readable, derived, y otros. Sin embargo, también puedes crear tus propios stores personalizados para adaptarse a tus necesidades específicas.

Para crear un store personalizado en Svelte, puedes utilizar la función writable del módulo svelte/store. Esta función te permite crear un store escribible que puedes usar para almacenar y compartir datos de manera reactiva en tu aplicación.


En Svelte, puedes crear tus propias stores sin depender del módulo svelte/store, implementando el contrato de store. Este contrato define cómo debe comportarse una store para que funcione correctamente con Svelte.

## Requisitos del contrato de store:
### 1. Método .subscribe:
- Una store debe contener un método .subscribe, el cual debe aceptar como argumento una función de suscripción.
- Esta función de suscripción debe ser llamada de manera inmediata y sincrónica con el valor actual de la store cuando se invoca .subscribe.
- Además, todas las funciones de suscripción activas deben ser llamadas sincrónicamente cada vez que el valor de la store cambie.

### 2. Función de desuscripción:
El método .subscribe debe devolver una función de desuscripción. Al llamar a esta función, se debe detener la suscripción, y la función de suscripción correspondiente no debe ser llamada nuevamente por la store.

### 3. Método .set (opcional):
- Una store puede contener un método .set, que debe aceptar como argumento un nuevo valor para la store.
- Este método .set debe llamar sincrónicamente a todas las funciones de suscripción activas con el nuevo valor. Una store que tiene un método .set se denomina writable store (una store escribible).

### 4. Compatibilidad con RxJS Observables:
- Para la interoperabilidad con los Observables de RxJS, se permite que el método .subscribe devuelva un objeto con un método .unsubscribe en lugar de devolver directamente la función de desuscripción.
- Sin embargo, es importante tener en cuenta que, a menos que .subscribe llame a la función de suscripción de manera sincrónica (lo cual no es un requisito en la especificación de Observable), Svelte considerará el valor de la store como undefined hasta que lo haga.

