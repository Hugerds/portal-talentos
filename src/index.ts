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

const port = process.env.PORT || 3001;
Application();
async function Application() {
    await createConnection().then(async connection => {
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
	app.listen(port, function(){
		console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
	});
    

}