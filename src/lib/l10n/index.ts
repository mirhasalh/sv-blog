type PathValue<T, Path extends string> = string extends Path
  ? object
  : Path extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? PathValue<T[Key], Rest>
      : undefined
    : Path extends keyof T
      ? T[Path]
      : undefined

export function getEntry<T, Path extends string>(path: Path, dictionary: T): PathValue<T, Path> {
  const value = path.split('.').reduce<unknown>((entry, key) => {
    if (entry === null || typeof entry !== 'object') return undefined
    return (entry as Record<string, unknown>)[key]
  }, dictionary)

  return value as PathValue<T, Path>
}
