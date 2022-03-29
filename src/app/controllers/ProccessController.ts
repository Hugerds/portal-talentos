import { Request, Response } from "express";
import { Proccess } from "../models/ProccessModel";
import { ProccessService } from "../services/ProccessService";
import { CreateProccessViewModel } from "../viewModels/CreateProccessViewModel";
import { UpdateProccessViewModel } from "../viewModels/UpdateProccessViewModel";

export class ProccessController {
    async createProccess(request: Request, response: Response): Promise<void> {
        const proccessService = new ProccessService();
        const proccess: Partial<CreateProccessViewModel> = request.body;
        const res = await proccessService.createProccess(proccess);
        response.json(
            res ,
        );
    }


    async advancePhase(request: Request, response: Response): Promise<void> {
        const proccessService = new ProccessService();
        const proccess: Partial<UpdateProccessViewModel> = request.body;
        const res = await proccessService.advancePhase(proccess);
        response.json(
            res ,
        );
    }
}