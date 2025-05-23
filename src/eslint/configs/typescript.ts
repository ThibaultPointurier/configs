import { interopDefault } from '../utils.js'
import { GLOB_SRC, GLOB_TS, GLOB_TSX } from '../globs.js'
import type {
  FlatConfigItem,
  OptionsTypeScriptParserOptions,
  OptionsTypeScriptWithTypes,
} from '../types.js'

export async function typescript(
  options?: OptionsTypeScriptWithTypes &
    OptionsTypeScriptParserOptions & { typeAwareRules?: boolean; enableForVue?: boolean },
): Promise<FlatConfigItem[]> {
  const { parserOptions = {}, enableForVue = false } = options ?? {}

  const tsconfigPath = options?.tsconfigPath ? options.tsconfigPath : undefined

  const [pluginTs, parserTs] = await Promise.all([
    interopDefault(import('@typescript-eslint/eslint-plugin')),
    interopDefault(import('@typescript-eslint/parser')),
  ] as const)

  const typeAwareRules: FlatConfigItem['rules'] = {
    '@typescript-eslint/await-thenable': 'error',
    '@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],
    '@typescript-eslint/no-floating-promises': 'error',
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-implied-eval': 'error',
    '@typescript-eslint/no-misused-promises': 'error',
    '@typescript-eslint/no-unnecessary-type-assertion': 'error',
    '@typescript-eslint/no-unsafe-argument': 'error',
    '@typescript-eslint/no-unsafe-assignment': 'error',
    '@typescript-eslint/no-unsafe-call': 'error',
    '@typescript-eslint/no-unsafe-member-access': 'error',
    '@typescript-eslint/no-unsafe-return': 'error',
    '@typescript-eslint/restrict-plus-operands': 'error',
    '@typescript-eslint/restrict-template-expressions': 'error',
    '@typescript-eslint/unbound-method': 'error',
  }

  return [
    {
      name: 'tpointurier:typescript:setup',
      plugins: { '@typescript-eslint': pluginTs as any },
    },
    {
      name: 'tpointurier:typescript',
      files: [GLOB_SRC, enableForVue ? '**/*.vue' : undefined].filter(Boolean) as string[],
      languageOptions: {
        parser: parserTs,
        parserOptions: {
          extraFileExtensions: enableForVue ? ['.vue'] : [],
          sourceType: 'module',
          ...(options?.typeAwareRules
            ? {
                projectService: {
                  allowDefaultProject: ['./*.js'],
                  defaultProject: tsconfigPath,
                },
                tsconfigRootDir: process.cwd(),
              }
            : {}),
          ...(options?.forceDecorators
            ? {
                emitDecoratorMetadata: true,
                experimentalDecorators: true,
              }
            : {}),
          ...(parserOptions as any),
        },
      },

      rules: {
        ...pluginTs.configs['eslint-recommended']!.overrides![0]!.rules,
        ...pluginTs.configs['strict']!.rules,

        '@typescript-eslint/consistent-type-imports': [
          'error',
          { prefer: 'type-imports', disallowTypeAnnotations: false },
        ],
        '@typescript-eslint/no-use-before-define': [
          'error',
          { functions: false, classes: false, variables: true },
        ],
        '@typescript-eslint/ban-ts-comment': [
          'error',
          { 'ts-ignore': 'allow-with-description', 'ts-nocheck': false },
        ],
        '@typescript-eslint/prefer-ts-expect-error': 'error',
        'no-useless-constructor': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        'no-redeclare': 'off',

        '@typescript-eslint/no-redeclare': 'error',
        'no-use-before-define': 'off',

        'no-dupe-class-members': 'off',
        '@typescript-eslint/no-dupe-class-members': 'error',

        'no-loss-of-precision': 'off',
        '@typescript-eslint/no-loss-of-precision': 'error',

        '@typescript-eslint/naming-convention': [
          'error',
          {
            selector: 'variable',
            format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
            filter: { regex: '^_', match: false },
          },
          {
            selector: 'typeLike',
            format: ['PascalCase'],
          },
          {
            selector: 'class',
            format: ['PascalCase'],
          },
          {
            selector: 'interface',
            format: ['PascalCase'],
            custom: {
              regex: '^I[A-Z]',
              match: false,
            },
          },
        ],

        // Off
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/consistent-indexed-object-style': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/parameter-properties': 'off',
        '@typescript-eslint/no-empty-interface': 'off',
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/triple-slash-reference': 'off',
        '@typescript-eslint/no-extraneous-class': 'off',
        // Common pattern in AdonisJS
        '@typescript-eslint/no-empty-object-type': 'off',

        ...(options?.typeAwareRules ? typeAwareRules : {}),
      },
    },
    {
      files: [GLOB_TS, GLOB_TSX],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': [
          'error',
          { accessibility: 'no-public' },
        ],
      },
    },
    {
      files: ['**/*.{test,spec}.ts?(x)'],
      name: 'tpointurier:typescript:tests-overrides',
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/prefer-ts-expect-error': 'off',
      },
    },
  ]
}