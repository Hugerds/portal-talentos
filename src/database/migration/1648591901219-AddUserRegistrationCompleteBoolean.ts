import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserRegistrationCompleteBoolean1648591901219 implements MigrationInterface {
    name = 'AddUserRegistrationCompleteBoolean1648591901219'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "complete_registration" boolean NOT NULL DEFAULT FALSE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "complete_registration"`);
    }

}
