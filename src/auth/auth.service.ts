import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthResponseDto } from './auth.dto';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpires: number;
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpires =
      +this.configService.get<number>(
        'JWT_EXPIRATION',
      ); // + converte o valor para number
  }

  async login(
    email: string,
    senha: string,
  ): Promise<AuthResponseDto> {
    const foundUser =
      await this.usersService.findByEmail(
        email,
      );

    if (
      !foundUser ||
      !compareSync(
        senha,
        foundUser.senha,
      )
    ) {
      throw new UnauthorizedException();
    }

    const payload =
      {
        sub: foundUser.id,
        email:
          foundUser.email,
      };

    const token =
      this.jwtService.sign(
        payload,
      );

    return {
      token,
      expiresIn:
        this
          .jwtExpires,
    };
  }
}
