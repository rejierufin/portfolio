import { EnvelopeSimple, GithubLogo, LinkedinLogo } from '@phosphor-icons/react'
import { useState } from 'react'
import { navItems, profile } from '../data/profile'
import type { Theme } from '../lib/theme'
import { ThemeToggle } from './ThemeToggle'

export function ProfileRail({
  theme,
  onToggleTheme,
  active,
}: {
  theme: Theme
  onToggleTheme: () => void
  active: string
}) {
  const [portrait, setPortrait] = useState(profile.portraitSrc)

  const useFallback = () => {
    if (portrait !== profile.avatarSrc) setPortrait(profile.avatarSrc)
  }

  return (
    <aside className="rail" aria-label="Profile and navigation">
      <div className="rail-inner">
        <div className="rail-top">
          <div className="rail-portrait">
            <img
              src={portrait}
              alt={`Portrait of ${profile.name}`}
              width={1208}
              height={1801}
              fetchPriority="high"
              onError={useFallback}
            />
          </div>
          <div className="rail-id">
            <h1 className="rail-name">{profile.name}</h1>
            <p className="rail-role">{profile.shortRole}</p>
            <span className="rail-status">
              <span className="dot" aria-hidden="true" />
              {profile.availability}
            </span>
          </div>
        </div>

        <nav className="rail-nav" aria-label="Sections">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`rail-link${active === item.id ? ' active' : ''}`}
              aria-current={active === item.id ? 'true' : undefined}
            >
              <span className="idx">{item.index}</span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="rail-foot">
          <div className="rail-socials">
            <a className="chip-link" href={`mailto:${profile.email}`}>
              <EnvelopeSimple size={13} aria-hidden="true" />
              Email
            </a>
            <a className="chip-link" href={profile.linkedin} target="_blank" rel="noreferrer">
              <LinkedinLogo size={13} aria-hidden="true" />
              LinkedIn
            </a>
            <a className="chip-link" href={profile.website} target="_blank" rel="noreferrer">
              <GithubLogo size={13} aria-hidden="true" />
              GitHub
            </a>
          </div>
          <div className="theme-row">
            <span>Theme</span>
            <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          </div>
        </div>
      </div>
    </aside>
  )
}
