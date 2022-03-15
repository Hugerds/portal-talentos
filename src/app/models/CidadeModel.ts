import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Candidato } from "./CandidatoModel";
import { Endereco } from "./EnderecoModel";
import { Estado } from "./EstadoModel";

@Entity()
export class Cidade extends BaseModel {
    @Column()
    nome: string;

    @OneToMany(() => Endereco, endereco => endereco.cidade)
    enderecos: Endereco[];

    @ManyToOne(() => Estado, estado => estado.cidades)
    estado: Estado;
}
