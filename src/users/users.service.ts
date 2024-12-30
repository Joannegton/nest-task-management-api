import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FindAllParamsUser, UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsersService {

    private users: UserDto[] = []

    create(user: UserDto){
        user.id = uuid()
        user.senha = hashSync(user.senha, 10)
    
        this.users.push(user)
    }

    findUser(id: string): UserDto{
        const foundUser = this.users.filter(user => user.id === id)

        if(foundUser.length >= 0){
            return foundUser[0]
        }

        throw new HttpException(`User with id ${id} not found`, HttpStatus.NOT_FOUND)
    }

    findAll(paramsConsulta: FindAllParamsUser): UserDto[]{
        return this.users.filter(user => {
            if(paramsConsulta.id && !user.id.includes(paramsConsulta.id)){
                return false
            }

            if(paramsConsulta.nome && !user.nome.includes(paramsConsulta.nome)){
                return false
            }

            if(paramsConsulta.cpf && !user.cpf.includes(paramsConsulta.cpf)){
                return false
            }

            return true
        })
    }

    findByEmail(email: string): UserDto | null {
        return this.users.find(user => user.email === email)

    }

    update(user: UserDto){
        const userIndex = this.users.findIndex(u => u.id === user.id)

        if(userIndex >= 0){
            this.users[userIndex] = user
            return
        }

        throw new HttpException(`User with id ${user.id} not found`, HttpStatus.NOT_FOUND)
    }

    delete(userId: string){
        const userIndex = this.users.findIndex(u => u.id === userId)

        if(userIndex >= 0){
            this.users.slice(userIndex, 1)
            return
        }

        throw new HttpException(`User with id ${userId} not found`, HttpStatus.NOT_FOUND)
    }

}
