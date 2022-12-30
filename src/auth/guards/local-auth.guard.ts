import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  logger = new Logger('AuthenticationGuard');
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { username, password } = request.body;
    this.logger.log(`Authentication starts for ${username}`);
    try {
      const user = await this.authService.autherizeUser(username, password);
      request.user = user;
      this.logger.log(`${username} authenticated.`);
    } catch (err) {
      this.logger.warn(`${username} ${err}`);
      return false;
    }

    return true;
  }
}
