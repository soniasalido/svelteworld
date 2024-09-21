<script>
    // This is Parent component

    import ChildProps from './Child-Props.svelte';
    let message = 'Hello from the parent';
    let count = 0;
    let boolean = true;
</script>


<h1>Welcome to Parent Component</h1>

<input type="text" bind:value={message} />
<input type="number" bind:value={count} />
<input type="checkbox" bind:checked={boolean} />

<hr>
<ChildProps {message} {count} {boolean}/>