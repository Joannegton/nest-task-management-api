import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { FindAllParamsUser, UserDto } from './user.dto';


@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService){}

    @Post()
    create(@Body() user: UserDto){
        this.usersService.create(user)
    }
    
    @Get('/:id')
    findUser(@Param('id') id: string): UserDto{
        return this.usersService.findUser(id)
    }

    @Get()
    findAll(@Query() paramsConsulta: FindAllParamsUser): UserDto[]{
        return this.usersService.findAll(paramsConsulta)
    }

    @Put()
    update(@Body() user: UserDto){
        this.usersService.update(user)
    }

    @HttpCode(204)
    @Delete('/:id')
    delete(@Param('id') id: string){
        this.usersService.delete(id)
    }


}