const db = require('../db');

module.exports = {
    buscar_disciplinas_curso: (idCurso) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'CALL Listar_disciplinas_curso(?);';

            db.query(query, [idCurso], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
        })
    },
    buscar_cursos_disciplina: (idDisciplina) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'CALL Listar_cursos_disciplina(?);';

            db.query(query, [idDisciplina], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito(results)
            })
        })
    },
    vincular_disciplina_Curso: (disciplina_curso) => {
        return new Promise((aceito, rejeitado) => {

            let query = `INSERT INTO Cursos_disciplinas VALUES (0, ?, ?)`;

            db.query(query, [disciplina_curso.idCurso, disciplina_curso.idDisciplina], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito('Vinculado com sucesso!');
            })
        })
    },
    desvincular_disciplina_Curso: (disciplina_curso) => {
        return new Promise((aceito, rejeitado) => {

            let query = `DELETE FROM Cursos_disciplinas WHERE id_curso = ? AND id_disciplina = ?`;

            db.query(query, [disciplina_curso.idCurso, disciplina_curso.idDisciplina], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito('Desvinculado com sucesso!');
            })
        })
    }
};