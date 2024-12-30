import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { FindAllParamsUser, UserDto } from './user.dto';
import { v4 as uuid } from 'uuid';
import { hashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { FindOptionsWhere, ILike, Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>){} // Injeção de dependência do repositório de usuários

    async create(user: UserDto){
        const userExists = await this.findByEmail(user.email)

        if(userExists){
            throw new ConflictException(`User ${user.email} already exists`)
        }

        user.id = uuid()
        user.senha = hashSync(user.senha, 10)
    
        const newUser = this.userRepository.create(user)
        await this.userRepository.save(newUser)

        return {id: newUser.id, email: newUser.email}
    }

    async findUser(id: string): Promise<UserDto>{
        const foundUser = await this.userRepository.findOne({where: {id}})

        if(!foundUser){
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return foundUser
    }

    async findByEmail(email: string): Promise<UserDto> {
        const foundUser = this.userRepository.findOne({where: {email}})

        if(!foundUser){
            throw new NotFoundException(`User with email ${email} not found`)
        }

        return foundUser

    }


    async findAll(paramsConsulta: FindAllParamsUser): Promise<UserDto[]>{
        const searchParams: FindOptionsWhere<UserEntity> = {}
        
        if(paramsConsulta.nome){
            searchParams.nome = ILike(`%${paramsConsulta.nome}%`)
        }

        if(paramsConsulta.cpf){
            searchParams.cpf = ILike(`%${paramsConsulta.cpf}%`)
        }

        const usersFound = await this.userRepository.find({where: searchParams})

        return usersFound
    }

    

    async update(id: string, user: UserDto){
        const foundUser = await this.userRepository.findOne({where: {id}})

        if(!foundUser){
            throw new NotFoundException(`User with id ${id} not found`)
        }

        await this.userRepository.update(id, user)

    }

    async delete(id: string){
        const foundUser = await this.userRepository.findOne({where: {id}})

        if(!foundUser){
            throw new NotFoundException(`User with id ${id} not found`)
        }

        await this.userRepository.delete(id)

    }

    

}
