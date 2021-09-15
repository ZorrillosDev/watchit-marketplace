
/* eslint-disable  @typescript-eslint/no-namespace */

export namespace Random {
  export function getRandomNumberBetween (min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
