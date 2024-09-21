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


// Obtener usuario por ID
export async function getUserById(id) {
	const sql = 'SELECT id, username FROM usuarios WHERE id = ?';
	const rows = await query(sql, [id]);

	// Retorna el usuario si se encuentra
	if (rows.length > 0) {
		return rows[0];
	}
	return null;
}