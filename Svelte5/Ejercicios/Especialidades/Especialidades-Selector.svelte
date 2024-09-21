<script>
	import { writable } from 'svelte/store';

	// Props se utiliza para recibir datos desde el componente padre si fuera necesario
	const { especialidades = [] } = $props();

	// Crear un store para las especialidades seleccionadas
	let especialidadesSeleccionadas = writable([]);

	// Función para añadir la especialidad seleccionada al store
	function agregarEspecialidad(event) {
		const codigo = event.target.value;
		const especialidadSeleccionada = especialidades.find(especialidad => especialidad.codigo === codigo);

		if (especialidadSeleccionada) {
			especialidadesSeleccionadas.update(seleccionadas => {
				// Evitar agregar duplicados
				if (!seleccionadas.includes(especialidadSeleccionada)) {
					return [...seleccionadas, especialidadSeleccionada];
				}
				return seleccionadas;
			});
		}

		//Mostrar las especialidades seleccionadas
		console.log($especialidadesSeleccionadas);
	}
</script>

<!-- Select para elegir una especialidad -->
<select on:change={agregarEspecialidad}>
	<option value="" disabled selected>Seleccione una especialidad</option>
	{#each especialidades as especialidad}
		<option value={especialidad.codigo}>{especialidad.nombre}</option>
	{/each}
</select>

<!-- Mostrar las especialidades seleccionadas -->
<ul>
	{#each $especialidadesSeleccionadas as especialidad}
		<li>{especialidad.nombre}</li>
	{/each}
</ul>

<!-- writable([]): Se utiliza para crear un store reactivo que almacena las especialidades seleccionadas. -->

<!-- especialidadesSeleccionadas.update(...): Esta función se utiliza para actualizar el valor del store.
La actualización se realiza asegurando que no se agreguen duplicados. -->

<!-- {#each $especialidadesSeleccionadas as especialidad}: El signo $ antes del nombre del
store desestructura automáticamente el valor del store para que pueda ser usado directamente en el template.
Cada vez que especialidadesSeleccionadas cambie, la lista <ul> se re-renderizará automáticamente.  -->