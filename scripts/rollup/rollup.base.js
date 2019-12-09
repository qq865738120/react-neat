import json from "rollup-plugin-json";
import typescript from "rollup-plugin-typescript";
import sourceMaps from "rollup-plugin-sourcemaps";
import commonJs from "rollup-plugin-commonjs";
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";
import fileSize from "rollup-plugin-filesize";
import replace from "rollup-plugin-replace";
import { eslint } from "rollup-plugin-eslint";
import { EnvEnum } from "../../config/index";

const nodeEnv = env => {
  if (env === EnvEnum._DEV_ || env === EnvEnum._PROD_) {
    return env;
  } else {
    return EnvEnum._DEV_;
  }
};

export default {
  plugins: [
    resolve({
      customResolveOptions: {
        moduleDirectory: "node_modules"
      }
    }),
    commonJs({
      include: "node_modules/**"
    }),
    eslint({
      throwOnError: true,
      throwOnWarning: true,
      include: ["src/**", "static/**"],
      exclude: ["node_modules/**", "dist/**"]
    }),
    json(),
    fileSize(),
    typescript({
      exclude: "node_modules/**",
      typescript: require("typescript")
    }),
    sourceMaps(),
    babel({
      exclude: "node_modules/**"
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(nodeEnv(process.env.NODE_ENV))
    })
  ]
};
