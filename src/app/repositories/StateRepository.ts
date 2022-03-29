import { EntityRepository, Repository } from "typeorm";
import { print } from "util";
import { Candidate } from "../models/CandidateModel";
import { Address } from "../models/AddressModel";
import { State } from "../models/StateModel";

@EntityRepository(State)
export class StateRepository extends Repository<State>{
    async createState(state: Partial<State>): Promise<State> {
        const saveState = this.create(state);
        await this.save(saveState);

        return saveState;
    }

    async findAllstatees(): Promise<State[]> {
        const states = await this.find();
        return states;
    }

    async findbyUfSigla(stateAbbreviation: string): Promise<State> {
        const state = await this.findOne({ where: { stateAbbreviation: stateAbbreviation } });
        return state!;
    }
}