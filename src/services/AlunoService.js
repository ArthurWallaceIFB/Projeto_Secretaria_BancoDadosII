const db = require('../db');

module.exports = {
    listarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            let query = 'SELECT * FROM Aluno';

            db.query(query, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
        })
    },
    buscarAluno: (idAluno) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'SELECT * FROM Aluno WHERE id_aluno = ?';

            db.query(query, [idAluno], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results[0]);
            })
        })
    },
    criarAluno: (aluno) => {
        return new Promise((aceito, rejeitado) => {

            let query = `INSERT INTO Aluno VALUES (0, ?, ?, ?, ?, ?)`;

            db.query(query, [aluno.nome, aluno.cpf, aluno.dataNascimento, aluno.dataIngresso, aluno.sexo], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito('OK!');
            })
        })
    },
    atualizarAluno: (aluno) => {
        return new Promise((aceito, rejeitado) => {

            let query = `UPDATE Aluno 
            SET nome = ?, cpf = ?, dataNascimento = ?, sexo = ?
            WHERE id_aluno = ?`;

            db.query(query, [aluno.nome, aluno.cpf, aluno.dataNascimento, aluno.sexo, aluno.idAluno], (error, results) => {
                if (error) {rejeitado(error); return;}
                aceito("OK!");
            })
        })
    },
    deletarAluno: (idAluno) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'DELETE FROM Aluno WHERE id_aluno = ?';

            db.query(query, [idAluno], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito("OK!");
            })
        })
    },

};