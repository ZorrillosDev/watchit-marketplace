/**
 * @example
 *  const config = {
 *       $: 'jquery',
 *  }
 */
import Webpack from 'webpack'
const { ProvidePlugin } = Webpack

const config = {}

export const providePlugin = new ProvidePlugin(config)
