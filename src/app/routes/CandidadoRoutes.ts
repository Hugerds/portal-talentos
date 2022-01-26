import { Router } from "express";
import { RouterFactory, RouterFactoryDTO } from "../../middlewares/RouterFacoty";
import { CandidatoController } from "../controllers/CandidadoController";

export const candidadoRouter = Router();
const path = "/candidato";
const candidadoController = new CandidatoController();

const routeConfig: RouterFactoryDTO[] = [
	{
		method: "get",
		path: `${path}/:idCandidato`,
		controller: candidadoController.getCandidato
	},
	{
		method: "post",
		path: `${path}`,
		controller: candidadoController.createCandidate
	},
	{
		method: "post",
		path: `${path}/inactive/:idPlayer`,
		controller: candidadoController.inactiveCandidatoById
	},
	{
		method: "delete",
		path: `${path}`,
		controller: candidadoController.deleteCandidato
	},
	{
		method: "put",
		path: `${path}`,
		controller: candidadoController.updateCandidato
	},
	{
		method: "get",
		path: `${path}`,
		controller: candidadoController.getCandidatos
	}
];

RouterFactory(routeConfig, candidadoRouter);