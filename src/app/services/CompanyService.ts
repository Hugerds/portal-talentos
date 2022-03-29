import { getCustomRepository } from "typeorm";
import { Candidate } from "../models/CandidateModel";
import { City } from "../models/CityModel";
import { State } from "../models/StateModel";
import { CityRepository } from "../repositories/CityRepository";
import { AddressRepository } from "../repositories/AddressRepository";
import { StateRepository } from "../repositories/StateRepository";
import { CandidateRepository } from "../repositories/CandidateRepository";
import { SkillRepository } from "../repositories/SkillRepository";
import { CourseRepository } from "../repositories/CourseRepository";
import { InstitutionRepository } from "../repositories/InstitutionRepository";
import { Course } from "../models/CourseModel";
import { Institution } from "../models/InstitutionModel";
import { FormationRepository } from "../repositories/FormationRepository";
import { Company } from "../models/CompanyModel";
import { CompanyRepository } from "../repositories/CompanyRepository";
import { BadRequestException } from "../../errors/BadRequestException";

export class CompanyService {
    companyRepository = getCustomRepository(CompanyRepository);
    stateRepository = getCustomRepository(StateRepository);
    cityRepository = getCustomRepository(CityRepository);
    addressRepository = getCustomRepository(AddressRepository);
    async createCompany(companyProps: Partial<Company>): Promise<Company> {
        try {
            const company = new Company(companyProps);
            const validationResult = company.validateForInsert();
            validationResult.throwIfInvalid();
            const newDate = new Date();
            //Buscar o state pela sigla e caso não exista criar um novo
            let state = await this.stateRepository.findbyUfSigla(companyProps.address!.state.stateAbbreviation);
            if (!state) {
                state = new State();
                state.stateAbbreviation = companyProps.address!.state.stateAbbreviation;
                state.stateName = companyProps.address!.state.stateName;
                state.updateDate = newDate;
                state = await this.stateRepository.createState(state);
            }
            //Buscar a city pela sigla e caso não exista criar uma nova relacionada ao state
            let city = await this.cityRepository.findByName(companyProps.address!.city.name);
            if (!city) {
                city = new City();
                city.name = companyProps.address!.city.name;
                city.state = state;
                city.updateDate = newDate;
                city = await this.cityRepository.createCity(city);
            }
            //Atribuir e salvar state e city no candidate e o endereço
            companyProps.address!.state = state;
            companyProps.address!.city = city;
            companyProps.address!.updateDate = newDate;
            const address = await this.addressRepository.createAddress(companyProps.address!);
            companyProps.address = address;
            const cratedCompany = await this.companyRepository.createCompany(companyProps);
            return cratedCompany;
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Não foi possível criar a empresa");
        }
    }
}