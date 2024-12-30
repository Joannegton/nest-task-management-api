import { IsDateString, IsEnum, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export enum TaskStatus{
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE'
}

export class TaskDto{
    @IsUUID()
    @IsOptional()
    id: string;

    @IsString()
    @MinLength(3)
    @MaxLength(50)
    title: string;

    @IsString()
    @MinLength(5)
    @MaxLength(500)
    description: string;

    @IsEnum(TaskStatus)
    @IsOptional()
    status: string;

    @IsDateString()
    expirationDate: Date;
}

export interface FindAllParametros{
    title: string;
    status: string;
}