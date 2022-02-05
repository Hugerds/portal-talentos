import { Request, Response } from "express";
import { Candidato } from "../models/CandidatoModel";
import { Empresa } from "../models/EmpresaModel";
import { CandidatoService } from "../services/CandidatoService";
import { EmpresaService } from "../services/EmpresaService";

export class EmpresaController {
	// async getCandidato(request: Request, response: Response): Promise<void> {
	// 	// const candidatoService = new CandidatoService();
	// 	// const newCandidato : Partial<Candidato> = {
	// 	// 	id: request.params.idCandidato as string,
	// 	// };

	// 	// const candidato = await candidatoService.findPlayerById(newPlayer);



	// 	response.json( "Oi"
	// 		// player,
	// 	);
	// }

	async getCandidatos(request: Request, response: Response): Promise<void> {
		// const candidatoService = new CandidatoService();

		// const res = await candidatoService.findAllCandidates();
		// response.json(
		// 	res,
		// );
	}

	async getCandidatesList(request: Request, response: Response): Promise<void> {
		// const candidatoService = new CandidatoService();

		// const res = await candidatoService.findCandidatesList();
		// response.json(
		// 	res,
		// );
	}

	async inactiveCandidatoById(request: Request, response: Response): Promise<void> {
		// const playerService = new PlayerService();
		// const newPlayer : Partial<Player> = {
		// 	id: request.params.idPlayer
		// };

		// const res = await playerService.inactivePlayerById(newPlayer);
		// response.json(
		// 	res,
		// );
	}

	async deleteCandidato(request: Request, response: Response): Promise<void> {
		// const playerService = new PlayerService();
		// const newPlayer : Partial<Player> = {
		// 	id: request.body.id,
		// };

		// const res = await playerService.deletePlayer(newPlayer);
		// response.json(
		// 	res,
		// );
	}

	async updateCandidato(request: Request, response: Response): Promise<void> {
		// const playerService = new PlayerService();
		// const newPlayer : Partial<Player> = {
		// 	id: request.body.id,
		// 	name: request.body.name,
		// 	ip_v4: request.body.ip_v4,
		// 	active: request.body.active,
		// 	grid: request.body.grid?.id
		// };
		// const res = await playerService.updatePlayer(newPlayer);
		// response.json(
		// 	res
		// );
	}

	async createCompany(request: Request, response: Response): Promise<void> {
		const candidatoService = new EmpresaService();
		const novaEmpresa: Partial<Empresa> = request.body;
		const res = await candidatoService.createCompany(novaEmpresa);
		response.json(
			res
		);
	}
}