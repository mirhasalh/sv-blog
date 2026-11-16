type DateInput = string | number | Date;

export function formatDate(
  value: DateInput,
  options: Intl.DateTimeFormatOptions = { dateStyle: "medium" },
  locale: string = "en-US",
): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat(locale, options).format(date);
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
