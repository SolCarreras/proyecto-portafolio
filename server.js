const express = require("express");
const sql = require("mssql");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");

//conexion con la base de datos-ruta
const connectDB = require("./testDB");

const app = express();
const PORT = 3000;


// 📌 Le decimos dónde están las vistas EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// 📌 Archivos estáticos (CSS, JS, imágenes)
app.use(express.static(path.join(__dirname, "public")));

// archivo base layout.ejs
app.use(expressLayouts);
app.set("layout", "layout"); 



//Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));



// Rutas ---usando layout debo usar title: y asignarle la ruta.
app.get("/", (req, res) => {
  res.render("index", { title: "Inicio" }); // renderiza views/index.ejs
});


app.get("/contacto", (req, res) => {
  res.render("contacto",{ title: "Contacto" });
});

app.get("/proyectos", (req, res) => {
  res.render("proyectos", { title: "Proyectos" });
});
// Rutas de cada proyecto
app.get("/proyecto1", (req, res) => {
  res.render("proyecto1", { title: "Proyectos1" });
});

app.get("/proyecto2", (req, res) => {
  res.render("proyecto2", { title: "Proyectos2" });
});

app.get("/proyecto3", (req, res) => {
  res.render("proyecto3", { title: "Proyectos3" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});


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
