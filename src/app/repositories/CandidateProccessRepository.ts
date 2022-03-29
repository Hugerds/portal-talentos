import { EntityRepository, Repository } from "typeorm";
import { BadRequestException } from "../../errors/BadRequestException";
import { PhaseProccessEnum } from "../enums/PhaseProccessEnum";
import { Candidate } from "../models/CandidateModel";
import { CandidateProccess } from "../models/CandidateProccessModel";
import { Proccess } from "../models/ProccessModel";

@EntityRepository(CandidateProccess)
export class CandidateProccessRepository extends Repository<CandidateProccess> {

    async createCandidateProccess(candidateProccess: Partial<CandidateProccess>): Promise<CandidateProccess> {
        const saveCandidateProccess = this.create(candidateProccess);
        await this.save(saveCandidateProccess);
        return saveCandidateProccess;
    }

    async updateCandidateProccessByProccessId(proccessId: string): Promise<boolean> {
        try {
            const candidateProccessToUpdate = await this.find({ where: { proccessId: proccessId } });
            for (const candidateProccess in candidateProccessToUpdate) {
                const nextPhaseProccess: PhaseProccessEnum = candidateProccessToUpdate[candidateProccess].phaseProccess + 1;
                candidateProccessToUpdate[candidateProccess].phaseProccess = nextPhaseProccess;
                await this.save(candidateProccessToUpdate);
            }
            return true;
        } catch {
            return false;
        }
    }

    async updateCandidateProccessByProccessIdAndCandidateId(proccessId: string, candidateId: string, phaseProccess: PhaseProccessEnum): Promise<boolean> {
        try {
            const candidateProccessToUpdate = await this.findOne({ where: { proccessId: proccessId, candidateId: candidateId } });
            if (!candidateProccessToUpdate) throw new BadRequestException("Processo do candidato não encontrado");
            candidateProccessToUpdate.phaseProccess = candidateProccessToUpdate.phaseProccess + 1;
            await this.save(candidateProccessToUpdate);
            return true;
        } catch {
            return false;
        }
    }
}