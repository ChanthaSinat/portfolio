import { useEffect, useState } from 'react'
import { portfolio } from './content.js'

const navLinks = [
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Journey', '#journey'],
  ['Contact', '#contact'],
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  )
}

function MenuIcon({ open }) {
  return (
    <span className={`menu-icon ${open ? 'is-open' : ''}`} aria-hidden="true">
      <span />
      <span />
    </span>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false)
    window.addEventListener('resize', closeMenu)
    return () => window.removeEventListener('resize', closeMenu)
  }, [])

  return (
    <header className="site-header">
      <a className="logo" href="#home" aria-label="Go to home">
        {portfolio.initials}<span>.</span>
      </a>

      <button
        className="menu-button"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="main-navigation"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMenuOpen((current) => !current)}
      >
        <MenuIcon open={menuOpen} />
      </button>

      <nav
        id="main-navigation"
        className={`navigation ${menuOpen ? 'is-open' : ''}`}
        aria-label="Main navigation"
      >
        {navLinks.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  )
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}

function App() {
  return (
    <>
      <Header />

      <main>
        <section className="hero section" id="home">
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="status-dot" /> {portfolio.availability}
            </p>
            <h1>
              Hello, I’m <span>{portfolio.name}.</span>
              <br />I build clear digital experiences.
            </h1>
            <p className="hero-intro">{portfolio.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                View my work <ArrowIcon />
              </a>
              <a className="button button-secondary" href={`mailto:${portfolio.email}`}>
                Send an email
              </a>
            </div>
          </div>

          <aside className="hero-card" aria-label="Profile summary">
            <div className="portrait-mark">{portfolio.initials}</div>
            <div>
              <p className="hero-card-label">Based in</p>
              <p>{portfolio.location}</p>
            </div>
            <div>
              <p className="hero-card-label">Currently</p>
              <p>{portfolio.role}</p>
            </div>
          </aside>

          <a className="scroll-cue" href="#about" aria-label="Scroll to about section">
            Scroll to explore <span>↓</span>
          </a>
        </section>

        <section className="about section section-dark" id="about">
          <SectionHeading eyebrow="About me" title="Curious by nature. Practical by choice." />
          <div className="about-grid">
            <p className="about-lead">{portfolio.about}</p>
            <div className="about-note">
              <span>What I value</span>
              <p>Thoughtful details, honest teamwork, continuous learning, and work that creates real value.</p>
            </div>
          </div>
        </section>

        <section className="skills section" id="skills">
          <SectionHeading
            eyebrow="Skills"
            title="Tools I use to bring ideas to life."
            description="A focused toolkit that grows with every project."
          />
          <div className="skill-list">
            {portfolio.skills.map((skill, index) => (
              <div className="skill-item" key={skill}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{skill}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="projects section" id="projects">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects built with purpose."
            description="A few examples of how I approach design, development, and problem-solving."
          />
          <div className="project-list">
            {portfolio.projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-number">{project.number}</div>
                <div className="project-copy">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul aria-label={`${project.title} technologies`}>
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                <a href={project.link} aria-label={`Learn more about ${project.title}`}>
                  <ArrowIcon />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="journey section" id="journey">
          <SectionHeading eyebrow="My journey" title="Learning through every chapter." />
          <div className="timeline">
            {portfolio.journey.map((item) => (
              <article className="timeline-item" key={`${item.period}-${item.title}`}>
                <p className="timeline-period">{item.period}</p>
                <div>
                  <h3>{item.title}</h3>
                  <p className="timeline-place">{item.place}</p>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="contact section section-accent" id="contact">
          <p className="eyebrow">Get in touch</p>
          <h2>Have an idea worth building?</h2>
          <p>I’m always happy to talk about a project, an opportunity, or what you are working on.</p>
          <a className="contact-link" href={`mailto:${portfolio.email}`}>
            {portfolio.email} <ArrowIcon />
          </a>
        </section>
      </main>

      <footer className="footer">
        <a className="logo footer-logo" href="#home">
          {portfolio.initials}<span>.</span>
        </a>
        <p>Designed and built by {portfolio.name}</p>
        <p>© {new Date().getFullYear()} All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
