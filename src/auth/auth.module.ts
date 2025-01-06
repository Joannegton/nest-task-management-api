import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module(
  {
    imports:
      [
        JwtModule.registerAsync(
          {
            // Importa o módulo JwtModule e define a configuração do JWT, registerAsync serve para definir a configuração de forma assíncrona
            global:
              true, // Define que o módulo é global
            imports:
              [],
            //useFactory serve para definir a função que será executada para retornar a configuração do JWT
            useFactory:
              async (
                configService: ConfigService,
              ) => ({
                //parametro configService é do tipo ConfigService
                secret:
                  configService.get<string>(
                    'JWT_SECRET',
                  ), // Define a chave secreta do JWT
                loginOptions:
                  {
                    expiresIn:
                      +configService.get<number>(
                        'JWT_EXPIRATION',
                      ),
                  }, // Define o tempo de expiração do token
              }),
            inject:
              [
                ConfigService,
              ], // Define as dependências que serão injetadas na função useFactory
          },
        ),
        UsersModule,
      ],
    controllers:
      [
        AuthController,
      ],
    providers:
      [
        AuthService,
      ],
  },
)
export class AuthModule {}
