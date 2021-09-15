import { String } from '@src/utils'

describe('String util', () => {
  it('should return true if `arg` is a invalid string', () => {
    const isInvalid = String.invalidString('')
    expect(isInvalid).toBeTruthy()
  })

  it('should return false if a valid string is passed as arg', () => {
    const isInvalid = String.invalidString('hello world')
    expect(isInvalid).toBeFalsy()
  })
})
