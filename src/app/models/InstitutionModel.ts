import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Formation } from "./FormationModel";

@Entity()
export class Institution extends BaseModel {
    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Formation, formation => formation.institution)
    formations: Formation[];
}
