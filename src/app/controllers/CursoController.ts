import { Request, Response } from "express";
import { Curso } from "../models/CursoModel";
import { CursoService } from "../services/CursoService";

export class CursoController {

	async inactiveCursoById(request: Request, response: Response): Promise<void> {

	}

	async updateCurso(request: Request, response: Response): Promise<void> {
		const cursoService = new CursoService();
		const novoCurso: Partial<Curso> = {
			nome: request.body.nome,
			descricao: request.body.descricao,
		};
		const res = await cursoService.updateCurso(novoCurso);
		response.json(
			res
		);
	}

	async createCurso(request: Request, response: Response): Promise<void> {
		const cursoService = new CursoService();
		const novoCurso: Partial<Curso> = {
			nome: request.body.nome,
			descricao: request.body.descricao,
		};
		const res = await cursoService.createCurso(novoCurso);
		response.json(
			res
		);
	}
}