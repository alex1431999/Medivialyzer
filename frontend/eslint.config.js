import vue from 'eslint-plugin-vue';
import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
    {
        files: ['**/*.ts', '**/*.vue'],
        ignores: ['node_modules/', 'dist/'],
        languageOptions: {
            parser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
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
