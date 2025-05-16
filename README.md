<p align="center">
    <img src="https://imgur.com/kggbd1z.png" alt="@tpointurier/configs">
</p>

**ESLint Flat Config Presets** for JavaScript, TypeScript, Vue, AdonisJS, etc.

## Installation

```bash
pnpm add -D eslint prettier @tpointurier/configs
```

## Usage

Create an `eslint.config.js` file at the root of your project:

```js
import { tpointurier } from '@tpointurier/configs/eslint'

export default tpointurier({
    typescript: true,   // Enable TypeScript rules
    vue: true,          // Enable Vue rules
    prettier: true,     // Enable Prettier
    unocss: true,       // Enable UnoCSS
    adonisjs: false,    // Enable AdonisJS
    ignores: [],        // Patterns to ignore
})
```

## Options

- **typescript**: Enable TypeScript rules (auto-detection possible)
- **vue**: Enable Vue rules (auto-detection possible)
- **prettier**: Enable Prettier
- **unocss**: Enable UnoCSS
- **adonisjs**: Enable AdonisJS
- **jsonc**: Enable JSONC support (default: `true`)
- **ignores**: Patterns to ignore
- **enableGitIgnore**: Use `.gitignore` to ignore files

## Included plugins and rules

- JavaScript (ESNext)
- TypeScript
- Vue 3
- Node.js
- Imports
- JSDoc
- Unicorn
- Stylistic (formatting)
- Perfectionist (sorting)
- Prettier (optional)
- UnoCSS (optional)
- AdonisJS (optional)
- JSONC support, sorting for `package.json` and `tsconfig.json`

## Credit

This repository is a fork of [Julien-R44/tooling-configs](https://github.com/Julien-R44/tooling-configs).
