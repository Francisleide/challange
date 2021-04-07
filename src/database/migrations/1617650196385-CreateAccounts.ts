import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export default class CreateAccounts1617650196385 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'Accounts',
                columns:[
                    {
                        name : 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'balance',
                        type: 'decimal',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        isNullable:false
                    },
                ],
            }),
        );

        await queryRunner.createTable(
            new Table({
                name: 'Transfers',
                columns:[
                    {
                        name : 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()'
                    },
                    {
                        name: 'origin_email',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'target_email',
                        type: 'varchar',
                        isNullable: false
                    },
                    {
                        name: 'amount',
                        type: 'decimal',
                        isNullable: false
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp with time zone',
                        isNullable:false
                    },
                ],
            }),
        );
        await queryRunner.createForeignKey('Transfers', new TableForeignKey({
            name: 'FK_origin_email',
            columnNames: ['origin_email'],
            referencedColumnNames: ['email'],
            referencedTableName: 'Accounts',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
        await queryRunner.createForeignKey('Transfers', new TableForeignKey({
            name: 'FK_target_email',
            columnNames: ['target_email'],
            referencedColumnNames: ['email'],
            referencedTableName: 'Accounts',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('Trasnfers');
       await queryRunner.dropTable('Accounts');
    }

}
