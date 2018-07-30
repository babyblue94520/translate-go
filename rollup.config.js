import typescript from 'rollup-plugin-typescript';
import buble from 'rollup-plugin-buble';
import nodeResolve from 'rollup-plugin-node-resolve';

const config = {
  entry: 'src/lib/translate-go.ts',
  targets: [{
    // dest: 'lib/translate-go.js',
    dest: 'D:/dev/workspace-js/fullpay-manage-web/src/assets/js/translate-go.js',
    format: 'iife',
    moduleName: 'TranslateModule',
    sourceMap: false
  }],
  plugins: [
    typescript({
      typescript: require('typescript')
    }),
    buble(),
    nodeResolve({
      jsnext: true,
      main: true
    })
  ]
}
export default config;