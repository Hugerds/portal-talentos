import { Column, Entity, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { PhaseProccessEnum } from "../enums/PhaseProccessEnum";
import { BaseModel } from "./BaseModel";
import { CandidateProccess } from "./CandidateProccessModel";
import { Company } from "./CompanyModel";

@Entity()
export class Proccess extends BaseModel {
    @Column()
    code: number;

    @Column({
        type: "enum",
        enum: PhaseProccessEnum,
        default: PhaseProccessEnum.PHASE_PROCCESS_PENDING
    })
    phaseProccess: PhaseProccessEnum;

    @ManyToOne(() => Company, company => company.proccess)
    company: Company;

    @OneToOne(() => CandidateProccess, candidateProccess => candidateProccess.proccess) // specify inverse side as a second parameter
    candidateProccess: CandidateProccess;
}
