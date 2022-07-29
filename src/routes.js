const express = require('express');
const router = express.Router();

const AlunoController = require('./controllers/AlunoController');


router.get('/alunos', AlunoController.listarTodos);
router.get('/aluno/:matricula', AlunoController.buscarAluno);
router.post('/aluno', AlunoController.criarAluno);

module.exports = router;