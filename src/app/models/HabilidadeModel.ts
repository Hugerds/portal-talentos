import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./baseModel";
import { Candidato } from "./CandidatoModel";

@Entity()
export class Habilidade extends BaseModel {
    @Column()
    descricao: string;

    @OneToMany(() => Candidato, candidato => candidato.id)
    candidato: Candidato[];
}
