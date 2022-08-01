const { json } = require('body-parser');
const ViewsService = require('../services/ViewsService');

module.exports = {
    ultimos_alunos_matriculados: async (req, res) => {
        let returnObj = { result: [], error: '' };
        try {
            let alunos = await ViewsService.ultimos_alunos_matriculados();

            alunos.map((aluno) => {
                returnObj.result.push(aluno);
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
                let matricular = await ViewsService.matricular_aluno(matricula);
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
                id_matricula: req.query.idViews,
                data_trancamento: new Date()
            }
            if (matricula) {
                let trancamento = await ViewsService.trancar_matricula(matricula);
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
                id_matricula: req.query.idViews,
                data_trancamento: null
            }
            if (matricula) {
                let destrancamento = await ViewsService.destrancar_matricula(matricula);
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