import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./baseModel";
import { Candidato } from "./CandidatoModel";

@Entity()
export class Habilidade extends BaseModel {
    @Column()
    descricao: string;
}
