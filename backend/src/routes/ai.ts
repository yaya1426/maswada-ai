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
    console.log('[AI Route] POST /api/ai/summarize - Request received');
    const data = summarizeSchema.parse(req.body);
    const result = await aiService.summarize(req.auth!.userId, data);
    console.log('[AI Route] Summarize request completed successfully');
    res.json(result);
  } catch (error) {
    console.error('[AI Route] Summarize request failed:', error instanceof Error ? error.message : 'Unknown error');
    next(error);
  }
}) as RequestHandler);

// POST /api/ai/rewrite - Rewrite text or note
router.post('/rewrite', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('[AI Route] POST /api/ai/rewrite - Request received');
    const data = rewriteSchema.parse(req.body);
    const result = await aiService.rewrite(req.auth!.userId, data);
    console.log('[AI Route] Rewrite request completed successfully');
    res.json(result);
  } catch (error) {
    console.error('[AI Route] Rewrite request failed:', error instanceof Error ? error.message : 'Unknown error');
    next(error);
  }
}) as RequestHandler);

// POST /api/ai/translate - Translate text or note
router.post('/translate', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log('[AI Route] POST /api/ai/translate - Request received');
    const data = translateSchema.parse(req.body);
    const result = await aiService.translate(req.auth!.userId, data);
    console.log('[AI Route] Translate request completed successfully');
    res.json(result);
  } catch (error) {
    console.error('[AI Route] Translate request failed:', error instanceof Error ? error.message : 'Unknown error');
    next(error);
  }
}) as RequestHandler);

export default router;
