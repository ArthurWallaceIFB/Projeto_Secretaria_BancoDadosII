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
    },
    matricular_aluno: (matricula) => {
        return new Promise((aceito, rejeitado) => {

            let query = 'insert into Matricula (id_aluno, id_disciplina, data_matricula, semestre_atual) values (?, ?, ?, ?);';

            db.query(query, [matricula.id_aluno, matricula.id_disciplina, matricula.data_matricula, matricula.semestre_atual], (error, results) => {
                if (error) { rejeitado(error); return; }
                aceito('Aluno matriculado com sucesso!')
            })
        })
    },
    trancar_matricula: (matricula) => {
        return new Promise((aceito, rejeitado) => {
            console.log(matricula);
            let query = `update Matricula set status_trancamento = true, data_trancamento = ?
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