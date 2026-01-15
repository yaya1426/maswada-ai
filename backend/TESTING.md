# Backend API Testing Guide

## Prerequisites

1. Backend server running: `npm run dev`
2. Valid Clerk authentication token from frontend
3. API testing tool (Postman, Thunder Client, or curl)

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_clerk_token>
```

## Test Endpoints

### 1. Health Check (Public)

```bash
GET http://localhost:3001/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-01-14T...",
  "service": "maswada-ai-backend"
}
```

### 2. Test Authentication

```bash
GET http://localhost:3001/api/auth/me
Authorization: Bearer <your_clerk_token>
```

**Expected Response:**
```json
{
  "message": "Authentication successful",
  "userId": "user_xxx",
  "sessionId": "sess_xxx",
  "timestamp": "2026-01-14T..."
}
```

**Possible Errors:**
- `401`: Missing or invalid token
- `401`: Token expired

---

## Notes CRUD Operations

### 3. Create Note

```bash
POST http://localhost:3001/api/notes
Authorization: Bearer <your_clerk_token>
Content-Type: application/json

{
  "title": "My First Note",
  "content": "This is the content of my note",
  "language": "en"
}
```

**Expected Response:**
```json
{
  "note": {
    "id": "uuid-here",
    "userId": "user_xxx",
    "title": "My First Note",
    "content": "This is the content of my note",
    "language": "en",
    "summary": null,
    "createdAt": "2026-01-14T...",
    "updatedAt": "2026-01-14T..."
  }
}
```

### 4. List All Notes

```bash
GET http://localhost:3001/api/notes
Authorization: Bearer <your_clerk_token>
```

**Expected Response:**
```json
{
  "notes": [
    {
      "id": "uuid-here",
      "userId": "user_xxx",
      "title": "My First Note",
      "content": "This is the content of my note",
      "language": "en",
      "summary": null,
      "createdAt": "2026-01-14T...",
      "updatedAt": "2026-01-14T..."
    }
  ]
}
```

### 5. Get Single Note

```bash
GET http://localhost:3001/api/notes/:id
Authorization: Bearer <your_clerk_token>
```

**Expected Response:**
```json
{
  "note": {
    "id": "uuid-here",
    "userId": "user_xxx",
    "title": "My First Note",
    "content": "This is the content of my note",
    "language": "en",
    "summary": null,
    "createdAt": "2026-01-14T...",
    "updatedAt": "2026-01-14T..."
  }
}
```

### 6. Update Note

```bash
PATCH http://localhost:3001/api/notes/:id
Authorization: Bearer <your_clerk_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "Updated content"
}
```

**Expected Response:**
```json
{
  "note": {
    "id": "uuid-here",
    "userId": "user_xxx",
    "title": "Updated Title",
    "content": "Updated content",
    "language": "en",
    "summary": null,
    "createdAt": "2026-01-14T...",
    "updatedAt": "2026-01-14T..."
  }
}
```

### 7. Delete Note

```bash
DELETE http://localhost:3001/api/notes/:id
Authorization: Bearer <your_clerk_token>
```

**Expected Response:**
- Status: `204 No Content`
- No body

---

## AI Features

### 8. Summarize Text

```bash
POST http://localhost:3001/api/ai/summarize
Authorization: Bearer <your_clerk_token>
Content-Type: application/json

{
  "text": "Long text to summarize...",
  "language": "en"
}
```

**Or with noteId:**
```json
{
  "noteId": "uuid-here",
  "language": "en"
}
```

**Expected Response:**
```json
{
  "result": "Summary of the text..."
}
```

### 9. Rewrite Text

```bash
POST http://localhost:3001/api/ai/rewrite
Authorization: Bearer <your_clerk_token>
Content-Type: application/json

{
  "text": "Text to rewrite...",
  "mode": "clearer",
  "language": "en"
}
```

**Modes:** `shorter`, `clearer`, `formal`, `casual`

**Expected Response:**
```json
{
  "result": "Rewritten text..."
}
```

### 10. Translate Text

```bash
POST http://localhost:3001/api/ai/translate
Authorization: Bearer <your_clerk_token>
Content-Type: application/json

{
  "text": "Hello world",
  "target": "ar"
}
```

**Expected Response:**
```json
{
  "result": "مرحبا بالعالم"
}
```

---

## Security Features

### ✅ User Scoping
- All notes are automatically scoped by userId
- Users cannot access other users' notes
- Even if a user knows another user's note ID, they cannot access it

### ✅ Token Validation
- All tokens are verified with Clerk
- Expired tokens are rejected with clear error messages
- Invalid tokens return 401 errors

### ✅ Input Validation
- All requests are validated using Zod schemas
- Invalid data returns 400 errors with detailed validation messages

---

## Testing Checklist

- [ ] Health endpoint works (no auth required)
- [ ] Auth test endpoint works with valid token
- [ ] Auth test endpoint fails with invalid token
- [ ] Create note works
- [ ] List notes shows only my notes
- [ ] Get single note works
- [ ] Update note works
- [ ] Delete note works
- [ ] Cannot access other users' notes
- [ ] AI summarize works
- [ ] AI rewrite works (all modes)
- [ ] AI translate works (EN→AR and AR→EN)

---

## Next Steps

Once all backend tests pass:
1. ✅ Backend is fully functional
2. ⏳ Move to frontend implementation (Phase E)
3. ⏳ Integrate frontend with backend APIs
