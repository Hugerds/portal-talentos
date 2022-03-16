import { EntityRepository, Repository } from "typeorm";
import { Candidate } from "../models/CandidateModel";
import { Course } from "../models/CourseModel";
import { Skill } from "../models/SkillModel";

@EntityRepository(Course)
export class CourseRepository extends Repository<Course>{
    async createCourse(course: Partial<Course>): Promise<Course> {
        const saveCourse = this.create(course);
        await this.save(saveCourse);

        return saveCourse;
    }

    async findAllCourses(): Promise<Course[]> {
        const courses = await this.find();
        return courses;
    }

    async findByName(name: string): Promise<Course> {
        const course = await this.findOne({ where: { name: name } });
        return course;
    }
}