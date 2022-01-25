import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Endereco } from "./EnderecoModel";
import { Formacao } from "./FormacaoModel";
import { Habilidade } from "./HabilidadeModel";

@Entity()
export class Candidato {
	@PrimaryGeneratedColumn("uuid")
	id: string;
    
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
}
