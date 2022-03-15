import { Express } from "express-serve-static-core";
import { candidadoRouter } from "./CandidadoRoutes";
import { cursoRouter } from "./CursoRoutes";
import { empresaRouter } from "./EmpresaRoutes";
import { usuarioRouter } from "./UsuarioRoutes";

export class BaseRoutes {
    constructor(app: Express) {
        app.use(candidadoRouter);
        app.use(cursoRouter);
        app.use(empresaRouter);
        app.use(usuarioRouter);
    }
}