import { Router } from "express";
import { RouterFactory, RouterFactoryDTO } from "../../middlewares/RouterFacoty";
import { CandidatoController } from "../controllers/CandidadoController";
import { EmpresaController } from "../controllers/EmpresaController";
import { UsuarioController } from "../controllers/UsuarioController";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const usuarioRouter = Router();
const path = "/usuario";
const usuarioController = new UsuarioController();

const routeConfig: RouterFactoryDTO[] = [
	{
		method: "get",
		path: `${path}/get/:idUser`,
		controller: usuarioController.getUser
	},
	{
		method: "post",
		path: `${path}`,
		controller: usuarioController.createUser
	},
	{
		method: "put",
		path: `${path}`,
		controller: usuarioController.updateUser
	},
	{
		method: "delete",
		path: `${path}`,
		controller: usuarioController.deleteUser
	},
];

RouterFactory(routeConfig, usuarioRouter);
