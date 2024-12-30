import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParametros, TaskDto, TaskStatus } from './task.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TaskService {
    private tasks: TaskDto[] = [];

    create(task: TaskDto){
        task.id = uuid()
        task.status = TaskStatus.TO_DO
        this.tasks.push(task)
    }

    findById(id: string): TaskDto{
        const foundTask = this.tasks.filter(task => task.id === id);

        if(foundTask.length > 0){
            return foundTask[0];
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.NOT_FOUND);
    }

    findAll(parametrosConsulta: FindAllParametros): TaskDto[]{
        return this.tasks.filter(task => {
            if(parametrosConsulta.title && !task.title.includes(parametrosConsulta.title)){
                return false;
            }

            if(parametrosConsulta.status && task.status !== parametrosConsulta.status){
                return false;
            }

            return true;
        });
    }

    update(task: TaskDto){
        const taskIndex = this.tasks.findIndex(t => t.id === task.id);

        if(taskIndex >= 0){
            this.tasks[taskIndex] = task;
            return;
        }

        throw new HttpException(`Task with id ${task.id} not found`, HttpStatus.BAD_REQUEST);
    }

    delete(id: string){
        const taskIndex = this.tasks.findIndex(t => t.id === id);

        if(taskIndex >= 0){ 
            this.tasks.splice(taskIndex, 1);
            return;
        }

        throw new HttpException(`Task with id ${id} not found`, HttpStatus.BAD_REQUEST);
    }
}
