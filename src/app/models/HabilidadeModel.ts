import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Candidato } from "./CandidatoModel";

@Entity()
export class Habilidade extends BaseModel {
    @Column()
    descricao: string;
}
