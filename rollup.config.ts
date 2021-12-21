import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
const cleanup = require('rollup-plugin-cleanup')

const input = 'src/index.ts'
const plugins = () => [
  babel({ babelHelpers: 'bundled' }),
  commonjs(),
  typescript({
    tsconfig: './tsconfig.json'
  }),
]

export default () => [
  {
    input,
    output: {
      name: 'FaviconNotify',
      file: 'dist/index.common.js',
      format: 'cjs',
      exports: 'default',
    },
    plugins: [ ...plugins(), cleanup({ comments: 'none' })]
  },
  {
    input,
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    plugins: [ ...plugins(), cleanup({ comments: 'none' })]
  },
  {
    input,
    output: {
      name: 'FaviconNotify',
      file: 'dist/index.js',
      format: 'umd'
    },
    plugins: [ ...plugins(), cleanup({ comments: 'none' })]
  },
  {
    input,
    output: {
      name: 'FaviconNotify',
      file: 'dist/index.min.js',
      format: 'umd',
      sourcemap: true
    },
    plugins: [ ...plugins(), terser({ format: { comments: false } }) ]
  }
]
