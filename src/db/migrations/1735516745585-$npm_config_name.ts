import { MigrationInterface, QueryRunner } from "typeorm";

export class  UserTable1735516745585 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users (
                id uuid NOT NULL DEFAULT uuid_generate_v4(),
                nome VARCHAR(50) NOT NULL,
                email VARCHAR(50) NOT NULL,
                senha VARCHAR(256) NOT NULL,
                cpf VARCHAR(11) NOT NULL,
                nasc DATE NOT NULL,
                CONSTRAINT user_pk PRIMARY KEY (id),
                CONSTRAINT user_un_email UNIQUE (email)
                )`
            )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS user`)
    }

}
