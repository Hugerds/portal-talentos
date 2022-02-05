import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SituacaoCandidato } from "../enums/SituacaoCandidatoEnum";
import { BaseModel } from "./baseModel";
import { Empresa } from "./EmpresaModel";
import { Endereco } from "./EnderecoModel";
import { Formacao } from "./FormacaoModel";
import { Habilidade } from "./HabilidadeModel";
import { Usuario } from "./UsuarioModel";

@Entity()
export class Candidato extends BaseModel {
    @Column()
    code: number;

    @Column()
    name: string;

    @Column({ type: "date" })
    data_nascimento: Date;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column({
        type: "enum",
        enum: SituacaoCandidato,
        default: SituacaoCandidato.pendente
    })
    situacao_candidato: SituacaoCandidato;

    @ManyToOne(() => Endereco, endereco => endereco.candidato)
    endereco: Endereco;

    @ManyToMany(() => Habilidade)
    @JoinTable()
    habilidades: Habilidade[];

    @ManyToOne(() => Formacao, formacao => formacao.candidato, { cascade: true })
    formacao: Formacao;

    @ManyToOne(() => Empresa, empresa => empresa.candidatos)
    empresa: Empresa;

    @ManyToOne(() => Usuario, usuario => usuario.candidatos)
    created_user: Usuario;

    @ManyToOne(() => Usuario, usuario => usuario.candidatos)
    responsible_user: Usuario;
}
