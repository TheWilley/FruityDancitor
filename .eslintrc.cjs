module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsdoc/recommended'
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'jsdoc'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    'semi': 2,
    'quotes': [1, 'single'],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-uses-react': 'off',
    'jsdoc/require-returns': 'off',
    'jsdoc/require-param': 1,
    'jsdoc/require-param-type': 'off',
    "no-restricted-imports": "off",
    "@typescript-eslint/no-restricted-imports": [
      "warn",
      {
        "name": "react-redux",
        "importNames": ["useSelector", "useDispatch"],
        "message": "Use typed hooks `useAppDispatch` and `useAppSelector` instead."
      }
    ],
  },
};
