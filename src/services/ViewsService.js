const db = require('../db');

module.exports = {
    ultimos_alunos_matriculados: () => {
        return new Promise((aceito, rejeitado) => {
            let query = 'select * from View_ultimas_10_matriculas;';

            db.query(query, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
        })
    }
};