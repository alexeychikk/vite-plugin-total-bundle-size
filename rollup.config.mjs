import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

const output = {
  sourcemap: true,
  exports: 'named',
};

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        ...output,
        file: 'dist/index.mjs',
        format: 'esm',
      },
      {
        ...output,
        file: 'dist/index.js',
        format: 'cjs',
      },
    ],
    plugins: [nodeResolve(), commonjs(), typescript()],
    external: ['chalk'],
  },
];
