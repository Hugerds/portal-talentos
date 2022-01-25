import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Candidato } from "./CandidatoModel";
import { Formacao } from "./FormacaoModel";

@Entity()
export class Instituicao {
	@PrimaryGeneratedColumn("uuid")
	id: string;

    @Column()
    nome: string;

    @Column()
    descricao: string;

    @OneToMany(() => Formacao, formacao => formacao.instituicoes)
    formacoes: Formacao[];
}
