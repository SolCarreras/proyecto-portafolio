const express = require("express");
const sql = require("mssql");
const bodyParser = require("body-parser");
const cors = require("cors");

const connectDB = require("./testDB");

const app = express();
const PORT = 3000;


//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));




//Rutas para guardar mensajes de contacto

//me sirve para poder acceder a mi pagina desde el link de la terminal, donde accede al index, script, css, imagenes
const path = require("path");
// servir archivos estáticos (como index.html, scripts.js, css, imágenes) me muestra mi pagina 
app.use(express.static(path.join(__dirname, "public")));



// Test de conexión (listar tablas)
async function testQuery() {
    const pool = await connectDB();
    if (pool) {
        const result = await pool.request().query("SELECT name FROM sys.tables");
        console.log("📋 Tablas en la BD:");
        result.recordset.forEach(row => console.log(" -", row.name));
    }
}
testQuery();

// Ruta para guardar mensajes de contacto
app.post("/contacto", async (req, res) => {
    const { nombre, email, mensaje } = req.body;

    if (!nombre || !email || !mensaje) {
        return res.status(400).send("Todos los campos son obligatorios");
    }

    try {
        const pool = await connectDB();
        if (!pool) return res.status(500).send("No hay conexión con la BD");

        await pool.request()
            .input("Nombre", sql.NVarChar(100), nombre)
            .input("Email", sql.NVarChar(100), email)
            .input("Mensaje", sql.NVarChar(sql.MAX), mensaje)
            .query(`
                INSERT INTO MensajesContacto (Nombre, Email, Mensaje)
                VALUES (@Nombre, @Email, @Mensaje)
            `);

        res.send("✅ Mensaje guardado correctamente");
    } catch (err) {
        console.error("❌ Error al guardar mensaje:", err);
        res.status(500).send("Error al guardar el mensaje");
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
