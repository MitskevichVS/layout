module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'no-console': 'off',
    'class-methods-use-this': 'off',
    'ignoreTrailingComments': 0,
    'ignoreComments': 0,
    'max-len': 'off',
    'import/extensions': 'off',
    'func-names': 'off'
  },
};