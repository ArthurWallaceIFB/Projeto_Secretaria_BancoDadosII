const db = require('../db');

module.exports = {
    listarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            let query = 'SELECT * FROM Professor';

            db.query(query, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
        })
    },
    buscarProfessor: (idProfessor) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'SELECT * FROM Professor WHERE id_professor = ?';

            db.query(query, [idProfessor], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results[0]);
            })
        })
    },
    criarProfessor: (professor) => {
        return new Promise((aceito, rejeitado) => {

            let query = `INSERT INTO Professor VALUES (0, ?, ?, ?, ?)`;

            db.query(query, [professor.nome, professor.cpf, professor.dataNascimento, professor.sexo], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito('OK!');
            })
        })
    },
    atualizarProfessor: (professor) => {
        return new Promise((aceito, rejeitado) => {

            let query = `UPDATE Professor 
            SET nome = ?, cpf = ?, data_nascimento = ?, sexo = ?
            WHERE id_professor = ?`;

            db.query(query, [professor.nome, professor.cpf, professor.dataNascimento, professor.sexo, professor.idProfessor], (error, results) => {
                if (error) {rejeitado(error); return;}
                aceito("OK!");
            })
        })
    },
    deletarProfessor: (idProfessor) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'DELETE FROM Professor WHERE id_professor = ?';

            db.query(query, [idProfessor], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito("OK!");
            })
        })
    },

};