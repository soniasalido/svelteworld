import { getUserById } from '$lib/database';  // Asegúrate de importar la función correcta

export async function load({ cookies }) {
	// Obtener el session_id de la cookie
	const session_id = cookies.get('session_id');

	if (session_id) {
		// Intentar obtener el usuario desde la base de datos usando el session_id
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
