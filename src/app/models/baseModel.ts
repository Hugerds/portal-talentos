import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export abstract class BaseModel {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ type: 'date' })
    @CreateDateColumn()
    createDate: Date;

    @Column({ type: 'date' })
    @UpdateDateColumn()
    updateDate: Date;

    @Column({ default: false })
    excluded: boolean;
}
