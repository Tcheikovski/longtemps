import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  preset: "auto",
  externals: ["@abraham/reflection", "class-transformer", "class-validator"],
  rollup: {
    esbuild: {
      treeShaking: true,
    },
  },
});
