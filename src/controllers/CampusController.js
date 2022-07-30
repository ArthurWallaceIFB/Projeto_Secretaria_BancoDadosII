const { json } = require('body-parser');
const CampusService = require('../services/CampusService');

module.exports = {
    listarTodos: async (req, res) => {
        let returnObj = { result: [], error: '' };
        try {
            let campus = await CampusService.listarTodos();

            campus.map((campus) => {
                returnObj.result.push(campus);
            })
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    },
    buscarCampus: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let idCampus = req.params.idCampus;

            let campus = await CampusService.buscarCampus(idCampus);

            if (campus) {
                returnObj.result = campus;
            }
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    },
    criarCampus: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let campus = {
                nome: req.body.nome,
                cep: req.body.cep,
                endereco: req.body.endereco,
                cidade: req.body.cidade
            }
            if (campus && campus.nome) {
                let novoCampus = await CampusService.criarCampus(campus);
                returnObj.result = novoCampus;
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
    atualizarCampus: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let campus = {
                idCampus: req.params.idCampus,
                nome: req.body.nome,
                cep: req.body.cep,
                endereco: req.body.endereco,
                cidade: req.body.cidade
            }
            if (campus && campus.idCampus && campus.nome) {
                let atualizacao = await CampusService.atualizarCampus(campus);
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
    deletarCampus: async (req, res) => {
        let returnObj = { result: {}, error: '' };
        try {
            let idCampus = req.params.idCampus;

            if (idCampus) {
                let exclusao = await CampusService.deletarCampus(idCampus);
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