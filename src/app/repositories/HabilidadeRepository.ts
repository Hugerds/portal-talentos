import { EntityRepository, Repository } from "typeorm";
import { Candidato } from "../models/CandidatoModel";
import { Habilidade } from "../models/HabilidadeModel";

@EntityRepository(Habilidade)
export class HabilidadeRepository extends Repository<Habilidade>{
    async createSkill(skill: Partial<Habilidade>) : Promise<Habilidade> {
        const saveSkill = this.create(skill);
		await this.save(saveSkill);
		
		return saveSkill;
	}

    async findAllSkills() : Promise<Habilidade[]> {
        const skills = await this.find();
        return skills;
    }

    async findByDescription(description: string) : Promise<Habilidade> {
        const skill = await this.findOne({where: {descricao: description}});
        return skill;
    }
}