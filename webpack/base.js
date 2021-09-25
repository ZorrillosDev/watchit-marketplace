import { aliasItems, devServerUrl, externalItems } from './config/index.js'
import entry from './entry.js'
import optimization from './optimization.js'
import * as plugins from './plugins/index.js'
import * as rules from './rules/index.js'
import { isDevServer, isProd } from './utils/env.js'
import { arrayFilterEmpty } from './utils/helpers.js'


const {pathname: context} = new URL('', import.meta.url)
const {pathname: dist} = new URL('../dist', import.meta.url)
const {pathname: root} = new URL('../', import.meta.url)

export default {
  target: isDevServer ? 'web' : ['web', 'es5'],
  mode: isProd ? 'production' : 'development',
  entry,
  output: {
    path: dist,
    publicPath: isDevServer ? devServerUrl : './',
    filename: isDevServer
      ? '[name].[fullhash].js'
      : '[name].[contenthash].js'
  },
  module: {
    rules: arrayFilterEmpty([
      rules.javascriptRule,
      rules.typescriptRule,
      rules.htmlRule,
      rules.imagesRule,
      rules.fontsRule,
      rules.cssRule,
      ...rules.svgRules
    ])
  },
  plugins: arrayFilterEmpty([
    plugins.htmlWebpackPlugin,
    plugins.providePlugin,
    plugins.definePlugin,
    plugins.forkTsCheckerWebpackPlugin,
    plugins.copyPlugin
  ]),
  resolve: {
    modules: [
      "node_modules",
      root
    ],
    alias: aliasItems,
    extensions: ['.tsx', '.ts', '.js', '.jsx']
  },
  optimization,
  externals: externalItems
}
