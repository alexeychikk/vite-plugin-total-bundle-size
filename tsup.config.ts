import type { Options } from 'tsup';

export const tsup: Options = {
  entry: ['src/index.ts'],
  dts: true,
  format: ['esm', 'cjs'],
  shims: true,
  clean: true,
};
