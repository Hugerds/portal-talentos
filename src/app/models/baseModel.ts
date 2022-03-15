import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseModel {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'date' })
    @CreateDateColumn()
    create_date: Date;

    @Column({ type: 'date' })
    @UpdateDateColumn()
    update_date: Date;

    @Column({ default: false })
    excluido: boolean;
}
