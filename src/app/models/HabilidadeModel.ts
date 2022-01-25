import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Candidato } from "./CandidatoModel";

@Entity()
export class Habilidade {
	@PrimaryGeneratedColumn("uuid")
	id: string;
    
    @Column()
    descricao: string;

    @OneToMany(() => Candidato, candidato => candidato.id)
    candidato: Candidato[];
}
