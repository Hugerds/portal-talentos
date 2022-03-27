import { ErrorResult } from "../../errors/ErrorResult";
import { PhaseProccessEnum } from "../enums/PhaseProccessEnum";

export class CreateProccessViewModel {
    constructor(props: Partial<CreateProccessViewModel>) {
        Object.assign(this, props);
    }

    phaseProccess: PhaseProccessEnum | null;
    companyId: string;
    candidateId: string;

    validateForInsert(): ErrorResult {
        const result = new ErrorResult();

        if (!this.candidateId || !this.companyId) {
            result.addError("Preencha todos os campos obrigatórios");
            result.setHttpErrorCode(400);
        }
        else if (this.candidateId.trim() == "" || this.companyId.trim() == "") {
            result.addError("Campos obrigatórios não podem ser vazios");
            result.setHttpErrorCode(400);
        }

        return result;
    }
}