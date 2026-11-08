import { navItems } from '../data/profile'
import type { Theme } from '../lib/theme'
import { ThemeToggle } from './ThemeToggle'

export function MobileBar({
  theme,
  onToggleTheme,
  active,
}: {
  theme: Theme
  onToggleTheme: () => void
  active: string
}) {
  return (
    <nav className="mobilebar" aria-label="Sections">
      <div className="mobilebar-inner">
        <div className="mobilebar-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`mobilebar-link${active === item.id ? ' active' : ''}`}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
      </div>
    </nav>
  )
}
