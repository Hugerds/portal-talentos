import { getCustomRepository } from "typeorm";
import { Candidato } from "../models/CandidatoModel";
import { Cidade } from "../models/CidadeModel";
import { Estado } from "../models/EstadoModel";
import { CidadeRepository } from "../repositories/CidadeRepository";
import { EnderecoRepository } from "../repositories/EnderecoRepository";
import { EstadoRepository } from "../repositories/EstadoRepository";
import { CandidatoRepository } from "../repositories/CandidatoRepository";
import { HabilidadeRepository } from "../repositories/HabilidadeRepository";
import { CursoRepository } from "../repositories/CursoRepository";
import { InstituicaoRepository } from "../repositories/InstituicaoRepository";
import { Curso } from "../models/CursoModel";
import { Instituicao } from "../models/InstituicaoModel";
import { FormacaoRepository } from "../repositories/FormacaoRepository";
import { Empresa } from "../models/EmpresaModel";
import { EmpresaRepository } from "../repositories/EmpresaRepository";

export class EmpresaService {
    companyRepository = getCustomRepository(EmpresaRepository);
    stateRepository = getCustomRepository(EstadoRepository);
    cityRepository = getCustomRepository(CidadeRepository);
    addressRepository = getCustomRepository(EnderecoRepository);
    async createCompany(companyProps: Partial<Empresa>): Promise<Empresa> {
        try {
            const newDate = new Date();
            //Buscar o estado pela sigla e caso não exista criar um novo
            let state = await this.stateRepository.findbyUfSigla(companyProps.endereco.estado.ufSigla);
            if (!state) {
                state = new Estado();
                state.ufSigla = companyProps.endereco.estado.ufSigla;
                state.ufTexto = companyProps.endereco.estado.ufTexto;
                state.update_date = newDate;
                state = await this.stateRepository.createState(state);
            }
            //Buscar a cidade pela sigla e caso não exista criar uma nova relacionada ao estado
            let city = await this.cityRepository.findByName(companyProps.endereco.cidade.nome);
            if (!city) {
                city = new Cidade();
                city.nome = companyProps.endereco.cidade.nome;
                city.estado = state;
                city.update_date = newDate;
                city = await this.cityRepository.createCity(city);
            }
            //Atribuir e salvar estado e cidade no candidato e o endereço
            companyProps.endereco.estado = state;
            companyProps.endereco.cidade = city;
            companyProps.endereco.update_date = newDate;
            const address = await this.addressRepository.createAddress(companyProps.endereco);
            companyProps.endereco = address;
            const empresa = await this.companyRepository.createCompany(companyProps);
            return empresa;
        } catch (error) {
            console.log(error);
        }
    }
}