import { defineConfig } from 'tsdown'

export default defineConfig({
    entry: {
        index: 'src/index.ts',
    },
    exports: true,
    format: ['esm', 'cjs'],
    outDir: 'dist',
    dts: true,
    sourcemap: false,
    clean: true,
    deps: {
        neverBundle: ['@oapiex/sdk-kit', '@h3ravel/shared']
    }
})