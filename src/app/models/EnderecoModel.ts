import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./baseModel";
import { Candidato } from "./CandidatoModel";
import { Cidade } from "./CidadeModel";
import { Estado } from "./EstadoModel";

@Entity()
export class Endereco extends BaseModel {
    @Column()
    cep: string;
    
    @Column()
    complemento: string;
    
    @Column()
    bairro: string;
    
    @ManyToOne(() => Cidade, cidade => cidade.enderecos)
    @JoinTable()
    cidade: Cidade;

    @ManyToOne(() => Estado, estado => estado.enderecos)
    @JoinTable()
    estado: Estado;
    
    // @Column()
    // ufTexto: string;
    
    // @Column()
    // ufSigla: string;

    @OneToMany(() => Candidato, candidato => candidato.id)
    candidato: Candidato[];
}
