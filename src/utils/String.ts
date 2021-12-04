/* eslint-disable  @typescript-eslint/no-namespace */
/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

export namespace String {
  export const invalidString = (text: string): boolean => {
    /**
         * Check for invalid string
         * @param {string} string
         * @return {boolean} invalid or valid string
         */
    return (!text || /^\s*$/.test(text) || text.length === 0)
  }
  export const minifyHash = (hash: string, length: number = 4): string => {
    /**
         * Minify hash to '0x000...000'
         * @param {string} string
         * @param {number} length size
         * @return {boolean} invalid or valid string
         */
    return `${hash.substr(0, length)}...${hash.substr(hash.length - 3)}`
  }
}
