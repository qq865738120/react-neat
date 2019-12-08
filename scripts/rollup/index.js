import devConfig from "./rollup.dev";
import prodConfig from "./rollup.prod";
import { EnvEnum } from "../../config/index";

let config;
switch (process.env.NODE_ENV) {
  case EnvEnum._DEV_:
    config = devConfig;
    break;
  case EnvEnum._PROD_:
    config = prodConfig;
    break;
  default:
    config = devConfig;
    break;
}
console.log("config", config);

export default config;
