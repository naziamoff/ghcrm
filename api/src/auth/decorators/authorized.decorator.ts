import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

/**
 * Custom decorator to access user data from the request object.
 * Returns the entire user or a specific field if `data` is provided.
 *
 * @param {keyof User} data - The user field to retrieve (optional).
 * @param {ExecutionContext} ctx - The execution context.
 * @returns {User | any} - The user object or specific field.
 */
export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);
