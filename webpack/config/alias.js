import { join } from 'path'
import { rootDir } from '../utils/env'

export const aliasItems = {
  '@src': join(rootDir, '/src'),
  '@images': join(rootDir, '/src/images'),
  '@styles': join(rootDir, '/src/styles'),
  '@components': join(rootDir, '/src/components'),
  '@pages': join(rootDir, '/src/app/pages'),
  '@helpers': join(rootDir, '/src/helpers')
}
