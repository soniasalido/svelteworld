<script>
	let value = $state("Default Value");
</script>

<h2>Child component - State</h2>
<input type="text" bind:value={value} />
<p>Input Value: {value}</p>
