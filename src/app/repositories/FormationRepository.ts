import { EntityRepository, Repository } from "typeorm";
import { Candidate } from "../models/CandidateModel";
import { Course } from "../models/CourseModel";
import { Formation } from "../models/FormationModel";
import { Skill } from "../models/SkillModel";
import { Institution } from "../models/InstitutionModel";

@EntityRepository(Formation)
export class FormationRepository extends Repository<Formation>{
    async createFormation(formation: Partial<Formation>): Promise<Formation> {
        const saveFormation = this.create(formation);
        await this.save(saveFormation);

        return saveFormation;
    }

    async findAllFormations(): Promise<Formation[]> {
        const formations = await this.find();
        return formations;
    }
}