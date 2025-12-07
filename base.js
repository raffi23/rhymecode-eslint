import js from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";
import turboPlugin from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

/**
 * @type {import("eslint").Linter.Config[]}
 */
export const config = [
  js.configs.recommended,
  eslintConfigPrettier,
  ...tseslint.configs.recommended,
  {
    plugins: {
      turbo: turboPlugin,
    },
    rules: {
      "turbo/no-undeclared-env-vars": "warn",
    },
  },
  {
    files: ["**/*.{js,mjs,ts,jsx,tsx}"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "import/no-extraneous-dependencies": [
        "error",
        {
          bundledDependencies: false,
          optionalDependencies: false,
          includeTypes: true,
        },
      ],
      "import/order": [
        "warn",
        {
          warnOnUnassignedImports: true,
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index", "object"],
          ],
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_+$",
          varsIgnorePattern: "^_+$",
        },
      ],
    },
  },
  {
    ignores: [
      "next-env.d.ts",
      "dist/**",
      "node_modules/**",
      ".next/**",
      ".turbo/**",
    ],
  },
];
