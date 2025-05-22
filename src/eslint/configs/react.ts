import { GLOB_TSX } from '../globs.js'
import { interopDefault } from '../utils.js'
import type { FlatConfigItem } from '../types.js'

export async function react(): Promise<FlatConfigItem[]> {
  const [pluginReact, pluginReactHooks, parserTs] = await Promise.all([
    interopDefault(import('eslint-plugin-react')),
    interopDefault(import('eslint-plugin-react-hooks')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  return [
    {
      name: 'tpointurier:react',
      files: [GLOB_TSX],

      plugins: { react: pluginReact, 'react-hooks': pluginReactHooks },
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          ecmaFeatures: { jsx: true },
          sourceType: 'module',
        },
      },

      rules: {
        ...(pluginReact.configs.recommended.rules as any),
        ...(pluginReactHooks.configs.recommended.rules as any),

        // Désactive ou adapte certaines règles selon tes besoins
        'react/react-in-jsx-scope': 'off', // inutile avec React 17+
        'react/prop-types': 'off', // si tu utilises TypeScript
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-uses-react': 'off',
        'react/jsx-uses-vars': 'off',
        // Ajoute ici d'autres règles personnalisées si besoin
      },
      settings: {
        react: {
          version: 'detect',
        },
      },
    },
  ]
}