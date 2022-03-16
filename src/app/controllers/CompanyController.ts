import { Request, Response } from "express";
import { Candidate } from "../models/CandidateModel";
import { Company } from "../models/CompanyModel";
import { CandidateService } from "../services/CandidateService";
import { CompanyService } from "../services/CompanyService";

export class CompanyController {
	async createCompany(request: Request, response: Response): Promise<void> {
		const candidateService = new CompanyService();
		const novaCompany: Partial<Company> = request.body;
		const res = await candidateService.createCompany(novaCompany);
		response.json(
			res
		);
	}
}