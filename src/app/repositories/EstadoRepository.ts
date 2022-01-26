import { EntityRepository, Repository } from "typeorm";
import { print } from "util";
import { Candidato } from "../models/CandidatoModel";
import { Endereco } from "../models/EnderecoModel";
import { Estado } from "../models/EstadoModel";

@EntityRepository(Estado)
export class EstadoRepository extends Repository<Estado>{
    async createState(state: Partial<Estado>) : Promise<Estado> 
	{
        const saveState = this.create(state);
		await this.save(saveState);
		
		return saveState;
	}

    async findAllstatees() : Promise<Estado[]> {
        const states = await this.find();
        return states;
    }

    async findbyUfSigla(ufSigla: string) : Promise<Estado> {
        const state = await this.findOne({where: {ufSigla: ufSigla}});
        return state;
    }
}