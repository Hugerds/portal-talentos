import { ErrorBase } from "../app/models/ErrorBaseModel";

export class UnauthorizedException extends ErrorBase {

    constructor(message: string | unknown) {
        const status = 401;

        super({ message, status });
    }
}