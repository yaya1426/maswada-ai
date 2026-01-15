# Maswada AI - Backend API

Backend REST API for the Maswada AI note-taking application with AI features.

## Tech Stack

- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Database**: SQLite with Sequelize ORM
- **Authentication**: Clerk (token verification)
- **Validation**: Zod
- **AI Provider**: Abstracted (mock provider included)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Required configuration:
- `CLERK_SECRET_KEY`: Get from Clerk dashboard
- `FRONTEND_ORIGIN`: Frontend URL for CORS (default: http://localhost:5173)
- `PORT`: Server port (default: 3001)
- `SQLITE_PATH`: Database file path (default: ./data/maswada.db)

### 3. Initialize Database

```bash
npm run db:sync
```

This will create the SQLite database and tables.

### 4. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3001` (or your configured PORT).

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:sync` - Sync database schema

## API Endpoints

### Public

- `GET /health` - Health check

### Protected (require Bearer token)

**Notes:**
- `GET /api/notes` - List all notes for authenticated user
- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a single note
- `PATCH /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note

**AI Features:**
- `POST /api/ai/summarize` - Summarize text or note
- `POST /api/ai/rewrite` - Rewrite text in different styles
- `POST /api/ai/translate` - Translate text between English and Arabic

## Authentication

All protected routes require a Bearer token in the Authorization header:

```
Authorization: Bearer <clerk_session_token>
```

The backend verifies tokens with Clerk and extracts the `userId` to scope all operations.

## Data Model

### Note

```typescript
{
  id: string;           // UUID
  userId: string;       // Clerk user ID
  title: string;
  content: string;
  language: 'en' | 'ar';
  summary: string | null;
  createdAt: Date;
  updatedAt: Date;
}
```

## AI Features (OpenAI)

The backend uses OpenAI's **GPT-5-mini** model directly for all AI features.

**Setup:**
1. Get API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Set `OPENAI_API_KEY=sk-...` in `.env`
3. (Optional) Set `OPENAI_ORGANIZATION_ID=org-...` if you have multiple organizations

**Features:**
- **Summarize**: Concise summaries in EN or AR
- **Rewrite**: Multiple modes (shorter, clearer, formal, casual)
- **Translate**: High-quality EN ↔ AR translation powered by GPT-5
- **Model**: Uses gpt-5-mini for optimal performance and cost

## Development Notes

- The project is scaffolded with stub implementations marked with `// TODO` comments
- Clerk token verification is stubbed in `src/middlewares/auth.ts` (implement in Phase B)
- Mock AI provider is functional but returns placeholder text
- Error handling is centralized in `src/middlewares/errorHandler.ts`
- All database queries are automatically scoped by `userId` for security

## Next Steps

See the root README.md for the implementation plan (Phases A-H).
