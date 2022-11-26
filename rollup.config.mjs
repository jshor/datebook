import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const plugins = [
  // TODO: this commonjs plugin will no longer be needed after file-saver is removed
  // once commonjs plugin is removed, this file can also be renamed to rollup.config.ts
  commonjs({
    namedExports: {
      'file-saver': ['saveAs']
    }
  }),
  typescript(),
  nodeResolve()
]

const getOutput = (format, config) => ({
  format,
  sourcemap: true,
  exports: 'named',
  file: `dist/datebook.${format}.min.js`,
  ...config
})

export default [
  {
    // UMD
    input: 'src/index.ts',
    plugins: plugins.concat(terser()),
    output: getOutput('umd', {
      name: 'datebook', // this is the name of the global object
      esModule: false
    })
  },
  {
    // ESM and CJS
    input: 'src/index.ts',
    plugins,
    output: [
      getOutput('esm'),
      getOutput('cjs')
    ]
  }
]
