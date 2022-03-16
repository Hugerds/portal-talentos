import { EntityRepository, Repository } from "typeorm";
import { Candidate } from "../models/CandidateModel";
import { City } from "../models/CityModel";
import { Address } from "../models/AddressModel";
import { State } from "../models/StateModel";

@EntityRepository(City)
export class CityRepository extends Repository<City>{
    async createCity(city: Partial<City>): Promise<City> {
        const saveCity = this.create(city);
        await this.save(saveCity);

        return saveCity;
    }

    async findAllCities(): Promise<City[]> {
        const cityies = await this.find();

        return cityies;
    }

    async findByName(nameCity: string): Promise<City> {
        const city = await this.findOne({ where: { name: nameCity } });

        return city;
    }
}