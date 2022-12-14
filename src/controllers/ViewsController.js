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
    }
}