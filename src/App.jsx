import { useState, useEffect, useRef, createContext, useContext } from 'react'
import { Sun, Moon } from 'lucide-react'

// ─── Theme Context ────────────────────────────────────────────────────────────

const ThemeContext = createContext({ dark: true, toggle: () => {} })

function ThemeProvider({ children }) {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('jk-theme')
    return saved ? saved === 'dark' : true
  })

  useEffect(() => {
    const root = document.documentElement
    if (dark) {
      root.classList.remove('light')
    } else {
      root.classList.add('light')
    }
    localStorage.setItem('jk-theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

// ─── Project Data ─────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: 'Eyalama Adventures',
    description:
      'Modern redesign of the Eyalama Adventures website, showcasing tour packages, a photo gallery, and a booking system with clean, professional design.',
    tech: ['React.js', 'Tailwind CSS', 'JavaScript'],
    link: 'https://eyalama-redesign.vercel.app',
    icon: (
      <svg viewBox="0 0 56 56" className="w-12 h-12 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="12" fill="var(--accent-dim)" />
        <path d="M10 38 L28 14 L46 38 Z" stroke="var(--accent)" strokeWidth="2.5" strokeLinejoin="round" fill="none"/>
        <path d="M20 38 L28 24 L36 38" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" fill="var(--accent-dim)" opacity="0.6"/>
        <circle cx="28" cy="11" r="3" fill="var(--accent)" opacity="0.7"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Rectus Bank',
    description:
      'Modern fintech platform for business financing with interactive financial tools, loan calculators, and a streamlined loan application system.',
    tech: ['React.js', 'Vite', 'Tailwind CSS'],
    link: 'https://rectus-bank-icd3-fxvi3w7au-jerometechguy-7613s-projects.vercel.app',
    icon: (
      <svg viewBox="0 0 56 56" className="w-12 h-12 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="12" fill="var(--accent-dim)" />
        <rect x="10" y="22" width="36" height="4" rx="1" fill="var(--accent)" opacity="0.8"/>
        <rect x="13" y="26" width="5" height="13" rx="1" fill="none" stroke="var(--accent)" strokeWidth="2"/>
        <rect x="25.5" y="26" width="5" height="13" rx="1" fill="none" stroke="var(--accent)" strokeWidth="2"/>
        <rect x="38" y="26" width="5" height="13" rx="1" fill="none" stroke="var(--accent)" strokeWidth="2"/>
        <path d="M8 39h40" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M20 22L28 12l8 10" stroke="var(--accent)" strokeWidth="2" strokeLinejoin="round" fill="none"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Music App',
    description:
      'Full-featured music streaming application where users can upload songs, build playlists, stream music, and download tracks for offline listening.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'HTML5 Audio API'],
    link: 'https://music-app-one-smoky.vercel.app',
    icon: (
      <svg viewBox="0 0 56 56" className="w-12 h-12 shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="56" height="56" rx="12" fill="var(--accent-dim)" />
        <circle cx="20" cy="41" r="5" fill="none" stroke="var(--accent)" strokeWidth="2"/>
        <circle cx="40" cy="38" r="5" fill="none" stroke="var(--accent)" strokeWidth="2"/>
        <path d="M25 41V17l20-4v21" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M31 20l12-2.5" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
]

const skills = [
  'React.js', 'Django', 'Tailwind CSS', 'Vite',
  'JavaScript', 'Python', 'HTML5', 'CSS3',
  'Responsive Design', 'Full-Stack', 'REST APIs', 'Git',
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible') },
      { threshold: 0.1 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])
  return ref
}

// ─── Pixel Blocks (decorative side squares from inspo) ───────────────────────

function PixelBlocks({ side = 'right' }) {
  const blocks = [
    { top: '4%',  size: 52, opacity: 1 },
    { top: '14%', size: 30, opacity: 0.7 },
    { top: '26%', size: 72, opacity: 0.5 },
    { top: '40%', size: 22, opacity: 0.9 },
    { top: '55%', size: 44, opacity: 0.6 },
    { top: '68%', size: 60, opacity: 0.5 },
    { top: '80%', size: 34, opacity: 0.8 },
    { top: '91%', size: 18, opacity: 0.7 },
  ]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {blocks.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-sm"
          style={{
            [side]: `-${b.size / 2}px`,
            top: b.top,
            width: b.size,
            height: b.size,
            background: `var(--pixel-color)`,
            opacity: b.opacity,
          }}
        />
      ))}
    </div>
  )
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)
  const { dark, toggle } = useContext(ThemeContext)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const links = [
    { label: 'About',    href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills',   href: '#skills' },
    { label: 'Contact',  href: '#contact' },
  ]

  const navBg = scrolled
    ? 'backdrop-blur-md border-b'
    : 'bg-transparent border-transparent'

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}
      style={scrolled ? { backgroundColor: 'var(--nav-bg)', borderColor: 'var(--border)' } : {}}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="Home">
          <span className="font-mono text-sm font-medium opacity-60 group-hover:opacity-100 transition-opacity"
            style={{ color: 'var(--accent)' }}>&lt;/&gt;</span>
          <span className="font-sans font-bold text-sm tracking-wide" style={{ color: 'var(--text-primary)' }}>
            Jerome<span style={{ color: 'var(--accent)' }}>.</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href} className="nav-link">{l.label}</a>
          ))}

          {/* Theme toggle */}
          <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
            {dark
              ? <Sun size={17} strokeWidth={2} />
              : <Moon size={17} strokeWidth={2} />}
          </button>

          <a href="mailto:jerometechguy@gmail.com" className="btn-solid text-xs py-2 px-5">
            Hire Me
          </a>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggle} className="theme-toggle" aria-label="Toggle theme">
            {dark ? <Sun size={16} strokeWidth={2} /> : <Moon size={16} strokeWidth={2} />}
          </button>
          <button
            className="flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: 'var(--text-primary)' }} />
            <span className={`block w-5 h-0.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
              style={{ background: 'var(--text-primary)' }} />
            <span className={`block w-5 h-0.5 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: 'var(--text-primary)' }} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: menuOpen ? '300px' : '0',
          borderBottom: menuOpen ? `1px solid var(--border)` : 'none',
        }}
      >
        <div className="px-6 py-4 flex flex-col gap-5" style={{ background: 'var(--bg-surface)' }}>
          {links.map(l => (
            <a key={l.label} href={l.href} className="nav-link text-base"
              onClick={() => setMenuOpen(false)}>{l.label}</a>
          ))}
          <a href="mailto:jerometechguy@gmail.com" className="btn-solid text-xs py-2 px-5 self-start">
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

