import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';

@Module(
  {
    imports:
      [
        TypeOrmModule.forFeature(
          [
            UserEntity,
          ],
        ),
      ], // forFeature define as entidades que serão utilizadas no módulo
    controllers:
      [
        UsersController,
      ],
    providers:
      [
        UsersService,
      ],
    exports:
      [
        UsersService,
      ],
  },
)
export class UsersModule {}
