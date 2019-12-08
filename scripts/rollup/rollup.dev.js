import baseConfig from "./rollup.base";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";

export default {
  ...baseConfig,
  input: "static/Index.tsx",
  plugins: [
    ...baseConfig.plugins,
    serve({
      open: true,
      host: "localhost",
      port: 10000,
      contentBase: ["static"]
    }),
    livereload({
      watch: "static/dev/bundle.js"
    })
  ],
  output: [
    {
      format: "iife",
      file: "static/dev/bundle.js",
      sourcemap: true
    }
  ],
  watch: {
    include: "static"
  }
};