function HeroSection() {
  const [typed, setTyped] = useState('')
  const full = 'Full Stack Developer'

  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      if (i < full.length) { setTyped(full.slice(0, ++i)) } else clearInterval(t)
    }, 70)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center mosaic-bg overflow-hidden"
    >
      <PixelBlocks side="right" />
      <PixelBlocks side="left" />

      {/* Radial glow */}
      <div className="pointer-events-none absolute" aria-hidden="true" style={{
        top: '15%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '700px', height: '700px',
        background: 'radial-gradient(ellipse, rgba(6,182,212,0.05) 0%, transparent 70%)',
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-24 w-full">
        <div className="max-w-xl">

          {/* Eyebrow */}
          <div className="section-marker mb-7">Full-Stack Developer</div>

          {/* Name */}
          <h1 className="font-sans font-extrabold leading-[1.05] mb-3"
            style={{ color: 'var(--text-primary)', fontSize: 'clamp(2.6rem, 6vw, 4.2rem)' }}>
            Jerome<br />Kasagga
          </h1>

          {/* Typewriter role */}
          <div className="mb-5 font-mono text-lg sm:text-xl font-semibold flex items-center gap-1"
            style={{ color: 'var(--accent)' }}>
            <span>{typed}</span>
            <span className="inline-block w-0.5 h-5 animate-blink" style={{ background: 'var(--accent)' }} />
          </div>

          {/* Tagline */}
          <p className="text-base sm:text-lg leading-relaxed mb-10"
            style={{ color: 'var(--text-secondary)', maxWidth: '480px' }}>
            I build modern web experiences — from conversion-focused frontends
            to robust full-stack apps. Based in{' '}
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Kampala, Uganda</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-solid">
              View My Work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#contact" className="btn-outline">Get In Touch</a>
          </div>

          {/* Floating tech labels */}
          <div className="mt-16 flex gap-8 flex-wrap">
            {['React.js', 'Django', 'Tailwind CSS'].map(t => (
              <span key={t} className="floating-code">&lt;{t} /&gt;</span>
            ))}
          </div>
        </div>

        {/* Hero illustration */}
        <div
          className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex items-center justify-center"
          style={{ animation: 'float 5s ease-in-out infinite', width: '280px', height: '280px' }}
          aria-hidden="true"
        >
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(6,182,212,0.1)' }} />
            <div className="absolute inset-6 rounded-full" style={{ border: '1px solid rgba(6,182,212,0.07)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-36 h-36 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(6,182,212,0.2)',
                  boxShadow: '0 0 40px rgba(6,182,212,0.08)',
                }}
              >
                <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none">
                  <path d="M20 30L8 40l12 10" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M60 30l12 10-12 10" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M50 20L30 60" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
                </svg>
              </div>
            </div>
            {[0, 90, 180, 270].map(deg => (
              <div key={deg} className="absolute w-2.5 h-2.5 rounded-sm" style={{
                background: 'var(--accent)',
                opacity: 0.4,
                top:  `calc(50% + ${Math.sin(deg * Math.PI / 180) * 128}px - 5px)`,
                left: `calc(50% + ${Math.cos(deg * Math.PI / 180) * 128}px - 5px)`,
              }} />
            ))}
          </div>
        </div>
      </div>

      {/* Fade-out bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--bg-base), transparent)' }} />
    </section>
  )
}

// ─── Projects ─────────────────────────────────────────────────────────────────

function ProjectCard({ project, delay = 0 }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className="reveal card-hover flex flex-col overflow-hidden"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Accent top bar */}
      <div className="h-1 w-full rounded-t-2xl" style={{ background: `linear-gradient(to right, var(--accent), rgba(6,182,212,0.3))` }} />

      <div className="p-6 flex flex-col flex-1 gap-5">
        {/* Icon + title */}
        <div className="flex items-center gap-4">
          {project.icon}
          <div>
            <h3 className="font-bold text-lg leading-tight" style={{ color: 'var(--text-primary)' }}>
              {project.title}
            </h3>
            <div className="mt-1.5 w-8 h-0.5 rounded-full" style={{ background: 'var(--accent)', opacity: 0.5 }} />
          </div>
        </div>

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
        </div>

        {/* CTA */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline self-start text-xs py-2 px-4 mt-auto"
        >
          View Project
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M7 7h10v10"/>
          </svg>
        </a>
      </div>
    </div>
  )
}

function ProjectsSection() {
  const titleRef = useReveal()
  return (
    <section id="projects" className="relative py-24 overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
      <PixelBlocks side="right" />
      <div className="max-w-5xl mx-auto px-6">
        <div ref={titleRef} className="reveal mb-14">
          <div className="section-marker mb-4">Lab</div>
          <h2 className="font-extrabold text-3xl sm:text-4xl" style={{ color: 'var(--text-primary)' }}>
            Featured Projects
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 110} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About ────────────────────────────────────────────────────────────────────

function AboutSection() {
  const leftRef  = useReveal()
  const rightRef = useReveal()
  return (
    <section id="about" className="relative py-24 mosaic-bg overflow-hidden">
      <PixelBlocks side="left" />
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">

          {/* Left — identity */}
          <div ref={leftRef} className="reveal">
            <div className="section-marker mb-6">About</div>
            <div className="flex flex-col items-start gap-6">
              {/* Avatar */}
              <div
                className="w-24 h-24 rounded-2xl flex items-center justify-center"
                style={{
                  background: 'var(--bg-card)',
                  border: '2px solid rgba(6,182,212,0.3)',
                  boxShadow: '0 0 30px rgba(6,182,212,0.08)',
                }}
              >
                <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
                  <circle cx="32" cy="22" r="12" stroke="var(--accent)" strokeWidth="2"/>
                  <path d="M8 56c0-13.3 10.7-24 24-24s24 10.7 24 24"
                    stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>

              <div>
                <h2 className="font-extrabold text-2xl mb-1" style={{ color: 'var(--text-primary)' }}>
                  Jerome Kasagga
                </h2>
                <p className="font-mono text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                  Full Stack Developer
                </p>
                <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
                  Kampala, Uganda
                </p>
              </div>

              {/* Social icons */}
              <div className="flex gap-3">
                {[
                  {
                    href: 'mailto:jerometechguy@gmail.com',
                    label: 'Email',
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2"/>
                        <path strokeLinecap="round" strokeWidth="2" d="M3 7l9 7 9-7"/>
                      </svg>
                    ),
                  },
                  {
                    href: 'https://github.com/JeromeKasagga',
                    label: 'GitHub',
                    external: true,
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                    ),
                  },
                  {
                    href: 'https://wa.me/256761577607',
                    label: 'WhatsApp',
                    external: true,
                    icon: (
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                    ),
                  },
                ].map(({ href, label, icon, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    title={label}
                    className="p-2.5 rounded-xl transition-all duration-200"
                    style={{
                      border: '1.5px solid var(--border)',
                      color: 'var(--text-muted)',
                      background: 'var(--bg-card)',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.color = 'var(--accent)'
                      e.currentTarget.style.borderColor = 'rgba(6,182,212,0.4)'
                      e.currentTarget.style.background = 'var(--accent-dim)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.color = 'var(--text-muted)'
                      e.currentTarget.style.borderColor = 'var(--border)'
                      e.currentTarget.style.background = 'var(--bg-card)'
                    }}
                  >
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — bio + skills */}
          <div ref={rightRef} className="reveal reveal-delay-2">
            <h3 className="font-bold text-xl mb-4" style={{ color: 'var(--text-primary)' }}>
              A little about me
            </h3>
            <div className="space-y-4 text-sm leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
              <p>
                I'm a 19-year-old full-stack developer from Kampala. I specialise in
                building responsive, modern web applications with{' '}
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>React</span> on
                the frontend and{' '}
                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Django</span> on
                the backend.
              </p>
              <p>
                I care about pixel-perfect interfaces, clean code, and shipping products
                that actually work. Whether you're a small business needing your first
                website or a startup needing a full web platform — I can take it from
                idea to deployment.
              </p>
            </div>

            {/* Skills */}
            <div id="skills">
              <div className="section-marker mb-5">Skills</div>
              <div className="flex flex-wrap gap-2">
                {skills.map(s => <span key={s} className="skill-tag">{s}</span>)}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

function ContactForm() {
  const ref = useReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const change = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }))
  const submit = () => {
    const { name, email, message } = form
    if (!name || !email || !message) return
    const sub  = encodeURIComponent(`Project Inquiry from ${name}`)
    const body = encodeURIComponent(`Hi Jerome,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`)
    window.open(`mailto:jerometechguy@gmail.com?subject=${sub}&body=${body}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div ref={ref} className="reveal reveal-delay-2 space-y-4">
      {[
        { id: 'name',    label: 'Your Name',    type: 'text',  placeholder: 'John Doe' },
        { id: 'email',   label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
      ].map(f => (
        <div key={f.id}>
          <label className="block text-xs font-semibold mb-2 font-mono uppercase tracking-wider"
            style={{ color: 'var(--text-muted)' }}>
            {f.label}
          </label>
          <input
            type={f.type}
            name={f.id}
            value={form[f.id]}
            onChange={change}
            placeholder={f.placeholder}
            className="form-input"
          />
        </div>
      ))}
      <div>
        <label className="block text-xs font-semibold mb-2 font-mono uppercase tracking-wider"
          style={{ color: 'var(--text-muted)' }}>
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={change}
          rows={4}
          placeholder="Tell me about your project..."
          className="form-input resize-none"
        />
      </div>
      <button onClick={submit} className="btn-solid w-full justify-center">
        {sent ? '✓ Opening your mail client…' : 'Send Message'}
      </button>
    </div>
  )
}

function ContactSection() {
  const titleRef = useReveal()
  const infoRef  = useReveal()

  const contacts = [
    {
      label: 'Email',
      value: 'jerometechguy@gmail.com',
      href:  'mailto:jerometechguy@gmail.com',
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2"/>
          <path strokeLinecap="round" strokeWidth="2" d="M3 7l9 7 9-7"/>
        </svg>
      ),
    },
    {
      label: 'WhatsApp',
      value: '+256 761 577 607',
      href:  'https://wa.me/256761577607',
      external: true,
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      ),
    },
    {
      label: 'GitHub',
      value: 'github.com/JeromeKasagga',
      href:  'https://github.com/JeromeKasagga',
      external: true,
      icon: (
        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
      ),
    },
  ]

  return (
    <section id="contact" className="relative py-24 overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
      <PixelBlocks side="left" />
      <div className="max-w-5xl mx-auto px-6">

        <div ref={titleRef} className="reveal mb-14">
          <div className="section-marker mb-4">Contact</div>
          <h2 className="font-extrabold text-3xl sm:text-4xl mb-3" style={{ color: 'var(--text-primary)' }}>
            Let's Work Together
          </h2>
          <p className="text-sm max-w-md" style={{ color: 'var(--text-secondary)' }}>
            Have a project in mind? I'd love to hear about it — send me a message and
            I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">

          {/* Contact info */}
          <div ref={infoRef} className="reveal space-y-8">
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Whether you need a landing page, a full web application, or just
              want to discuss a project idea — I'm available and ready to help.
            </p>
            <div className="space-y-5">
              {contacts.map(({ label, value, href, icon, external }) => (
                <a
                  key={label}
                  href={href}
                  target={external ? '_blank' : undefined}
                  rel={external ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 group"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
                    style={{
                      background: 'var(--accent-dim)',
                      color: 'var(--accent)',
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div className="font-mono text-xs uppercase tracking-wider mb-0.5"
                      style={{ color: 'var(--text-muted)' }}>{label}</div>
                    <div className="text-sm font-semibold transition-colors duration-200 group-hover:text-[var(--accent)]"
                      style={{ color: 'var(--text-primary)' }}>{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="py-8" style={{ borderTop: '1px solid var(--border)', background: 'var(--bg-base)' }}>
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm opacity-50" style={{ color: 'var(--accent)' }}>&lt;/&gt;</span>
          <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
            © {year} Jerome Kasagga
          </span>
        </div>
        <div className="flex gap-6">
          {['about', 'projects', 'contact'].map(s => (
            <a key={s} href={`#${s}`}
              className="font-mono text-xs capitalize transition-colors duration-200 hover:text-[var(--accent)]"
              style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
              {s}
            </a>
          ))}
        </div>
        <p className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>
          Built with React + Tailwind
        </p>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

function Inner() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)', color: 'var(--text-primary)', transition: 'background-color 0.3s ease, color 0.3s ease' }}>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Inner />
    </ThemeProvider>
  )
}
