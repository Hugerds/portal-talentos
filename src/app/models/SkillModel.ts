import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity()
export class Skill extends BaseModel {
    @Column()
    description: string;
}
