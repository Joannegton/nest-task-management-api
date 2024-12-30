import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponseDto } from './auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    login(@Body('email') email: string, @Body('senha') senha: string): AuthResponseDto{
        return this.authService.login(email, senha)
    }
}
