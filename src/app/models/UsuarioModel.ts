import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { UsuarioTipo } from "../enums/UsuarioTipoEnum";
import { BaseModel } from "./BaseModel";
import { Candidato } from "./CandidatoModel";
import { Empresa } from "./EmpresaModel";
import bcrypt from 'bcryptjs'


@Entity()
export class Usuario extends BaseModel {
    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    cpf: string;

    @Column()
    telefone: string;

    @Column()
    data_nascimento: Date;

    @Column({
        type: "enum",
        enum: UsuarioTipo,
    })
    usuario_tipo: UsuarioTipo;

    @OneToMany(() => Empresa, empresa => empresa.responsibleUser)
    empresas: Empresa[];

    @OneToMany(() => Candidato, candidato => candidato.createdUser)
    candidatos: Candidato[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPasswords() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}