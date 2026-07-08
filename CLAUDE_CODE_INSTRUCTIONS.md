# Claude Code Instructions: Add Photo Gallery to Wedding Website

## What to do
Replace the existing photos page with a new gallery component featuring 26 photos of Maria and Jim (photography by Carrie Pollard).

## Files provided
- `PhotosPage.jsx` — the complete gallery component, ready to drop in

## Steps

### 1. Find the existing photos page
Look for one of these (whichever exists in your project):
- `app/photos/page.jsx` or `app/photos/page.tsx`
- `pages/photos.jsx` or `pages/photos.tsx`
- `app/photos/page.js` or `pages/photos.js`

### 2. Replace it with the new component
Copy `PhotosPage.jsx` to that location, replacing the existing file.
Rename the extension to match your project (`.jsx`, `.tsx`, `.js`).

If your project uses TypeScript (`.tsx`), rename and add types:
- Change `export default function PhotosPage()` — no changes needed, it's already compatible
- If you see type errors on the `useState(null)`, change to `useState<number | null>(null)`

### 3. Add the required fonts (if not already present)
In your `app/layout.jsx` (or `_app.jsx` for Pages Router), add to the `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@200;300;400&display=swap" rel="stylesheet" />
```

Or using Next.js font optimization in `layout.jsx`:
```js
import { Cormorant_Garamond, Jost } from 'next/font/google';
```

### 4. Check for a wrapping layout
If your photos page previously used a shared layout (navbar, footer, etc.), make sure the new file is in the same directory so it inherits the same layout automatically.

### 5. Verify it works
Run `npm run dev` and navigate to `/photos` — you should see the masonry gallery with all 26 photos and a working lightbox.

## Notes
- Photos are embedded as base64 — no external hosting needed
- The component uses `styled-jsx` (built into Next.js) for scoped CSS — no extra packages needed
- Lightbox supports keyboard navigation: ← → arrow keys and Escape
