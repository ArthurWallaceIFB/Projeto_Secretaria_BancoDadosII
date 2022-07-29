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
    buscarAluno: (matricula) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'SELECT * FROM Aluno WHERE matricula = ?';

            db.query(query, [matricula], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results[0]);
            })
        })
    },
    criarAluno: (aluno) => {
        return new Promise((aceito, rejeitado) => {

            let query = `INSERT INTO Aluno VALUES (?, ?, ?, ?, ?, ?)`;

            db.query(query, [aluno.matricula, aluno.nome, aluno.cpf, aluno.dataNascimento, aluno.dataIngresso, aluno.sexo], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results[0]);
            })
        })
    }

};