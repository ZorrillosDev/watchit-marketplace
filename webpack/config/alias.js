import { join } from 'path'
import { rootDir } from '../utils/env'

export const aliasItems = {
  '@src': join(rootDir, '/src'),
  '@public': join(rootDir, '/public'),
  '@state': join(rootDir, '/src/redux'),
  '@pages': join(rootDir, '/src/pages'),
  '@assets': join(rootDir, '/src/assets'),
  '@helpers': join(rootDir, '/src/helpers'),
  '@components': join(rootDir, '/src/components'),
  '@layouts': join(rootDir, '/src/pages/__layouts__/')
}
