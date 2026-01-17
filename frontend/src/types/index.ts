// Shared type definitions for the frontend application

export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  summary: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateNoteData {
  title: string;
  content: string;
}

export interface UpdateNoteData {
  title?: string;
  content?: string;
  summary?: string | null;
}

export interface SummarizeRequest {
  noteId?: string;
  text?: string;
  language?: 'en' | 'ar';
}

export interface SummarizeResponse {
  summary: string;
}

export interface RewriteRequest {
  noteId?: string;
  text?: string;
  mode: 'shorter' | 'clearer' | 'formal' | 'casual';
  language?: 'en' | 'ar';
}

export interface RewriteResponse {
  rewrittenText: string;
}

export interface TranslateRequest {
  noteId?: string;
  text?: string;
}

export interface TranslateResponse {
  translatedText: string;
}

export type Locale = 'en' | 'ar';
