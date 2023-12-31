import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  declaration: true,
  entries: ["src/index"],
  externals: ["@longtemps/core"],
  rollup: {
    emitCJS: true,
  },
});
