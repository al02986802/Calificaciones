const sqlite3 = require('sqlite3').verbose();

// Conectar o crear el archivo de base de datos db.sqlite
const db = new sqlite3.Database('./db.sqlite', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Conectado a la base de datos SQLite.');
});

// Crear tabla de materias
db.run(`CREATE TABLE IF NOT EXISTS materias (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT NOT NULL
)`);

// Crear tabla de actividades
db.run(`CREATE TABLE IF NOT EXISTS actividades (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  materia_id INTEGER,
  tipo TEXT,
  calificacion REAL,
  fecha TEXT,
  FOREIGN KEY (materia_id) REFERENCES materias (id)
)`);

// Cerrar la conexión a la base de datos
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Base de datos cerrada.');
});
