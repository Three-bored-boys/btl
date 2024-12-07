const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;

const serverAndSharedEslintCommand = (filenames) => `eslint ${filenames.join(" ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": ["prettier --write"],
  "src/app/**/*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "src/libs/client/**/*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "src/libs/server/**/*.{js,ts}": [serverAndSharedEslintCommand],
  "src/libs/shared/**/*.{js,ts}": [serverAndSharedEslintCommand],
};
