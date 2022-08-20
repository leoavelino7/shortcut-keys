import typescript from "rollup-plugin-typescript2";
import { uglify } from 'rollup-plugin-uglify';

import pkg from "./package.json";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.min.js",
      format: "iife",
      exports: "named",
      sourcemap: false,
      plugins: [uglify()]
    },
    {
      file: pkg.main,
      format: "iife",
      exports: "named",
      sourcemap: false
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
