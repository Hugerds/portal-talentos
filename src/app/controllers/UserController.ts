import { Request, Response } from "express";
import { IUser } from "../interfaces/IUser";
import { Candidate } from "../models/CandidateModel";
import { Company } from "../models/CompanyModel";
import { User } from "../models/UserModel";
import { CandidateService } from "../services/CandidateService";
import { CompanyService } from "../services/CompanyService";
import { UserService } from "../services/UserService";
import jwt from 'jsonwebtoken';
import { create } from "domain";

export class UserController {

	async getUser(request: Request, response: Response): Promise<void> {
		// const candidateService = new CandidateService();

		// const res = await candidateService.findAllCandidates();
		console.log(request.params.idUser as string);
		const userId: string = request.params.idUser as string;
		response.json(
			userId,
		);
	}

	async createUser(request: Request, response: Response): Promise<void> {
		const usuarioService = new UserService();

		const user: Partial<User> = request.body;

		const createUser = await usuarioService.createUser(user);
		const res: IUser = {
			name: createUser.name,
			id: createUser.id,
			login: createUser.login,
			cpf: createUser.cpf,
			tellphone: createUser.tellphone,
			email: createUser.email,
			typeUser: createUser.typeUser,
			token: jwt.sign({ id: user.name }, process.env.TOKEN_JWT, { expiresIn: '1d' })
		};
		response.json(
			res
		);
	}

	async updateUser(request: Request, response: Response): Promise<void> {
		const usuarioService = new UserService();

		const user: Partial<User> = request.body;

		const res = await usuarioService.updateUser(user);
		response.json(
			res,
		);
	}

	async deleteUser(request: Request, response: Response): Promise<void> {
		const usuarioService = new UserService();
		const userId: string = request.query.idUser as string;

		const res = await usuarioService.deleteUser(userId);
		response.json(
			res,
		);
	}
}