# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Slothcast is a weather infographic generator that combines weather data with AI-powered artistic image generation. It creates personalized weather visualizations featuring family members/pets in randomized art styles using Replicate's image generation API.

## Commands

```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test framework is currently configured.

## Architecture

### Tech Stack
- **Framework:** Next.js 16 with App Router
- **React:** 19.x with client components
- **Styling:** Tailwind CSS v4 with dark mode support
- **AI:** Replicate API (google/nano-banana-pro model)
- **Language:** TypeScript (strict mode)

### Data Flow
1. Client page mounts → checks localStorage cache (daily expiration)
2. If cache miss or expired → calls `/api/generate-image`
3. API route fetches weather data via `getWeatherData()` (MetService API with mock fallback)
4. Weather formatted into prompt via `buildWeatherPrompt()` with random art style and character
5. Replicate API generates image
6. Image URL cached in localStorage and displayed

### Key Files
- `app/page.tsx` - Main client component with image display and localStorage caching
- `app/api/generate-image/route.ts` - POST endpoint for Replicate image generation
- `app/lib/prompt.ts` - Prompt builder with 40+ art styles and 5 character personas
- `app/lib/weather.ts` - Weather data fetcher (MetService API with mock fallback)
- `app/components/Loader.tsx` - Loading spinner during image generation
- `app/components/RefreshButton.tsx` - Overlay button to regenerate image

### Environment Variables
Required in `.env.local`:
- `REPLICATE_API_TOKEN` - For image generation
- `METSERVICE_API_KEY` - For MetService weather API (falls back to mock data if unavailable)
- `GEMINI_API_KEY` - Configured but not used

## Conventions

- Path alias `@/*` maps to project root
- Dark mode uses `prefers-color-scheme` with Tailwind `dark:` prefix
- Custom fonts via CSS variables: `--font-geist-sans`, `--font-geist-mono`
