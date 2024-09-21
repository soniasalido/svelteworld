<script>
	import EspecialidadesSelector from './Especialidades-Selector.svelte';

	// Supongamos que cargamos las especialidades desde un archivo JSON o una API
	import especialidadesData from './especialidades.json';

	const especialidades = especialidadesData.especialidades;
</script>

<EspecialidadesSelector {especialidades} />
