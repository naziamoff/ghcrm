import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { RequestWithUser } from '../guards/interfaces/requestWithUser';

/**
 * Custom decorator to access user data from the request object.
 * Returns the entire user or a specific field if `data` is provided.
 *
 * @param {keyof User} data - The user field to retrieve (optional).
 * @param {ExecutionContext} ctx - The execution context.
 * @returns {User | any} - The user object or specific field.
 */
export const Authorized = createParamDecorator(
  (userKey: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    return userKey ? user[userKey] : user;
  },
);
