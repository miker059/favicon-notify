import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'

export default {
  input: 'src/index.ts',
  output: {
    name: 'FaviconNotify',
    file: 'example/plugin.js',
    format: 'iife',
  },
  plugins: [
    babel({ babelHelpers: 'bundled' }),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.dev.json'
    }),
  ]
}
