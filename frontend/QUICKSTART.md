# Maswada AI Frontend - Quick Start Guide

## Prerequisites

- Node.js 18+ installed
- Backend server running on `http://localhost:3001`
- Clerk account with publishable key

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

This installs all required packages including:
- React 19
- Clerk React
- React Router v7
- React Intl
- Tailwind CSS v4
- TypeScript

### 2. Configure Environment Variables

Create a `.env` file in the `frontend/` directory:

```bash
# .env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
VITE_API_BASE_URL=http://localhost:3001
```

**Get Your Clerk Key:**
1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Select your application
3. Navigate to "API Keys"
4. Copy the "Publishable Key"

### 3. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## First Time Usage

### 1. Sign Up
1. Click "Sign Up" in the header
2. Complete the Clerk registration form
3. Verify your email if required

### 2. Create Your First Note
1. Click "New Note" in the header
2. Enter a title and content
3. Click "Create Note"

### 3. Try AI Features
1. Open a note you created
2. Scroll to the "AI Features" section
3. Try these features:
   - **Summarize**: Generate a summary of your note
   - **Rewrite**: Choose a mode to rewrite your content
   - **Translate**: Translate between English and Arabic

### 4. Switch Languages
1. Click the language button in the header (العربية / English)
2. The entire interface switches languages
3. Arabic mode enables RTL text direction

## Project Structure

```
frontend/
├── src/
│   ├── app/                      # Application core
│   │   ├── App.tsx               # Main app with routing
│   │   ├── layout/               # Layout components
│   │   │   ├── AppLayout.tsx     # Main layout wrapper
│   │   │   ├── Header.tsx        # Navigation header
│   │   │   └── Footer.tsx        # Footer component
│   │   └── pages/                # Page components
│   │       ├── HomePage.tsx      # Landing page
│   │       ├── NotesPage.tsx     # Notes list
│   │       ├── CreateNotePage.tsx
│   │       ├── NoteDetailPage.tsx
│   │       ├── EditNotePage.tsx
│   │       ├── SignInPage.tsx
│   │       └── SignUpPage.tsx
│   │
│   ├── components/               # Reusable components
│   │   ├── ai/                   # AI feature components
│   │   │   ├── AIFeaturesPanel.tsx
│   │   │   └── RewriteModal.tsx
│   │   ├── auth/                 # Auth components
│   │   │   └── ProtectedRoute.tsx
│   │   ├── common/               # Shared components
│   │   │   ├── GlassCard.tsx
│   │   │   ├── EmptyState.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   └── ErrorBoundary.tsx
│   │   ├── forms/                # Form components
│   │   │   ├── FormField.tsx
│   │   │   ├── Input.tsx
│   │   │   └── TextArea.tsx
│   │   └── ui/                   # UI primitives
│   │       ├── button.tsx
│   │       ├── dialog.tsx
│   │       ├── loading.tsx
│   │       └── alert.tsx
│   │
│   ├── contexts/                 # React contexts
│   │   ├── LocaleContext.tsx     # i18n state
│   │   ├── NotesContext.tsx      # Notes state
│   │   └── ToastContext.tsx      # Notifications
│   │
│   ├── hooks/                    # Custom hooks
│   │   └── useApiClient.ts       # API client hook
│   │
│   ├── i18n/                     # Translations
│   │   └── messages.ts           # EN/AR translations
│   │
│   ├── lib/                      # Utilities
│   │   ├── api-client.ts         # API client class
│   │   └── utils.ts              # Helper functions
│   │
│   ├── types/                    # TypeScript types
│   │   └── index.ts              # Shared types
│   │
│   ├── main.tsx                  # Entry point
│   └── index.css                 # Global styles
│
├── components.json               # shadcn config
├── package.json
├── tsconfig.json
├── vite.config.ts
├── FEATURES.md                   # Features documentation
└── QUICKSTART.md                 # This file
```

## Available Scripts

