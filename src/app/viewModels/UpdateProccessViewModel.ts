import { ErrorResult } from "../../errors/ErrorResult";
import { PhaseProccessEnum } from "../enums/PhaseProccessEnum";

export class UpdateProccessViewModel {
    constructor(props: Partial<UpdateProccessViewModel>) {
        Object.assign(this, props);
    }

    phaseProccess: PhaseProccessEnum | null;
    proccessId: string;
    candidateId: string | null;

    validateForInsert(): ErrorResult {
        const result = new ErrorResult();

        if (!this.proccessId) {
            result.addError("Preencha todos os campos obrigatórios");
            result.setHttpErrorCode(400);
        }
        else if (this.proccessId.trim() == "") {
            result.addError("Campos obrigatórios não podem ser vazios");
            result.setHttpErrorCode(400);
        }

        return result;
    }
}