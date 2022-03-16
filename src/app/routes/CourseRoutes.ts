import { Router } from "express";
import { RouterFactory, RouterFactoryDTO } from "../../middlewares/RouterFacoty";
import { CandidateController } from "../controllers/CandidateController";
import { CourseController } from "../controllers/CourseController";

export const courseRouter = Router();
const path = "/course";
const courseController = new CourseController();

const routeConfig: RouterFactoryDTO[] = [
	{
		method: "post",
		path: `${path}`,
		controller: courseController.createCourse
	},
	{
		method: "post",
		path: `${path}/inactive/:idCourse`,
		controller: courseController.inactiveCourseById
	},
	{
		method: "put",
		path: `${path}`,
		controller: courseController.updateCourse
	},
];

RouterFactory(routeConfig, courseRouter);