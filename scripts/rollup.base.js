import json from "rollup-plugin-json";

export default {
  input: "src/main.js",
  plugins: [json()],
  output: {
    format: "cjs",
    file: "bundle.js"
  }
};
