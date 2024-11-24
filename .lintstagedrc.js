const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => path.relative(process.cwd(), f)).join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": ["prettier --write"],
  "src/app/**/*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "src/libs/client/**/*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "src/libs/server/**/*.{js,ts}": ["eslint ."],
  "src/libs/shared/**/*.{js,ts}": ["eslint ."],
};
