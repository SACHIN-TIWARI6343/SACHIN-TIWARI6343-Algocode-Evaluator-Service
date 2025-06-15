import parser from "@typescript-eslint/parser";
import { defineConfig } from "eslint/config";
import globals from "globals";

export default defineConfig([
  {
    files: ["**/*.{ts,mts,cts}"],
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      ecmaVersion: 2021,
      sourceType: "module",
      globals: globals.node,
    },
    rules: {
      "semi": ["error", "always"],
      "no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
    },
  },
]);