import { z } from 'zod';

// Language removed - AI detects it automatically from content
export const createNoteSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string(), // Allow empty content for new notes
});

export const updateNoteSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  content: z.string().optional(), // Allow empty content
  summary: z.string().nullable().optional(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type UpdateNoteInput = z.infer<typeof updateNoteSchema>;
