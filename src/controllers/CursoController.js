const { json } = require('body-parser');
const CursoService = require('../services/CursoService');

module.exports = {
    listarTodos: async (req, res) => {
        let returnObj = { result: [], error: '' };
        try {
            let cursos = await CursoService.listarTodos();

            cursos.map((curso) => {
                returnObj.result.push(curso);
            })
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    },
    buscarCurso: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let idCurso = req.params.idCurso;

            let curso = await CursoService.buscarCurso(idCurso);

            if (curso) {
                returnObj.result = curso;
            }
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    },
    criarCurso: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let curso = {
                nome: req.body.nome,
                turno: req.body.turno
            }
            if (curso && curso.nome) {
                let novoCurso = await CursoService.criarCurso(curso);
                returnObj.result = novoCurso;
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
    atualizarCurso: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let curso = {
                idCurso: req.params.idCurso,
                nome: req.body.nome,
                turno: req.body.turno
            }
            if (curso && curso.idCurso && curso.nome) {
                let atualizacao = await CursoService.atualizarCurso(curso);
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
    deletarCurso: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let idCurso = req.params.idCurso;

            if (idCurso) {
                let exclusao = await CursoService.deletarCurso(idCurso);
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