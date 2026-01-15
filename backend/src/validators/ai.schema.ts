import { z } from 'zod';

export const summarizeSchema = z.object({
  noteId: z.string().uuid().optional(),
  text: z.string().min(1).optional(),
}).refine(
  (data) => data.noteId || data.text,
  { message: 'Either noteId or text must be provided' }
);

export const rewriteSchema = z.object({
  noteId: z.string().uuid().optional(),
  text: z.string().min(1).optional(),
  mode: z.enum(['shorter', 'clearer', 'formal', 'casual']),
}).refine(
  (data) => data.noteId || data.text,
  { message: 'Either noteId or text must be provided' }
);

export const translateSchema = z.object({
  noteId: z.string().uuid().optional(),
  text: z.string().min(1).optional(),
  target: z.enum(['en', 'ar']),
}).refine(
  (data) => data.noteId || data.text,
  { message: 'Either noteId or text must be provided' }
);

export type SummarizeInput = z.infer<typeof summarizeSchema>;
export type RewriteInput = z.infer<typeof rewriteSchema>;
export type TranslateInput = z.infer<typeof translateSchema>;
