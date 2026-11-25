# Visual Learning Studio — Modular Interactive Concept Explorer

A zero-dependency, Brilliant.org-style interactive visual learning web app built with clean separation of concerns (HTML, modular CSS, and native ES Modules) for GitHub Pages.

## Directory Structure
```text
├── .github/
│   └── workflows/
│       └── deploy-pages.yml          # GitHub Actions Pages deployment
├── AGENTS.md                         # Contributor & AI agent architecture rules
├── README.md
└── site/
    ├── index.html                    # Clean semantic HTML shell
    ├── styles/
    │   ├── tokens.css                # Design system CSS variables (:root)
    │   └── components.css            # Reusable UI & interactive widget styles
    └── js/
        ├── app.js                    # Entry point & course registry
        ├── engine.js                 # Core state, reset lifecycle & shell renderer
        ├── widgets.js                # Reusable interactive widget renderers
        └── courses/
            ├── agent-harness.js      # 4-Layer AI Agent Harness (Generic + Sanitized Case Study)
            └── dsa-two-pointer.js    # DSA Two-Pointer visual template course
```

## Local Preview & GitHub Pages Hosting
- **Local Preview:** Serve `site/` with any static server (e.g., `npx serve site` or `python -m http.server -d site 8080`) because native ES Modules require HTTP(S).
- **GitHub Pages:** Push to `main`, then set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.
