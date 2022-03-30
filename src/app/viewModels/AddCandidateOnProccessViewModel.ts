import { ErrorResult } from "../../errors/ErrorResult";

export class AddCandidateOnProccess {
    constructor(props: Partial<AddCandidateOnProccess>) {
        Object.assign(this, props);
    }

    proccessId: string;
    candidateId: string;

    validateForInsert(): ErrorResult {
        const result = new ErrorResult();

        if (!this.proccessId || !this.candidateId) {
            result.addError("Preencha todos os campos obrigatórios");
            result.setHttpErrorCode(400);
        }
        else if (this.proccessId.trim() == "" || this.candidateId.trim() == "") {
            result.addError("Campos obrigatórios não podem ser vazios");
            result.setHttpErrorCode(400);
        }

        return result;
    }
}