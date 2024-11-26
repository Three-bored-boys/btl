/** @type {import("eslint").Linter.Config} */
module.exports = {
  "extends": ["plugin:@typescript-eslint/strict-type-checked", "plugin:@typescript-eslint/stylistic-type-checked"],
  "plugins": ["@typescript-eslint"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "./tsconfig.json",
  },
  "rules": {
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/consistent-type-definitions": ["warn", "type"],
    "@typescript-eslint/no-confusing-void-expression": [
      "error",
      {
        "ignoreArrowShorthand": true,
      },
    ],
    "@typescript-eslint/no-unnecessary-condition": "off",
  },
};
