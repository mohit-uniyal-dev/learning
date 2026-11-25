# Visual Learning Studio — Contributor & Agent Instructions

## Architecture & Separation of Concerns
This repository uses **vanilla ES Modules (`type="module"`)** with zero build steps so it deploys directly via GitHub Pages. Keep concerns strictly separated:

- `site/index.html` — Semantic shell only (header, progress bar, card mount). **Do not add inline `<style>` or `<script>` blocks.**
- `site/styles/tokens.css` — Design system CSS variables (`:root` palette, radii, shadows, typography). **Reuse existing variables; never introduce ad-hoc hex colors.**
- `site/styles/components.css` — Layout, card, button, simulator, quiz, and DSA widget styling.
- `site/js/engine.js` — State management, isolated per-step state (`getStepState`), full replay reset (`resetCourseState`), and navigation shell renderer.
- `site/js/widgets.js` — Reusable interactive `WidgetRenderers` (`raw-llm-sim`, `concentric-layers`, `token-disclosure`, `gate-puzzle`, `reviewer-compare`, `eval-bench`, `quiz-blueprint`, `dsa-two-pointer`, `dsa-quiz`).
- `site/js/courses/agent-harness.js` — Course data & `MODES` (`Generic Blueprint` vs `Sanitized Case Study`) for the 4-Layer AI Agent Harness.
- `site/js/courses/dsa-two-pointer.js` — Course data for the DSA Two-Pointer visual template.
- `site/js/app.js` — Entry point wiring `COURSES` and `WidgetRenderers` into `engine.js`.

## Adding a New Course
1. Create `site/js/courses/<topic-slug>.js` exporting `{ id, title, supportsModes, modes?, steps }`.
2. Register the course in `site/js/app.js`.
3. If a new interactive visualization is needed, add a pure renderer function in `site/js/widgets.js` using CSS classes from `site/styles/components.css`.
