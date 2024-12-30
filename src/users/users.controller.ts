import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindAllParamsUser, UserDto } from './user.dto';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Post()
    async create(@Body() user: UserDto){
        return await this.usersService.create(user)
        
    }
    
    @Get('/:id')
    async findUser(@Param('id') id: string): Promise<UserDto>{
        return await this.usersService.findUser(id)
    }

    @Get()
    async findAll(@Query() paramsConsulta: FindAllParamsUser): Promise<UserDto[]>{
        return await this.usersService.findAll(paramsConsulta)
    }


    @Put('/:id')
    async update(@Param('id') id: string, @Body() user: UserDto){
        await this.usersService.update(id, user)
    }

    @HttpCode(204)
    @Delete('/:id')
    delete(@Param('id') id: string){
        this.usersService.delete(id)
    }


}