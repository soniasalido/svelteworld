
<script>
	// Importamos los datos que vienen del layout, como información del usuario
	export let data;
</script>

<main>
	<h1>Bienvenido a Mi Aplicación</h1>

	{#if data.user}
		<p>Hola, {data.user.username}! Nos alegra verte de nuevo.</p>
	{:else}
		<p>¡Bienvenido! Inicia sesión para aprovechar todas las funciones de nuestra aplicación.</p>
	{/if}

	<section>
		<h2>Explora nuestras secciones</h2>
		<ul>
			<li><a href="/about">Sobre Nosotros</a></li>
			<li><a href="/login">Iniciar sesión</a></li>
		</ul>
	</section>
</main>

<style>
    main {
        text-align: center;
        margin-top: 50px;
    }

    h1 {
        color: #007bff;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    ul li {
        margin: 10px 0;
    }

    ul li a {
        text-decoration: none;
        color: #007bff;
    }

    ul li a:hover {
        text-decoration: underline;
    }
</style>
