import baseConfig from "./rollup.base";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import path from "path";

const resolveFile = function(filePath) {
  return path.join(__dirname, filePath);
};

export default {
  ...baseConfig,
  input: resolveFile("static/Index.tsx"),
  plugins: [
    ...baseConfig.plugins,
    serve({
      open: true,
      host: "localhost",
      port: 10000,
      contentBase: [resolveFile("static")]
    }),
    livereload({
      watch: resolveFile("static"),
      verbose: true
    })
  ],
  output: [
    {
      format: "iife",
      file: resolveFile("static/dev/bundle.js"),
      sourcemap: true
    }
  ]
};
