import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const BAR_LIGHT = '#f2f2ea'
const BAR_DARK = '#070b14'

function readTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

/** Theme lives on <html data-theme> so the inline script in index.html and
 *  every stylesheet agree, and so there is no flash on reload. */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(readTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const bar = document.querySelector('meta[name="theme-color"]')
    if (bar) bar.setAttribute('content', theme === 'dark' ? BAR_DARK : BAR_LIGHT)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Private mode with storage disabled: the theme still applies for this visit.
    }
  }, [theme])

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggle }
}
