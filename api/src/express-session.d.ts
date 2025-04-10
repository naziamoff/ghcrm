import 'express-session';

/**
 * Extends the `express-session` module to add a `userId` field to the session data.
 * This allows storing the user's ID in the session for authenticated requests.
 */
declare module 'express-session' {
  interface SessionData {
    userId?: number;  // Optional userId field to store the user's ID.
  }
}
