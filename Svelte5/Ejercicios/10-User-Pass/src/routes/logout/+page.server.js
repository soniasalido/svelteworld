import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
    // Elimina la cookie de sesión, es decir, la cookie 'session_id'
    cookies.delete('session_id', { path: '/' });

    // Redirige al usuario a la página de login (o a la página de inicio)
    throw redirect(303, '/login');
}
