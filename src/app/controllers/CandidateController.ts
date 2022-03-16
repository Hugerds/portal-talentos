import { Request, Response } from "express";
import { Candidate } from "../models/CandidateModel";
import { CandidateService } from "../services/CandidateService";

export class CandidateController {
	// async getCandidate(request: Request, response: Response): Promise<void> {
	// 	// const candidateService = new CandidateService();
	// 	// const newCandidate : Partial<Candidate> = {
	// 	// 	id: request.params.idCandidate as string,
	// 	// };

	// 	// const candidate = await candidateService.findPlayerById(newPlayer);



	// 	response.json( "Oi"
	// 		// player,
	// 	);
	// }

	async getCandidates(request: Request, response: Response): Promise<void> {
		const candidateService = new CandidateService();

		const res = await candidateService.findAllCandidates();
		response.json(
			res,
		);
	}

	async getCandidatesList(request: Request, response: Response): Promise<void> {
		const candidateService = new CandidateService();

		const res = await candidateService.findCandidatesList();
		response.json(
			res,
		);
	}

	async inactiveCandidateById(request: Request, response: Response): Promise<void> {
		// const playerService = new PlayerService();
		// const newPlayer : Partial<Player> = {
		// 	id: request.params.idPlayer
		// };

		// const res = await playerService.inactivePlayerById(newPlayer);
		// response.json(
		// 	res,
		// );
	}

	async deleteCandidate(request: Request, response: Response): Promise<void> {
		// const playerService = new PlayerService();
		// const newPlayer : Partial<Player> = {
		// 	id: request.body.id,
		// };

		// const res = await playerService.deletePlayer(newPlayer);
		// response.json(
		// 	res,
		// );
	}

	async updateCandidate(request: Request, response: Response): Promise<void> {
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

	async createCandidate(request: Request, response: Response): Promise<void> {
		const candidateService = new CandidateService();
		const novoCandidate: Partial<Candidate> = request.body;
		const res = await candidateService.createCandidate(novoCandidate);
		response.json(
			res
		);
	}
}