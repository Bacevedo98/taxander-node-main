const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta "docs"
app.use(express.static(path.join(__dirname, 'docs')));

// Ruta principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'docs', 'index-en.html'));
});

// Ruta para recibir datos del formulario
app.post('/submit', (req, res) => {
  try {
    const { nombre, correo, telefono, estado, fechaHora, "codigo-descuento": descuento } = req.body;

    // Mostrar cada campo en logs de Render
    console.log("=== Nuevo formulario recibido ===");
    console.log("Nombre:", nombre);
    console.log("Correo:", correo);
    console.log("Teléfono:", telefono);
    console.log("Estado:", estado);
    console.log("Fecha y Hora:", fechaHora);
    console.log("Código de descuento:", descuento);
    console.log("===============================");

    // Responder al cliente
    res.status(201).send("Datos guardados correctamente.");
  } catch (error) {
    console.error("❌ Error al procesar el formulario:", error);
    res.status(500).send("Hubo un error al guardar los datos.");
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
