import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import onlyWarn from "eslint-plugin-only-warn";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";

/**
 * A shared ESLint configuration for the repository.
 *
 * @type {import("eslint").Linter.Config}
 * */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
      import: importPlugin,
      "unused-imports": unusedImports,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
      "unused-imports/no-unused-imports": "warn",
      "import/order": ["warn", {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
        "newlines-between": "always",
        "alphabetize": { "order": "asc", "caseInsensitive": true }
      }]
    },
  },
  {
    plugins: {
      onlyWarn,
    },
  },
  {
    ignores: ["dist/**"],
  },
];
