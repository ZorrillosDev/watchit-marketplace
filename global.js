const fs = require('fs')
const path = require('path')
const ROOT_DIR = './src/js/app/'

module.exports = {
  pagesEntries () {
    return (function walkOverDir (initial_dir = ROOT_DIR, initialScope = {}) {
      // Update dirs
      const entryArray = fs.readdirSync(initial_dir)

      // Map over entries
      entryArray.map((item) => {
        // Check for directory
        const dir = path.join(initial_dir, item)
        const entry = fs.lstatSync(dir)

        // Check if valid file or directory
        if (entry.isDirectory()) {
          // Recursive call to dirs
          return walkOverDir(dir, initialScope)
        } else if (entry.isFile()) {
          // Parse file dirs
          const _parent = path.dirname(dir)
          const _index = path.relative(ROOT_DIR, _parent)

          if (!(_index in initialScope)) { initialScope[_index] = [] }

          // Append dirs in _index
          initialScope[_index].push(
            path.resolve(dir)
          )
        }
        return false
      })

      return initialScope
    })()
  }
}
