import { ErrorBase } from "../app/models/ErrorBaseModel";

export class NotFoundException extends ErrorBase {

    constructor(message: string | unknown) {
        const status = 404;

        super({ message, status });
    }
}