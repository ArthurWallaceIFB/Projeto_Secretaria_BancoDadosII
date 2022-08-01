const { json } = require('body-parser');
const ProfessorService = require('../services/ProfessorService');

module.exports = {
    listarTodos: async (req, res) => {
        let returnObj = { result: [], error: '' };
        try {
            let professores = await ProfessorService.listarTodos();

            professores.map((professor) => {
                returnObj.result.push(professor);
            })
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    },
    buscarProfessor: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let idProfessor = req.params.idProfessor;

            let professor = await ProfessorService.buscarProfessor(idProfessor);

            if (professor) {
                returnObj.result = professor;
            }
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    },
    criarProfessor: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let professor = {
                nome: req.body.nome,
                cpf: req.body.cpf,
                dataNascimento: req.body.dataNascimento,
                sexo: req.body.sexo
            }
            if (professor) {
                let novoProfessor = await ProfessorService.criarProfessor(professor);
                returnObj.result = novoProfessor;
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
    atualizarProfessor: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let professor = {
                idProfessor: req.params.idProfessor,
                nome: req.body.nome,
                cpf: req.body.cpf,
                dataNascimento: req.body.dataNascimento,
                sexo: req.body.sexo
            }
            if (professor) {
                let atualizacao = await ProfessorService.atualizarProfessor(professor);
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
    deletarProfessor: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let idProfessor = req.params.idProfessor;

            if (idProfessor) {
                let exclusao = await ProfessorService.deletarProfessor(idProfessor);
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