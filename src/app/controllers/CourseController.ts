import { Request, Response } from "express";
import { Course } from "../models/CourseModel";
import { CourseService } from "../services/CourseService";

export class CourseController {

	async inactiveCourseById(request: Request, response: Response): Promise<void> {

	}

	async updateCourse(request: Request, response: Response): Promise<void> {
		const courseService = new CourseService();
		const novoCourse: Partial<Course> = {
			name: request.body.name,
			description: request.body.description,
		};
		const res = await courseService.updateCourse(novoCourse);
		response.json(
			res
		);
	}

	async createCourse(request: Request, response: Response): Promise<void> {
		const courseService = new CourseService();
		const novoCourse: Partial<Course> = {
			name: request.body.name,
			description: request.body.description,
		};
		const res = await courseService.createCourse(novoCourse);
		response.json(
			res
		);
	}
}