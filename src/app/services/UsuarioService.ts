import { getCustomRepository } from "typeorm";
import { Usuario } from "../models/UsuarioModel";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { BadRequestException } from '../../errors/BadRequestException';

export class UsuarioService {
    private _userRepository: UsuarioRepository;
    constructor() {
        this._userRepository = getCustomRepository(UsuarioRepository);
    }

    async createUser(userProps: Partial<Usuario>): Promise<Usuario> {
        const newDate = new Date();
        console.log(userProps.email);
        const findUserByEmail = await this._userRepository.findUserByEmail(userProps.email);
        if (findUserByEmail) {
            throw new BadRequestException("Email já cadastrado");
        }
        const user = await this._userRepository.createUser(userProps);
        return user;
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
            const retorno = await this._userRepository.deleteUser(userId);
            return retorno;
        } catch (error) {
            console.log(error);
        }
    }
}