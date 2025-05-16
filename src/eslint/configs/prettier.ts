import { interopDefault } from '../utils.js'
import type { FlatConfigItem } from '../types.js'

/**
 * Enable prettier rules
 */
export async function prettier(): Promise<FlatConfigItem[]> {
  const eslintConfigPrettier = await interopDefault(import('eslint-config-prettier')) as { rules?: Record<string, unknown> }
  const eslintPluginPrettier = await interopDefault(import('eslint-plugin-prettier')) as {
    configs?: Record<string, { rules?: Record<string, unknown> }>;
    [key: string]: any;
  }

  return [
    {
      name: 'tpointurier:prettier',
      plugins: {
        prettier: eslintPluginPrettier,
      },
      rules: {
        ...eslintConfigPrettier.rules,
        ...eslintPluginPrettier.configs!['recommended']!.rules,
        'prettier/prettier': 'warn',
      },
    },
  ]
}