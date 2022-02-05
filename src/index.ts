import "reflect-metadata";
import express from "express";
import cors from 'cors';
import { createConnection } from "typeorm";
import { Formacao } from "./app/models/FormacaoModel";
import { Endereco } from "./app/models/EnderecoModel";
import { Habilidade } from "./app/models/HabilidadeModel";
import { Candidato } from "./app/models/CandidatoModel";
import { Curso } from "./app/models/CursoModel";
import { Instituicao } from "./app/models/InstituicaoModel";
import { candidadoRouter } from "./app/routes/CandidadoRoutes";
import { cursoRouter } from "./app/routes/CursoRoutes";
import { empresaRouter } from "./app/routes/EmpresaRoutes";

const port = process.env.PORT || 3001;
Application();
async function Application() {
    await createConnection().then(async connection => {
        const repository = connection.getRepository(Curso);
        const course = new Curso();
        course.nome = "Curso de NodeJS";
        course.descricao = "Teste";
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
    app.use(candidadoRouter);
    app.use(cursoRouter);
    app.use(empresaRouter);
    app.listen(port, function () {
        console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
    });


}