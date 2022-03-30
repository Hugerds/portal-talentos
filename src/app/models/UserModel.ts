import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { TypeUser } from "../enums/TypeUserEnum";
import { BaseModel } from "./BaseModel";
import { Candidate } from "./CandidateModel";
import { Company } from "./CompanyModel";
import bcrypt from 'bcryptjs'


@Entity()
export class User extends BaseModel {
    @Column()
    login: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    documment: string;

    @Column()
    tellphone: string;

    @Column()
    birthDate: Date;

    @Column()
    complete_registration: boolean;

    @Column({
        type: "enum",
        enum: TypeUser,
    })
    typeUser: TypeUser;

    @OneToMany(() => Company, company => company.responsibleUser)
    companies: Company[];

    @OneToMany(() => Candidate, candidate => candidate.createdUser)
    candidates: Candidate[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPasswords() {
        this.password = bcrypt.hashSync(this.password, 8);
    }
}