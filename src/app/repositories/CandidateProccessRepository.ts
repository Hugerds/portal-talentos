import { EntityRepository, Repository } from "typeorm";
import { Candidate } from "../models/CandidateModel";
import { CandidateProccess } from "../models/CandidateProccessModel";
import { Proccess } from "../models/ProccessModel";

@EntityRepository(CandidateProccess)
export class CandidateProccessRepository extends Repository<CandidateProccess> {
    async createCandidateProccess(candidateProccess: Partial<CandidateProccess>): Promise<CandidateProccess> {
        const saveProccessProccess = this.create(candidateProccess);
        await this.save(saveProccessProccess);

        return saveProccessProccess;
    }
}