import { Proccess } from "../models/ProccessModel";
import { BadRequestException } from "../../errors/BadRequestException";
import { CreateProccessViewModel } from "../viewModels/CreateProccessViewModel";
import { PhaseProccessEnum } from "../enums/PhaseProccessEnum";
import { ProccessRepository } from "../repositories/ProccessRepository";
import { getCustomRepository } from "typeorm";
import { CandidateRepository } from "../repositories/CandidateRepository";
import { CompanyRepository } from "../repositories/CompanyRepository";
import { CandidateProccess } from "../models/CandidateProccessModel";
import { v4 as uuidv4 } from 'uuid';
import { CandidateProccessRepository } from "../repositories/CandidateProccessRepository";
import { UpdateProccessViewModel } from "../viewModels/UpdateProccessViewModel";
import { AddCandidateOnProccess } from "../viewModels/AddCandidateOnProccessViewModel";
import { NotFoundException } from "../../errors/NotFoundException";
import { Candidate } from "../models/CandidateModel";
import { ErrorBase, ErrorBaseDTO } from "../models/ErrorBaseModel";
export class ProccessService {
    private _proccessRepository: ProccessRepository;
    private _candidateRepository: CandidateRepository;
    private _companyRepository: CompanyRepository;
    private _candidateProccessRepository: CandidateProccessRepository;
    constructor() {
        this._proccessRepository = getCustomRepository(ProccessRepository);
        this._candidateRepository = getCustomRepository(CandidateRepository);
        this._companyRepository = getCustomRepository(CompanyRepository);
        this._candidateProccessRepository = getCustomRepository(CandidateProccessRepository);
    }

    async createProccess(proccessProps: Partial<CreateProccessViewModel>): Promise<Proccess> {
        try {
            const createProccessViewModel = new CreateProccessViewModel(proccessProps);
            const validationResult = createProccessViewModel.validateForInsert();
            validationResult.throwIfInvalid();
            const temCandidato: boolean = !proccessProps.candidateId;
            const proccess: Proccess = new Proccess();
            proccess.id = uuidv4();
            proccess.phaseProccess = PhaseProccessEnum.PHASE_PROCCESS_PENDING;
            const lastProccess = await this._proccessRepository.findLastProccess();
            //Soma no c??digo do candidato para cada cadastro
            proccess.code = !lastProccess ? 0 : lastProccess.code + 1;
            const candidateProccess: CandidateProccess = new CandidateProccess();
            const company = await this._companyRepository.findCompanyById(proccessProps.companyId!);
            if (!company)
                throw new BadRequestException("Empresa n??o encontrada");
            proccess.company = company;
            const saveProccess = await this._proccessRepository.createProccess(proccess);
            if (!temCandidato) {
                const candidate = await this._candidateRepository.findById(proccessProps.candidateId!);
                if (!candidate)
                    throw new BadRequestException("Candidato n??o encontrado");
                candidateProccess.candidate = candidate;
                candidateProccess.proccess = proccess;
                candidateProccess.phaseProccess = proccess.phaseProccess;
                await this._candidateProccessRepository.createCandidateProccess(candidateProccess);
            }
            return saveProccess;
        } catch (error) {
            console.log(error);
            throw new BadRequestException("N??o foi poss??vel criar o processo");
        }
    }

    async advancePhase(proccessProps: Partial<UpdateProccessViewModel>): Promise<Proccess> {
        try {
            const createProccessViewModel = new UpdateProccessViewModel(proccessProps);
            const validationResult = createProccessViewModel.validateForInsert();
            validationResult.throwIfInvalid();
            const temCandidato: boolean = !proccessProps.candidateId;
            const proccess = await this._proccessRepository.findById(proccessProps.proccessId!);
            if (!proccess)
                throw new BadRequestException("Processo n??o encontrado");
            if (!temCandidato) {
                if (proccess.candidateProccess.candidate.id !== proccessProps.candidateId)
                    throw new BadRequestException("O candidato n??o pertence ao processo");
                await this._candidateProccessRepository.updateCandidateProccessByProccessIdAndCandidateId(proccess.id, proccess.candidateProccess.candidate.id, proccess.phaseProccess!);
            } else {
                console.log("Aqui");
                await this._proccessRepository.advanceProccesById(proccess.id);
                await this._candidateProccessRepository.updateCandidateProccessByProccessId(proccess.id);
                // await this._candidateProccessRepository.updateCandidateProccessByProccessId(proccess.id, proccess.phaseProccess!);
            }
            const newProccess = await this._proccessRepository.findById(proccessProps.proccessId!);
            return newProccess;
        } catch (error) {
            console.log(error);
            throw new BadRequestException("N??o foi poss??vel avan??ar o processo");
        }
    }

    async addCandidateOnProccess(addCandidateOnProccessProps: Partial<AddCandidateOnProccess>): Promise<CandidateProccess> {
        try {
            const createProccessViewModel = new AddCandidateOnProccess(addCandidateOnProccessProps);
            const validationResult = createProccessViewModel.validateForInsert();
            validationResult.throwIfInvalid();
            const proccess = await this._proccessRepository.findById(addCandidateOnProccessProps.proccessId!);
            if (!proccess)
                throw new NotFoundException("Processo n??o encontrado");
            const candidate = await this._candidateRepository.findById(addCandidateOnProccessProps.candidateId!);
            if (!candidate)
                throw new NotFoundException("Candidato n??o encontrado");
            const candidateProccess: CandidateProccess = new CandidateProccess();
            candidateProccess.candidate = candidate;
            candidateProccess.proccess = proccess;
            return await this._candidateProccessRepository.createCandidateProccess(candidateProccess);
        } catch (error) {
            console.log(error);
            throw new BadRequestException("N??o foi poss??vel incluir o candidato ao processo");
        }
    }
}