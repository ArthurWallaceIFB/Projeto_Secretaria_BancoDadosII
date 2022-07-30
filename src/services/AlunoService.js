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
                aceito('OK!');
            })
        })
    },
    atualizarAluno: (aluno) => {
        return new Promise((aceito, rejeitado) => {

            let query = `UPDATE Aluno 
            SET nome = ?, cpf = ?, dataNascimento = ?, sexo = ?
            WHERE matricula = ?`;

            db.query(query, [aluno.nome, aluno.cpf, aluno.dataNascimento, aluno.sexo, aluno.matricula], (error, results) => {
                console.log(results, 'results');
                if (error) { console.log(error, "error"); rejeitado(error);}
                aceito("OK!");
            })
        })
    },
    deletarAluno: (matricula) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'DELETE FROM Aluno WHERE matricula = ?';

            db.query(query, [matricula], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito("OK!");
            })
        })
    },

};