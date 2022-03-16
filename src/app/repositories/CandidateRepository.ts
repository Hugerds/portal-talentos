import { EntityRepository, Repository } from "typeorm";
import { Candidate } from "../models/CandidateModel";

@EntityRepository(Candidate)
export class CandidateRepository extends Repository<Candidate>{
    async createCandidate(candidate: Partial<Candidate>): Promise<Candidate> {
        const saveCandidate = this.create(candidate);
        await this.save(saveCandidate);

        return saveCandidate;
    }

    async findAllCandidates(): Promise<Candidate[]> {
        const candidates = await this.find({ relations: ['address', 'skills', 'formation'] });
        return candidates;
    }

    async findLastCandidate(): Promise<Candidate> {
        const candidate = await this.findOne({ order: { createDate: "DESC" } });
        return candidate;
    }

    async findCandidatesList(): Promise<Candidate[]> {
        const candidates = await this.createQueryBuilder("candidate")
            .innerJoinAndSelect('candidate.skills', 'skills')
            .select(['candidate.id', 'candidate.code', 'candidate.name', 'candidate.email', 'candidate.tellphone', 'skills']).getMany();

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