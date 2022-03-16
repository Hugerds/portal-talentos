import { EntityRepository, Repository } from "typeorm";
import { Candidate } from "../models/CandidateModel";
import { Course } from "../models/CourseModel";
import { Formation } from "../models/FormationModel";
import { Skill } from "../models/SkillModel";
import { Institution } from "../models/InstitutionModel";

@EntityRepository(Institution)
export class InstitutionRepository extends Repository<Institution>{
    async createInstitution(institution: Partial<Institution>): Promise<Institution> {
        const saveInstitution = this.create(institution);
        await this.save(saveInstitution);

        return saveInstitution;
    }

    async findAllInstitutions(): Promise<Institution[]> {
        const institutions = await this.find();
        return institutions;
    }

    async findByName(name: string): Promise<Institution> {
        const institution = await this.findOne({ where: { name: name } });
        return institution;
    }
}