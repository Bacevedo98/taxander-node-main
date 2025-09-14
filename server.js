const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000; // Usar el puerto asignado por Render o 3000 por defecto

// Middleware para analizar JSON y datos de formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'docs')));

// Log para mostrar el directorio actual
console.log('📂 Directorio actual:', __dirname);

// Ruta para servir el archivo index.html por defecto
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index-en.html'));
});

// Ruta para manejar los datos del formulario
app.post('/submit', (req, res) => {
    try {
        // Mostrar los datos recibidos en los logs de Render
        console.log('📩 Nuevo formulario recibido:');
        console.log('Nombre:', req.body.nombre);
        console.log('Correo:', req.body.correo);
        console.log('Teléfono:', req.body.telefono);
        console.log('Estado:', req.body.estado);
        console.log('Fecha y Hora:', req.body.fechaHora);
        console.log('Código de descuento:', req.body['codigo-descuento']);
        console.log('--------------------------------------');

        // Responder al navegador del cliente
        res.status(201).send('✅ Datos recibidos correctamente.');
    } catch (error) {
        console.error('❌ Error al procesar los datos:', error);
        res.status(500).send('Hubo un error al guardar los datos.');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});
