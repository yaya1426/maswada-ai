import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { requireAuth } from '../middlewares/auth';
import { aiService } from '../services/ai.service';
import { summarizeSchema, rewriteSchema, translateSchema } from '../validators/ai.schema';

const router = Router();

// All routes require authentication
router.use(requireAuth);

// POST /api/ai/summarize - Summarize text or note
router.post('/summarize', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = summarizeSchema.parse(req.body);
    const result = await aiService.summarize(req.auth!.userId, data);
    res.json(result);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// POST /api/ai/rewrite - Rewrite text or note
router.post('/rewrite', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = rewriteSchema.parse(req.body);
    const result = await aiService.rewrite(req.auth!.userId, data);
    res.json(result);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// POST /api/ai/translate - Translate text or note
router.post('/translate', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = translateSchema.parse(req.body);
    const result = await aiService.translate(req.auth!.userId, data);
    res.json(result);
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

export default router;
