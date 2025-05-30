const app = require('./app'); // Importamos la configuración de Express

const PORT = 8080;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

