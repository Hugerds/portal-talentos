import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CandidateSituation } from "../enums/CandidateSituationEnum";
import { BaseModel } from "./BaseModel";
import { Company } from "./CompanyModel";
import { Address } from "./AddressModel";
import { Formation } from "./FormationModel";
import { Skill } from "./SkillModel";
import { User } from "./UserModel";

@Entity()
export class Candidate extends BaseModel {
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

    @Column({
        type: "enum",
        enum: CandidateSituation,
        default: CandidateSituation.pendente
    })
    candidateSituation: CandidateSituation;

    @ManyToOne(() => Address, address => address.candidate)
    address: Address;

    @ManyToMany(() => Skill)
    @JoinTable()
    skills: Skill[];

    @ManyToOne(() => Formation, formation => formation.candidates, { cascade: true })
    formation: Formation;

    @ManyToOne(() => Company, company => company.candidates)
    company: Company;

    @ManyToOne(() => User, user => user.candidates)
    createdUser: User;

    @ManyToOne(() => User, user => user.candidates)
    responsibleUser: User;
}
