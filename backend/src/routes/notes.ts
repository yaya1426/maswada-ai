import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { requireAuth } from '../middlewares/auth';
import { notesService } from '../services/notes.service';
import { createNoteSchema, updateNoteSchema } from '../validators/notes.schema';

const router = Router();

// All routes require authentication
router.use(requireAuth);

// GET /api/notes - List all notes for authenticated user
router.get('/', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await notesService.findAllByUserId(req.auth!.userId);
    res.json({ notes });
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// POST /api/notes - Create a new note
router.post('/', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = createNoteSchema.parse(req.body);
    const note = await notesService.create(req.auth!.userId, data);
    res.status(201).json({ note });
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// GET /api/notes/:id - Get a single note
router.get('/:id', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const note = await notesService.findByIdAndUserId(id, req.auth!.userId);
    res.json({ note });
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// PATCH /api/notes/:id - Update a note
router.patch('/:id', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = updateNoteSchema.parse(req.body);
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const note = await notesService.update(id, req.auth!.userId, data);
    res.json({ note });
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

// DELETE /api/notes/:id - Delete a note
router.delete('/:id', (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await notesService.delete(id, req.auth!.userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}) as RequestHandler);

export default router;
