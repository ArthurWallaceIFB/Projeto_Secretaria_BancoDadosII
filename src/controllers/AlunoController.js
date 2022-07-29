const { json } = require('body-parser');
const AlunoService = require('../services/AlunoService');

module.exports = {
    listarTodos: async (req, res) => {
        let returnObj = { result: [], error: '' };

        let alunos = await AlunoService.listarTodos();

        alunos.map((aluno) => {
            returnObj.result.push(aluno);
        })

        res.json(returnObj);
    },
    buscarAluno: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        let matricula = req.params.matricula;

        let aluno = await AlunoService.buscarAluno(matricula);

        if (aluno) {
            returnObj.result = aluno;
        }

        res.json(returnObj);
    },
    criarAluno: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        console.log(req.body);
        let aluno = {
            matricula: req.body.matricula,
            nome: req.body.nome,
            cpf: req.body.cpf,
            dataNascimento: req.body.dataNascimento,
            dataIngresso: req.body.dataIngresso,
            sexo: req.body.sexo
        }
        if (Object.values(aluno).every(value => value != null)) {
            let novoAluno = await AlunoService.criarAluno(aluno);
            returnObj.result = novoAluno;
        }
        else{
            returnObj.error = "Campos inválidos!"
        }

        res.json(returnObj);
    }
}