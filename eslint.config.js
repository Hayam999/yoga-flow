import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import testingLibrary from "eslint-plugin-testing-library";
import vitest from "eslint-plugin-vitest";

import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // Ignore dist output
  globalIgnores(["dist", "coverage"]),

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["node_modules"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node, // add Node globals
      },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    // Extend recommended configs
    extends: [
      js.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      testingLibrary.configs.react, // Testing Library rules
      vitest.configs.recommended, // Vitest rules
    ],

    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "testing-library": testingLibrary,
      vitest,
    },

    rules: {
      // Example tweaks:
      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
      "react/react-in-jsx-scope": "off", // Not needed with React 17+
      "react/prop-types": "off", // If you don’t use prop-types
    },
  },
]);
