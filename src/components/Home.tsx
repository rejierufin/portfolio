import { ArrowRight, ArrowUpRight } from '@phosphor-icons/react'
import { education, jobs, profile, stats, toolGroups, type Tool } from '../data/profile'

const current = jobs.find((job) => job.current) ?? jobs[0]

function ToolChip({ item }: { item: Tool }) {
  if (typeof item === 'string') return <span className="pill">{item}</span>

  return (
    <a className="pill pill-link" href={item.href} target="_blank" rel="noreferrer">
      {item.name}
      <ArrowUpRight size={11} weight="bold" aria-hidden="true" />
    </a>
  )
}

const focus = [
  { title: 'Import customs manifests', note: 'Vietnam & Cambodia' },
  { title: 'Ocean & air freight documentation', note: 'MAWB · HAWB · EDI' },
  { title: 'Pre-arrival control & tracking', note: 'exception handling' },
  { title: 'Process tooling', note: 'Power Apps · no-code' },
]

export function Home() {
  return (
    <section id="home" className="section">
      <div className="hero" data-reveal>
        <p className="section-kicker">{profile.location}</p>
        <h2 className="hero-title">
          Import freight, <em>documented right</em> the first time.
        </h2>
        <p className="hero-lede">{profile.heroLede}</p>
        <div className="hero-meta">
          <span className="tag">Maersk Global Service Centre</span>
          <span className="tag">e2m / e-Trade</span>
          <span className="tag">Power Apps</span>
        </div>
      </div>

      <div className="marquee" aria-hidden="true" data-reveal>
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-set" key={copy}>
              {profile.marquee.map((item) => (
                <span className="marquee-item" key={item}>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="bento">
        <article className="card now-card b-7 d1" data-reveal>
          <p className="card-kicker">Now</p>
          <h3 className="now-role">{current.role}</h3>
          <div className="now-meta">
            <span>{current.company}</span>
            <span>
              {current.start} — {current.end}
            </span>
            <span>{current.location}</span>
          </div>
          <ul className="bullets">
            {current.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <a className="card-link" href="#experience">
            Full experience
            <ArrowRight size={14} weight="bold" aria-hidden="true" />
          </a>
        </article>

        <article className="card b-5 d2" data-reveal>
          <p className="card-kicker">Focus</p>
          <ul className="focus-list">
            {focus.map((item, index) => (
              <li className="focus-item" key={item.title}>
                <span className="idx">0{index + 1}</span>
                <span>
                  {item.title} <em>— {item.note}</em>
                </span>
              </li>
            ))}
          </ul>
        </article>

        {stats.map((stat, index) => (
          <article className={`card stat b-4 d${index + 1}`} key={stat.label} data-reveal>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </article>
        ))}

        <article className="card b-8 d1" data-reveal>
          <p className="card-kicker">Toolkit</p>
          <h3 className="card-title">Operations first, then the tools that make them repeatable</h3>
          <div className="tool-groups">
            {toolGroups.map((group) => (
              <div className="tool-group" key={group.label}>
                <p className="tool-group-label">{group.label}</p>
                <div className="chips">
                  {group.items.map((item) => (
                    <ToolChip
                      key={typeof item === 'string' ? item : item.name}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <a className="card-link" href="#skills">
            Capabilities
            <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
          </a>
        </article>

        <article className="card b-4 d2" data-reveal>
          <p className="card-kicker">Education</p>
          <h3 className="card-title">{education.degree}</h3>
          <p className="skill-note">{education.school}</p>
          <p className="skill-note">{education.years}</p>
        </article>
      </div>
    </section>
  )
}
