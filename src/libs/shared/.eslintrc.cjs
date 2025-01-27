const path = require("path");

/** @type {import("eslint").Linter.Config} */
module.exports = {
  "extends": [path.join(process.cwd(), "/.eslintrc.json")],
  "parserOptions": { "project": true, "tsconfigRootDir": __dirname },
};
