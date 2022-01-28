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

export class CandidatoService {
	candidateRepository = getCustomRepository(CandidatoRepository);
	addressRepository = getCustomRepository(EnderecoRepository);
	stateRepository = getCustomRepository(EstadoRepository);
	skillRepository = getCustomRepository(HabilidadeRepository);
	cityRepository = getCustomRepository(CidadeRepository);
	courseRepository = getCustomRepository(CursoRepository);
	instituicaoRepository = getCustomRepository(InstituicaoRepository);
	formationRepository = getCustomRepository(FormacaoRepository);
    async createCandidate(candidateProps: Partial<Candidato>) : Promise<Candidato> {
        try {
            const lastCandidate = await this.candidateRepository.findLastCandidate();
            //Soma no código do candidato para cada cadastro
            candidateProps.code =  !lastCandidate ? 0 : lastCandidate.code + 1;
            //Buscar o estado pela sigla e caso não exista criar um novo
            let state = await this.stateRepository.findbyUfSigla(candidateProps.endereco.estado.ufSigla);
            if(!state) {
                state = new Estado();
                state.ufSigla = candidateProps.endereco.estado.ufSigla;
                state.ufTexto = candidateProps.endereco.estado.ufTexto;
                state.update_date = new Date();
                state = await this.stateRepository.createState(state);
            }
            //Buscar a cidade pela sigla e caso não exista criar uma nova relacionada ao estado
            let city = await this.cityRepository.findByName(candidateProps.endereco.cidade.nome);
            if(!city) {
                city = new Cidade();
                city.nome = candidateProps.endereco.cidade.nome;
                city.estado = state;
                city.update_date = new Date();
                city = await this.cityRepository.createCity(city);
            }
            //Atribuir e salvar estado e cidade no candidato e o endereço
            candidateProps.endereco.estado = state;
            candidateProps.endereco.cidade = city;
            candidateProps.endereco.update_date = new Date();
            const address = await this.addressRepository.createAddress(candidateProps.endereco);
            candidateProps.endereco = address;
            //Itera nas habilidades enviadas e procura, caso não encontre cria uma nova
            for (const element in candidateProps.habilidades) {
                if(!await this.skillRepository.findByDescription(candidateProps.habilidades[element].descricao)) 
                    candidateProps.habilidades[element] = await this.skillRepository.createSkill(candidateProps.habilidades[element]);
            }
            //Buscar o curso pela descrição e caso não exista cria um novo relacionado ao candidato
            let course = await this.courseRepository.findByName(candidateProps.formacao.curso.nome);
            if(!course) {
                course = new Curso();
                course.nome = candidateProps.formacao.curso.nome;
                course.descricao = candidateProps.formacao.curso.descricao;
                course = await this.courseRepository.createCourse(candidateProps.formacao.curso);
            }
            //Buscar a instituição pela descrição e caso não exista cria um novo relacionado ao candidato
            let institution = await this.instituicaoRepository.findByName(candidateProps.formacao.instituicao.nome);
            if(!institution) {
                institution = new Instituicao();
                institution.nome = candidateProps.formacao.instituicao.nome;
                institution.descricao = candidateProps.formacao.instituicao.descricao;
                institution = await this.instituicaoRepository.createInstitution(candidateProps.formacao.instituicao);
            }
            //Atribuir e salvar formação com instituição e cursos relacionados
            candidateProps.formacao.curso = course;
            candidateProps.formacao.instituicao = institution;
            candidateProps.formacao = await this.formationRepository.createFormation(candidateProps.formacao);
            const newCandidate = await this.candidateRepository.createCandidate(candidateProps);
            return newCandidate;
        } catch (error) {
            console.log(error);
        }
    }

    async findAllCandidates() : Promise<Candidato[]> {
        const candidates = await this.candidateRepository.findAllCandidates();

        return candidates;
    }

    async findCandidatesList() : Promise<Candidato[]> {
        const candidates = await this.candidateRepository.findCandidatesList();

        return candidates;
    }
}