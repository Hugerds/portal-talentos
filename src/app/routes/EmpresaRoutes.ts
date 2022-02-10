import { Router } from "express";
import { RouterFactory, RouterFactoryDTO } from "../../middlewares/RouterFacoty";
import { CandidatoController } from "../controllers/CandidadoController";
import { EmpresaController } from "../controllers/EmpresaController";

export const empresaRouter = Router();
const path = "/empresa";
const empresaController = new EmpresaController();

const routeConfig: RouterFactoryDTO[] = [
	{
		method: "post",
		path: `${path}`,
		controller: empresaController.createCompany
	},
];

RouterFactory(routeConfig, empresaRouter);