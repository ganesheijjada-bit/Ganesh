# Ganesh Eijjada — Portfolio

A concise, animated portfolio built from Ganesh’s résumé. The Dark Navy Minimalist design uses a deep navy background, mint accents, clean sans-serif typography, and original developer-focused illustrations.

## Develop

Requires Node.js 20.19+ or 22.12+ (tested with Node.js 24).

```sh
git clone https://github.com/Monica-Sriramreddy/Ganesh.git
cd Ganesh
npm ci
npm run dev
```

The development server listens on port 3000. For a production build:

```sh
npm run build
npm run preview
```

Deploy the generated `dist/` directory to any static hosting service. This project has no backend, API keys, or runtime secrets. No site has been published by this task.

## What’s included

- An interactive developer profile with subtle animated signals and a motion pause control.
- Two selected project stories with keyboard-accessible detail dialogs.
- A compact career accordion, capabilities, and education.
- Direct email and LinkedIn links, email copying with failure feedback, and an original résumé download.
- Mobile navigation, scroll reveals, visible keyboard focus, and reduced-motion support.
- Locally bundled fonts; no third-party font or analytics requests at runtime.

## Edit the content

- `src/content.js`: résumé-derived profile, project contributions, capabilities, roles, and education.
- `src/main.jsx`: page layout, introductory copy, and interactions.
- `src/SystemIllustration.jsx` and `src/ProjectArtwork.jsx`: interactive developer profile and conceptual project illustrations.
- `src/styles.css` and `src/illustrations.css`: colors, typography, responsive layout, and motion.
- `public/Ganesh-Eijjada-Resume.docx`: downloadable original résumé. Replace this file to update it.
- `index.html`: title, description, and sharing metadata.

The project illustrations are conceptual, rather than company product screenshots. Project stories summarize professional contributions and do not claim independent ownership or include confidential source code. Contact details and dates follow the supplied résumé. The LinkedIn URL is reproduced exactly as supplied.

## Browser checks

```sh
npm test
```

Tests build on the production `dist/` output: run `npm run build` first. Playwright starts a preview server on port 4173. The cloud machine uses `/usr/bin/chromium`; elsewhere set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to your Chromium executable, or run `npx playwright install chromium` to use Playwright’s bundled browser.

The suite covers dialogs and focus, career and diagram interactions, résumé download contents, contact actions, mobile navigation, horizontal overflow, and reduced motion.
