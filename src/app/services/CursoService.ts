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

export class CursoService {
	candidateRepository = getCustomRepository(CandidatoRepository);
	addressRepository = getCustomRepository(EnderecoRepository);
	stateRepository = getCustomRepository(EstadoRepository);
	skillRepository = getCustomRepository(HabilidadeRepository);
	cityRepository = getCustomRepository(CidadeRepository);
	courseRepository = getCustomRepository(CursoRepository);
	instituicaoRepository = getCustomRepository(InstituicaoRepository);
	formationRepository = getCustomRepository(FormacaoRepository);
    async createCurso(cursoProps: Partial<Curso>) : Promise<Curso> {
        try {
            cursoProps.update_date = new Date();
            const curso = this.courseRepository.createCourse(cursoProps);
            return curso;
        } catch (error) {
            console.log(error);
        }
    }

    async updateCurso(cursoProps: Partial<Curso>) : Promise<Curso> {
        try {
            cursoProps.update_date = new Date();
            const curso = await this.courseRepository.createCourse(cursoProps);
            return curso;
        } catch (error) {
            console.log(error);
        }
    }
}