module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // extends: ["airbnb-base"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    quotes: ["error", "double"],
    "linebreak-style": ["error", "windows"],
    "no-unused-vars": "warn",
  },
};
