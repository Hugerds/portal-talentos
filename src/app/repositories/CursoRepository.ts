import { EntityRepository, Repository } from "typeorm";
import { Candidato } from "../models/CandidatoModel";
import { Curso } from "../models/CursoModel";
import { Habilidade } from "../models/HabilidadeModel";

@EntityRepository(Curso)
export class CursoRepository extends Repository<Curso>{
    async createCourse(course: Partial<Curso>) : Promise<Curso> {
        const saveCourse = this.create(course);
		await this.save(saveCourse);
		
		return saveCourse;
	}

    async findAllCourses() : Promise<Curso[]> {
        const courses = await this.find();
        return courses;
    }

    async findByName(name: string) : Promise<Curso> {
        const course = await this.findOne({where: {nome: name}});
        return course;
    }
}