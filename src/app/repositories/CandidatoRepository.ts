import { EntityRepository, Repository } from "typeorm";
import { Candidato } from "../models/CandidatoModel";

@EntityRepository(Candidato)
export class CandidatoRepository extends Repository<Candidato>{
    async createCandidate(candidato: Partial<Candidato>): Promise<Candidato> {
        const saveCandidato = this.create(candidato);
        await this.save(saveCandidato);

        return saveCandidato;
    }

    async findAllCandidates(): Promise<Candidato[]> {
        const candidates = await this.find({ relations: ['endereco', 'habilidades', 'formacao'] });
        return candidates;
    }

    async findLastCandidate(): Promise<Candidato> {
        const candidate = await this.findOne({ order: { create_date: "DESC" } });
        return candidate;
    }

    async findCandidatesList(): Promise<Candidato[]> {
        const candidates = await this.createQueryBuilder("candidato")
            .innerJoinAndSelect('candidato.habilidades', 'habilidades')
            .select(['candidato.id', 'candidato.code', 'candidato.name', 'candidato.email', 'candidato.telefone', 'habilidades']).getMany();

        return candidates;
    }

    async findCandidateByEmail(email: string): Promise<boolean> {
        try {
            const candidate = await this.findOne({ where: { email: email } });
            if (!candidate)
                return false;
            return true;
        } catch {
            return false;
        }
    }
}