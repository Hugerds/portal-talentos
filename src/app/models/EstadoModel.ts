import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Candidato } from "./CandidatoModel";
import { Cidade } from "./CidadeModel";
import { Endereco } from "./EnderecoModel";

@Entity()
export class Estado extends BaseModel {
    @Column()
    ufSigla: string;

    @Column()
    ufTexto: string;

    @OneToMany(() => Endereco, endereco => endereco.estado)
    enderecos: Endereco[];

    @OneToMany(() => Cidade, cidade => cidade.estado)
    cidades: Cidade[];
}
