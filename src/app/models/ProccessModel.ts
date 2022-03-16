import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity()
export class Proccess extends BaseModel {
    @Column()
    code: number;
}
