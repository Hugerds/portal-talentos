import { TypeUser } from "../enums/TypeUserEnum";

export interface IUser {
    id: string,
    login: string,
    name: string,
    cpf: string,
    email: string,
    tellphone: string,
    token: string,
    typeUser: TypeUser
}