import { createQueryBuilder, EntityRepository, Repository } from "typeorm";
import { Candidate } from "../models/CandidateModel";
import { Skill } from "../models/SkillModel";
import { User } from "../models/UserModel";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(user: Partial<User>): Promise<User> {
        const saveUser = this.create(user);
        await this.save(saveUser);

        return saveUser;
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            const user = await this.findOne(id);
            if (!user) return false;
            user.excluded = true;
            await this.save(user);
            return true;
        } catch {
            return false;
        }
    }

    async findUserByEmail(email: string): Promise<User> {
        const user = await this.findOne({ where: { email } });
        return user;
    }
}