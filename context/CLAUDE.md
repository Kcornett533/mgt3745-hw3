# Canonical agent instructions

## Architectural Constraints
* **Stack:** Pure Vanilla JavaScript (ES6+), HTML5, CSS3.
* **Dependencies:** Zero external npm modules, build chains, or CDN scripts.
* **Storage:** Client-side browser `localStorage` only.
* **Accessibility:** Full keyboard accessibility and ARIA live status region updates.

## Normative Code Rules
1. Never assign unescaped user inputs to `innerHTML`. Use `textContent` and `createElement`.
2. Always wrap `localStorage.getItem` and `localStorage.setItem` in `try/catch` blocks.
3. Retain user form inputs on storage write errors.
4. Validate signature formatting prior to state mutations.
