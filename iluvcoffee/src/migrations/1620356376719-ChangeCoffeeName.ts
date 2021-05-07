import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeCoffeeName1620356376719 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
        );
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
          `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
        );
    }

}
