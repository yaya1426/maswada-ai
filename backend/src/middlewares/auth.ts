import { Request, Response, NextFunction } from 'express';
import { getAuth } from '@clerk/express';

/**
 * Middleware to require Clerk authentication
 * Uses the new @clerk/express SDK
 * Adds auth property to request with userId and sessionId
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    // Get auth from Clerk middleware
    const auth = getAuth(req);

    if (!auth.userId) {
      res.status(401).json({ 
        error: 'Unauthorized',
        message: 'You must be signed in to access this resource'
      });
      return;
    }

    // Attach auth info to request for consistency with existing code
    req.auth = { 
      userId: auth.userId,
      sessionId: auth.sessionId,
    };

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      error: 'Authentication error',
      message: 'An error occurred during authentication'
    });
  }
}
