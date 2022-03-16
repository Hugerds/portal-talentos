import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Candidate } from "./CandidateModel";
import { Address } from "./AddressModel";
import { User } from "./UserModel";
import { Proccess } from './ProccessModel';

@Entity()
export class Company extends BaseModel {
    @Column()
    name: string;

    @Column()
    cnpj: string;

    @Column()
    email: string;

    @Column()
    tellphone: string;

    @ManyToOne(() => Address, address => address.company)
    address: Address;

    @ManyToOne(() => User, user => user.companies)
    responsibleUser: User;

    @OneToMany(() => Candidate, candidate => candidate.company)
    candidates: Candidate[];

    @OneToMany(() => Proccess, proccess => proccess.company)
    proccess: Proccess[];
}