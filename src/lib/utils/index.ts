type DateInput = string | number | Date;

export const formatDate = (
  value: DateInput,
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
  locale: string = "en-US",
): string => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Returns true if the two UTC date strings are less than one calendar year apart.
 * Order doesn't matter. Accepts ISO 8601 strings, e.g. "2025-03-15T10:00:00Z".
 */
export const isLessThanAYear = (a: string, b: string): boolean => {
  const dateA = new Date(a)
  const dateB = new Date(b)

  if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
    throw new Error(`Invalid date string: "${isNaN(dateA.getTime()) ? a : b}"`)
  }

  const [earlier, later] = dateA <= dateB ? [dateA, dateB] : [dateB, dateA]

  const oneYearLater = new Date(earlier.getTime())
  oneYearLater.setUTCFullYear(oneYearLater.getUTCFullYear() + 1)

  return later < oneYearLater
}

export const encodeParam = (value: unknown) =>
  encodeURIComponent(JSON.stringify(value ?? null)).replaceAll('%20', '+')

export const getImageSizeFromUrl = (url: string): App.ImageSize => {
  const split = url.split('_')
  const length = split.length
  const size = split[length - 1].split('.')[0].split('x')
  return { width: size[0], height: size[1] }
}

// A ugly workaround to remove unused `@html`
export const parseCompiled = (code: string): string => {
  return code.replace(/>{@html `<code class="language-/g, '><code class="language-')
    .replace(/<\/code>`}<\/pre>/g, '</code></pre>')
}
