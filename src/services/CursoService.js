const db = require('../db');

module.exports = {
    listarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            let query = 'SELECT * FROM Curso';

            db.query(query, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
        })
    },
    buscarCurso: (idCurso) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'SELECT * FROM Curso WHERE id_curso = ?';

            db.query(query, [idCurso], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results[0]);
            })
        })
    },
    criarCurso: (curso) => {
        return new Promise((aceito, rejeitado) => {

            let query = `INSERT INTO Curso VALUES (0, ?, ?)`;

            db.query(query, [curso.nome, curso.turno], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito('OK!');
            })
        })
    },
    atualizarCurso: (curso) => {
        return new Promise((aceito, rejeitado) => {

            let query = `UPDATE Curso 
            SET nome = ?, turno = ?
            WHERE id_curso = ?`;

            db.query(query, [curso.nome, curso.turno, curso.idCurso], (error, results) => {
                if (error) {rejeitado(error); return;}
                aceito("OK!");
            })
        })
    },
    deletarCurso: (idCurso) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'DELETE FROM Curso WHERE id_curso = ?';

            db.query(query, [idCurso], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito("OK!");
            })
        })
    },

};