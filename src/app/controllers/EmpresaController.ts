import { Request, Response } from "express";
import { Candidato } from "../models/CandidatoModel";
import { Empresa } from "../models/EmpresaModel";
import { CandidatoService } from "../services/CandidatoService";
import { EmpresaService } from "../services/EmpresaService";

export class EmpresaController {
	async createCompany(request: Request, response: Response): Promise<void> {
		const candidatoService = new EmpresaService();
		const novaEmpresa: Partial<Empresa> = request.body;
		const res = await candidatoService.createCompany(novaEmpresa);
		response.json(
			res
		);
	}
}