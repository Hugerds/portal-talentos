import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Candidato } from "./CandidatoModel";
import { Curso } from "./CursoModel";
import { Instituicao } from "./InstituicaoModel";

@Entity()
export class Formacao extends BaseModel {
    @Column({ type: "date" })
    conclusao: string;

    @ManyToOne(() => Curso, curso => curso.formacoes)
    @JoinTable()
    curso: Curso;

    @ManyToOne(() => Instituicao, instituicao => instituicao.formacoes)
    @JoinTable()
    instituicao: Instituicao;

    @OneToMany(() => Candidato, candidato => candidato.id)
    candidato: Candidato[];
}
