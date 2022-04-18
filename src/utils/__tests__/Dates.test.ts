import { Dates } from '@src/utils';

describe('Dates util', () => {
  it('should return formatted locale datetime string from `arg`', () => {
    const lang = 'en-US';
    const options = { timeZone: 'America/Los_Angeles', lang };
    const inputDate = '2021-09-04T19:03:55.000Z';
    const expectedDate = 'September 4, 2021, 12:03:55 PM';
    const dateTimeString = Dates.getLocaleDateTime(inputDate, options);

    expect(dateTimeString).toEqual(expectedDate);
  });

  it('should return expected time elapsed based on input `date', () => {
    const baseDate = '2021-09-06';
    expect(Dates.getTimeElapsed(baseDate)).toBeGreaterThan(0);
  });
});
