import { useEffect, useState } from 'react'
import { portfolio } from './content.js'

const navLinks = [
  ['Home', '#home'],
  ['About', '#about'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Contact', '#contact'],
]

function ArrowIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M4 10h12M11 5l5 5-5 5" />
    </svg>
  )
}

function LeafIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.5 3.5C12.8 4.1 6 8.4 6 15.3c0 2.8 1.8 5.2 4.8 5.2 6.8 0 9.1-8.7 8.7-17Z" />
      <path d="M4 20c3.2-4.8 7.1-7.8 12.2-10.3" />
    </svg>
  )
}

function MenuIcon({ open }) {
  return (
    <span className={'menu-icon ' + (open ? 'is-open' : '')} aria-hidden="true">
      <span />
      <span />
    </span>
  )
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > 12)
    const closeMenu = () => setMenuOpen(false)
    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    window.addEventListener('resize', closeMenu)
    return () => {
      window.removeEventListener('scroll', updateHeader)
      window.removeEventListener('resize', closeMenu)
    }
  }, [])

  return (
    <header className={'site-header ' + (scrolled ? 'is-scrolled' : '')}>
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
        className={'navigation ' + (menuOpen ? 'is-open' : '')}
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
      <p className="eyebrow"><LeafIcon /> {eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="section-description">{description}</p>}
    </div>
  )
}

function TagList({ tags }) {
  return (
    <ul className="tag-list">
      {tags.map((tag) => <li key={tag}>{tag}</li>)}
    </ul>
  )
}

function App() {
  return (
    <>
      <Header />

      <main>
        <section className="hero section" id="home">
          <div className="hero-glow hero-glow-one" />
          <div className="hero-glow hero-glow-two" />
          <div className="hero-copy">
            <h1>Building thoughtful digital experiences with <span>technology, AI, and automation.</span></h1>
            <p className="hero-intro">{portfolio.intro}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">View my work <ArrowIcon /></a>
              <a className="button button-secondary" href="#contact">Contact me</a>
            </div>
            <div className="hero-meta">
              <span><LeafIcon /> Phnom Penh, Cambodia</span>
              <span>Available for collaboration</span>
            </div>
          </div>

          <aside className="hero-portrait" aria-label="Portrait and profile summary">
            <div className="portrait-grid" aria-hidden="true" />
            <img src={portfolio.profileImage} alt={'Portrait of ' + portfolio.name} />
            <div className="portrait-caption">
              <span>Currently exploring</span>
              <p>AI, automation & product ideas</p>
            </div>
          </aside>
        </section>

        <section className="about section section-surface" id="about">
          <SectionHeading
            eyebrow="About me"
            title="Technology, with room to breathe."
            description={portfolio.about}
          />
          <div className="value-grid">
            {portfolio.values.map(([title, description], index) => (
              <article className="value-card" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="skills section" id="skills">
          <SectionHeading
            eyebrow="Skills"
            title="A practical toolkit, always growing."
            description="I focus on tools that help turn thoughtful ideas into useful products."
          />
          <div className="skills-grid">
            {portfolio.skillGroups.map((group) => (
              <article className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <TagList tags={group.skills} />
              </article>
            ))}
          </div>
        </section>

        <section className="ai-section section" id="ai">
          <div className="ai-orb" aria-hidden="true" />
          <div className="ai-copy">
            <p className="eyebrow"><LeafIcon /> AI & automation</p>
            <h2>Building smarter, staying human.</h2>
            <p>I use AI and automation as practical tools to explore ideas faster, improve workflows, prototype products, and solve problems with more clarity.</p>
          </div>
          <div className="ai-points" aria-label="AI and automation focus areas">
            <span>Explore</span>
            <span>Prototype</span>
            <span>Improve</span>
          </div>
        </section>

        <section className="projects section section-surface" id="projects">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects with a point of view."
            description="A selection of mobile, web, and product-focused work."
          />
          <div className="project-grid">
            {portfolio.projects.map((project, index) => (
              <article className={'project-card ' + (project.featured ? 'project-featured' : '')} key={project.title}>
                <div className="project-card-top">
                  <span>0{index + 1}</span>
                  <p>{project.category}</p>
                </div>
                {project.image && (
                  <div className="project-art">
                    <img src={project.image} alt={project.imageAlt || ''} />
                  </div>
                )}
                <div className="project-card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <TagList tags={project.tags} />
                  <a
                    className="project-link"
                    href={project.link}
                    target={project.external ? '_blank' : undefined}
                    rel={project.external ? 'noreferrer' : undefined}
                  >
                    {project.linkLabel || 'View project'} <ArrowIcon />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="journey section" id="journey">
          <SectionHeading eyebrow="Journey" title="Learning through every chapter." />
          <div className="timeline">
            {portfolio.journey.map((item) => (
              <article className="timeline-item" key={item.period + '-' + item.title}>
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

        <section className="contact section" id="contact">
          <p className="eyebrow"><LeafIcon /> Get in touch</p>
          <h2>Have an idea?<br /><span>Let’s build something.</span></h2>
          <p>I’m always happy to talk about a project, an opportunity, or a thoughtful problem worth solving.</p>
          <div className="contact-actions">
            <a className="button button-light" href={'mailto:' + portfolio.email}>Email me <ArrowIcon /></a>
            <a className="text-link" href={portfolio.github} target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a className="logo footer-logo" href="#home">{portfolio.initials}<span>.</span></a>
        <p>Designed & built with curiosity.</p>
        <p>© {new Date().getFullYear()} {portfolio.name}</p>
      </footer>
    </>
  )
}

export default App
