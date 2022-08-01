const { json } = require('body-parser');
const Disciplina_CursoService = require('../services/Disciplina_CursoService');

module.exports = {
    buscar_disciplinas_curso: async (req, res) => {
        let returnObj = { result: [], error: '' };
        try {
            let idCurso = req.query.idCurso;

            let disciplinas = await Disciplina_CursoService.buscar_disciplinas_curso(idCurso);
            disciplinas[0].map((disciplina) => {
                returnObj.result.push(disciplina);
            })
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    },
    buscar_cursos_disciplina: async (req, res) => {
        let returnObj = { result: [], error: '' };
        try {
            let idDisciplina = req.query.idDisciplina;

            let cursos = await Disciplina_CursoService.buscar_cursos_disciplina(idDisciplina);

            cursos[0].map((disciplina) => {
                returnObj.result.push(disciplina);
            })
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    },
    vincular_disciplina_Curso: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let disciplina_curso = {
                idDisciplina: req.query.idDisciplina,
                idCurso: req.query.idCurso
            }
            if (disciplina_curso && disciplina_curso.idDisciplina && disciplina_curso.idCurso) {
                let vincular = await Disciplina_CursoService.vincular_disciplina_Curso(disciplina_curso);
                returnObj.result = vincular;
            }
            else {
                returnObj.error = "Campos inválidos!"
            }
        }
        catch (ex) {
            returnObj.error = ex;
        }

        res.json(returnObj);
    },
    desvincular_disciplina_Curso: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let disciplina_curso = {
                idDisciplina: req.query.idDisciplina,
                idCurso: req.query.idCurso
            }
            if (disciplina_curso && disciplina_curso.idDisciplina && disciplina_curso.idCurso) {
                let desvincular = await Disciplina_CursoService.desvincular_disciplina_Curso(disciplina_curso);
                returnObj.result = desvincular;
            }
            else {
                returnObj.error = "Campos inválidos!"
            }
        }
        catch (ex) {
            returnObj.error = ex;
        }

        res.json(returnObj);
    },
    deletarDisciplina_Curso: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let idDisciplina_Curso = req.params.idDisciplina_Curso;

            if (idDisciplina_Curso) {
                let exclusao = await Disciplina_CursoService.deletarDisciplina_Curso(idDisciplina_Curso);
                returnObj.result = exclusao;
            }
            else {
                returnObj.error = "Campos inválidos!"
            }
        }
        catch (ex) {
            returnObj.error = ex;
        }

        res.json(returnObj);
    }
}