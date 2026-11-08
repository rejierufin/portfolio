import { Check, Copy, EnvelopeSimple, ArrowUpRight } from '@phosphor-icons/react'
import { useState } from 'react'
import { profile } from '../data/profile'

export function ContactSection() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section id="contact" className="section">
      <header className="section-head" data-reveal>
        <p className="section-kicker">Contact</p>
        <h2 className="section-title">Freight, process, or the systems behind them</h2>
        <p className="section-lede">
          If a shipment flow is leaking time or the paperwork keeps coming back, that is the conversation I like
          having.
        </p>
      </header>

      <div className="contact-card" data-reveal>
        <h3 className="contact-title">Open to operations, documentation and automation work.</h3>
        <p className="contact-lede">Email is the fastest route — I usually reply within a day.</p>

        <div className="contact-actions">
          <a className="mail-btn" href={`mailto:${profile.email}`}>
            {profile.email}
            <ArrowUpRight size={15} weight="bold" aria-hidden="true" />
          </a>
          <button type="button" className="copy-btn" onClick={copyEmail}>
            {copied ? (
              <Check size={14} weight="bold" aria-hidden="true" />
            ) : (
              <Copy size={14} aria-hidden="true" />
            )}
            {copied ? 'Copied' : 'Copy address'}
          </button>
        </div>

        <div className="contact-grid">
          <a className="contact-link" href={`tel:${profile.phoneHref}`}>
            <span className="label">Phone</span>
            <span className="value">{profile.phone}</span>
          </a>
          <a className="contact-link" href={profile.linkedin} target="_blank" rel="noreferrer">
            <span className="label">LinkedIn</span>
            <span className="value">
              rejie-rufin
              <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
            </span>
          </a>
          <a className="contact-link" href={profile.website} target="_blank" rel="noreferrer">
            <span className="label">Portfolio</span>
            <span className="value">
              rejierufin.github.io
              <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
            </span>
          </a>
          <div className="contact-link">
            <span className="label">Based in</span>
            <span className="value">
              <EnvelopeSimple size={12} aria-hidden="true" />
              {profile.location}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
