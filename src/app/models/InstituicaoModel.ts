import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./baseModel";
import { Candidato } from "./CandidatoModel";
import { Formacao } from "./FormacaoModel";

@Entity()
export class Instituicao extends BaseModel {
    @Column()
    nome: string;

    @Column()
    descricao: string;

    @OneToMany(() => Formacao, formacao => formacao.instituicoes)
    formacoes: Formacao[];
}
