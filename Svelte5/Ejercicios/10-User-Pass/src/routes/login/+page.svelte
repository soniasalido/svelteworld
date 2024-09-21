<script>
	let username = '';
	let password = '';
	export let data;
</script>

<form method="post">
	<label for="username">Nombre de usuario</label>
	<input type="text" id="username" name="username" bind:value={username} required>

	<label for="password">Contraseña</label>
	<input type="password" id="password" name="password" bind:value={password} required>

	<button type="submit">Iniciar sesión</button>

	{#if data.error}
		<p style="color: red;">{data.error}</p>
	{/if}
</form>

<style>
    form {
        max-width: 300px;
        margin: 0 auto;
    }
</style>
