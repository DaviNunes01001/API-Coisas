const express = require('express');
const app = express();
const PORT = 3000;

// ============================================================
// MIDDLEWARES
// ============================================================
app.use(express.json());

// ============================================================
// IMPORTAR ROTAS
// ============================================================
const CoisasRoutes = require('./src/routers/coisasRouters');

// ============================================================
// REGISTRAR ROTAS
// ============================================================

app.use('/coisas', CoisasRoutes);

// ============================================================
// ROTA RAIZ
// ============================================================

app.get('/', (req, res) => {
  res.json({ 
    mensagem: 'API de Coisas com SQLite - Bem-vindo!',
    versao: '2.0',
    banco: 'SQLite',
    rotas_disponiveis: {
      listar_todos: 'GET /coisas',
      buscar_por_id: 'GET /coisas/:id',
      buscar_por_categoria: 'GET /coisas/categoria/:tipoc',
      criar: 'POST /coisas',
      atualizar: 'PUT /coisas/:id',
      deletar: 'DELETE /coisas/:id'
    }
  });
});

// ============================================================
// INICIAR SERVIDOR
// ============================================================

app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log('🚀 Servidor rodando!');
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`💾 Banco de Dados: SQLite`);
  console.log(`📂 Arquivo do banco: coisa.db`);
  console.log('='.repeat(50));
  console.log('📋 Rotas disponíveis:');
  console.log(`GET    http://localhost:${PORT}/coisas`);
  console.log(`GET    http://localhost:${PORT}/coisas/:id`);
  console.log(`GET    http://localhost:${PORT}/coisas/categoria/:tipoc`);
  console.log(`POST   http://localhost:${PORT}/coisas`);
  console.log(`PUT    http://localhost:${PORT}/coisas/:id`);
  console.log(`DELETE http://localhost:${PORT}/coisas/:id`);
  console.log('='.repeat(50));
});