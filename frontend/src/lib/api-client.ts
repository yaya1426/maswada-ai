import type {
  Note,
  CreateNoteData,
  UpdateNoteData,
  SummarizeRequest,
  SummarizeResponse,
  RewriteRequest,
  RewriteResponse,
  TranslateRequest,
  TranslateResponse,
} from "@/types"

export class ApiClient {
  private baseURL: string
  private getToken: () => Promise<string | null>

  constructor(baseURL: string, getToken: () => Promise<string | null>) {
    this.baseURL = baseURL
    this.getToken = getToken
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getToken()
    
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(options.headers as Record<string, string> || {}),
    }

    if (token) {
      headers["Authorization"] = `Bearer ${token}`
    }

    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers,
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: response.statusText,
      }))
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return undefined as T
    }

    return response.json()
  }

  // Notes endpoints
  async getNotes(): Promise<Note[]> {
    const data = await this.request<{ notes: Note[] }>("/api/notes")
    return data.notes
  }

  async getNote(id: string): Promise<Note> {
    const data = await this.request<{ note: Note }>(`/api/notes/${id}`)
    return data.note
  }

  async createNote(data: CreateNoteData): Promise<Note> {
    const response = await this.request<{ note: Note }>("/api/notes", {
      method: "POST",
      body: JSON.stringify(data),
    })
    return response.note
  }

  async updateNote(id: string, data: UpdateNoteData): Promise<Note> {
    const response = await this.request<{ note: Note }>(`/api/notes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    })
    return response.note
  }

  async deleteNote(id: string): Promise<void> {
    await this.request<void>(`/api/notes/${id}`, {
      method: "DELETE",
    })
  }

  // AI endpoints
  async summarize(data: SummarizeRequest): Promise<SummarizeResponse> {
    const response = await this.request<{ result: string }>("/api/ai/summarize", {
      method: "POST",
      body: JSON.stringify(data),
    })
    return { summary: response.result }
  }

  async rewrite(data: RewriteRequest): Promise<RewriteResponse> {
    const response = await this.request<{ result: string }>("/api/ai/rewrite", {
      method: "POST",
      body: JSON.stringify(data),
    })
    return { rewrittenText: response.result }
  }

  async translate(data: TranslateRequest): Promise<TranslateResponse> {
    const response = await this.request<{ result: string }>("/api/ai/translate", {
      method: "POST",
      body: JSON.stringify(data),
    })
    return { translatedText: response.result }
  }
}

// Create API client instance factory
export function createApiClient(getToken: () => Promise<string | null>): ApiClient {
  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001"
  return new ApiClient(baseURL, getToken)
}
