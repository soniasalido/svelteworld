# Estructura de directorios
```cmd
project-root/
│
├── src/
│   ├── lib/
│   │   ├── database.js           # Funciones relacionadas con la base de datos, como checkUserCredentials
│   │   └── db.js                 # Configuración de conexión a la base de datos MySQL
│   │
│   ├── routes/
│   │   ├── +layout.svelte         # Layout compartido para varias páginas
│   │   ├── +layout.server.js      # Lógica del servidor para autenticación o gestión de datos
│   │   ├── +page.svelte           # Página principal (por ejemplo, la home o dashboard)
│   │   ├── login/
│   │   │   ├── +page.svelte       # Página de inicio de sesión
│   │   │   └── +page.server.js    # Lógica del servidor específica para el login (si la necesitas)
│   │   ├── logout/
│   │   │   ├── +page.svelte       # Página para cerrar sesión
│   │   └── about/
│   │       └── +page.svelte       # Página de información "Sobre nosotros"
│   │   └── private/
│   │   │   ├── +page.svelte       # Página privada sólo para usuarios autenticados
│   │   │   └── +page.server.js    # Lógica del servidor específica para la página privada
│   │
│   └── app.html                   # Template HTML principal de la aplicación
│
├── static/                        # Archivos estáticos (imágenes, CSS, etc.)
│
├── package.json                   # Dependencias y scripts del proyecto
├── svelte.config.js               # Configuración de SvelteKit
└── node_modules/                  # Dependencias instaladas
```

# Ejemplo para la tabla de usuarios en MySQL:
```sql
CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  hashedPassword VARCHAR(255) NOT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

```

# /lib/db.js
- Maneja la conexión a la base de datos MySQL utilizando un pool de conexiones, lo que permite una gestión eficiente de las conexiones.
- La función `query(sql, params)` permite realizar consultas SQL parametrizadas de manera segura y manejarlas usando promesas.
- Podemos usar `query()` en diferentes partes de nuestra aplicación para interactuar con la base de datos, como en el caso de verificar las credenciales de un usuario en la función `checkUserCredentials`.
- Necesita utilizar el paquete `mysql2` de Node.js. Debemos instalarlo en nuestro proyecto: `npm install mysql2`


```js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear una conexión con la base de datos MySQL
const pool = mysql.createPool({
	host: process.env.DB_HOST,    		// El host de la base de datos (normalmente localhost)
	user: process.env.DB_USER,         	// Usuario de la base de datos
	password: process.env.DB_PASSWORD, 	// Contraseña del usuario de la base de datos
	database: process.env.DB_DATABASE, 	// El nombre de la base de datos
	waitForConnections: true,     		// Esperar por conexiones si todas están ocupadas
	connectionLimit: 10,          		// Número máximo de conexiones simultáneas
	queueLimit: 0                 		// Número máximo de conexiones en cola (0 para sin límite)
});

// Función para hacer consultas a la base de datos
export async function query(sql, params) {
	const [rows, fields] = await pool.execute(sql, params);
	return rows;
}
```


# /lib/database.js
Este archivo implementa la función `checkUserCredentials` que hace consulta la base de datos: Selecciona el id, el username y la contraseña de nuestra base de datos users.

```js
import { query } from './db';
import bcrypt from 'bcrypt';

// Verificar las credenciales del usuario
export async function checkUserCredentials(username) {
	const sql = 'SELECT id, username, hashedPassword FROM usuarios WHERE username = ?';
	const rows = await query(sql, [username]);
	if (rows.length > 0) {
		return rows[0];  // Devuelve el primer resultado
	}
	return null;
}

// Crear un hash de contraseña
export async function createUser(username, password) {
	const hashedPassword = await bcrypt.hash(password, 10);
	const sql = 'INSERT INTO usuarios (username, hashedPassword) VALUES (?, ?)';
	await query(sql, [username, hashedPassword]);
}


// Función para obtener el username de un usuario dado su id
export async function getUserById(id) {
	const sql = 'SELECT id, username FROM usuarios WHERE id = ?';
	const rows = await query(sql, [id]);

	// Retorna el id del usuario si se encuentra
	if (rows.length > 0) {
		return rows[0];
	}
	return null;
}
```

