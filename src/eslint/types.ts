import type { Linter } from 'eslint'
import type { ParserOptions } from '@typescript-eslint/parser'
import type { FlatGitignoreOptions } from 'eslint-config-flat-gitignore'

export type FlatConfigItem = Omit<Linter.Config<Linter.RulesRecord>, 'plugins'> & {
  plugins?: Record<string, any>
}

export type UserConfigItem = FlatConfigItem | Linter.FlatConfig

export type Awaitable<T> = T | Promise<T>

export interface OptionsTypeScriptWithTypes {
  tsconfigPath?: string | string[]

  forceDecorators?: boolean
}

export interface OptionsTypeScriptParserOptions {
  parserOptions?: Partial<ParserOptions>
}

export type TPointurierOptions = {
  enableGitIgnore?: boolean | FlatGitignoreOptions

  adonisjs?: boolean

  jsonc?: boolean

  prettier?: boolean

  vue?: boolean

  typescript?:
    | boolean
    | ((OptionsTypeScriptWithTypes | OptionsTypeScriptParserOptions) & { typeAwareRules?: boolean })

  unocss?: boolean
}