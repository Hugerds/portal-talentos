import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Candidate } from "./CandidateModel";
import { Course } from "./CourseModel";
import { Institution } from "./InstitutionModel";

@Entity()
export class Formation extends BaseModel {
    @Column({ type: "date" })
    conclusao: string;

    @ManyToOne(() => Course, course => course.formations)
    @JoinTable()
    course: Course;

    @ManyToOne(() => Institution, institution => institution.formations)
    @JoinTable()
    institution: Institution;

    @OneToMany(() => Candidate, candidate => candidate.formation)
    candidates: Candidate[];
}
