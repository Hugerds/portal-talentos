import { Request, Response } from "express";
import { Proccess } from "../models/ProccessModel";
import { ProccessService } from "../services/ProccessService";
import { CreateProccessViewModel } from "../viewModels/CreateProccessViewModel";

export class ProccessController {
    async createProccess(request: Request, response: Response): Promise<void> {
        const proccessService = new ProccessService();
        const proccess: Partial<CreateProccessViewModel> = request.body;
        console.log(proccess);
        const res = await proccessService.createProccess(proccess);
        response.json(
            res ,
        );
    }
}