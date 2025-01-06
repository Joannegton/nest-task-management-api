export class UserDto {
  id: string;
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  nasc: Date;
}

export interface FindAllParamsUser {
  id: string;
  nome: string;
  cpf: string;
}
