import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { FindAllParametros, TaskDto } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';

//@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {

    constructor(private readonly taskService: TaskService) {}

    @Post()
    async create(@Body() task: TaskDto): Promise<string>{
        return await this.taskService.create(task);
    }

    @Get("/:id")
    async findById(@Param('id') id: string): Promise<TaskDto>{
        return await this.taskService.findById(id);
    }

    @Get()
    async findAll(@Query() parametrosConsulta: FindAllParametros): Promise<TaskDto[]>{
        return await this.taskService.findAll(parametrosConsulta);
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() task: TaskDto): Promise<string>{
        return await this.taskService.update(id, task);
    }

    @Delete('/:id')
    async remove(@Param('id') id: string): Promise<string>{
        return await this.taskService.delete(id)
    }


}
