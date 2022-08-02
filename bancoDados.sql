-- Criar tabela de Aluno
Create table Aluno(
id_aluno int primary key auto_increment,
nome varchar(50)not null ,
cpf numeric(11)not null,
dataNascimento date not null,
dataDeIngresso date NOT NULL, 
sexo char(1)
);

-- Criar tabela de Professor
create table Professor(
id_professor int primary key auto_increment,
nome varchar(50) not null,
cpf numeric(11) not null,
data_nascimento date not null,
sexo char(1)
);

-- Criar tabela de Campus
create table Campus(
id_campus int primary key AUTO_INCREMENT,
nome varchar(50) not null ,
CEP numeric(8),
endereco varchar(20),
cidade varchar(20)
);

-- Criar tabela de Curso
create table Curso(
id_curso int primary key AUTO_INCREMENT,
nome varchar(50) not null,
turno varchar(20) not null
);

-- Criar tabela de Disciplina
create table Disciplina(
id_disciplina int primary key AUTO_INCREMENT,
nome varchar(50),
carga_horaria numeric(3),
id_professor int not null,
constraint fk_disciplina_professor foreign key(id_professor) references Professor(id_professor)
);

-- Criar tabela de relacionamento N - N -> Cursos e Disciplinas
create table Cursos_disciplinas(
id_curso_disciplina int primary key auto_increment,
id_curso int not null,
id_disciplina int not null,
constraint fk_cursos_disciplinas_idCurso foreign key(id_curso) references Curso(id_curso),
constraint fk_cursos_disciplinas_idDisciplina foreign key(id_disciplina) references Disciplina(id_disciplina)
);

-- Criar tabela de Matricula
create table Matricula(
id_matricula int primary key auto_increment,
id_aluno int not null,
id_disciplina int not null,
data_matricula datetime not null,
semestre_atual int not null,
status_trancamento bool default false,
data_trancamento datetime,
constraint fk_matricula_id_aluno foreign key(id_aluno) references Aluno(id_aluno),
constraint fk_matricula_id_disciplina foreign key(id_disciplina) references Disciplina(id_disciplina)
);

-- criar tabela de Histórico de Matrícula
create table Historico_matricula (
id_historico_matricula int primary key auto_increment,
id_matricula int not null,
data_alteracao datetime not null,
alteracao varchar(20) not null,
constraint fk_historico_matricula_idMatricula foreign key(id_matricula) references Matricula(id_matricula)
);

-- criar triggers para popular o histórico de matrícula
DELIMITER $
CREATE TRIGGER Tgr_HistoricoMatricula_Insert AFTER INSERT
ON Matricula
FOR EACH ROW
BEGIN
	INSERT INTO Historico_matricula values (0, NEW.id_matricula, NOW(), 'Inserção');
END$
DELIMITER ;

select * from Historico_matricula

DELIMITER $
CREATE TRIGGER Tgr_HistoricoMatricula_Update AFTER UPDATE
ON Matricula
FOR EACH ROW
BEGIN
	INSERT INTO Historico_matricula values (0, NEW.id_matricula, NOW(), 'Atualização');
END$
DELIMITER ;

-- Criar Procedure para listar as disciplinas de um curso
DELIMITER $$
CREATE PROCEDURE Listar_disciplinas_curso(IN idCurso INT)
BEGIN
SELECT id_curso, d.id_disciplina, nome, carga_horaria, id_professor FROM Cursos_disciplinas cd
INNER JOIN Disciplina d ON d.id_disciplina = cd.id_disciplina
WHERE cd.id_curso = idCurso;
END $$
DELIMITER ;

call Listar_disciplinas_curso(1);

-- Criar Procedure para listar os cursos de uma disciplina
DELIMITER $$
CREATE PROCEDURE Listar_cursos_disciplina(IN idDisciplina INT)
BEGIN
SELECT id_disciplina, c.id_curso, nome, turno FROM Cursos_disciplinas cd
INNER JOIN Curso c ON c.id_curso = cd.id_curso
WHERE cd.id_disciplina = idDisciplina;
END $$
DELIMITER ;

call Listar_cursos_disciplina(1);

-- Criar View para retornar as últimas 10 matrículas realizadas
create view View_ultimas_10_matriculas as
select m.id_matricula, m.id_aluno, m.id_disciplina, a.nome as nomeAluno, d.nome as nomeDisciplina, m.data_matricula, m.semestre_atual,
m.status_trancamento, m.data_trancamento from Matricula m
inner join Aluno a on a.id_aluno = m.id_aluno
inner join Disciplina d on d.id_disciplina = m.id_disciplina
order by data_matricula desc
limit 10;

-- Criar função para retornar o total de alunos em uma disciplina
DELIMITER //
CREATE FUNCTION fn_VerTotalAlunosDisciplinas(idDisciplina int)
RETURNS varchar(100) deterministic

BEGIN
   DECLARE msg_retorno varchar(100);

   IF (select count(*) from Matricula m
		inner join Disciplina d on d.id_disciplina = m.id_disciplina
		where m.id_disciplina = idDisciplina
		group by m.id_disciplina) > 0 THEN
      SET msg_retorno = (select CONCAT('Existem ', count(*), ' alunos matriculados na disciplina de ', d.nome) as TotalAlunos
						from Matricula m
						inner join Disciplina d on d.id_disciplina = m.id_disciplina
						where m.id_disciplina = idDisciplina
						group by m.id_disciplina);
   ELSE
      SET msg_retorno = 'Nenhum aluno matriculado na disciplina!';

   END IF;

   RETURN msg_retorno;

END; //
DELIMITER ;












