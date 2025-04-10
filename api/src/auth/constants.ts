export enum AuthError {
  InvalidCredentials = 'Invalid credentials',
  FailedToSaveSession = 'Failed to save session. Please try again later',
  EmailIsAlreadyTaken = 'Email already taken',
  Unauthorized = 'User is not authorized. Please sign in to get access',
  TokenNotFound = 'Confirmation token not found.',
  TokenExpired = 'Confirmation token has expired. Please, request a new token for confirmation.',
}
