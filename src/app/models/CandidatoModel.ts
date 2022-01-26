import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { BaseModel } from "./baseModel";
import { Endereco } from "./EnderecoModel";
import { Formacao } from "./FormacaoModel";
import { Habilidade } from "./HabilidadeModel";

@Entity()
export class Candidato extends BaseModel {
    @Column()
    code: number;
    
    @Column()
    name: string;
    
    @Column({type: "date"})
    dataNascimento: Date;
    
    @Column()
    email: string;
    
    @Column()
    telefone: string;
    
    @ManyToOne(() => Endereco, endereco => endereco.candidato)
    endereco: Endereco;

    @ManyToOne(() => Habilidade, habilidade => habilidade.candidato)
    habilidade: Habilidade;
    
    @ManyToOne(() => Formacao, formacao => formacao.candidato, {cascade: true})
    formacao: Formacao;

    @Column({type: 'date'})
    @CreateDateColumn()
    create_date: Date;
    
    @Column({type: 'date'})
    @UpdateDateColumn()
    update_date: Date;
}
