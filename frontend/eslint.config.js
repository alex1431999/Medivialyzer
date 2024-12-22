// Import dependencies
import vue from 'eslint-plugin-vue';
import ts from '@typescript-eslint/eslint-plugin';
import vueParser from 'vue-eslint-parser';

export default [
    {
        files: ['**/*.ts', '**/*.vue'],
        ignores: ['node_modules/', 'dist/'],
        languageOptions: {
            parser: vueParser,
            parserOptions: {
                parser: '@typescript-eslint/parser',
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            vue,
            '@typescript-eslint': ts,
        },
        rules: {
            'vue/no-unused-vars': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
        },
    },
    {
        files: ['**/*.js'],
        ignores: ['node_modules/', 'dist/'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        rules: {
            'no-unused-vars': 'error',
        },
    },
];
