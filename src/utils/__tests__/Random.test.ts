import { Random } from '@src/utils'

describe('Random util', () => {
  it('should return random number between min and max', () => {
    const min = 5
    const max = 10
    const randomNumber = Random.getRandomNumberBetween(min, max)

    expect(randomNumber >= min).toBeTruthy()
    expect(randomNumber <= max).toBeTruthy()
  })
})
