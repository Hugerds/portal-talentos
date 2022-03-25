import { Router } from "express";
import { RouterFactory, RouterFactoryDTO } from "../../middlewares/RouterFacoty";
import { CandidateController } from "../controllers/CandidateController";
import { CompanyController } from "../controllers/CompanyController";
import { UserController } from "../controllers/UserController";
import { Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { ProccessController } from "../controllers/ProccessController";

export const proccessRouter = Router();
const path = "/proccess";
const proccessController = new ProccessController();

const routeConfig: RouterFactoryDTO[] = [
	// {
	// 	method: "get",
	// 	path: `${path}/get/:idUser`,
	// 	controller: usuarioController.getUser
	// },
	{
		method: "post",
		path: `${path}`,
		controller: proccessController.createProccess
	},
	// {
	// 	method: "put",
	// 	path: `${path}`,
	// 	controller: usuarioController.updateUser
	// },
	// {
	// 	method: "delete",
	// 	path: `${path}`,
	// 	controller: usuarioController.deleteUser
	// },
];

RouterFactory(routeConfig, proccessRouter);
