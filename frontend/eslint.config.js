// Import dependencies
import vue from "eslint-plugin-vue";
import ts from "@typescript-eslint/eslint-plugin";
import vueParser from "vue-eslint-parser";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  {
    files: ["**/*.ts", "**/*.vue"],
    ignores: ["node_modules/", "dist/"],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      vue,
      "@typescript-eslint": ts,
    },
    rules: {
      "vue/no-unused-vars": "error",
      "@typescript-eslint/no-unused-vars": "error",
    },
  },
  eslintPluginPrettierRecommended,
];
