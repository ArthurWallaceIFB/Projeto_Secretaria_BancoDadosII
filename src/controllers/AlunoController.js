const { json } = require('body-parser');
const AlunoService = require('../services/AlunoService');

module.exports = {
    listarTodos: async (req, res) => {
        let returnObj = { result: [], error: '' };
        try {
            let alunos = await AlunoService.listarTodos();

            alunos.map((aluno) => {
                returnObj.result.push(aluno);
            })
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    },
    buscarAluno: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let matricula = req.params.matricula;

            let aluno = await AlunoService.buscarAluno(matricula);

            if (aluno) {
                returnObj.result = aluno;
            }
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    },
    criarAluno: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let aluno = {
                matricula: req.body.matricula,
                nome: req.body.nome,
                cpf: req.body.cpf,
                dataNascimento: req.body.dataNascimento,
                dataIngresso: new Date(),
                sexo: req.body.sexo
            }
            if (Object.values(aluno).every(value => value != null)) {
                let novoAluno = await AlunoService.criarAluno(aluno);
                returnObj.result = novoAluno;
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
    atualizarAluno: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let aluno = {
                matricula: req.params.matricula,
                nome: req.body.nome,
                cpf: req.body.cpf,
                dataNascimento: req.body.dataNascimento,
                sexo: req.body.sexo
            }
            if (Object.values(aluno).every(value => value != null)) {
                let atualizacao = await AlunoService.atualizarAluno(aluno);
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
    deletarAluno: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let matricula = req.params.matricula;

            if (matricula) {
                let exclusao = await AlunoService.deletarAluno(matricula);
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