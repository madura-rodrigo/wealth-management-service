import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/model/user.model';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async autherizeUser(email: string, pwd: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);

    if (!user) throw new BadRequestException();

    if (!(await bcrypt.compare(pwd, (await user).password)))
      throw new UnauthorizedException();

    return user;
  }

  login(user: any) {
    const payload = { name: user.firstName, sub: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
