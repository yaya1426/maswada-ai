# AI Features - OpenAI Integration

## Overview

The backend now includes **production-ready OpenAI integration** for all AI features using GPT-4o-mini.

## Architecture

**Direct OpenAI Integration** - No abstraction layers, OpenAI service used directly in AI endpoints.

## Setup

### 1. Get OpenAI Credentials

1. Visit [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key (starts with `sk-`)
5. (Optional) Get your Organization ID from [Organization Settings](https://platform.openai.com/account/organization)
   - Only needed if you have multiple organizations
   - Starts with `org-`

### 2. Configure Environment

```bash
# In backend/.env
OPENAI_API_KEY=sk-your_actual_api_key_here

# Optional: Only if you have multiple organizations
OPENAI_ORGANIZATION_ID=org-your_organization_id_here
```

### 3. Restart Backend

```bash
npm run dev
```

You should see: `🤖 OpenAI: Configured ✓`

## Features

### 1. Summarize
- **Model**: gpt-5-mini
- **Max Tokens**: 500
- **Language**: Auto-detects from input (English & Arabic)
- **Use Case**: Generate concise summaries of notes

### 2. Rewrite
- **Model**: gpt-5-mini
- **Max Tokens**: 1000
- **Modes**:
  - `shorter` - Make it more concise
  - `clearer` - Improve clarity
  - `formal` - Professional tone
  - `casual` - Conversational tone
- **Language**: Auto-detects from input (English & Arabic)

### 3. Translate
- **Model**: gpt-5-mini
- **Max Tokens**: 1000
- **Auto-Detection**: Detects source language and translates to the opposite
  - English → Arabic
  - Arabic → English
- **Quality**: Professional translation with GPT-5

## API Endpoints

All endpoints require authentication (Bearer token).

### POST /api/ai/summarize
```json
{
  "text": "Your text to summarize..."
}
```

Or with a note:
```json
{
  "noteId": "uuid-of-existing-note"
}
```

Response stays in the same language as input.

### POST /api/ai/rewrite
```json
{
  "text": "Your text to rewrite...",
  "mode": "clearer"  // shorter | clearer | formal | casual
}
```

Response stays in the same language as input.

### POST /api/ai/translate
```json
{
  "text": "Hello world"
}
```

Auto-detects language and translates:
- English → Arabic
- Arabic → English

## Cost Estimation

Using **gpt-5-mini**:
- Latest GPT-5 model with improved performance
- Cost-effective pricing for production use

Check current pricing at: https://platform.openai.com/docs/pricing

Very affordable and powerful for an MVP! 💰

## Testing

Simply set your `OPENAI_API_KEY` in `.env` and the service will make real API calls to OpenAI.

## Error Handling

The service handles:
- Missing API key → Throws error on startup
- API errors → Returns error message
- Rate limits → Returns OpenAI's error response
- Invalid responses → Returns fallback message

## Models Used

Currently using **gpt-5-mini**:
- ✅ Latest GPT-5 model
- ✅ Cost-effective
- ✅ Fast responses
- ✅ Improved quality for summaries/translations
- ✅ Better multilingual support (EN/AR)

Can be upgraded to `gpt-5` (full model) by changing the model name in `openai.service.ts`.

## Implementation Details

See `backend/src/services/openai.service.ts` for the full implementation.

The service:
1. Initializes OpenAI client with API key
2. Uses appropriate system prompts for each task
3. Handles language-specific instructions
4. Returns clean text responses
5. Falls back gracefully on errors

## Next Steps

1. ✅ OpenAI provider implemented
2. ⏳ Test with real API key
3. ⏳ Integrate with frontend UI
4. ⏳ Add usage monitoring (optional)
5. ⏳ Consider response caching (optional)
