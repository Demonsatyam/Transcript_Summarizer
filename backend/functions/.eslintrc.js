/* eslint-env node */
module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: "module",
    project: false,
  },
  env: { node: true, es6: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    // Style
    quotes: ["off"], // accept single or double
    "object-curly-spacing": ["off"], // don't block on spacing
    "comma-dangle": ["error", "always-multiline"],
    "max-len": ["off"], // long import/urls ok
    "no-multi-spaces": ["warn"],

    // TS ergonomics
    "@typescript-eslint/no-explicit-any": ["warn"],
    "@typescript-eslint/ban-ts-comment": ["off"],
    "require-jsdoc": ["off"],
  },
};
