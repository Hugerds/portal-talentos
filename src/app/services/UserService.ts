import { getCustomRepository } from "typeorm";
import { User } from "../models/UserModel";
import { UserRepository } from "../repositories/UserRepository";
import { BadRequestException } from '../../errors/BadRequestException';

export class UserService {
    private _userRepository: UserRepository;
    constructor() {
        this._userRepository = getCustomRepository(UserRepository);
    }

    async createUser(userProps: Partial<User>): Promise<User> {
        if (userProps.email == null || userProps.birthDate == null || userProps.typeUser == null) throw new BadRequestException("Campos obrigatórios não preenchidos");
        const birthDateString = userProps.birthDate;
        userProps.birthDate = new Date(birthDateString);
        const email: string = userProps.email;
        const findUserByEmail = await this._userRepository.findUserByEmail(email);
        if (findUserByEmail) {
            throw new BadRequestException("E-mail já cadastrado");
        }
        const user = await this._userRepository.createUser(userProps);
        return user;
    }

    async updateUser(userProps: Partial<User>): Promise<User> {
        try {
            const newDate = new Date();
            const user: User = userProps as User;
            return user;
        } catch (error) {
            console.log(error);
            throw new BadRequestException("Erro ao criar usuário");
        }
    }

    async deleteUser(userId: string): Promise<boolean> {
        try {
            const retorno = await this._userRepository.deleteUser(userId);
            return retorno;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}