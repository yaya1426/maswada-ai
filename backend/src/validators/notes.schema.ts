import { z } from 'zod';

// Language removed - AI detects it automatically from content
export const createNoteSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
});

export const updateNoteSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  content: z.string().min(1).optional(),
  summary: z.string().nullable().optional(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
