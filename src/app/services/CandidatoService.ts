import { getCustomRepository } from "typeorm";
import { print } from "util";
import { Candidato } from "../models/CandidatoModel";
import { Cidade } from "../models/CidadeModel";
import { Estado } from "../models/EstadoModel";
import { CidadeRepository } from "../repositories/CidadeRepository";
import { EnderecoRepository } from "../repositories/EnderecoRepository";
import { EstadoRepository } from "../repositories/EstadoRepository";
import { CandidatoRepository } from "../repositories/CandidatoRepository";

export class CandidatoService {
	candidateRepository = getCustomRepository(CandidatoRepository);
	addressRepository = getCustomRepository(EnderecoRepository);
	stateRepository = getCustomRepository(EstadoRepository);
	cityRepository = getCustomRepository(CidadeRepository);
    async createCandidate(candidateProps: Partial<Candidato>) : Promise<Candidato> {
        try {
            const lastCandidate = await this.candidateRepository.findLastCandidate();
            //Soma no código do candidato para cada cadastro
            candidateProps.code =  !lastCandidate ? 0 : lastCandidate.code + 1;
            //Buscar o estado pela sigla e caso não exista criar um novo
            let state = await this.stateRepository.findbyUfSigla(candidateProps.endereco.estado.ufSigla);
            if(!state) {
                const newState = new Estado();
                newState.ufSigla = candidateProps.endereco.estado.ufSigla;
                newState.ufTexto = candidateProps.endereco.estado.ufTexto;
                state = newState;
            }
            state = await this.stateRepository.createState(state);
            //Buscar a cidade pela sigla e caso não exista criar uma nova relacionada ao estado
            let city = await this.cityRepository.findByName(candidateProps.endereco.cidade.nome);
            if(!city) {
                const newCity = new Cidade();
                newCity.nome = candidateProps.endereco.cidade.nome;
                newCity.estado = state;
                city = newCity;
            }
            city = await this.cityRepository.createCity(city);
            //Atribuir e salvar o endereço com as informações da API depois de estado e cidade estarem criados
            const address = candidateProps.endereco;
            // await this.addressRepository.createAddress(address);
            const newCandidate = await this.candidateRepository.createCandidate(candidateProps);
            return newCandidate;
            
        } catch (error) {
            console.log(error);
        }
    }
}