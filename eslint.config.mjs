/* ESLint 9 (flat config): Next rules (Core Web Vitals + TypeScript) without FlatCompat,
   which breaks with eslint-config-next 16. */
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // French text in JSX: apostrophes are not an error
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/ban-ts-comment': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          args: 'after-used',
          ignoreRestSiblings: false,
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^(_|ignore)',
        },
      ],
    },
  },
  {
    // generated outputs and mockup exports
    ignores: ['.next/', 'src/payload-types.ts', 'src/payload-generated-schema.ts', 'src/theme/built/', 'src/theme/icons/nucleo.tsx', 'src/theme/icons/keys.ts', 'Orbita/', 'captures/'],
  },
];

export default eslintConfig;
