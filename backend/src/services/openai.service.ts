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

  async summarize(text: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: `You are a helpful assistant that summarizes text concisely. Always respond in the same language as the input text.`,
        },
        {
          role: 'user',
          content: `Please summarize the following text:\n\n${text}`,
        },
      ],
      max_completion_tokens: 500,
    });

    return response.choices[0]?.message?.content || 'Failed to generate summary';
  }

  async rewrite(
    text: string,
    mode: 'shorter' | 'clearer' | 'formal' | 'casual'
  ): Promise<string> {
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
          content: `Please rewrite the following text:\n\n${text}`,
        },
      ],
      max_completion_tokens: 1000,
    });

    return response.choices[0]?.message?.content || 'Failed to rewrite text';
  }

  async translate(text: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Detect the language of the input text:
- If the text is in English, translate it to Arabic.
- If the text is in Arabic, translate it to English.
Maintain the original meaning, tone, and style. Only provide the translation, no explanations.`,
        },
        {
          role: 'user',
          content: text,
        },
      ],
      max_completion_tokens: 1000,
    });

    return response.choices[0]?.message?.content || 'Failed to translate text';
  }
}

export const openAiService = new OpenAiService();
