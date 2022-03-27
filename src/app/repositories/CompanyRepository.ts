import { EntityRepository, Repository } from "typeorm";
import { Candidate } from "../models/CandidateModel";
import { Course } from "../models/CourseModel";
import { Company } from "../models/CompanyModel";
import { Skill } from "../models/SkillModel";
import { NotFoundException } from "../../errors/NotFoundException";

@EntityRepository(Company)
export class CompanyRepository extends Repository<Company>{
    async createCompany(company: Partial<Company>): Promise<Company> {
        const saveCompany = this.create(company);
        await this.save(saveCompany);

        return saveCompany;
    }

    async findCompanyById(id: string): Promise<Company> {
        const company = await this.findOne({ where: { id: id } });
        return company!;
    }
}