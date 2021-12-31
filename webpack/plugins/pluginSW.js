import {join} from "path";
import {rootDir} from '../utils/env'
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

export const workBoxSW = new WorkboxWebpackPlugin.InjectManifest({
    swSrc: join(rootDir, "./src/src-sw.js"),
    swDest: "sw.js",
    maximumFileSizeToCacheInBytes: 4000000
})