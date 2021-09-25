import { merge } from 'webpack-merge'

import baseConfig from './webpack/base.js'
import devConfig from './webpack/dev.js'
import prodConfig from './webpack/prod.js'
import { isProd } from './webpack/utils/env.js'

export default () =>
  isProd ? merge(baseConfig, prodConfig) : merge(baseConfig, devConfig)
