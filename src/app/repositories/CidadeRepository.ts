import { EntityRepository, Repository } from "typeorm";
import { Candidato } from "../models/CandidatoModel";
import { Cidade } from "../models/CidadeModel";
import { Endereco } from "../models/EnderecoModel";
import { Estado } from "../models/EstadoModel";

@EntityRepository(Cidade)
export class CidadeRepository extends Repository<Cidade>{
    async createCity(city: Partial<Cidade>) : Promise<Cidade> 
	{
        const saveCity = this.create(city);
		await this.save(saveCity);
		
		return saveCity;
	}

    async findAllCities() : Promise<Cidade[]> {
        const cityies = await this.find();
        
        return cityies;
    }

    async findByName(nameCity: string) : Promise<Cidade> {
        const city = await this.findOne({where: {nome: nameCity}});

        return city;
    }
}