1. Consulta de la base de datos:
	- La función recibe el `username' como parámetro y realiza una consulta en la base de datos.
	- Si el usuario existe, devuelve un objeto con la `id, username, y la hashedPassword` (la contraseña hasheada almacenada en la base de datos).

2. Control de errores:
	- Si el usuario no existe, la función devuelve `null`, lo que indicará en el `+layout.server.js` que las credenciales son incorrectas.


# /src/routes/+page.svelte
Representará la página principal de la aplicación (ruta raíz /). Este archivo utiliza un diseño simple. Incluye un mensaje de bienvenida si el usuario está autenticado, así como enlaces a otras páginas de la aplicación.

```sveltehtml
<script>
	// Importamos los datos de autenticación del layout
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
```

### En este código podemos ver:
- **`<script>`:**
	- Importamos los datos del layout (data), que incluyen información sobre el usuario autenticado si ha iniciado sesión. Este dato viene desde `+layout.server.js`, pasando por `+layout.svelte`.
- **`<main>`:**
  - Condicional de autenticación ({#if data.user}):
      - Si el usuario está autenticado `(data.user)`, mostramos un mensaje personalizado que saluda al usuario por su nombre `({data.user.username})`.
        - Si el usuario no está autenticado, mostramos un mensaje invitándolo a iniciar sesión para acceder a las funcionalidades de la aplicación.
  - **Sección de navegación:**
    - Incluimos enlaces a otras secciones de la aplicación:
    	- Sobre Nosotros (/about): Enlace a la página de información sobre la aplicación o la organización.
    	- Iniciar sesión (/login): Enlace para que los usuarios inicien sesión si no lo han hecho ya.
- **Estilos `(<style>)`:** Estilos simples que centran el contenido y aplican colores y formato a los encabezados y enlaces. Se destacan los enlaces cuando el usuario pasa el mouse por encima.


# /src/routes/+layout.svelte
Este layout se utiliza para **mostrar una barra de navegación común en todas las páginas de la aplicación y gestionar el estado de autenticación del usuario.**

Si el usuario está autenticado, se muestra un mensaje de bienvenida y un enlace para cerrar sesión. Si no está autenticado, se muestra un enlace para iniciar sesión.

```sveltehtml
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
```


**1. `<script>`:**  
	Se utiliza para importar los datos que se pasan desde el archivo `+layout.server.js`. Aquí, estamos exportando let data, que contiene información sobre el usuario autenticado (si está logueado) o nulo si no lo está.

	El archivo +layout.server.js es el encargado de cargar los datos del usuario y pasarlos a este layout a través de data.

**2. Barra de navegación (`<nav>`):**  
- Si el usuario está autenticado `(data.user)`, mostramos un mensaje de bienvenida y un enlace para cerrar sesión.
- Si el usuario no está autenticado (`data.user` es nulo), mostramos un enlace para iniciar sesión.
- Además, en ambos casos, siempre se muestran los enlaces a las páginas principales: Inicio (/) y "Sobre Nosotros" (/about).

**3. `<slot />`**  
   Es donde se renderizan las diferentes páginas de la aplicación. Cada página cargada en la ruta correspondiente (/, /about, /login, etc.) se mostrará en el lugar del slot.

**4. Footer (`<footer`>):**  
   Es un pie de página simple que aparecerá en todas las páginas, justo después del contenido dinámico que se carga en el slot.

**5. Estilos css.**  
   Estilos simples para el menú de navegación y el pie de página:





# /src/routes/+layout.server.js
En este archivo, **se implementa la función `load` que se ejecuta en el servidor para cargar los datos necesarios antes de renderizar la página**. Este `layout.server.js` se utiliza para verificar si el usuario está autenticado y obtener su información.
- Si el usuario tiene una cookie de sesión válida, se busca su `id` de usuario en la base de datos y se pasa al layout para mostrar un mensaje de bienvenida y un enlace para cerrar sesión.
- Si no hay una cookie de sesión válida, se muestra un enlace para iniciar sesión y se pasa `user: null` al layout. Esto se hace para que el layout pueda mostrar el enlace de inicio de sesión en lugar del mensaje de bienvenida.

```js
import { getUserById } from '$lib/database';  // Importamos la función getUserById para obtener el username del usuario

