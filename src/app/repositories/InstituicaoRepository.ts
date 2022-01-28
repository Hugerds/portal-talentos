import { EntityRepository, Repository } from "typeorm";
import { Candidato } from "../models/CandidatoModel";
import { Curso } from "../models/CursoModel";
import { Formacao } from "../models/FormacaoModel";
import { Habilidade } from "../models/HabilidadeModel";
import { Instituicao } from "../models/InstituicaoModel";

@EntityRepository(Instituicao)
export class InstituicaoRepository extends Repository<Instituicao>{
    async createInstitution(institution: Partial<Instituicao>) : Promise<Instituicao> {
        const saveInstitution = this.create(institution);
		await this.save(saveInstitution);
		
		return saveInstitution;
	}

    async findAllInstitutions() : Promise<Instituicao[]> {
        const institutions = await this.find();
        return institutions;
    }

    async findByName(name: string) : Promise<Instituicao> {
        const institution = await this.findOne({where: {nome: name}});
        return institution;
    }
}