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

        userProps.birthDate = new Date(userProps.birthDate);
        const findUserByEmail = await this._userRepository.findUserByEmail(userProps.email);
        if (findUserByEmail) {
            throw new BadRequestException("Email já cadastrado");
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