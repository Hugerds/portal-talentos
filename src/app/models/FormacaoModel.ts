import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Candidato } from "./CandidatoModel";
import { Curso } from "./CursoModel";
import { Instituicao } from "./InstituicaoModel";

@Entity()
export class Formacao {
	@PrimaryGeneratedColumn("uuid")
	id: string;

    @Column({type: "date"})
    conclusao: Date;
    
    @ManyToOne(() => Curso, curso => curso.formacoes)
    @JoinTable()
    cursos: Curso;

    @ManyToOne(() => Instituicao, instituicao => instituicao.formacoes)
    @JoinTable()
    instituicoes: Instituicao;

    @OneToMany(() => Candidato, candidato => candidato.id)
    candidato: Candidato[];
}
