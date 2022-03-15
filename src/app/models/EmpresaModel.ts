import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Candidato } from "./CandidatoModel";
import { Endereco } from "./EnderecoModel";
import { Usuario } from "./UsuarioModel";

@Entity()
export class Empresa extends BaseModel {
    @Column()
    nome: string;

    @Column()
    cnpj: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @ManyToOne(() => Endereco, endereco => endereco.empresa)
    endereco: Endereco;

    @ManyToOne(() => Usuario, usuario => usuario.empresas)
    responsibleUser: Usuario;

    @OneToMany(() => Candidato, candidato => candidato.empresa)
    candidatos: Candidato[];
}