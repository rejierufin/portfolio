import { jobs } from '../data/profile'

export function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <header className="section-head" data-reveal>
        <p className="section-kicker">Experience</p>
        <h2 className="section-title">Nine years of freight that has to clear</h2>
        <p className="section-lede">
          Manifest filing, export documentation and stakeholder coordination — every role sits on the same idea:
          the paperwork has to be right before the shipment lands.
        </p>
      </header>

      <ol className="timeline">
        {jobs.map((job) => (
          <li className="job" key={`${job.company}-${job.role}`} data-reveal>
            <div className="job-when">
              <span className="job-dates">{job.end ? `${job.start} — ${job.end}` : job.start}</span>
              {job.current ? (
                <span className="job-now">
                  <span className="dot" aria-hidden="true" />
                  Current
                </span>
              ) : null}
            </div>
            <div className="job-body">
              <div className="job-head">
                <h3 className="job-role">{job.role}</h3>
                <p className="job-company">{job.company}</p>
                <p className="job-loc">{job.location}</p>
              </div>
              <ul className="bullets">
                {job.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
