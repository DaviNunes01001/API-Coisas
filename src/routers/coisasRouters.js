// Importar o Express para criar o router
const express = require('express');
const router = express.Router();

const CoisasController = require('../controllers/coisaControllers');

router.get('/', CoisasController.listarTodos);

router.get('/TipoCoisa/:tipoc', CoisasController.buscarPorCategoria);

router.get('/:id', CoisasController.buscarPorId);

router.post('/', CoisasController.criar);

router.put('/:id', CoisasController.atualizar);

router.delete('/:id', CoisasController.deletar);

module.exports = router;