import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: [
    'src/index',
    {
      input: 'src/types/',
      outDir: 'dist/types/'
    }
  ],
  externals: [],
  failOnWarn: false
})
