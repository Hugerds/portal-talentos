import { Express } from "express-serve-static-core";
import { candidateRouter } from "./CandidateRoutes";
import { courseRouter } from "./CourseRoutes";
import { companyRouter } from "./CompanyRoutes";
import { usuarioRouter } from "./UserRoutes";
import { proccessRouter } from "./ProccessRoutes";

export class BaseRoutes {
    constructor(app: Express) {
        app.use(candidateRouter);
        app.use(courseRouter);
        app.use(companyRouter);
        app.use(usuarioRouter);
        app.use(proccessRouter);
    }
}