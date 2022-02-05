import { Router } from "express";
import { RouterFactory, RouterFactoryDTO } from "../../middlewares/RouterFacoty";
import { CandidatoController } from "../controllers/CandidadoController";
import { EmpresaController } from "../controllers/EmpresaController";

export const empresaRouter = Router();
const path = "/empresa";
const empresaController = new EmpresaController();

const routeConfig: RouterFactoryDTO[] = [
	// {
	// 	method: "get",
	// 	path: `${path}/:idCandidato`,
	// 	controller: candidadoController.getCandidato
	// },
	{
		method: "post",
		path: `${path}`,
		controller: empresaController.createCompany
	},
	{
		method: "post",
		path: `${path}/inactive/:idPlayer`,
		controller: empresaController.inactiveCandidatoById
	},
	{
		method: "delete",
		path: `${path}`,
		controller: empresaController.deleteCandidato
	},
	{
		method: "put",
		path: `${path}`,
		controller: empresaController.updateCandidato
	},
	{
		method: "get",
		path: `${path}`,
		controller: empresaController.getCandidatos
	},
	{
		method: "get",
		path: `${path}/getList`,
		controller: empresaController.getCandidatesList
	}
];

RouterFactory(routeConfig, empresaRouter);