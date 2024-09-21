// ./db.js
import mysql from 'mysql2/promise';
import * as process from "../../.svelte-kit/ambient.js";
require('dotenv').config(); // Importar la configuración de las variables de entorno

// Crear una conexión con la base de datos MySQL
const pool = mysql.createPool({
	host: process.env.host,    // El host de la base de datos (normalmente localhost)
	user: process.env.user,         // Usuario de la base de datos
	password: process.env.password, // Contraseña del usuario de la base de datos
	database: process.env.database, // El nombre de la base de datos
	waitForConnections: true,     // Esperar por conexiones si todas están ocupadas
	connectionLimit: 10,          // Número máximo de conexiones simultáneas
	queueLimit: 0                 // Número máximo de conexiones en cola (0 para sin límite)
});

// Función para hacer consultas a la base de datos
export async function query(sql, params) {
	const [rows, fields] = await pool.execute(sql, params);
	return rows;
}

console.log('Conexión a la base de datos establecida');


