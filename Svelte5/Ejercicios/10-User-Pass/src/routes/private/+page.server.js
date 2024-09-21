import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    // Verificar si existe una cookie de sesión
    const session_id = cookies.get('session_id');

    if (!session_id) {
        // Si no hay sesión, redirigir al login
        throw redirect(303, '/login');
    }

    // Aquí podrías verificar si la sesión es válida consultando la base de datos,
    // pero para el ejemplo, solo verificamos si la cookie existe.

    // Si la sesión es válida, retorna el estado de autenticación o algún dato del usuario
    return { user: { id: session_id } };  // Puedes cargar más datos si es necesario
}
