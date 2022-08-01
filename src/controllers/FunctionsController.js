const { json } = require('body-parser');
const FunctionsService = require('../services/FunctionsService');

module.exports = {
    qnt_alunos_disciplina: async (req, res) => {
        let returnObj = { result: [], error: '' };
        try {
            let id_disciplina =req.query.idDisciplina;

            let alunos = await FunctionsService.qnt_alunos_disciplina(id_disciplina);

            alunos.map((aluno) => {
                returnObj.result.push(aluno);
            })
        }
        catch (ex) {
            returnObj.error = ex;
        }
        res.json(returnObj);
    }
}