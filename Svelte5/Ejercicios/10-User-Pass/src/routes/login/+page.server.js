import { checkUserCredentials } from '$lib/database';
import bcrypt from 'bcrypt';

export const actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username');
		const password = formData.get('password');

		const user = await checkUserCredentials(username);

		if (user && await bcrypt.compare(password, user.hashedPassword)) {
			// Si las credenciales son correctas, creamos una cookie de sesión
			cookies.set('session_id', user.id, {
				httpOnly: true,
				path: '/',
				maxAge: 60 * 60 * 24 // 1 día
			});
			return { success: true };
		}

		// Si el login falla, devolvemos un error
		return { success: false, error: 'Nombre de usuario o contraseña incorrectos' };
	}
};
