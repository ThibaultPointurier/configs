import { interopDefault } from '../utils.js'
import type { FlatConfigItem } from '../types.js'

export async function style(): Promise<FlatConfigItem[]> {
  const plugin = await interopDefault(import('@stylistic/eslint-plugin'))

  return [
    {
      name: 'tpointurier:stylistic',
      plugins: { '@stylistic': plugin },
      rules: {
        '@stylistic/padding-line-between-statements': [
          'error',
          {
            blankLine: 'always',
            prev: '*',
            next: ['interface', 'type'],
          },
        ],
        '@stylistic/lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true },
        ],
      },
    },
  ]
}