/* eslint-disable  @typescript-eslint/no-namespace */

export namespace Random {

  /**
   * Generate random number between defined range
   *
   * @export
   * @param {number} min
   * @param {number} max
   * @return {*}  {number}
   */
  export function getRandomNumberBetween (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }


  /**
   * Get random value from array
   *
   * @export
   * @param {string[]} elementList
   * @return {*}  {string}
   */
  export function getRandomValueFromArray (elementList: string[]): string {
    const random = Math.floor(Math.random() * elementList.length)
    return elementList[random]
  }
}
