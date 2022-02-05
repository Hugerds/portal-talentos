import { EntityRepository, Repository } from "typeorm";
import { Candidato } from "../models/CandidatoModel";
import { Curso } from "../models/CursoModel";
import { Empresa } from "../models/EmpresaModel";
import { Habilidade } from "../models/HabilidadeModel";

@EntityRepository(Empresa)
export class EmpresaRepository extends Repository<Empresa>{
    async createCompany(company: Partial<Empresa>): Promise<Empresa> {
        const saveCompany = this.create(company);
        await this.save(saveCompany);

        return saveCompany;
    }
}