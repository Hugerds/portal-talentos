import { ErrorBase } from "../app/models/ErrorBaseModel";

export class ErrorResult {

    isValid = true;
    private errors: string[] = [];

    private httpErrorCode = 500;

    throwIfInvalid(): void {
        if (this.errors.length == 0) {
            return;
        }

        const httpError = new ErrorBase(
            {
                status: this.httpErrorCode,
                message: this.errors.join("\n")
            });

        throw httpError;
    }

    addError(error: string): void {
        this.errors.push(error);
    }

    setHttpErrorCode(status: number): void {
        this.httpErrorCode = status;
    }
}