import { Router } from "express";
import { RouterFactory, RouterFactoryDTO } from "../../middlewares/RouterFacoty";
import { CandidateController } from "../controllers/CandidateController";

export const candidateRouter = Router();
const path = "/candidate";
const candidateController = new CandidateController();

const routeConfig: RouterFactoryDTO[] = [
	// {
	// 	method: "get",
	// 	path: `${path}/:idCandidate`,
	// 	controller: candidateController.getCandidate
	// },
	{
		method: "post",
		path: `${path}`,
		controller: candidateController.createCandidate
	},
	{
		method: "post",
		path: `${path}/inactive/:idPlayer`,
		controller: candidateController.inactiveCandidateById
	},
	{
		method: "delete",
		path: `${path}`,
		controller: candidateController.deleteCandidate
	},
	{
		method: "put",
		path: `${path}`,
		controller: candidateController.updateCandidate
	},
	{
		method: "get",
		path: `${path}`,
		controller: candidateController.getCandidates
	},
	{
		method: "get",
		path: `${path}/getList`,
		controller: candidateController.getCandidatesList
	}
];

RouterFactory(routeConfig, candidateRouter);