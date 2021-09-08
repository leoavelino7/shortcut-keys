import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: false,
    },
    {
      file: pkg.module,
      format: "es",
      exports: "named",
      sourcemap: false,
    },
    {
      file: pkg.module,
      format: "esm",
      exports: "named",
      sourcemap: false,
    }
  ],
  plugins: [
    typescript()
  ]
};
