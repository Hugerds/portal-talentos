import { EntityRepository, Repository } from "typeorm";
import { Candidate } from "../models/CandidateModel";
import { Skill } from "../models/SkillModel";

@EntityRepository(Skill)
export class SkillRepository extends Repository<Skill>{
    async createSkill(skill: Partial<Skill>): Promise<Skill> {
        const saveSkill = this.create(skill);
        await this.save(saveSkill);

        return saveSkill;
    }

    async findAllSkills(): Promise<Skill[]> {
        const skills = await this.find();
        return skills;
    }

    async findByDescription(description: string): Promise<Skill> {
        const skill = await this.findOne({ where: { description: description } });
        return skill;
    }
}