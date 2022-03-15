import { Cursor, getCustomRepository } from "typeorm";
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
    private _candidateRepository: CandidatoRepository;
    private _addressRepository: EnderecoRepository;
    private _stateRepository: EstadoRepository;
    private _skillRepository: HabilidadeRepository;
    private _cityRepository: CidadeRepository;
    private _courseRepository: CursoRepository;
    private _institutionRepository: InstituicaoRepository;
    private _formationRepository: FormacaoRepository;
    formationRepository() {
        this._candidateRepository = getCustomRepository(CandidatoRepository);
        this._addressRepository = getCustomRepository(EnderecoRepository);
        this._stateRepository = getCustomRepository(EstadoRepository);
        this._skillRepository = getCustomRepository(HabilidadeRepository);
        this._cityRepository = getCustomRepository(CidadeRepository);
        this._courseRepository = getCustomRepository(CursoRepository);
        this._institutionRepository = getCustomRepository(InstituicaoRepository);
        this._formationRepository = getCustomRepository(FormacaoRepository);
    }
    async createCandidate(candidateProps: Partial<Candidato>): Promise<Candidato> {
        try {
            const newDate = new Date();
            // candidateProps.data_nascimento = new Date(candidateProps.data_nascimento.toLocaleDateString('pt-BR'));
            const lastCandidate = await this._candidateRepository.findLastCandidate();
            //Soma no código do candidato para cada cadastro
            candidateProps.code = !lastCandidate ? 0 : lastCandidate.code + 1;
            //Buscar o estado pela sigla e caso não exista criar um novo
            let state = await this._stateRepository.findbyUfSigla(candidateProps.endereco.estado.ufSigla);
            if (!state) {
                state = new Estado();
                state.ufSigla = candidateProps.endereco.estado.ufSigla;
                state.ufTexto = candidateProps.endereco.estado.ufTexto;
                state.update_date = newDate;
                state = await this._stateRepository.createState(state);
            }
            //Buscar a cidade pela sigla e caso não exista criar uma nova relacionada ao estado
            let city = await this._cityRepository.findByName(candidateProps.endereco.cidade.nome);
            if (!city) {
                city = new Cidade();
                city.nome = candidateProps.endereco.cidade.nome;
                city.estado = state;
                city.update_date = newDate;
                city = await this._cityRepository.createCity(city);
            }
            //Atribuir e salvar estado e cidade no candidato e o endereço
            candidateProps.endereco.estado = state;
            candidateProps.endereco.cidade = city;
            candidateProps.endereco.update_date = newDate;
            const address = await this._addressRepository.createAddress(candidateProps.endereco);
            candidateProps.endereco = address;
            //Itera nas habilidades enviadas e procura, caso não encontre cria uma nova
            for (const element in candidateProps.habilidades) {
                if (!await this._skillRepository.findByDescription(candidateProps.habilidades[element].descricao))
                    candidateProps.habilidades[element] = await this._skillRepository.createSkill(candidateProps.habilidades[element]);
            }
            //Buscar o curso pela descrição e caso não exista cria um novo relacionado ao candidato
            let course = await this._courseRepository.findByName(candidateProps.formacao.curso.nome);
            if (!course) {
                course = new Curso();
                course.nome = candidateProps.formacao.curso.nome;
                course.descricao = candidateProps.formacao.curso.descricao;
                course = await this._courseRepository.createCourse(candidateProps.formacao.curso);
            }
            //Buscar a instituição pela descrição e caso não exista cria um novo relacionado ao candidato
            let institution = await this._institutionRepository.findByName(candidateProps.formacao.instituicao.nome);
            if (!institution) {
                institution = new Instituicao();
                institution.nome = candidateProps.formacao.instituicao.nome;
                institution.descricao = candidateProps.formacao.instituicao.descricao;
                institution = await this._institutionRepository.createInstitution(candidateProps.formacao.instituicao);
            }
            //Atribuir e salvar formação com instituição e cursos relacionados
            candidateProps.formacao.curso = course;
            candidateProps.formacao.instituicao = institution;
            candidateProps.formacao = await this._formationRepository.createFormation(candidateProps.formacao);
            const newCandidate = await this._candidateRepository.createCandidate(candidateProps);
            return newCandidate;
        } catch (error) {
            console.log(error);
        }
    }

    async findAllCandidates(): Promise<Candidato[]> {
        const candidates = await this._candidateRepository.findAllCandidates();

        return candidates;
    }

    async findCandidatesList(): Promise<Candidato[]> {
        const candidates = await this._candidateRepository.findCandidatesList();

        return candidates;
    }
}