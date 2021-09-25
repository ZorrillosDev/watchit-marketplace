import { join } from 'path'
import { rootDir } from './utils/env.js'

export default {
  main: [
    join(rootDir, '/src/index.tsx')
  ]
}
