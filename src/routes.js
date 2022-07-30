const express = require('express');
const router = express.Router();

const AlunoController = require('./controllers/AlunoController');
const CampusController = require('./controllers/CampusController');
const CursoController = require('./controllers/CursoController');

//* ALUNOS
router.get('/alunos', AlunoController.listarTodos);
router.post('/aluno', AlunoController.criarAluno);
router.get('/aluno/:matricula', AlunoController.buscarAluno);
router.put('/aluno/:matricula', AlunoController.atualizarAluno);
router.delete('/aluno/:matricula', AlunoController.deletarAluno);

//* CAMPUS
router.get('/listarCampus', CampusController.listarTodos);
router.post('/campus', CampusController.criarCampus);
router.get('/campus/:idCampus', CampusController.buscarCampus);
router.put('/campus/:idCampus', CampusController.atualizarCampus);
router.delete('/campus/:idCampus', CampusController.deletarCampus);

//* CURSOS
router.get('/cursos', CursoController.listarTodos);
router.post('/curso', CursoController.criarCurso);
router.get('/curso/:idCurso', CursoController.buscarCurso);
router.put('/curso/:idCurso', CursoController.atualizarCurso);
router.delete('/curso/:idCurso', CursoController.deletarCurso);

module.exports = router;