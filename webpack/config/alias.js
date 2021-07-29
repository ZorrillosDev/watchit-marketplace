import { join } from 'path'
import { rootDir } from '../utils/env'

export const aliasItems = {
  '@src': join(rootDir, '/src'),
  '@public': join(rootDir, '/public'),
  '@state': join(rootDir, '/src/redux'),
  '@assets': join(rootDir, '/src/assets'),
  '@components': join(rootDir, '/src/components'),
  '@providers': join(rootDir, '/src/providers'),
  '@pages': join(rootDir, '/src/pages'),
  '@helpers': join(rootDir, '/src/helpers')
}
