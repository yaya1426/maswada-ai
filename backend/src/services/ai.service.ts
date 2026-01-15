import { SummarizeInput, RewriteInput, TranslateInput } from '../validators/ai.schema';
import { notesService } from './notes.service';
import { openAiService } from './openai.service';

export class AiService {
  async summarize(userId: string, input: SummarizeInput): Promise<{ result: string }> {
    let text = input.text;

    // If noteId provided, fetch note content
    if (input.noteId) {
      const note = await notesService.findByIdAndUserId(input.noteId, userId);
      text = note.content;
    }

    if (!text) {
      throw new Error('No text to summarize');
    }

    const result = await openAiService.summarize(text);
    return { result };
  }

  async rewrite(userId: string, input: RewriteInput): Promise<{ result: string }> {
    let text = input.text;

    // If noteId provided, fetch note content
    if (input.noteId) {
      const note = await notesService.findByIdAndUserId(input.noteId, userId);
      text = note.content;
    }

    if (!text) {
      throw new Error('No text to rewrite');
    }

    const result = await openAiService.rewrite(text, input.mode);
    return { result };
  }

  async translate(userId: string, input: TranslateInput): Promise<{ result: string }> {
    let text = input.text;

    // If noteId provided, fetch note content
    if (input.noteId) {
      const note = await notesService.findByIdAndUserId(input.noteId, userId);
      text = note.content;
    }

    if (!text) {
      throw new Error('No text to translate');
    }

    const result = await openAiService.translate(text, input.target);
    return { result };
  }
}

export const aiService = new AiService();
