import { UsuarioTipo } from "../enums/UsuarioTipoEnum";

export interface IUsuario {
    id: string,
    login: string,
    nome: string,
    cpf: string,
    email: string,
    telefone: string,
    usuario_tipo: UsuarioTipo,
}