import { EntityRepository, Repository } from "typeorm";
import { PhaseProccessEnum } from "../enums/PhaseProccessEnum";
import { Candidate } from "../models/CandidateModel";
import { Proccess } from "../models/ProccessModel";

@EntityRepository(Proccess)
export class ProccessRepository extends Repository<Proccess> {
    async createProccess(proccess: Partial<Proccess>): Promise<Proccess> {
        const saveProccess = this.create(proccess);
        await this.save(saveProccess);

        return saveProccess;
    }

    async findLastProccess(): Promise<Proccess> {
        const proccess = await this.findOne({ order: { createDate: "DESC" } });
        return proccess!;
    }

    async findById(id: string): Promise<Proccess> {
        const proccess = await this.findOne({ where: { id: id } });
        return proccess!;
    }

    async advanceProccesById(id: string): Promise<Proccess> {
        const proccess = await this.findOne({ where: { id: id } });
        const phaseProccess: PhaseProccessEnum = proccess!.phaseProccess
        const nextPhaseProccess: PhaseProccessEnum = phaseProccess + 1;
        proccess!.phaseProccess = nextPhaseProccess;
        await this.save(proccess!);
        return proccess!;
    }
}