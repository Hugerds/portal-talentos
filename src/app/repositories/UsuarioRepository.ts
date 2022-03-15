import { createQueryBuilder, EntityRepository, Repository } from "typeorm";
import { Candidato } from "../models/CandidatoModel";
import { Habilidade } from "../models/HabilidadeModel";
import { Usuario } from "../models/UsuarioModel";

@EntityRepository(Usuario)
export class UsuarioRepository extends Repository<Usuario>{
    async createUser(user: Partial<Usuario>): Promise<Usuario> {
        const saveUser = this.create(user);
        await this.save(saveUser);

        return saveUser;
    }

    async deleteUser(id: string): Promise<boolean> {
        try {
            const user = await this.findOne(id);
            if (!user) return false;
            user.excluido = true;
            await this.save(user);
            return true;
        } catch {
            return false;
        }
    }

    async findUserByEmail(email: string): Promise<Usuario> {
        const user = await this.findOne({ where: { email } });
        return user;
    }
}