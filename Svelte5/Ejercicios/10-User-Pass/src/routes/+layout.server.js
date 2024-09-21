import { checkUserCredentials } from '$lib/database';

export async function load({ cookies }) {
	const session_id = cookies.get('session_id');

	if (session_id) {
		// Simulación de búsqueda de usuario por session_id
		const user = { username: 'Juan' };  // Ejemplo simplificado
		return { user };
	}

	return { user: null };
}
