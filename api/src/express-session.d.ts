import 'express-session';

/**
 * Extends the `express-session` module injecting `userId` field to the session data interface
 * This allows storing the user's ID in the session for authenticated requests.
 */
declare module 'express-session' {
  interface SessionData {
    userId?: number;
  }
}
