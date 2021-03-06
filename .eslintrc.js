module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    commonjs: true,
    jest: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly"
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "prettier", "@typescript-eslint", "react-hooks"],
  rules: {
    indent: ["error", 2, { SwitchCase: 1 }],
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: 2,
    eqeqeq: ["error", "always"],
    "no-shadow": [
      "error",
      { builtinGlobals: false, hoist: "functions", allow: [] }
    ],
    "no-unused-vars": ["error", "always"],
    "no-use-before-define": "error",
    "no-useless-catch": ["error"],
    "no-tabs": ["error"],
    "no-unused-vars": [
      "error",
      { vars: "all", args: "after-used", ignoreRestSiblings: false }
    ],
    "no-trailing-spaces": ["error", { ignoreComments: true }],
    "no-var": "error",
    "@typescript-eslint/no-explicit-any": ["off"],
    "prettier/prettier": ["error"],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
};
