import baseConfig from "./rollup.base";
// import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser";

export default {
  ...baseConfig,
  input: "src/main.ts",
  plugins: [...baseConfig.plugins, terser()],
  output: [
    {
      format: "cjs",
      file: "dist/cjs/bundle.cjs.js",
      sourcemap: true
    },
    {
      format: "es",
      file: "dist/esm/bundle.esm.js",
      sourcemap: true
    }
  ],
  external: ["react", "react-dom"]
};
