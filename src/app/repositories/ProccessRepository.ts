import { EntityRepository, Repository } from "typeorm";
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
}