import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PhaseProccessEnum } from "../enums/PhaseProccessEnum";
import { BaseModel } from "./BaseModel";
import { Company } from "./CompanyModel";
import { Address } from "./AddressModel";
import { Formation } from "./FormationModel";
import { Skill } from "./SkillModel";
import { User } from "./UserModel";
import { Proccess } from "./ProccessModel";
import { CandidateProccess } from "./CandidateProccessModel";
import { ErrorResult } from "../../errors/ErrorResult";

@Entity()
export class Candidate extends BaseModel {

    constructor(props: Partial<Candidate>) {
        super();
        Object.assign(this, props);
    }

    @Column()
    code: number;

    @Column()
    name: string;

    @Column({ type: "date" })
    birthDate: Date;

    @Column()
    email: string;

    @Column()
    tellphone: string;

    // @Column({
    //     type: "enum",
    //     enum: PhaseProccessEnum,
    //     default: PhaseProccessEnum.PHASE_PROCCESS_PENDING
    // })
    // phaseProccess: PhaseProccessEnum;

    @ManyToOne(() => Address, address => address.candidate)
    address: Address;

    @ManyToMany(() => Skill)
    @JoinTable()
    skills: Skill[];

    @ManyToOne(() => Formation, formation => formation.candidates, { cascade: true })
    formation: Formation;

    @ManyToOne(() => User, user => user.candidates)
    createdUser: User;

    @ManyToOne(() => User, user => user.candidates)
    responsibleUser: User;

    @OneToOne(() => CandidateProccess, candidateProccess => candidateProccess.candidate) // specify inverse side as a second parameter
    candidateProccess: CandidateProccess;

    validateForInsert(): ErrorResult {
        const result = new ErrorResult();

        if (!this.name || !this.birthDate || !this.address || !this.tellphone || !this.formation) {
            result.addError("Preencha todos os campos obrigatórios");
            result.setHttpErrorCode(400);
        }
        else if (this.name.trim() == "" || this.tellphone.trim() == "") {
            result.addError("Campos obrigatórios não podem ser vazios");
            result.setHttpErrorCode(400);
        }
        return result;
    }
}
