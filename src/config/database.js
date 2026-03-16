const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "../config/coisa.db");

const db = new sqlite3.Database(dbPath, (erro) => {
  if (erro) {
    console.error("❌ Erro ao conectar:", erro);
  } else {
    console.log("✅ Conectado ao SQLite!");
  }
});

module.exports = db
