import { ContourField } from './components/ContourField'
import { ContactSection } from './components/ContactSection'
import { ExperienceSection } from './components/ExperienceSection'
import { Home } from './components/Home'
import { MobileBar } from './components/MobileBar'
import { ProfileRail } from './components/ProfileRail'
import { SkillsSection } from './components/SkillsSection'
import { profile } from './data/profile'
import { SECTION_IDS, useActiveSection, useReveal } from './lib/nav'
import { useTheme } from './lib/theme'

export default function App() {
  const { theme, toggle } = useTheme()
  const active = useActiveSection(SECTION_IDS)
  useReveal()

  return (
    <>
      <ContourField theme={theme} />
      <a className="skip-link" href="#home">
        Skip to content
      </a>

      <div className="shell">
        <ProfileRail theme={theme} onToggleTheme={toggle} active={active} />
        <MobileBar theme={theme} onToggleTheme={toggle} active={active} />

        <main className="main">
          <div className="main-inner">
            <Home />
            <ExperienceSection />
            <SkillsSection />
            <ContactSection />

            <footer className="footer">
              <span>
                © {new Date().getFullYear()} {profile.name} · {profile.location}
              </span>
              <span>Freight forwarding &amp; shipping operations</span>
            </footer>
          </div>
        </main>
      </div>
    </>
  )
}
