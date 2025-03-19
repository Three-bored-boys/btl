// import path from "path";
import tseslint from "typescript-eslint";
import rootConfig from "../../../eslint.config.mjs";

export default tseslint.config({
  //   extends: [path.join(process.cwd(), "/eslint.config.mjs")],
  extends: [rootConfig],
  languageOptions: {
    parserOptions: { project: true, tsconfigRootDir: import.meta.dirname },
  },
});
