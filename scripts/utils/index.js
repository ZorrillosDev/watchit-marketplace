const { parse, stringify } = require('envfile')
const fs = require('fs')
const path = require('path')
const root = process.cwd()
const sourcePath = path.join(root, '.env')

function writeInEnv (newData) {
  /**
   * Write or replace vars in .env
   * @param {object}
   * @type {Buffer}
   */
  const currentEnvData = fs.readFileSync(sourcePath)
  const parsedEnv = parse(currentEnvData)
  const mergedData = Object.assign({}, parsedEnv, newData)
  const stringData = stringify(mergedData)
  fs.writeFileSync(sourcePath, stringData)
}

module.exports = {
  writeInEnv
}
