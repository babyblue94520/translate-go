import typescript from 'rollup-plugin-typescript';
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/translate-go/translate-go.ts',
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    buble({
      transforms: { dangerousForOf: true }
    }),
    nodeResolve({
      jsnext: true,
      main: true
    })
  ],
  output: {
    file: 'dist/lib/translate-go.js',
    format: 'iife',
    name: 'TranslateModule'
  }
};

