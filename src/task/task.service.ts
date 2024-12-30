import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParametros, TaskDto, TaskStatus } from './task.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskEntity } from 'src/db/entities/task.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class TaskService {
    constructor(@InjectRepository(TaskEntity) private readonly taskRepository: Repository<TaskEntity>){}
    private tasks: TaskDto[] = [];

    async create(task: TaskDto): Promise<string>{
        task.id = uuid()
        task.status = TaskStatus.TO_DO

        await this.taskRepository.save(task)

        return 'Task created'
    }

    async findById(id: string): Promise<TaskDto>{
        const foundTask = await this.taskRepository.findOne({where: {id}})

        if(!foundTask){
            throw new NotFoundException()
        }

        return foundTask
    }

    async findAll(parametrosConsulta: FindAllParametros): Promise<TaskDto[]>{
        const searchParams: FindOptionsWhere<TaskEntity> = {}

        if(searchParams.title){
            searchParams.title = ILike(`%${parametrosConsulta.title}%`)
        }

        if(searchParams.status){
            searchParams.status = ILike(`%${parametrosConsulta.status}%`)
        }

        const foundTasks = await this.taskRepository.find({where: searchParams})

        return foundTasks
    }

    async update(id: string, task: TaskDto): Promise<string>{
        const taskFound = await this.taskRepository.findOne({where: {id}})

        if(!taskFound){
            throw new NotFoundException()
        }

        await this.taskRepository.update(id, task)
        return 'Task updated'
    }

    async delete(id: string): Promise<string>{
        const foundTask = this.taskRepository.findOne({where: {id}})

        if(!foundTask){ 
            throw new NotFoundException()
        }

        this.taskRepository.delete(id)

        return 'Task deleted'
    }
}
