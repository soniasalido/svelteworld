<script>

	import ChildProps from './Child-Props.svelte';
	import ChildState from './Child-State.svelte';
	import EspecialidadesParent from './Especialidades-Parent.svelte';
	let message = 'Hello from the parent';
	let count = 0;
	let boolean = true;
</script>


<h1>Welcome to SvelteKit - Svelte 5</h1>
<input type="text" bind:value={message} />
<input type="number" bind:value={count} />
<input type="checkbox" bind:checked={boolean} />

<hr>
<ChildProps {message} {count} {boolean}/>

<hr>
<ChildState />

<hr>
<EspecialidadesParent />
