# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal portfolio website for Islam Kassem (AI/ML Engineer), deployed to **kassem.dev** via GitHub Pages. This is a **pure static site** — no build system, no package manager, no compilation step. Push to `main` and GitHub Pages publishes it automatically.

## Development

No build commands exist. To preview locally, serve the root directory with any static file server:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Architecture

All pages are standalone HTML files inside subdirectories (`about/index.html`, `projects/index.html`, etc.). There is no templating engine or shared layout — the navigation header and footer HTML are duplicated across every page.

| Path | Purpose |
|---|---|
| `index.html` | Homepage (hero, services summary, credentials, contact) |
| `about/` | Professional background |
| `projects/` | ML/AI project showcase |
| `services/` | Upwork service offerings |
| `skills/` | Technical skills breakdown |
| `credentials/` | Education and Kaggle Master status |
| `resume/` | Resume page + PDF download |
| `contact/` | Contact form and social links |
| `open-fpl/` | Legacy path — redirects to the OpenFPL Scout AI app at `openfpl.kassem.dev` |
| `css/styles.css` | Single stylesheet; uses CSS custom properties for theming |
| `js/main.js` | IntersectionObserver for scroll-reveal animations |

## Conventions

- Navigation links use **absolute paths** (`/about/`, `/projects/`) so they work from any subdirectory.
- CSS custom properties (variables) are defined in `:root` in `styles.css`; use those for colors and spacing rather than hard-coding values.
- When adding a new page: create the subdirectory with an `index.html`, add it to `sitemap.xml`, and update the nav in **every existing page**.
- Structured data (Schema.org), Open Graph, and Twitter Card meta tags are present on each page — keep them updated when page content changes.
