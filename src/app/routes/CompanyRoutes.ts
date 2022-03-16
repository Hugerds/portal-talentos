import { Router } from "express";
import { RouterFactory, RouterFactoryDTO } from "../../middlewares/RouterFacoty";
import { CandidateController } from "../controllers/CandidateController";
import { CompanyController } from "../controllers/CompanyController";

export const companyRouter = Router();
const path = "/company";
const companyController = new CompanyController();

const routeConfig: RouterFactoryDTO[] = [
	{
		method: "post",
		path: `${path}`,
		controller: companyController.createCompany
	},
];

RouterFactory(routeConfig, companyRouter);