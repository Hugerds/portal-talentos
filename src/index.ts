import "reflect-metadata";
import express from "express";
import cors from 'cors';
import { createConnection } from "typeorm";
import { Formation } from "./app/models/FormationModel";
import { Address } from "./app/models/AddressModel";
import { Skill } from "./app/models/SkillModel";
import { Candidate } from "./app/models/CandidateModel";
import { Course } from "./app/models/CourseModel";
import { Institution } from "./app/models/InstitutionModel";
import { candidateRouter } from "./app/routes/CandidateRoutes";
import { courseRouter } from "./app/routes/CourseRoutes";
import { companyRouter } from "./app/routes/CompanyRoutes";
import { usuarioRouter } from "./app/routes/UserRoutes";
import { BaseRoutes } from "./app/routes/baseRoutes";
import { ErrorHandler } from "./middlewares/ErrorHandler";

const port = process.env.PORT || 3001;
Application();
async function Application() {
    await createConnection().then(async connection => {
        const repository = connection.getRepository(Course);
        const course = new Course();
        course.name = "Course de NodeJS";
        course.description = "Teste";
        const newCourse = repository.create(course);
        await repository.save(newCourse);

        console.log("Banco de Dados conectado");
    });

    const app = express();
    const options: cors.CorsOptions = {
        origin: "*"
    };
    app.use(cors(options));
    app.use(express.json());
    new BaseRoutes(app);
    app.use(ErrorHandler);
    app.listen(port, function () {
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });


}