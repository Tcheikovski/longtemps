import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  preset: "auto",
  externals: ["@abraham/reflection", "typedi", "@longtemps/core"],
  rollup: {
    esbuild: {
      treeShaking: true,
    },
  },
});
