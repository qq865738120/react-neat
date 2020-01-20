import baseConfig from "./rollup.base";
// import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser";

export default {
  ...baseConfig,
  input: "src/main.ts",
  plugins: [...baseConfig.plugins, terser()],
  output: [
    {
      format: "es",
      file: "dist/index.js",
      sourcemap: true
    }
  ],
  external: ["react", "react-dom"]
};
