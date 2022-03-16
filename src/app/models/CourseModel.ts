import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Formation } from "./FormationModel";

@Entity()
export class Course extends BaseModel {
    @Column()
    name: string;

    @Column({ nullable: true })
    description: string;

    @OneToMany(() => Formation, formation => formation.course)
    formations: Formation[];
}
