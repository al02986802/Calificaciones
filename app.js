const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

// Configuración de la base de datos SQLite
const db = new sqlite3.Database('./db.sqlite');

// Configuración del servidor
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta para listar las materias
app.get('/', (req, res) => {
  db.all('SELECT * FROM materias', (err, materias) => {
    if (err) return res.status(500).send(err);
    res.render('index', { materias });
  });
});

// Ruta para mostrar las actividades de una materia
app.get('/materia/:id', (req, res) => {
  const materiaId = req.params.id;
  db.all('SELECT * FROM actividades WHERE materia_id = ?', [materiaId], (err, actividades) => {
    if (err) return res.status(500).send(err);
    res.render('materia', { actividades, materiaId });
  });
});

// Ruta para agregar una materia
app.post('/materias', (req, res) => {
  const { nombre } = req.body;
  db.run('INSERT INTO materias (nombre) VALUES (?)', [nombre], (err) => {
    if (err) return res.status(500).send(err);
    res.redirect('/');
  });
});

// Ruta para agregar una actividad
app.post('/actividad', (req, res) => {
  const { materia_id, tipo, calificacion, fecha } = req.body;
  db.run(
    'INSERT INTO actividades (materia_id, tipo, calificacion, fecha) VALUES (?, ?, ?, ?)',
    [materia_id, tipo, calificacion, fecha],
    (err) => {
      if (err) return res.status(500).send(err);
      res.redirect(`/materia/${materia_id}`);
    }
  );
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
