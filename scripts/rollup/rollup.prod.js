import baseConfig from "./rollup.base";
// import { uglify } from "rollup-plugin-uglify";
import { terser } from "rollup-plugin-terser";
import { version } from "../../package.json";

const VERSION = process.env.VERSION || version;

const copyright =
  new Date().getFullYear() > 2018 ? "2018-" + new Date().getFullYear() : 2018;

const banner =
  "/*!\n" +
  " * idebug v" +
  VERSION +
  "\n" +
  " * (c) " +
  copyright +
  " code_xia\n" +
  " * Released under the MIT License.\n" +
  " */";

export default {
  ...baseConfig,
  input: "src/index.ts",
  plugins: [
    ...baseConfig.plugins,
    terser({
      compress: {
        // eslint-disable-next-line @typescript-eslint/camelcase
        pure_funcs: ["console.log"]
      }
    })
  ],
  output: [
    {
      banner,
      format: "es",
      file: "dist/es/index.js",
      sourcemap: true
    },
    {
      banner,
      format: "umd",
      file: "dist/umd/index.js",
      name: "ReactNeat",
      sourcemap: true
    }
  ],
  external: ["react", "react-dom"]
};
