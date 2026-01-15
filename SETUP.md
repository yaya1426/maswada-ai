# Maswada AI - Setup Instructions

## Quick Start Guide

### 1. Get API Credentials

#### Clerk (Required for Authentication)
1. Go to [clerk.com](https://clerk.com) and create a free account
2. Create a new application
3. From the [Clerk Dashboard](https://dashboard.clerk.com), copy both keys:
   - **Publishable Key** (starts with `pk_test_`) - Used in frontend
   - **Secret Key** (starts with `sk_test_`) - Used in backend

#### OpenAI (Required for AI Features)
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create an account or sign in
3. Create a new API key
4. Copy your **API Key** (starts with `sk-`)
5. (Optional) If you have multiple organizations, get your **Organization ID** from [Organization Settings](https://platform.openai.com/account/organization) (starts with `org-`)

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env

# Edit .env and set:
# CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
# CLERK_SECRET_KEY=sk_test_your_secret_key_here
# OPENAI_API_KEY=sk-your_openai_api_key_here
# OPENAI_ORGANIZATION_ID=org-your_org_id_here  (optional)

# Initialize database
npm run db:sync

# Start development server
npm run dev
```

Backend will run on **http://localhost:3001**

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies (already done if you followed along)
# npm install

# Configure environment
cp .env.example .env

# Edit .env and set:
# VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Start development server
npm run dev
```

Frontend will run on **http://localhost:5173**

## Verification

### Test Backend

```bash
curl http://localhost:3001/health
```

Should return:
```json
{
  "status": "ok",
  "timestamp": "2026-01-14T...",
  "service": "maswada-ai-backend"
}
```

### Test Frontend

Open http://localhost:5173 in your browser. You should see the Maswada AI landing page.

## Project Status

✅ **Backend**: Fully scaffolded and compiling
- Express.js server with TypeScript
- SQLite database with Sequelize
- All routes defined (health, notes CRUD, AI endpoints)
- Mock AI provider functional
- Zod validation schemas ready
- Error handling middleware in place

✅ **Frontend**: Fully scaffolded and compiling
- React 19 + Vite + TypeScript
- Tailwind CSS v4 configured
- Folder structure with page stubs
- API client structure ready
- i18n context prepared
- Builds successfully

⏳ **Next Steps**: Follow the phased implementation plan in README.md

## Common Issues

### Backend won't start
- Make sure `CLERK_SECRET_KEY` is set in `backend/.env`
- Check that port 3001 is not in use
- Run `npm run db:sync` to initialize database

### Frontend won't start
- Make sure `VITE_CLERK_PUBLISHABLE_KEY` is set in `frontend/.env`
- Check that port 5173 is not in use
- Clear node_modules and reinstall if needed

### TypeScript errors
- Run `npm run build` to check for compilation errors
- Both projects should compile without errors

## Development Workflow

1. Start backend: `cd backend && npm run dev`
2. Start frontend: `cd frontend && npm run dev`
3. Make changes and see them hot-reload
4. Follow the implementation plan in README.md

## Implementation Order

Follow the phases in order:

1. **Phase B**: Implement Clerk authentication in backend
2. **Phase C**: Test notes CRUD operations
3. **Phase D**: Add real AI provider (optional, mock works)
4. **Phase E**: Set up React Router and Clerk in frontend
5. **Phase F**: Build notes UI and connect to API
6. **Phase G**: Add internationalization (EN/AR)
7. **Phase H**: Implement AI features UI

Good luck! 🚀
