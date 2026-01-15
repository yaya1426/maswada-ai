import { Request, Response, NextFunction } from 'express';
import { clerkClient } from '@clerk/clerk-sdk-node';
import { config } from '../config/env';

/**
 * Middleware to verify Clerk authentication token and extract userId
 * Requires Bearer token in Authorization header
 * Adds auth property to request with userId and sessionId
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ 
        error: 'Missing or invalid authorization header',
        message: 'Please provide a valid Bearer token'
      });
      return;
    }

    const token = authHeader.substring(7);

    if (!token) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    // Verify token with Clerk using the SDK
    try {
      // Verify the session token with Clerk
      const session = await clerkClient.verifyToken(token, {
        secretKey: config.clerk.secretKey,
      });

      if (!session.sub) {
        res.status(401).json({ error: 'Invalid token: missing user ID' });
        return;
      }

      // Extract userId from verified token
      const userId = session.sub;

      // Attach auth info to request
      req.auth = { 
        userId,
        sessionId: session.sid,
      };

      next();
    } catch (verifyError: any) {
      console.error('Token verification failed:', verifyError.message);
      
      // Handle specific Clerk errors
      if (verifyError.message?.includes('expired')) {
        res.status(401).json({ 
          error: 'Token expired',
          message: 'Your session has expired. Please sign in again.'
        });
        return;
      }

      res.status(401).json({ 
        error: 'Invalid token',
        message: 'Token verification failed'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ 
      error: 'Authentication error',
      message: 'An error occurred during authentication'
    });
  }
}
