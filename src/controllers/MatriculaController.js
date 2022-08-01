const { json } = require('body-parser');
const MatriculaService = require('../services/MatriculaService');

module.exports = {
    buscar_matriculas: async (req, res) => {
        let returnObj = { result: [], error: '' };
        try {
            let idAluno = req.query.idAluno;

            let matriculas = await MatriculaService.buscar_matriculas(idAluno);
            matriculas.map((matricula) => {
                returnObj.result.push(matricula);
            })
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    },
    matricular_aluno: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let matricula = {
                id_aluno: req.query.idAluno,
                id_disciplina: req.query.idDisciplina,
                data_matricula: new Date(),
                semestre_atual: req.query.semestreAtual
            }
            if (matricula && matricula.id_aluno && matricula.id_disciplina && matricula.data_matricula && matricula.semestre_atual) {
                let matricular = await MatriculaService.matricular_aluno(matricula);
                returnObj.result = matricular;
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
    trancar_matricula: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let matricula = {
                id_matricula: req.query.idMatricula,
                data_trancamento: new Date()
            }
            if (matricula) {
                let trancamento = await MatriculaService.trancar_matricula(matricula);
                returnObj.result = trancamento;
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
    destrancar_matricula: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let matricula = {
                id_matricula: req.query.idMatricula,
                data_trancamento: null
            }
            if (matricula) {
                let destrancamento = await MatriculaService.destrancar_matricula(matricula);
                returnObj.result = destrancamento;
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