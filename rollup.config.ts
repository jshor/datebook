import { ModuleFormat, OutputOptions, RollupOptions } from 'rollup'
import { terser } from 'rollup-plugin-terser'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

const plugins = [
  typescript(),
  nodeResolve()
]

const getOutput = (format: ModuleFormat, ext: string, config: OutputOptions = {}): OutputOptions => ({
  format,
  sourcemap: true,
  exports: 'named',
  file: `dist/datebook.min.${ext}`,
  ...config
})

const options: RollupOptions[] = [
  {
    // UMD
    input: 'src/index.ts',
    plugins: plugins.concat(terser()),
    output: getOutput('umd', 'js', {
      name: 'datebook', // allows window.datebook to be accessible
      esModule: false
    })
  },
  {
    // ESM and CJS
    input: 'src/index.ts',
    plugins,
    output: [
      getOutput('esm', 'mjs'),
      getOutput('cjs', 'cjs')
    ]
  }
]

export default options
