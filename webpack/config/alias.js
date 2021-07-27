import { join } from 'path'
import { rootDir } from '../utils/env'

export const aliasItems = {
  '@src': join(rootDir, '/src'),
  '@public': join(rootDir, '/public'),
  '@assets': join(rootDir, '/src/assets'),
  '@components': join(rootDir, '/src/components'),
  '@pages': join(rootDir, '/src/pages'),
  '@helpers': join(rootDir, '/src/helpers')
}
