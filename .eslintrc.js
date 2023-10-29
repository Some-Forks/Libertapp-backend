module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
  extends: ['airbnb-base', 'plugin:@typescript-eslint/recommended','plugin:prettier/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js','src/Migrations/**',],
  "rules": {
    "semi": ["error", "always"],
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "error",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "error",
    "import/prefer-default-export": "off",
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "no-unused-expressions": ["error", { "allowShortCircuit": true }],
    "no-underscore-dangle": ["off", { "allow": ["foo_", "_bar"] }],
    "import/no-extraneous-dependencies": "off",
    "no-console": ["off", { "allow": ["warn", "error"] }],
    "import/extensions": [0],
    "prettier/prettier": ["error", {
        "endOfLine": "auto"
    }],
    "no-nested-ternary": "off",
    "no-use-before-define": ["off"],
    "@typescript-eslint/no-use-before-define": "error",
    "no-shadow": "off",
    'import/no-unresolved': 'off',
    "@typescript-eslint/no-shadow": ["error"],
    "object-shorthand": "off",
    "class-methods-use-this": "off",
    "no-bitwise": "off",
    "no-plusplus": "off",
    "no-param-reassign": "off",
    "no-restricted-syntax": "off",
    "no-empty-function": "off",
    "no-return-await": "off",
},
settings: {
  'import/resolver': {
    node: {
      extensions: ['.js', '.ts'],
    },
  },
},

};