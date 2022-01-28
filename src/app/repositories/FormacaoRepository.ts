import { EntityRepository, Repository } from "typeorm";
import { Candidato } from "../models/CandidatoModel";
import { Curso } from "../models/CursoModel";
import { Formacao } from "../models/FormacaoModel";
import { Habilidade } from "../models/HabilidadeModel";
import { Instituicao } from "../models/InstituicaoModel";

@EntityRepository(Formacao)
export class FormacaoRepository extends Repository<Formacao>{
    async createFormation(formation: Partial<Formacao>) : Promise<Formacao> {
        const saveFormation = this.create(formation);
		await this.save(saveFormation);
		
		return saveFormation;
	}

    async findAllFormations() : Promise<Formacao[]> {
        const formations = await this.find();
        return formations;
    }
}