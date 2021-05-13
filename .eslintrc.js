module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  extends: ["plugin:prettier/recommended"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module"
  },
  rules: {
    "no-console": "warn",
    "require-await": "error"
  },
  ignorePatterns: ["node_modules/", "build/"]
};
