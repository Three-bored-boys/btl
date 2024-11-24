/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@hono/eslint-config"],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
