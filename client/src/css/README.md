# Global CSS & Astra theme

- **`theme.css`** – Astra (cosmic dark) theme. Defines `:root` variables used app-wide.
- **`index.css`** (in `src/`) imports `theme.css` and adds resets, typography, forms, and utilities.

## Using the theme in wrappers and components

In **styled-components**, use the CSS variables so styles stay consistent:

- **Astra palette:** `var(--astra-bg)`, `var(--astra-surface)`, `var(--astra-card)`, `var(--astra-border)`, `var(--astra-text)`, `var(--astra-muted)`, `var(--astra-accent)`, `var(--astra-white)`, `var(--astra-text-inverse)`
- **Semantic (same as Astra):** `var(--background-color)`, `var(--text-color)`, `var(--background-secondary-color)`, `var(--text-secondary-color)`, `var(--border-color)`, `var(--card-background)`, `var(--accent-color)`
- **Global:** `var(--border-radius)`, `var(--border-radius-lg)`, `var(--letter-spacing)`, `var(--transition)`, `var(--max-width)`, `var(--shadow-1)` through `var(--shadow-4)`, `var(--shadow-astra)`, `var(--small-text)`, etc.

Example:

```css
const Card = styled.div`
  background: var(--astra-card);
  border: 1px solid var(--astra-border);
  border-radius: var(--border-radius-lg);
  color: var(--astra-text);
`;
```

Form and utility classes in `index.css` (e.g. `.form`, `.btn`, `.container`) already use the semantic variables, so they follow the Astra theme by default.
