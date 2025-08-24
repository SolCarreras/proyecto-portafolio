// testDB.js
const sql = require("mssql");


const dbConfig = {
    user: "mPortfolio",
    password: "MiportfolioSegura123",
    server: "localhost",
    database: "Mportfolio",
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

async function connectDB() {
    try {
        const pool = await sql.connect(dbConfig);
        console.log("✅ Conexión exitosa a SQL Server");
        return pool;
    } catch (err) {
        console.error("❌ Error de conexión:", err);
        return null;
    }
}

module.exports = connectDB;