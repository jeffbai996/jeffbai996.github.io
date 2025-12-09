# CLAUDE.md - Project Recommendations

## Priority Tasks

### Immediate Priority
- [x] 1. Fix XSS vulnerability in `chatbot-embed.js` - Replace innerHTML with safe DOM methods
- [x] 2. ~~Move API key from WebSocket URL to headers~~ - Added security documentation (browser WebSocket API limitation)
- [x] 3. Remove 11 source map files from `/assets/` directory

### High Priority
- [x] 4. Add Error Boundary component to `App.jsx`
- [x] 5. Fix unhandled Promise in `AuthContext.jsx` useEffect
- [x] 6. Add missing `theme-dark-aqi` CSS theme to `global.css`

### Medium Priority
- [x] 7. Remove unused components (DocumentUpload, DarkModeToggle, ProgressTracker, InteractiveMap, FeeCalculator) and their CSS files
- [x] 8. Remove unused exports from `formKnowledge.js`
- [x] 9. Remove unused import of `getFormById` from `geminiService.js`
- [x] 10. Add chatbot contexts for Air Quality and National Security departments
- [x] 11. Fix memory leak in ChatWidget streaming (clear setTimeout on unmount)
- [x] 12. Fix broken footer links in Portal.jsx and Revenue.jsx

### Low Priority
- [ ] 13. Remove console.log statements from `chatbot-embed.js`
- [ ] 14. Add ARIA labels to SVG icons throughout
- [ ] 15. Add skip-to-content link for accessibility
- [ ] 16. Integrate DarkModeToggle component into GovBanner
- [ ] 17. Complete Revenue payment forms or clearly mark as demo
- [ ] 18. Fix incomplete dependency arrays in `useGeminiLive.js`

## Build Commands

```bash
cd frontend
npm install        # Install dependencies
npm run dev        # Start dev server on port 5173
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
```

## Architecture Notes

- **Framework**: React 18 + Vite 5.0
- **Routing**: React Router v6 with lazy loading
- **Auth**: Supabase (PostgreSQL + Auth)
- **AI**: Google Gemini API for chatbot
- **Styling**: CSS variables with theme system
- **Deployment**: GitHub Pages (static site)

## Code Style

- Use CSS variables for theming (defined in `global.css`)
- Lazy load department pages for code splitting
- Keep console statements out of production code
- Use semantic HTML and ARIA labels for accessibility
