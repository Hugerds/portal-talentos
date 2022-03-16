import { Column, Entity, JoinTable, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Candidate } from "./CandidateModel";
import { City } from "./CityModel";
import { Company } from "./CompanyModel";
import { State } from "./StateModel";

@Entity()
export class Address extends BaseModel {
    @Column()
    cep: string;

    @Column({ nullable: true })
    complement: string;

    @Column()
    district: string;

    @Column()
    street: string;

    @Column()
    number: number;

    @ManyToOne(() => City, city => city.addresses)
    @JoinTable()
    city: City;

    @ManyToOne(() => State, state => state.addresses)
    @JoinTable()
    state: State;

    @OneToMany(() => Candidate, candidate => candidate.address)
    candidate: Candidate[];

    @OneToMany(() => Company, company => company.address)
    company: Company[];
}
