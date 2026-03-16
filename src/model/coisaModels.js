// Importar a conexão com o banco de dados
const db = require('../config/database');

// ============================================================
// FUNÇÃO: listarTodos
// DESCRIÇÃO: Retorna todos os coisas do banco
// RETORNO: Promise que resolve com array de coisas
// ============================================================
function listarTodos() {
  // Retornamos uma Promise porque a operação é assíncrona
  return new Promise((resolve, reject) => {
    // SQL: SELECT busca todos os registros
    const sql = 'SELECT * FROM coisas';
    
    // db.all() busca múltiplas linhas
    // [] são os parâmetros (vazio neste caso)
    db.all(sql, [], (erro, linhas) => {
      if (erro) {
        reject(erro);    // Se der erro, rejeita a Promise
      } else {
        resolve(linhas); // Se sucesso, resolve com os dados
      }
    });
  });
}

// ============================================================
// FUNÇÃO: buscarPorId
// DESCRIÇÃO: Busca um produto específico pelo ID
// PARÂMETRO: id (número) - identificador do produto
// RETORNO: Promise que resolve com o produto ou undefined
// ============================================================
function buscarPorId(id) {
  return new Promise((resolve, reject) => {
    // O '?' é um placeholder seguro
    // Isso previne SQL Injection!
    const sql = 'SELECT * FROM coisas WHERE id = ?';
    
    // db.get() busca uma única linha
    db.get(sql, [id], (erro, linha) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linha);  // undefined se não encontrar
      }
    });
  });
}

// ============================================================
// FUNÇÃO: criar
// DESCRIÇÃO: Insere um novo produto no banco
// PARÂMETRO: dados (objeto) - contém nome, preco, estoque, categoria
// RETORNO: Promise que resolve com o produto criado (com ID)
// ============================================================
function criar(dados) {
  return new Promise((resolve, reject) => {
    // Desestruturar os dados
    const { nomec, tipoc, valor, qtdc,dtCoisa } = dados;
    
    // SQL: INSERT adiciona novo registro
    // IMPORTANTE: NÃO incluímos o ID aqui porque ele é AUTOINCREMENT
    // O SQLite gera o ID automaticamente!
    const sql = `
      INSERT INTO coisas (nomec, tipoc, valor, qtdc,dtCoisa)
      VALUES (?, ?, ?, ?, ?)
    `;
    
    // db.run() executa comandos INSERT/UPDATE/DELETE
    // IMPORTANTE: usar 'function' tradicional (não arrow function)
    // para ter acesso ao 'this.lastID'
    db.run(sql, [nomec, tipoc, valor, qtdc,dtCoisa], function(erro) {
      if (erro) {
        reject(erro);
      } else {
       
        resolve({ // this.lastID contém o ID que o banco gerou automaticamente
        // para o registro que acabamos de inserir
          id: this.lastID,
          nomec,
          tipoc,
          valor,
          qtdc,
          dtCoisa
        });
      }
    });
  });
}

// ⚠️ NOTA IMPORTANTE SOBRE AUTOINCREMENT:
// Quando criamos a tabela, definimos o campo ID como AUTOINCREMENT.
// Isso significa que o BANCO DE DADOS é responsável por gerar o próximo ID.
// 
// Por isso:
// ❌ NÃO fazemos: INSERT INTO coisas (id, nome, ...) VALUES (?, ?, ...)
// ✅ Fazemos: INSERT INTO coisas (nome, preco, ...) VALUES (?, ?, ...)
//
// O SQLite adiciona o ID automaticamente e podemos recuperá-lo usando this.lastID

// ============================================================
// FUNÇÃO: atualizar
// DESCRIÇÃO: Atualiza todos os dados de um produto
// PARÂMETROS:
//   - id (número): identificador do produto
//   - dados (objeto): novos dados
// RETORNO: Promise com produto atualizado ou null
// ============================================================
function atualizar(id, dados) {
  return new Promise((resolve, reject) => {
    const {nomec, tipoc, valor, qtdc, dtCoisa} = dados;
    
    // SQL: UPDATE modifica um registro existente
    const sql = `
      UPDATE coisas 
      SET nomec = ?, tipoc = ?, valor = ?, qtdc = ?, dtCoisa = ?
      WHERE id = ?
    `;
    
    // Passar os parâmetros na ordem dos placeholders
    db.run(sql, [nomec, tipoc, valor, qtdc, dtCoisa, id], function(erro) {
      if (erro) {
        reject(erro);
      } else if (this.changes === 0) {
        // this.changes = quantidade de linhas afetadas
        // Se for 0, o produto não foi encontrado
        resolve(null);
      } else {
        // Produto atualizado com sucesso
        resolve({nomec, tipoc, valor, qtdc, dtCoisa});
      }
    });
  });
}

// ============================================================
// FUNÇÃO: deletar
// DESCRIÇÃO: Remove um produto do banco
// PARÂMETRO: id (número) - identificador do produto
// RETORNO: Promise com true (sucesso) ou false (não encontrado)
// ============================================================
function deletar(id) {
  return new Promise((resolve, reject) => {
    // SQL: DELETE remove um registro
    const sql = 'DELETE FROM coisas WHERE id = ?';
    
    db.run(sql, [id], function(erro) {
      if (erro) {
        reject(erro);
      } else {
        // Retorna true se deletou alguma linha
        resolve(this.changes > 0);
      }
    });
  });
}

// ============================================================
// FUNÇÃO: buscarPorCategoria
// DESCRIÇÃO: Filtra coisas por categoria
// PARÂMETRO: categoria (string)
// RETORNO: Promise com array de coisas
// ============================================================
function buscarPorTipo(tipoc) {
  return new Promise((resolve, reject) => {
    // LIKE permite busca com padrão
    // O % significa "qualquer texto antes/depois"
    const sql = 'SELECT * FROM coisas WHERE tipoc LIKE ?';
    
    db.all(sql, [`%${tipoc}%`], (erro, linhas) => {
      if (erro) {
        reject(erro);
      } else {
        resolve(linhas);
      }
    });
  });
}

// ============================================================
// EXPORTAR TODAS AS FUNÇÕES
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorTipo
};
