import { EntityRepository, Repository } from "typeorm";
import { Candidate } from "../models/CandidateModel";
import { Course } from "../models/CourseModel";
import { Company } from "../models/CompanyModel";
import { Skill } from "../models/SkillModel";

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company>{
    async createCompany(company: Partial<Company>): Promise<Company> {
        const saveCompany = this.create(company);
        await this.save(saveCompany);

        return saveCompany;
    }
}