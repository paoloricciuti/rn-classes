import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    splitting: false,
    dts: true,
    minify: false,
    clean: true,
    format: ["cjs", "esm"]
});