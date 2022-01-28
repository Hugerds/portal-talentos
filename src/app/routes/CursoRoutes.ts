import { Router } from "express";
import { RouterFactory, RouterFactoryDTO } from "../../middlewares/RouterFacoty";
import { CandidatoController } from "../controllers/CandidadoController";
import { CursoController } from "../controllers/CursoController";

export const cursoRouter = Router();
const path = "/curso";
const cursoController = new CursoController();

const routeConfig: RouterFactoryDTO[] = [
	{
		method: "post",
		path: `${path}`,
		controller: cursoController.createCurso
	},
	{
		method: "post",
		path: `${path}/inactive/:idCurso`,
		controller: cursoController.inactiveCursoById
	},
	{
		method: "put",
		path: `${path}`,
		controller: cursoController.updateCurso
	},
];

RouterFactory(routeConfig, cursoRouter);