import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Candidate } from "./CandidateModel";
import { Address } from "./AddressModel";
import { State } from "./StateModel";

@Entity()
export class City extends BaseModel {
    @Column()
    name: string;

    @OneToMany(() => Address, address => address.city)
    addresses: Address[];

    @ManyToOne(() => State, state => state.citys)
    state: State;
}
