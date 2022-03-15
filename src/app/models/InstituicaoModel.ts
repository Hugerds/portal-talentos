import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Candidato } from "./CandidatoModel";
import { Formacao } from "./FormacaoModel";

@Entity()
export class Instituicao extends BaseModel {
    @Column()
    nome: string;

    @Column({ nullable: true })
    descricao: string;

    @OneToMany(() => Formacao, formacao => formacao.instituicao)
    formacoes: Formacao[];
}
