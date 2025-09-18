const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Render asigna un puerto automáticamente

// Middleware para procesar JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (tu sitio web en la carpeta docs)
app.use(express.static(path.join(__dirname, 'docs')));

// Log inicial para verificar directorio en Render
console.log('📂 Directorio actual:', __dirname);

// Ruta principal (sirve el index por defecto)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index-en.html'));
});

// Ruta para manejar el formulario
app.post('/submit', (req, res) => {
    try {
        // Mostrar datos recibidos en los logs de Render
        console.log('📩 Datos recibidos en el servidor:', req.body);

        // Extraer los datos enviados por el formulario
        const { nombre, correo, telefono, estado, fechaHora, descuento } = req.body;

        // Formatear los datos para guardarlos
        const datos = `Nombre: ${nombre}, Correo: ${correo}, Teléfono: ${telefono}, Estado: ${estado}, Fecha y Hora: ${fechaHora}, Descuento: ${descuento}\n`;

        // Guardar en archivo datos.txt
        const filePath = path.join(__dirname, 'datos.txt');
        fs.appendFileSync(filePath, datos, 'utf8');

        console.log('✅ Datos guardados en:', filePath);

        // Responder al cliente
        res.status(201).send('Datos guardados correctamente.');
    } catch (error) {
        console.error('❌ Error al guardar los datos:', error);
        res.status(500).send('Hubo un error al guardar los datos.');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
