import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Crear una conexión con la base de datos MySQL
const pool = mysql.createPool({
	host: process.env.DB_HOST,    // El host de la base de datos (normalmente localhost)
	user: process.env.DB_USER,         // Usuario de la base de datos
	password: process.env.DB_PASSWORD, // Contraseña del usuario de la base de datos
	database: process.env.DB_DATABASE, // El nombre de la base de datos
	waitForConnections: true,     // Esperar por conexiones si todas están ocupadas
	connectionLimit: 10,          // Número máximo de conexiones simultáneas
	queueLimit: 0                 // Número máximo de conexiones en cola (0 para sin límite)
});

// Función para hacer consultas a la base de datos
export async function query(sql, params) {
	const [rows, fields] = await pool.execute(sql, params);
	return rows;
}
