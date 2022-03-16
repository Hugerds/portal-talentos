import { EntityRepository, Repository } from "typeorm";
import { Candidate } from "../models/CandidateModel";
import { Address } from "../models/AddressModel";

@EntityRepository(Address)
export class AddressRepository extends Repository<Address>{
    async createAddress(address: Partial<Address>): Promise<Address> {
        const saveAddress = this.create(address);
        await this.save(saveAddress);

        return saveAddress;
    }

    async findAllAddresses(): Promise<Address[]> {
        const addresses = await this.find();
        return addresses;
    }
}