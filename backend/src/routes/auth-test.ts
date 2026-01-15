import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { requireAuth } from '../middlewares/auth';

const router = Router();

// Test endpoint to verify authentication works
router.get('/me', requireAuth, (async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({
      message: 'Authentication successful',
      userId: req.auth!.userId,
      sessionId: req.auth!.sessionId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

export default router;
