module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint/eslint-plugin',
    "import"
  ],
  extends: [
    'eslint:recommended',
    'airbnb-typescript',
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    "import/resolver": {
      typescript: {
        path: './tsconfig.json'
      }
    }
  },
  rules: {
    "@typescript-eslint/space-before-blocks": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "import/no-named-as-default": "off",
    "@typescript-eslint/no-shadow": "off"
  },
  parserOptions: {
    "project": ["tsconfig.json"]
  },
  env: {
    "browser": true,
    "node": true
  }
};