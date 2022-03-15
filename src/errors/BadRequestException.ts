import { ErrorBase } from "../app/models/ErrorBase";

export class BadRequestException extends ErrorBase {

    constructor(message: string | unknown) {
        const status = 400;

        super({ message, status });
    }
}