import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    TaskModule, 
    UsersModule, 
    AuthModule, 
    ConfigModule.forRoot({isGlobal: true}), DbModule // forRoot serve para definir que o módulo é global e pode ser acessado por toda a aplicação
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  
}
