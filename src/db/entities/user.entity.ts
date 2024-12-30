import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar'})
    nome: string;
    @Column({ type: 'varchar'})
    email: string;

    @Column({ type: 'varchar'})
    senha: string;

    @Column({ type: 'varchar'})
    cpf: string;
    
    @Column({ type: 'date'})
    nasc: Date;
}