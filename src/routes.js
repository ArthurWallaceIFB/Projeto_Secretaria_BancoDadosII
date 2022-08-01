const express = require('express');
const router = express.Router();

const AlunoController = require('./controllers/AlunoController');
const CampusController = require('./controllers/CampusController');
const CursoController = require('./controllers/CursoController');
const DisciplinaController = require('./controllers/DisciplinaController');
const ProfessorController = require('./controllers/ProfessorController');
const Disciplina_CursoController = require('./controllers/Disciplina_CursoController');
const MatriculaController = require('./controllers/MatriculaController');
const ViewsController = require('./controllers/ViewsController');
const FunctionsController = require('./controllers/FunctionsController');



//* ALUNOS
router.get('/alunos', AlunoController.listarTodos);
router.post('/aluno', AlunoController.criarAluno);
router.get('/aluno/:idAluno', AlunoController.buscarAluno);
router.put('/aluno/:idAluno', AlunoController.atualizarAluno);
router.delete('/aluno/:idAluno', AlunoController.deletarAluno);

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

//* DISCIPLINAS
router.get('/disciplinas', DisciplinaController.listarTodos);
router.post('/disciplina', DisciplinaController.criarDisciplina);
router.get('/disciplina/:idDisciplina', DisciplinaController.buscarDisciplina);
router.put('/disciplina/:idDisciplina', DisciplinaController.atualizarDisciplina);
router.delete('/disciplina/:idDisciplina', DisciplinaController.deletarDisciplina);

//* PROFESSOR
router.get('/professores', ProfessorController.listarTodos);
router.post('/professor', ProfessorController.criarProfessor);
router.get('/professor/:idProfessor', ProfessorController.buscarProfessor);
router.put('/professor/:idProfessor', ProfessorController.atualizarProfessor);
router.delete('/professor/:idProfessor', ProfessorController.deletarProfessor);


//* DISCIPLINA CURSO
router.get('/disciplinaCurso/buscarDisciplinas', Disciplina_CursoController.buscar_disciplinas_curso);
router.get('/disciplinaCurso/buscarCursos', Disciplina_CursoController.buscar_cursos_disciplina);
router.post('/disciplinaCurso/vincular', Disciplina_CursoController.vincular_disciplina_Curso);
router.post('/disciplinaCurso/desvincular', Disciplina_CursoController.desvincular_disciplina_Curso);

//* MATRICULA
router.get('/matricula/buscar', MatriculaController.buscar_matriculas);
router.post('/matricula/matricular', MatriculaController.matricular_aluno);
router.post('/matricula/trancar', MatriculaController.trancar_matricula);
router.post('/matricula/destrancar', MatriculaController.destrancar_matricula);


//* VIEWS
router.get('/views/ultimas_matriculas', ViewsController.ultimos_alunos_matriculados);
router.post('/matricula/matricular', MatriculaController.matricular_aluno);
router.post('/matricula/trancar', MatriculaController.trancar_matricula);
router.post('/matricula/destrancar', MatriculaController.destrancar_matricula);


//* FUNCTIONS
router.get('/functions/qnt_alunos_disciplina', FunctionsController.qnt_alunos_disciplina);

module.exports = router;