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
import { Usuario } from "../models/UsuarioModel";
import { UsuarioRepository } from "../repositories/UsuarioRepository";

export class UsuarioService {
    userRepository = getCustomRepository(UsuarioRepository);

    async createUser(userProps: Partial<Usuario>): Promise<Usuario> {
        try {
            const newDate = new Date();
            const user = await this.userRepository.createUser(userProps);
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async updateUser(userProps: Partial<Usuario>): Promise<Usuario> {
        try {
            const newDate = new Date();
            const user: Usuario = userProps as Usuario;
            return user;
        } catch (error) {
            console.log(error);
        }
    }

    async deleteUser(userId: string): Promise<boolean> {
        try {
            const retorno = await this.userRepository.deleteUser(userId);
            return retorno;
        } catch (error) {
            console.log(error);
        }
    }
}