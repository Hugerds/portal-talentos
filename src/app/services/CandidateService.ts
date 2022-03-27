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
import { BadRequestException } from "../../errors/BadRequestException";

export class CandidateService {
    private _candidateRepository: CandidateRepository;
    private _addressRepository: AddressRepository;
    private _stateRepository: StateRepository;
    private _skillRepository: SkillRepository;
    private _cityRepository: CityRepository;
    private _courseRepository: CourseRepository;
    private _institutionRepository: InstitutionRepository;
    private _formationRepository: FormationRepository;
    constructor() {
        this._candidateRepository = getCustomRepository(CandidateRepository);
        this._addressRepository = getCustomRepository(AddressRepository);
        this._stateRepository = getCustomRepository(StateRepository);
        this._skillRepository = getCustomRepository(SkillRepository);
        this._cityRepository = getCustomRepository(CityRepository);
        this._courseRepository = getCustomRepository(CourseRepository);
        this._institutionRepository = getCustomRepository(InstitutionRepository);
        this._formationRepository = getCustomRepository(FormationRepository);
    }
    async createCandidate(candidateProps: Partial<Candidate>): Promise<Candidate> {
        try {
            const candidate = new Candidate(candidateProps);
            const validationResult = candidate.validateForInsert();
            validationResult.throwIfInvalid();
            const newDate = new Date();
            // candidateProps.birthDate = new Date(candidateProps.birthDate.toLocaleDateString('pt-BR'));
            const lastCandidate = await this._candidateRepository.findLastCandidate();
            //Soma no código do candidato para cada cadastro
            candidateProps.code = !lastCandidate ? 0 : lastCandidate.code + 1;
            //Buscar o state pela sigla e caso não exista criar um novo
            let state = await this._stateRepository.findbyUfSigla(candidateProps.address!.state.stateAbbreviation);
            if (!state) {
                state = new State();
                state.stateAbbreviation = candidateProps.address!.state.stateAbbreviation;
                state.stateName = candidateProps.address!.state.stateName;
                state.updateDate = newDate;
                state = await this._stateRepository.createState(state);
            }
            //Buscar a city pela sigla e caso não exista criar uma nova relacionada ao state
            let city = await this._cityRepository.findByName(candidateProps.address!.city.name);
            if (!city) {
                city = new City();
                city.name = candidateProps.address!.city.name;
                city.state = state;
                city.updateDate = newDate;
                city = await this._cityRepository.createCity(city);
            }
            //Atribuir e salvar state e city no candidato e o endereço
            candidateProps.address!.state = state;
            candidateProps.address!.city = city;
            candidateProps.address!.updateDate = newDate;
            const address = await this._addressRepository.createAddress(candidateProps.address!);
            candidateProps.address = address;
            //Itera nas skills enviadas e procura, caso não encontre cria uma nova
            for (const element in candidateProps.skills) {
                if (!await this._skillRepository.findByDescription(candidateProps.skills[element].description))
                    candidateProps.skills[element] = await this._skillRepository.createSkill(candidateProps.skills[element]);
            }
            //Buscar o course pela descrição e caso não exista cria um novo relacionado ao candidato
            let course = await this._courseRepository.findByName(candidateProps.formation.course.name);
            if (!course) {
                course = new Course();
                course.name = candidateProps.formation!.course.name;
                course.description = candidateProps.formation!.course.description;
                course = await this._courseRepository.createCourse(candidateProps.formation!.course);
            }
            //Buscar a instituição pela descrição e caso não exista cria um novo relacionado ao candidato
            let institution = await this._institutionRepository.findByName(candidateProps.formation!.institution.name);
            if (!institution) {
                institution = new Institution();
                institution.name = candidateProps.formation!.institution.name;
                institution.description = candidateProps.formation!.institution.description;
                institution = await this._institutionRepository.createInstitution(candidateProps.formation!.institution);
            }
            //Atribuir e salvar formação com instituição e courses relacionados
            candidateProps.formation!.course = course;
            candidateProps.formation!.institution = institution;
            candidateProps.formation = await this._formationRepository.createFormation(candidateProps.formation!);
            const newCandidate = await this._candidateRepository.createCandidate(candidateProps);
            return newCandidate;
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Não foi possível criar o candidato");
        }
    }

    async findAllCandidates(): Promise<Candidate[]> {
        const candidates = await this._candidateRepository.findAllCandidates();

        return candidates;
    }

    async findCandidatesList(): Promise<Candidate[]> {
        const candidates = await this._candidateRepository.findCandidatesList();

        return candidates;
    }
}