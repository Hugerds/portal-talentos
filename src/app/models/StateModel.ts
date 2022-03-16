import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { City } from "./CityModel";
import { Address } from "./AddressModel";

@Entity()
export class State extends BaseModel {
    @Column()
    stateAbbreviation: string;

    @Column()
    stateName: string;

    @OneToMany(() => Address, address => address.state)
    addresses: Address[];

    @OneToMany(() => City, city => city.state)
    citys: City[];
}
