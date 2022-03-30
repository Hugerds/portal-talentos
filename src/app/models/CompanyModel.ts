import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import { BaseModel } from "./BaseModel";
import { Candidate } from "./CandidateModel";
import { Address } from "./AddressModel";
import { User } from "./UserModel";
import { Proccess } from './ProccessModel';
import { ErrorResult } from "../../errors/ErrorResult";

@Entity()
export class Company extends BaseModel {

    constructor(props: Partial<Company>) {
        super();
        Object.assign(this, props);
    }

    @Column()
    name: string;

    @Column()
    cnpj: string;

    @Column()
    email: string;

    @Column()
    tellphone: string;

    @ManyToOne(() => Address, address => address.company)
    address: Address;

    @ManyToOne(() => User, user => user.companies)
    responsibleUser: User;

    // @OneToMany(() => Candidate, candidate => candidate.company)
    // candidates: Candidate[];

    @OneToMany(() => Proccess, proccess => proccess.company)
    proccess: Proccess[];

    validateForInsert(): ErrorResult {
        const result = new ErrorResult();

        if (!this.name || !this.cnpj || !this.address || !this.tellphone || !this.email) {
            result.addError("Preencha todos os campos obrigatórios");
            result.setHttpErrorCode(400);
        }
        else if (this.name.trim() == "" || this.tellphone.trim() == "") {
            result.addError("Campos obrigatórios não podem ser vazios");
            result.setHttpErrorCode(400);
        }

        return result;
    }
}