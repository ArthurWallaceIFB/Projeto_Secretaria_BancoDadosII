const db = require('../db');

module.exports = {
    listarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            let query = 'SELECT * FROM Disciplina';

            db.query(query, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
        })
    },
    buscarDisciplina: (idDisciplina) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'SELECT * FROM Disciplina WHERE id_disciplina = ?';

            db.query(query, [idDisciplina], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results[0]);
            })
        })
    },
    criarDisciplina: (disciplina) => {
        return new Promise((aceito, rejeitado) => {

            let query = `INSERT INTO Disciplina VALUES (0, ?, ?, ?)`;

            db.query(query, [disciplina.nome, disciplina.carga_horaria, disciplina.id_professor], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito('OK!');
            })
        })
    },
    atualizarDisciplina: (disciplina) => {
        return new Promise((aceito, rejeitado) => {

            let query = `UPDATE Disciplina 
            SET nome = ?, carga_horaria = ?, id_professor = ?
            WHERE id_disciplina = ?`;

            db.query(query, [disciplina.nome, disciplina.carga_horaria, disciplina.id_professor, disciplina.idDisciplina], (error, results) => {
                if (error) {rejeitado(error); return;}
                aceito("OK!");
            })
        })
    },
    deletarDisciplina: (idDisciplina) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'DELETE FROM Disciplina WHERE id_disciplina = ?';

            db.query(query, [idDisciplina], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito("OK!");
            })
        })
    },

};