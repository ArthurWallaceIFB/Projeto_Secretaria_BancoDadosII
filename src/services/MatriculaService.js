const db = require('../db');

module.exports = {
    buscar_matriculas: (idAluno) => {
        return new Promise((aceito, rejeitado) => {
            let query = 'SELECT * FROM Matricula WHERE id_aluno = ?';

            db.query(query,[idAluno], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
        })
    },
    matricular_aluno: (matricula) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'insert into Matricula (id_aluno, id_disciplina, data_matricula, semestre_atual) values (?, ?, NOW(), ?);';

            db.query(query, [matricula.id_aluno, matricula.id_disciplina, matricula.semestre_atual], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito('Aluno matriculado com sucesso!')
            })
        })
    },
    trancar_matricula: (matricula) => {
        return new Promise((aceito, rejeitado) => {
            console.log(matricula);
            let query = `update Matricula set status_trancamento = true, data_trancamento = NOW()
            where id_matricula = ?`;

            db.query(query, [matricula.data_trancamento, matricula.id_matricula], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito('Matrícula trancada com sucesso!')
            })
        })
    },
    destrancar_matricula: (matricula) => {
        return new Promise((aceito, rejeitado) => {
            console.log(matricula);
            let query = `update Matricula set status_trancamento = false, data_trancamento = ?
            where id_matricula = ?`;

            db.query(query, [matricula.data_trancamento, matricula.id_matricula], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito('Matrícula destrancada com sucesso!')
            })
        })
    }
};