import OpenAI from 'openai';
import { config } from '../config/env';

class OpenAiService {
  private client: OpenAI;
  private model: string;

  constructor() {
    if (!config.openai.apiKey) {
      throw new Error('OPENAI_API_KEY is required. Please set it in your .env file.');
    }

    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
      organization: config.openai.organization || undefined,
    });

    this.model = config.openai.model;
  }

  /**
   * Sanitize text by removing problematic characters and normalizing Unicode
   */
  private sanitizeText(text: string): string {
    if (!text) return text;

    let sanitized = text;

    // Remove null bytes and other control characters (except newlines, tabs, carriage returns)
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    // Normalize Unicode characters (NFC normalization)
    sanitized = sanitized.normalize('NFC');

    // Remove zero-width characters that might cause issues
    sanitized = sanitized.replace(/[\u200B-\u200D\uFEFF]/g, '');

    // Replace multiple consecutive spaces with single space
    sanitized = sanitized.replace(/ +/g, ' ');

    // Replace multiple consecutive newlines with max 2 newlines
    sanitized = sanitized.replace(/\n{3,}/g, '\n\n');

    // Trim leading and trailing whitespace
    sanitized = sanitized.trim();

    console.log('[OpenAI] Text sanitized:', {
      originalLength: text.length,
      sanitizedLength: sanitized.length,
      changed: text !== sanitized,
    });

    return sanitized;
  }

  async summarize(text: string): Promise<string> {
    try {
      console.log('[OpenAI] Starting summarize request...');
      
      // Sanitize input text
      const sanitizedText = this.sanitizeText(text);
      
      if (!sanitizedText || sanitizedText.trim() === '') {
        console.error('[OpenAI] Summarize failed: Empty text after sanitization');
        throw new Error('Text is empty after sanitization');
      }

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that summarizes text concisely. Always respond in the same language as the input text.`,
          },
          {
            role: 'user',
            content: `Please summarize the following text:\n\n${sanitizedText}`,
          },
        ],
        max_completion_tokens: 500,
      });

      const summary = response.choices[0]?.message?.content;
      
      if (!summary || summary.trim() === '') {
        console.error('[OpenAI] Summarize returned empty result');
        throw new Error('Summary resulted in empty content');
      }

      console.log('[OpenAI] Summarize request successful');
      return summary;
    } catch (error) {
      console.error('[OpenAI] Summarize request failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        model: this.model,
        textLength: text.length,
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw new Error(`OpenAI summarize failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async rewrite(
    text: string,
    mode: 'shorter' | 'clearer' | 'formal' | 'casual'
  ): Promise<string> {
    try {
      console.log(`[OpenAI] Starting rewrite request with mode: ${mode}...`);
      
      // Sanitize input text
      const sanitizedText = this.sanitizeText(text);
      
      if (!sanitizedText || sanitizedText.trim() === '') {
        console.error('[OpenAI] Rewrite failed: Empty text after sanitization');
        throw new Error('Text is empty after sanitization');
      }

      const modeInstructions = {
        shorter: 'Make it more concise and brief while keeping all the main points.',
        clearer: 'Make it clearer and easier to understand, improving readability.',
        formal: 'Rewrite it in a formal, professional tone.',
        casual: 'Rewrite it in a casual, conversational tone.',
      };

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are a helpful assistant that rewrites text. ${modeInstructions[mode]} Always respond in the same language as the input text.`,
          },
          {
            role: 'user',
            content: `Please rewrite the following text:\n\n${sanitizedText}`,
          },
        ],
        max_completion_tokens: 1000,
      });

      const rewrittenText = response.choices[0]?.message?.content;
      
      if (!rewrittenText || rewrittenText.trim() === '') {
        console.error('[OpenAI] Rewrite returned empty result');
        throw new Error('Rewrite resulted in empty content');
      }

      console.log('[OpenAI] Rewrite request successful');
      return rewrittenText;
    } catch (error) {
      console.error('[OpenAI] Rewrite request failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        model: this.model,
        mode,
        textLength: text.length,
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw new Error(`OpenAI rewrite failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async translate(text: string): Promise<string> {
    try {
      console.log('[OpenAI] Starting translate request (auto-detect language)...');
      
      // Sanitize input text
      const sanitizedText = this.sanitizeText(text);
      
      if (!sanitizedText || sanitizedText.trim() === '') {
        console.error('[OpenAI] Translate failed: Empty text after sanitization');
        throw new Error('Text is empty after sanitization');
      }

      console.log('[OpenAI] Sending request with text length:', sanitizedText.length);

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are a professional translator. Detect the language of the input text. If it's in English, translate it to Arabic. If it's in Arabic, translate it to English. Maintain the original meaning, tone, and style. Only provide the translation, no explanations.`,
          },
          {
            role: 'user',
            content: sanitizedText,
          },
        ],
        max_completion_tokens: 2000, // Increased for longer translations
      });

      console.log('[OpenAI] Response received:', {
        id: response.id,
        model: response.model,
        choices: response.choices.length,
        finishReason: response.choices[0]?.finish_reason,
        hasContent: !!response.choices[0]?.message?.content,
        contentLength: response.choices[0]?.message?.content?.length || 0,
      });

      const translatedText = response.choices[0]?.message?.content;
      
      // Log the actual finish reason for debugging
      if (response.choices[0]?.finish_reason !== 'stop') {
        console.warn('[OpenAI] Unusual finish reason:', response.choices[0]?.finish_reason);
      }

      if (!translatedText || translatedText.trim() === '') {
        console.error('[OpenAI] Translate returned empty result', {
          finishReason: response.choices[0]?.finish_reason,
          responseId: response.id,
        });
        throw new Error('Translation resulted in empty content');
      }

      console.log('[OpenAI] Translate request successful, translated length:', translatedText.length);
      return translatedText;
    } catch (error) {
      console.error('[OpenAI] Translate request failed:', {
        error: error instanceof Error ? error.message : 'Unknown error',
        model: this.model,
        textLength: text.length,
        stack: error instanceof Error ? error.stack : undefined,
      });
      throw new Error(`OpenAI translate failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

export const openAiService = new OpenAiService();
