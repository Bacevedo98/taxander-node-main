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
console.log('Directorio actual:', __dirname);

// Ruta para servir el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'docs', 'index-en.html'));
});

// Ruta para manejar los datos del formulario
app.post('/submit', (req, res) => {
    try {
        // Mostrar los datos en los Logs de Render
        console.log('📩 Nuevo formulario recibido:', req.body);

        // Enviar respuesta de éxito
        res.status(201).send('✅ Datos recibidos y registrados en logs.');
    } catch (error) {
        // Manejar errores y enviar respuesta de error
        console.error('❌ Error al procesar el formulario:', error);
        res.status(500).send('Hubo un error al guardar los datos.');
    }
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
