import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Candidato } from "./CandidatoModel";

@Entity()
export class Endereco {
	@PrimaryGeneratedColumn("uuid")
	id: string;
    
    @Column()
    curso: string;
    
    @Column()
    complemento: string;
    
    @Column()
    bairro: string;
    
    @Column()
    localidade: string;
    
    @Column()
    ufTexto: string;
    
    @Column()
    ufSigla: string;

    @OneToMany(() => Candidato, candidato => candidato.id)
    candidato: Candidato[];
}
