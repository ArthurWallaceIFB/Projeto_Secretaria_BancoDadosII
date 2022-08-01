const { json } = require('body-parser');
const DisciplinaService = require('../services/DisciplinaService');

module.exports = {
    listarTodos: async (req, res) => {
        let returnObj = { result: [], error: '' };
        try {
            let disciplinas = await DisciplinaService.listarTodos();

            disciplinas.map((disciplina) => {
                returnObj.result.push(disciplina);
            })
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    },
    buscarDisciplina: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let idDisciplina = req.params.idDisciplina;

            let disciplina = await DisciplinaService.buscarDisciplina(idDisciplina);

            if (disciplina) {
                returnObj.result = disciplina;
            }
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    },
    criarDisciplina: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let disciplina = {
                nome: req.body.nome,
                carga_horaria: req.body.carga_horaria,
                id_curso: req.body.id_curso,
                id_professor: req.body.id_professor
            }
            if (disciplina && disciplina.nome) {
                let novoDisciplina = await DisciplinaService.criarDisciplina(disciplina);
                returnObj.result = novoDisciplina;
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
    atualizarDisciplina: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let disciplina = {
                idDisciplina: req.params.idDisciplina,
                nome: req.body.nome,
                carga_horaria: req.body.carga_horaria,
                id_curso: req.body.id_curso,
                id_professor: req.body.id_professor
            }
            if (disciplina && disciplina.idDisciplina && disciplina.nome && disciplina.id_curso && disciplina.id_professor) {
                let atualizacao = await DisciplinaService.atualizarDisciplina(disciplina);
                returnObj.result = atualizacao;
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
    deletarDisciplina: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let idDisciplina = req.params.idDisciplina;

            if (idDisciplina) {
                let exclusao = await DisciplinaService.deletarDisciplina(idDisciplina);
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