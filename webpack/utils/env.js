export const mode = process.env.NODE_ENV ?? 'production'
export const isDevServer = process.env.WEBPACK_IS_DEV_SERVER === 'true'
export const isProd = mode === 'production'
export const isDev = !isProd
export const {pathname: rootDir} = new URL('../../', import.meta.url)
export const {pathname: webpackDir} = new URL('../', import.meta.url)
