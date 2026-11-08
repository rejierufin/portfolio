import { capabilities, skillGroups } from '../data/profile'

export function SkillsSection() {
  return (
    <section id="skills" className="section">
      <header className="section-head" data-reveal>
        <p className="section-kicker">Capabilities</p>
        <h2 className="section-title">From manifest rules to a tool the team keeps</h2>
        <p className="section-lede">
          The documentation skills are the foundation. The interesting part is turning the rules behind them into
          something that catches exceptions before a broker does.
        </p>
      </header>

      <div className="bento">
        {skillGroups.map((group, index) => (
          <article
            className={`card skill-card b-6 d${(index % 2) + 1}`}
            key={group.title}
            data-reveal
          >
            <p className="card-kicker">{group.note}</p>
            <h3 className="card-title">{group.title}</h3>
            <div className="chips">
              {group.items.map((item) => (
                <span className="pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="steps-block" data-reveal>
        <p className="section-kicker">How I work</p>
        <div className="steps">
          {capabilities.map((step) => (
            <div className="step" key={step.step}>
              <span className="step-num">{step.step}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-body">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
