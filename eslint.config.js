// import { defineConfig, globalIgnores } from "eslint/config";
// import nextVitals from "eslint-config-next/core-web-vitals";
// import nextTs from "eslint-config-next/typescript";
//
// const eslintConfig = defineConfig([
//   ...nextVitals,
//   ...nextTs,
//   // Override default ignores of eslint-config-next.
//   globalIgnores([
//     // Default ignores of eslint-config-next:
//     ".next/**",
//     "out/**",
//     "build/**",
//     "next-env.d.ts",
//   ]),
// ]);
//
// export default eslintConfig;
// @ts-check

import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import globals from "globals";

export default tseslint.config({
  files: ["src/**/*.{js,jsx,mjs,cjs,ts,tsx}"],
  extends: [eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked, prettierConfig],
  plugins: {
    react,
    "react-hooks": reactHooks,
    prettier: prettierPlugin,
  },
  languageOptions: {
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
      project: "./tsconfig.json",
    },
    globals: {
      ...globals.browser,
    },
  },
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-unused-expressions": 0,
  },
});
