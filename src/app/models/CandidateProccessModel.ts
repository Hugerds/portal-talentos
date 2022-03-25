import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PhaseProccessEnum } from "../enums/PhaseProccessEnum";
import { BaseModel } from "./BaseModel";
import { Candidate } from "./CandidateModel";
import { Proccess } from "./ProccessModel";

@Entity()
export class CandidateProccess extends BaseModel {
    @Column({
        type: "enum",
        enum: PhaseProccessEnum,
        default: PhaseProccessEnum.PHASE_PROCCESS_PENDING
    })
    phaseProccess: PhaseProccessEnum;

    @OneToOne(() => Candidate)
    @JoinTable()
    candidate: Candidate;

    @OneToOne(() => Proccess)
    @JoinTable()
    proccess: Proccess;
}
