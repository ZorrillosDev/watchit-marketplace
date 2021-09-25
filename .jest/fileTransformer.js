import path from 'path'

//https://jestjs.io/docs/webpack
export default {
  process(src, filename, config, options) {
    return 'module.exports = ' + JSON.stringify(path.basename(filename)) + ';';
  },
};
