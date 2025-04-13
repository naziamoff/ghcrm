import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { AuthError } from '../constants';
import { Request } from 'express';

/**
 * AuthGuard to protect routes by checking if the user is authenticated.
 * Retrieves user information based on the session's userId (which is being saved during sign-in) and attaches it to the request.
 *
 * @Throws UnauthorizedException if the user is not authenticated.
 * @returns {Promise<boolean>} - Returns `true` if the user is authenticated, otherwise throws an exception.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  public constructor(private readonly userService: UserService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    if (typeof request.session.userId === 'undefined') {
      throw new UnauthorizedException(AuthError.Unauthorized);
    }

    const user = await this.userService.findById(request.session.userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    request.user = user;

    return true;
  }
}
