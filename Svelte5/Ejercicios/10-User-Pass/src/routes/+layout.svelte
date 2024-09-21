<script>
	// Importamos los datos de la autenticación del usuario que vienen de +layout.server.js
	export let data;
</script>

<nav>
	<a href="/">Inicio</a>
	<a href="/about">Sobre Nosotros</a>

	{#if data.user}
		<!-- Si el usuario está autenticado, mostramos un mensaje de bienvenida y un enlace a logout -->
		<span>Bienvenido, {data.user.username}!</span>
		<a href="/logout">Cerrar sesión</a>
	{:else}
		<!-- Si el usuario no está autenticado, mostramos un enlace a la página de login -->
		<a href="/login">Iniciar sesión</a>
	{/if}
</nav>

<!-- El slot es donde se renderiza el contenido de la página actual -->
<slot />

<footer>
	<p>&copy; 2024 - Mi Aplicación</p>
</footer>

<style>
    nav {
        background-color: #f8f9fa;
        padding: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    nav a {
        margin-right: 15px;
        text-decoration: none;
        color: #007bff;
    }

    nav a:hover {
        text-decoration: underline;
    }

    footer {
        margin-top: 20px;
        text-align: center;
        padding: 1rem;
        background-color: #f1f1f1;
    }
</style>
