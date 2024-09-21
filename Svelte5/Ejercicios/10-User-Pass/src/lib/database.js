import { query } from './db';
import bcrypt from 'bcrypt';

// Verificar las credenciales del usuario
export async function checkUserCredentials(username) {
	const sql = 'SELECT nombre, password FROM usuario WHERE username = ?';
	const rows = await query(sql, [username]);
	if (rows.length > 0) {
		return rows[0];  // Devuelve el primer resultado
	}
	return null;
}

// Crear un hash de contraseña
export async function createUser(username, password) {
	const hashedPassword = await bcrypt.hash(password, 10);
	const sql = 'INSERT INTO users (username, hashedPassword) VALUES (?, ?)';
	await query(sql, [username, hashedPassword]);
}
