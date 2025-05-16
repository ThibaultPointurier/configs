import { GLOB_EXCLUDE } from '../globs.js'
import { interopDefault } from '../utils.js'
import type { FlatConfigItem } from '../types.js'

export async function unocss(): Promise<FlatConfigItem[]> {
  const unoPlugin = await interopDefault(import('@unocss/eslint-plugin'))

  return [
    {
      name: 'tpointurier:unocss',
      ignores: GLOB_EXCLUDE,
      plugins: {
        '@unocss': unoPlugin as any,
      },
      rules: {
        ...unoPlugin.configs.recommended.rules,
      },
    },
  ]
}