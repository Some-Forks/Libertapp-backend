import { MigrationInterface, QueryRunner } from "typeorm";

export class Complaint1698606058124 implements MigrationInterface {
    name = 'Complaint1698606058124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "role" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "file" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "uuid" character varying(255) NOT NULL, "location_s3" character varying(255) NOT NULL, "board" character varying(50) NOT NULL, "user_id" integer, CONSTRAINT "PK_36b46d232307066b3a2c9ea3a1d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "complaint" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "board" character varying(50) NOT NULL, "user_id" integer, "file_id" integer, CONSTRAINT "PK_a9c8dbc2ab4988edcc2ff0a7337" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "complaint_details" ("created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "id" SERIAL NOT NULL, "description" character varying(255) NOT NULL, "complaint_id" integer, CONSTRAINT "REL_1739eddfc6522b45d18b18a375" UNIQUE ("complaint_id"), CONSTRAINT "PK_549563abe590a306ba26f72d58d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "board" character varying(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" ADD "role_id" integer`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561" FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "file" ADD CONSTRAINT "FK_516f1cf15166fd07b732b4b6ab0" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "complaint" ADD CONSTRAINT "FK_1ab3e07eb3ce33129dfb6d6af83" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "complaint" ADD CONSTRAINT "FK_c3a5aad3cf24d399fc95d6172fe" FOREIGN KEY ("file_id") REFERENCES "file"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "complaint_details" ADD CONSTRAINT "FK_1739eddfc6522b45d18b18a3752" FOREIGN KEY ("complaint_id") REFERENCES "complaint"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`INSERT INTO "role" (name) VALUES ('ADMIN'), ('USER')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "complaint_details" DROP CONSTRAINT "FK_1739eddfc6522b45d18b18a3752"`);
        await queryRunner.query(`ALTER TABLE "complaint" DROP CONSTRAINT "FK_c3a5aad3cf24d399fc95d6172fe"`);
        await queryRunner.query(`ALTER TABLE "complaint" DROP CONSTRAINT "FK_1ab3e07eb3ce33129dfb6d6af83"`);
        await queryRunner.query(`ALTER TABLE "file" DROP CONSTRAINT "FK_516f1cf15166fd07b732b4b6ab0"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_fb2e442d14add3cefbdf33c4561"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "board"`);
        await queryRunner.query(`DROP TABLE "complaint_details"`);
        await queryRunner.query(`DROP TABLE "complaint"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`DROP TABLE "role"`);
    }

}
