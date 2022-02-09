import { Request, Response } from "express";
import { IUsuario } from "../interfaces/IUsuario";
import { Candidato } from "../models/CandidatoModel";
import { Empresa } from "../models/EmpresaModel";
import { Usuario } from "../models/UsuarioModel";
import { CandidatoService } from "../services/CandidatoService";
import { EmpresaService } from "../services/EmpresaService";
import { UsuarioService } from "../services/UsuarioService";
import jwt from 'jsonwebtoken';
import { create } from "domain";

export class UsuarioController {

	async getUser(request: Request, response: Response): Promise<void> {
		// const candidatoService = new CandidatoService();

		// const res = await candidatoService.findAllCandidates();
		console.log(request.params.idUser as string);
		const userId: string = request.params.idUser as string;
		response.json(
			userId,
		);
	}

	async createUser(request: Request, response: Response): Promise<void> {
		const usuarioService = new UsuarioService();

		const user: Partial<Usuario> = request.body;

		const createUser = await usuarioService.createUser(user);
		const res: IUsuario = {
			nome: createUser.nome,
			id: createUser.id,
			login: createUser.login,
			cpf: createUser.cpf,
			telefone: createUser.telefone,
			email: createUser.email,
			usuario_tipo: createUser.usuario_tipo,
		};
		const token = jwt.sign({ id: user.nome }, process.env.TOKEN_JWT, { expiresIn: '1d' });
		response.json({
			usuario: res,
			token
		});
	}

	async updateUser(request: Request, response: Response): Promise<void> {
		const usuarioService = new UsuarioService();

		const user: Partial<Usuario> = request.body;

		const res = await usuarioService.updateUser(user);
		response.json(
			res,
		);
	}

	async deleteUser(request: Request, response: Response): Promise<void> {
		const usuarioService = new UsuarioService();
		const userId: string = request.query.idUser as string;

		const res = await usuarioService.deleteUser(userId);
		response.json(
			res,
		);
	}
}