# CSS in this project

Global styles and design tokens live in **`src/index.css`** (imported once from `main.jsx`). That file defines `:root` variables, `.dark-theme` overrides, resets, typography, forms, and shared utilities.

Page- and component-specific layout is mostly in **`src/wrappers/*.js`** (styled-components), using those CSS variables for colors, radii, and spacing.
