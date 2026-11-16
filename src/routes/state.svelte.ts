export class HomePageState {
  readonly techStacks = [
    { id: 0, title: 'Dart' },
    { id: 1, title: 'Flutter' },
    { id: 2, title: 'Figma' },
    { id: 3, title: 'Svelte' },
    { id: 4, title: 'Nuxt' },
    { id: 5, title: 'Go' },
    { id: 6, title: 'Next' },
    { id: 7, title: 'Swift' },
    { id: 8, title: 'Java' },
    { id: 9, title: 'Spring' },
    { id: 10, title: 'Rive' }
  ]

  initMasonryLayout = async (containerEl: HTMLElement, itemSelector: string, columnWidth: number, horizontalOrder: boolean) => {
    const Masonry = (await import('masonry-layout')).default
    new Masonry(containerEl!, {
      itemSelector: itemSelector,
      columnWidth: columnWidth,
      horizontalOrder: horizontalOrder,
      transitionDuration: 0
    })
  }

  getLang = (): string => localStorage.getItem('lang') || 'en'

  getTheme = () => localStorage.getItem('theme') || 'auto'

  setTheme = (to = '') => {
    if (to === 'light') {
      document.documentElement.setAttribute('data-theme', 'light')
    } else if (to === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark')
    } else {
      const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', colorScheme)
    }
  }

  readonly avatars = [
    { id: 0, fileSize: 4, file: 'avatar_3.riv' },
    { id: 1, fileSize: 4, file: 'avatar_1.riv' },
    { id: 2, fileSize: 3, file: 'avatar_2.riv' }
  ]
}
