import { Router } from "express";
import { RouterFactory, RouterFactoryDTO } from "../../middlewares/RouterFacoty";
import { CandidateController } from "../controllers/CandidateController";
import { CompanyController } from "../controllers/CompanyController";
import { UserController } from "../controllers/UserController";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const usuarioRouter = Router();
const path = "/usuario";
const usuarioController = new UserController();

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
