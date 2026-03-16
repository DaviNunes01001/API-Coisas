// Importar as funções do Model
const coisaModels = require("../model/coisaModels");

// ============================================================
// FUNÇÃO: listarTodos
// ROTA: GET /coisas
// ============================================================
async function listarTodos(req, res) {
  try {
    const coisas = await coisaModels.listarTodos();
    res.status(200).json(coisas);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao listar coisas",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorId
// ROTA: GET /coisas/:id
// ============================================================
async function buscarPorId(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    const coisa = await coisaModels.buscarPorId(id);

    if (coisa) {
      res.status(200).json(coisa);
    } else {
      res.status(404).json({
        mensagem: `Coisa ${id} não encontrada`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar coisa",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: criar
// ROTA: POST /coisas
// ============================================================
async function criar(req, res) {
  try {
    const { nomec, tipoc, valor, qtdc, dtCoisa } = req.body;

    if (!nomec || !tipoc || !valor || !qtdc || !dtCoisa) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }

    if (parseFloat(valor) <= 0) {
      return res.status(400).json({
        mensagem: "O valor deve ser maior que zero",
      });
    }

    if (parseInt(qtdc) < 0) {
      return res.status(400).json({
        mensagem: "A quantidade não pode ser negativa",
      });
    }

    const novaCoisa = await coisaModels.criar({
      nomec,
      tipoc,
      valor,
      qtdc,
      dtCoisa,
    });

    res.status(201).json(novaCoisa);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao criar coisa",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: atualizar
// ROTA: PUT /coisas/:id
// ============================================================
async function atualizar(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nomec, tipoc, valor, qtdc, dtCoisa } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    if (!nomec || !tipoc || !valor || !qtdc || !dtCoisa) {
      return res.status(400).json({
        mensagem: "Todos os campos são obrigatórios",
      });
    }

    const coisaAtualizada = await coisaModels.atualizar(id, {
      nomec,
      tipoc,
      valor,
      qtdc,
      dtCoisa,
    });

    if (coisaAtualizada) {
      res.status(200).json(coisaAtualizada);
    } else {
      res.status(404).json({
        mensagem: `Coisa ${id} não encontrada`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao atualizar coisa",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: deletar
// ROTA: DELETE /coisas/:id
// ============================================================
async function deletar(req, res) {
  try {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({
        mensagem: "ID inválido",
      });
    }

    const deletado = await coisaModels.deletar(id);

    if (deletado) {
      res.status(200).json({
        mensagem: `Coisa ${id} removida com sucesso`,
      });
    } else {
      res.status(404).json({
        mensagem: `Coisa ${id} não encontrada`,
      });
    }
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao deletar coisa",
      erro: erro.message,
    });
  }
}

// ============================================================
// FUNÇÃO: buscarPorCategoria
// ROTA: GET /coisas/categoria/:tipoc
// ============================================================
async function buscarPorCategoria(req, res) {
  try {
    const { tipoc } = req.params;

    const coisas = await coisaModels.buscarPorTipo(tipoc);

    res.status(200).json(coisas);
  } catch (erro) {
    res.status(500).json({
      mensagem: "Erro ao buscar coisas por categoria",
      erro: erro.message,
    });
  }
}

// ============================================================
// EXPORTAÇÃO
// ============================================================
module.exports = {
  listarTodos,
  buscarPorId,
  criar,
  atualizar,
  deletar,
  buscarPorCategoria,
};