export async function load({ cookies }) {
	// Obtener el session_id de la cookie
	const session_id = cookies.get('session_id');

	if (session_id) {
		// Intentamos obtener el usuario desde la base de datos usando el session_id
		const user = await getUserById(session_id);

		// Si se encuentra un usuario, lo retornamos
		if (user) {
			return { user };  // Retorna el objeto user, que contiene el username y otros datos
		} else {
			// Si no se encuentra un usuario con ese session_id, limpiamos la sesión
			cookies.delete('session_id', { path: '/' });
			return { user: null };
		}
	}

	// Si no hay session_id, el usuario no está autenticado
	return { user: null };
}
```

# /src/routes/login/+page.svelte


```sveltehtml
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
```

# /src/routes/login/+layout.server.js
El archivo `+layout.server.js` verifica si un par de usuario y contraseña introducido por un usuario existe en una base de datos.

Pasos:
- El usuario ingresa su nombre de usuario y contraseña en un formulario de inicio de sesión.
- El servidor (usando `+layout.server.js`) recibe estos datos, verifica si el usuario existe en la base de datos, compara la contraseña y devuelve el resultado.
- Si el par usuario/contraseña es correcto, el servidor puede devolver la información del usuario o generar un token de sesión.

```js
import { checkUserCredentials } from '$lib/database'; // Función que verifica las credenciales en la base de datos
import bcrypt from 'bcrypt'; // Para comparar contraseñas encriptadas

export async function load({ cookies, request }) {
  // Obtenemos los datos de usuario y contraseña desde el request
  const formData = await request.formData();
  const username = formData.get('username');
  const password = formData.get('password');

  // Buscamos al usuario en la base de datos
  const user = await checkUserCredentials(username);

  if (user) {
    // Verificamos si la contraseña proporcionada coincide con la almacenada (hasheada)
    const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

    if (passwordMatch) {
      // Si las credenciales son correctas, generamos una cookie de sesión (por ejemplo)
      cookies.set('session_id', generateSessionToken(user.id), {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7 // 1 semana
      });

      return { user };
    }
  }

  // Si no coinciden, devolvemos un mensaje de error
  return {
    error: 'Nombre de usuario o contraseña incorrectos',
    user: null
  };
}

```

1. Recepción de datos del formulario:
	- El usuario introduce su nombre de usuario y contraseña en un formulario, que es enviado como POST al servidor.
	- Usamos `request.formData()` para obtener los datos del formulario.

2. Verificación en la base de datos:
	- Llamamos a la función `checkUserCredentials(username)` para buscar al usuario en la base de datos. Esta función debería devolver un objeto con el hash de la contraseña almacenada.
	- Usamos `bcrypt.compare() para comparar la contraseña proporcionada por el usuario con la contraseña hasheada almacenada en la base de datos.

3. Sesión y cookies:
	- Si las credenciales son correctas, podemos generar una sesión para el usuario. En este ejemplo, usamos `cookies.set()` para crear una cookie de sesión que almacena un `session_id.` Esta cookie puede ser usada para identificar al usuario en futuras peticiones.

4. Respuesta de error:
	- Si las credenciales no coinciden, devolvemos un error que indica que el nombre de usuario o la contraseña son incorrectos.



