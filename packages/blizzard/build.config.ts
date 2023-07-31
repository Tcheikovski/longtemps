import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: [
    'src/index',
    {
      input: 'src/constants/',
      outDir: 'dist/constants/'
    },
    {
      input: 'src/types/',
      outDir: 'dist/types/'
    }
  ],
  externals: ['@longtemps/core'],
  failOnWarn: false
})
