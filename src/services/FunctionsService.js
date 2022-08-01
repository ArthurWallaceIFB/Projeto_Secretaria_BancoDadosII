const db = require('../db');

module.exports = {
    qnt_alunos_disciplina: (id_disciplina) => {
        return new Promise((aceito, rejeitado) => {
            let query = 'select fn_VerTotalAlunosDisciplinas(?) as TotalAlunos;';

            db.query(query, [id_disciplina], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
        })
    }
};