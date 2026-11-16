import { getEntry } from './l10n'
import t9n from './l10n/l10n'

type AppState = {
  theme: string,
  locale: string
  loadedPosts: App.Post[]
  loadedPages: number[]
}

export const app = $state<AppState>({ theme: 'light', locale: 'en', loadedPosts: [], loadedPages: [] })

const localized = $derived.by(() => {
  return t9n[app.locale as keyof typeof t9n]
})

const getl10n = $derived.by(() => {
  return <Path extends string>(path: Path) => getEntry(path, localized)
})

export const l10n = <Path extends string>(path: Path) => {
  return getl10n(path)
}
