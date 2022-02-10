import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Endereco } from "./EnderecoModel";
import { Formacao } from "./FormacaoModel";
import { Habilidade } from "./HabilidadeModel";

export abstract class BaseModel {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'date' })
    @CreateDateColumn()
    createDate: Date;

    @Column({ type: 'date' })
    @UpdateDateColumn()
    updateDate: Date;

    @Column({ default: false })
    excluido: boolean;
}
