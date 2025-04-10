import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../../user/user.service';
import { AuthError } from '../constants';
import { Request } from 'express';

/**
 * AuthGuard to protect routes by checking if the user is authenticated.
 * Retrieves user information based on the session's userId and attaches it to the request.
 * Throws an `UnauthorizedException` if the user is not authenticated.
 *
 * @param {ExecutionContext} context - The execution context containing the request.
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

    if (user) {
      request.user = user;
    }

    return true;
  }
}
