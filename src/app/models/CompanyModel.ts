import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Candidate } from "./CandidateModel";
import { Address } from "./AddressModel";
import { User } from "./UserModel";

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

    @ManyToOne(() => User, user => user.companys)
    responsibleUser: User;

    @OneToMany(() => Candidate, candidate => candidate.company)
    candidates: Candidate[];
}