import { TypeUser } from "../enums/TypeUserEnum";

export interface IUser {
    id: string,
    login: string,
    name: string,
    documment: string,
    email: string,
    tellphone: string,
    token: string,
    typeUser: TypeUser
}