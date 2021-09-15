
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
}
