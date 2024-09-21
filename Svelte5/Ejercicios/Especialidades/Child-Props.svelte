<script>
	let { message, count, boolean } = $props();

	// Values that are passed in as props
	// are immediately available
	console.log({ message, count, boolean });
</script>


<div>
	<h2>Child component - Props</h2>
	<p>Message from parent: {message}</p>
	<p>Count: {count}</p>
	<p>Boolean: {boolean}</p>
	<p></p>
</div>