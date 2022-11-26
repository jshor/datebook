import { ModuleFormat, OutputOptions, RollupOptions } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const plugins = [
  typescript(),
  nodeResolve()
]

const getOutput = (format: ModuleFormat, config: OutputOptions = {}): OutputOptions => ({
  format,
  sourcemap: true,
  exports: 'named',
  file: `dist/datebook.${format}.min.js`,
  ...config
})

const options: RollupOptions[] = [
  {
    // UMD
    input: 'src/index.ts',
    plugins: plugins.concat(terser()),
    output: getOutput('umd', {
      name: 'datebook', // allows window.datebook to be accessible
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

export default options
