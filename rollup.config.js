const typescript = require("rollup-plugin-typescript2");
const { uglify } = require("rollup-plugin-uglify");

const pkg = require("./package.json");

exports.default = {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.min.js",
      name: "ShortcutKeys",
      format: "iife",
      exports: "named",
      sourcemap: false,
      plugins: [uglify()],
    },
    {
      file: pkg.main,
      name: "ShortcutKeys",
      format: "iife",
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
    },
  ],
  plugins: [typescript()],
};
