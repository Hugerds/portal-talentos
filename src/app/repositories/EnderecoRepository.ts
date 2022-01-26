import { EntityRepository, Repository } from "typeorm";
import { Candidato } from "../models/CandidatoModel";
import { Endereco } from "../models/EnderecoModel";

@EntityRepository(Endereco)
export class EnderecoRepository extends Repository<Endereco>{
    async createAddress(address: Partial<Endereco>) : Promise<Endereco> 
	{
        const saveAddress = this.create(address);
		await this.save(saveAddress);
		
		return saveAddress;
	}

    async findAllAddresses() : Promise<Endereco[]> {
        const addresses = await this.find();
        return addresses;
    }
}