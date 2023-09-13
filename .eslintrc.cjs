module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:tailwindcss/recommended',
    'airbnb-base',
    'airbnb-typescript/base',
    'prettier',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    project: ['./tsconfig.json', './tailwind.config.js'],
    extraFileExtensions: ['.vue'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.ts', '.vue'],
      },
    },
    'import/core-modules': ['vite', '@vitejs/plugin-vue', 'vite-plugin-eslint'],
  },
  plugins: ['tailwindcss', '@typescript-eslint', 'vue'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        '': 'never',
        ts: 'never',
      },
    ],
    'import/no-unresolved': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/ban-types': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-expressions': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/enforces-negative-arbitrary-values': 'off',
  },
};
