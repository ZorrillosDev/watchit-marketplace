/* eslint-disable  @typescript-eslint/no-namespace */
/* eslint-disable  @typescript-eslint/explicit-function-return-type */
/* eslint-disable  @typescript-eslint/strict-boolean-expressions */

interface DateTimeFormatOptions {
  localeMatcher?: 'best fit' | 'lookup'
  weekday?: 'long' | 'short' | 'narrow'
  era?: 'long' | 'short' | 'narrow'
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  day?: 'numeric' | '2-digit'
  hour?: 'numeric' | '2-digit'
  minute?: 'numeric' | '2-digit'
  second?: 'numeric' | '2-digit'
  timeZoneName?: 'long' | 'short'
  formatMatcher?: 'best fit' | 'basic'
  hour12?: boolean
  timeZone?: string
}

type DateTimeParams = DateTimeFormatOptions & { lang?: string };

export namespace Dates {
  /**
   * Parse input date into local timezone
   *
   * @export
   * @param {string} inputDate
   * @param {DateTimeParams} [options]
   * @return {*}  {string}
   */
  export function getLocaleDateTime(inputDate: string, options?: DateTimeParams): string {
    // Get timezone from nav
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // undefined to force function get lang from nav
    return new Intl.DateTimeFormat(
      options?.lang, {
        hour12: true,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZone: tz,
        ...options,
      }).format(new Date(inputDate));
  }

  /**
   * Get time elapsed since input until today
   *
   * @param {string} date
   * @return {*}
   */
  export const getTimeElapsed = (date: string) => {
    if (!date) return 0;

    const startDate = new Date(date);
    const today = new Date();
    let flag = true;
    let day;
    let dayCount = 0;

    while (flag) {
      day = startDate.getDay();
      if (day !== 0 && day !== 6) dayCount++;
      startDate.setDate(startDate.getDate() + 1);

      if (startDate.getDate() === today.getDate() &&
          startDate.getMonth() === today.getMonth()) { flag = false; }
    }

    return dayCount;
  };
}
