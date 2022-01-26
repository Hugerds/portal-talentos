import { EntityRepository, Repository } from "typeorm";
import { Candidato } from "../models/CandidatoModel";

@EntityRepository(Candidato)
export class CandidatoRepository extends Repository<Candidato>{
    async createCandidate(candidato: Partial<Candidato>) : Promise<Candidato> 
	{
        const saveCandidato = this.create(candidato);
		await this.save(saveCandidato);
		
		return saveCandidato;
	}

    async findAllCandidates() : Promise<Candidato[]> {
        const candidates = await this.find();
        return candidates;
    }

    async findLastCandidate() : Promise<Candidato> {
        const candidate = await this.findOne({order: {create_date: "DESC"}});
        return candidate;
    }
}