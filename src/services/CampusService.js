const db = require('../db');

module.exports = {
    listarTodos: () => {
        return new Promise((aceito, rejeitado) => {

            let query = 'SELECT * FROM Campus';

            db.query(query, (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
        })
    },
    buscarCampus: (idCampus) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'SELECT * FROM Campus WHERE id_campus = ?';

            db.query(query, [idCampus], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results[0]);
            })
        })
    },
    criarCampus: (Campus) => {
        return new Promise((aceito, rejeitado) => {
            let query = `INSERT INTO Campus VALUES (0, ?, ?, ?, ?)`;

            db.query(query, [Campus.nome, Campus.cep, Campus.endereco, Campus.cidade], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito('OK!');
            })
        })
    },
    atualizarCampus: (Campus) => {
        return new Promise((aceito, rejeitado) => {

            let query = `UPDATE Campus
            SET nome = ?, CEP = ?, endereco = ?, cidade = ?
            WHERE id_campus = ?`;

            db.query(query, [Campus.nome, Campus.cep, Campus.endereco, Campus.cidade, Campus.idCampus], (error, results) => {
                console.log(results, 'results');
                if (error) { console.log(error, "error"); rejeitado(error);}
                aceito("OK!");
            })
        })
    },
    deletarCampus: (idCampus) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'DELETE FROM Campus WHERE id_campus = ?';

            db.query(query, [idCampus], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito("OK!");
            })
        })
    },

};