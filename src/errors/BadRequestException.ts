import { ErrorBase } from "../app/models/ErrorBaseModel";

export class BadRequestException extends ErrorBase {

    constructor(message: string | unknown) {
        const status = 400;

        super({ message, status });
    }
}