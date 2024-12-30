import { IsEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar'})
    nome: string;

    @Column({ type: 'varchar'})
    @IsEmail()
    email: string;

    @Column({ type: 'varchar'})
    senha: string;

    @Column({ type: 'varchar'})
    cpf: string;
    
    @Column({ type: 'date'})
    nasc: Date;
}