### `npm run dev`
Starts the development server with hot module replacement.
- Opens at `http://localhost:5173`
- Auto-reloads on file changes

### `npm run build`
Creates a production build in the `dist/` folder.
- Optimized and minified
- Ready for deployment

### `npm run preview`
Previews the production build locally.
- Useful for testing before deployment

### `npm run lint`
Runs ESLint to check code quality.

## Key Features to Test

### Authentication
- [ ] Sign up with email
- [ ] Sign in with existing account
- [ ] Sign out
- [ ] Protected routes redirect to sign-in
- [ ] User profile button works

### Notes Management
- [ ] Create a new note
- [ ] View notes list with search
- [ ] Open a note to view details
- [ ] Edit an existing note
- [ ] Delete a note (with confirmation)

### AI Features
- [ ] Summarize a note
- [ ] Rewrite with different modes
- [ ] Translate between EN and AR
- [ ] Copy AI results to clipboard
- [ ] Save summary to note

### Internationalization
- [ ] Switch to Arabic - UI changes to Arabic
- [ ] Switch back to English - UI changes to English
- [ ] Text direction changes (RTL for Arabic)
- [ ] Language preference persists on reload

### Responsive Design
- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640px - 1024px)
- [ ] Test on desktop (> 1024px)
- [ ] Mobile menu works
- [ ] Touch targets are adequate

### Error Handling
- [ ] Form validation works
- [ ] API errors show toast notifications
- [ ] Network errors display properly
- [ ] Error boundary catches React errors

## Common Issues

### "Missing Publishable Key" Error
**Problem**: `VITE_CLERK_PUBLISHABLE_KEY` not set

**Solution**: 
1. Create a `.env` file in the frontend directory
2. Add your Clerk publishable key
3. Restart the dev server

### Cannot Connect to Backend
**Problem**: Backend API not running

**Solution**:
1. Open a new terminal
2. Navigate to `backend/` directory
3. Run `npm run dev`
4. Ensure it's running on port 3001

### CORS Errors
**Problem**: Backend not allowing frontend origin

**Solution**:
1. Check backend `.env` has `FRONTEND_ORIGIN=http://localhost:5173`
2. Restart backend server

### Build Errors
**Problem**: TypeScript compilation errors

**Solution**:
1. Clear node_modules: `rm -rf node_modules`
2. Reinstall: `npm install`
3. Clear cache: `npm run build -- --force`

## Development Tips

### Hot Module Replacement (HMR)
Changes to these files trigger instant updates:
- React components (`.tsx`)
- Styles (`.css`)
- Context providers

Full reload required for:
- `main.tsx` changes
- Environment variable changes
- New dependencies

### TypeScript
- Hover over variables to see types
- Use `Ctrl+Space` for autocomplete
- Red squiggles indicate type errors

### React DevTools
Install the React DevTools browser extension for:
- Component tree inspection
- Props and state viewing
- Performance profiling

### Debugging
1. Use browser DevTools console
2. Add `console.log()` statements
3. Use React DevTools
4. Check Network tab for API calls

## Next Steps

1. **Customize the Design**
   - Modify colors in `src/index.css`
   - Adjust spacing and typography
   - Add your own glassmorphism effects

2. **Add More Features**
   - Note categories/tags
   - Rich text editor
   - Dark mode
   - Export notes

3. **Deploy to Production**
   - Build: `npm run build`
   - Deploy `dist/` to your hosting service
   - Set production environment variables
   - Configure custom domain

## Resources

- [React 19 Docs](https://react.dev/)
- [Clerk Docs](https://clerk.com/docs)
- [React Router Docs](https://reactrouter.com/)
- [React Intl Docs](https://formatjs.io/docs/react-intl/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)

## Support

If you encounter issues:
1. Check the console for errors
2. Verify environment variables
3. Ensure backend is running
4. Review the browser Network tab
5. Check the `FEATURES.md` for detailed documentation

---

**Happy Coding! 🚀**
