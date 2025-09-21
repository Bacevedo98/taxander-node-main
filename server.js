const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --- CORS manual (sin paquete cors) ---
const ALLOWED_ORIGINS = [
  'https://ustaxander.com',
  'https://taxander-node-main.onrender.com', // por si pruebas directo
  'http://localhost:5500' // quítalo si no lo usas en local
];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

// --- Parsers nativos de Express ---
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <- necesario para x-www-form-urlencoded

// --- Archivos estáticos ---
app.use(express.static(path.join(__dirname, 'docs')));

// Salud
app.get('/health', (_, res) => res.status(200).send('ok'));

// Home (ajusta si tu index principal es otro)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index-en.html'));
});

// --- Endpoint del formulario ---
app.post('/submit', (req, res) => {
  try {
    const { nombre, correo, telefono, estado, fechaHora } = req.body;
    // campo con guion se lee así:
    const descuento = req.body['codigo-descuento'];

    console.log('=== 🏮🏮🏮 Nuevo formulario recibido 🏮🏮🏮 ===');
    console.log('Nombre:', nombre);
    console.log('Correo:', correo);
    console.log('Teléfono:', telefono);
    console.log('Estado:', estado);
    console.log('Fecha y Hora:', fechaHora);
    console.log('Código de descuento:', descuento);
    console.log('=============================================');

    res.status(201).type('text/plain').send('Datos guardados correctamente.');
  } catch (err) {
    console.error('❌ Error al procesar el formulario:', err);
    res.status(500).type('text/plain').send('Hubo un error al guardar los datos.');
  }
});

// --- Start ---
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
