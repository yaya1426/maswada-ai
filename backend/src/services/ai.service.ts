import { SummarizeInput, RewriteInput, TranslateInput } from '../validators/ai.schema';
import { notesService } from './notes.service';
import { openAiService } from './openai.service';

export class AiService {
  async summarize(userId: string, input: SummarizeInput): Promise<{ result: string }> {
    try {
      console.log(`[AI Service] Summarize request from user: ${userId}`);
      let text = input.text;

      // If noteId provided, fetch note content
      if (input.noteId) {
        console.log(`[AI Service] Fetching note: ${input.noteId}`);
        const note = await notesService.findByIdAndUserId(input.noteId, userId);
        text = note.content;
      }

      if (!text) {
        console.error('[AI Service] Summarize failed: No text provided');
        throw new Error('No text to summarize');
      }

      const result = await openAiService.summarize(text);
      console.log('[AI Service] Summarize completed successfully');
      return { result };
    } catch (error) {
      console.error('[AI Service] Summarize error:', {
        userId,
        noteId: input.noteId,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw error;
    }
  }

  async rewrite(userId: string, input: RewriteInput): Promise<{ result: string }> {
    try {
      console.log(`[AI Service] Rewrite request from user: ${userId}, mode: ${input.mode}`);
      let text = input.text;

      // If noteId provided, fetch note content
      if (input.noteId) {
        console.log(`[AI Service] Fetching note: ${input.noteId}`);
        const note = await notesService.findByIdAndUserId(input.noteId, userId);
        text = note.content;
      }

      if (!text) {
        console.error('[AI Service] Rewrite failed: No text provided');
        throw new Error('No text to rewrite');
      }

      const result = await openAiService.rewrite(text, input.mode);
      console.log('[AI Service] Rewrite completed successfully');
      return { result };
    } catch (error) {
      console.error('[AI Service] Rewrite error:', {
        userId,
        noteId: input.noteId,
        mode: input.mode,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw error;
    }
  }

  async translate(userId: string, input: TranslateInput): Promise<{ result: string }> {
    try {
      console.log(`[AI Service] Translate request from user: ${userId} (auto-detect language)`);
      let text = input.text;

      // If noteId provided, fetch note content
      if (input.noteId) {
        console.log(`[AI Service] Fetching note: ${input.noteId}`);
        const note = await notesService.findByIdAndUserId(input.noteId, userId);
        text = note.content;
      }

      if (!text) {
        console.error('[AI Service] Translate failed: No text provided');
        throw new Error('No text to translate');
      }

      const result = await openAiService.translate(text);
      console.log('[AI Service] Translate completed successfully');
      return { result };
    } catch (error) {
      console.error('[AI Service] Translate error:', {
        userId,
        noteId: input.noteId,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw error;
    }
  }
}

export const aiService = new AiService();
