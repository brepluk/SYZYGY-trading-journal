# Global CSS & Syzygy theme

- **`theme.css`** – Syzygy (cosmic dark) theme. Defines `:root` variables used app-wide.
- **`index.css`** (in `src/`) imports `theme.css` and adds resets, typography, forms, and utilities.

## Using the theme in wrappers and components

In **styled-components**, use the CSS variables so styles stay consistent:

- **Syzygy palette:** `var(--syzygy-bg)`, `var(--syzygy-surface)`, `var(--syzygy-card)`, `var(--syzygy-border)`, `var(--syzygy-text)`, `var(--syzygy-muted)`, `var(--syzygy-accent)`, `var(--syzygy-white)`, `var(--syzygy-text-inverse)`
- **Semantic (same as Syzygy):** `var(--background-color)`, `var(--text-color)`, `var(--background-secondary-color)`, `var(--text-secondary-color)`, `var(--border-color)`, `var(--card-background)`, `var(--accent-color)`
- **Global:** `var(--border-radius)`, `var(--border-radius-lg)`, `var(--letter-spacing)`, `var(--transition)`, `var(--max-width)`, `var(--shadow-1)` through `var(--shadow-4)`, `var(--shadow-syzygy)`, `var(--small-text)`, etc.

Example:

```css
const Card = styled.div`
  background: var(--syzygy-card);
  border: 1px solid var(--syzygy-border);
  border-radius: var(--border-radius-lg);
  color: var(--syzygy-text);
`;
```

Form and utility classes in `index.css` (e.g. `.form`, `.btn`, `.container`) already use the semantic variables, so they follow the Syzygy theme by default.
