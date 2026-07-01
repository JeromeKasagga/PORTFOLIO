import { useState, useEffect, useRef } from 'react'

// ─── Data ─────────────────────────────────────────────────────────────────────

const projects = [
  {
    id: 1,
    title: 'EduLearn',
    description:
      'A clean, modern landing page for an online learning platform. Showcases courses and instructors with a focus on user engagement and conversion.',
    tech: ['React.js', 'Tailwind CSS', 'JavaScript'],
    link: 'https://edulearn-theta.vercel.app',
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="8" fill="rgba(0,229,196,0.08)" />
        <path d="M12 20h40M12 28h28M12 36h32M12 44h20" stroke="#00e5c4" strokeWidth="2.5" strokeLinecap="square"/>
        <rect x="36" y="30" width="18" height="18" rx="2" fill="none" stroke="#00e5c4" strokeWidth="2"/>
        <path d="M40 39l3 3 5-6" stroke="#00e5c4" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Almaar Consultation Agency',
    description:
      'Professional web presence for a consultation agency, designed to showcase services, build trust, and drive client engagement with a modern UI.',
    tech: ['React.js', 'Vite', 'Tailwind CSS'],
    link: 'https://almaar-consultation-agency.vercel.app/',
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="8" fill="rgba(0,229,196,0.08)" />
        <path d="M16 20h32v20H28l-8 8v-8h-4V20z" fill="none" stroke="#00e5c4" strokeWidth="2.5" strokeLinejoin="miter"/>
        <path d="M24 28h16M24 34h10" stroke="#00e5c4" strokeWidth="2.5" strokeLinecap="square"/>
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Music App',
    description:
      'Full-featured music streaming app where users upload songs, build playlists, stream music, and download tracks for offline listening.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'HTML5 Audio API'],
    link: 'https://music-app-one-smoky.vercel.app',
    icon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="64" height="64" rx="8" fill="rgba(0,229,196,0.08)" />
        <circle cx="22" cy="46" r="6" fill="none" stroke="#00e5c4" strokeWidth="2"/>
        <circle cx="46" cy="42" r="6" fill="none" stroke="#00e5c4" strokeWidth="2"/>
        <path d="M28 46V18l24-4v24" stroke="#00e5c4" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
        <path d="M34 22l12-2" stroke="#00e5c4" strokeWidth="1.5" strokeLinecap="square"/>
      </svg>
    ),
  },
]

const skills = [
  'React.js', 'Django', 'Tailwind CSS', 'Vite',
  'JavaScript', 'HTML5', 'CSS3', 'Python',
  'Responsive Design', 'Full-Stack', 'REST APIs', 'Git',
]

// ─── Utility Hook ──────────────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      },
      { threshold: 0.12 }
    )
    const el = ref.current
    if (el) observer.observe(el)
    return () => { if (el) observer.unobserve(el) }
  }, [])
  return ref
}

// ─── Pixel Block Decoration (inspired by inspo) ────────────────────────────────

function PixelBlocks({ side = 'right' }) {
  const blocks = [
    { top: '5%', size: 56, opacity: 0.07 },
    { top: '12%', size: 32, opacity: 0.05 },
    { top: '22%', size: 80, opacity: 0.04 },
    { top: '35%', size: 24, opacity: 0.09 },
    { top: '50%', size: 48, opacity: 0.05 },
    { top: '65%', size: 64, opacity: 0.04 },
    { top: '78%', size: 36, opacity: 0.07 },
    { top: '88%', size: 20, opacity: 0.06 },
  ]
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {blocks.map((b, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            [side]: `-${b.size / 2}px`,
            top: b.top,
            width: b.size,
            height: b.size,
            background: `rgba(0, 229, 196, ${b.opacity})`,
          }}
        />
      ))}
    </div>
  )
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group" aria-label="Jerome Kasagga home">
          <span className="text-teal font-mono text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">&lt;/&gt;</span>
          <span className="font-mono font-semibold text-text-primary text-sm tracking-wide">
            Jerome<span className="text-teal">.</span>
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
          <a href="mailto:jerometechguy@gmail.com" className="btn-primary text-xs py-2 px-5">
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-0.5 bg-text-primary transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-0.5 bg-text-primary transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64 border-b border-white/5' : 'max-h-0'}`}>
        <div className="bg-navy-light px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="nav-link text-base"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <a href="mailto:jerometechguy@gmail.com" className="btn-primary text-xs py-2 px-5 self-start mt-2">
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

function HeroSection() {
  const [typed, setTyped] = useState('')
  const fullText = 'Full Stack Developer'

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setTyped(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
      }
    }, 70)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center mosaic-bg overflow-hidden" id="hero">
      <PixelBlocks side="right" />
      <PixelBlocks side="left" />

      {/* Subtle radial gradient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(ellipse, rgba(0,229,196,0.05) 0%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-32 pb-20 w-full">
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <div className="section-marker mb-6">
            <span>Developer Full-Stack</span>
          </div>

          {/* Name */}
          <h1 className="font-sans font-bold text-text-primary leading-none mb-2">
            <span className="block text-4xl sm:text-5xl md:text-6xl">Jerome</span>
            <span className="block text-4xl sm:text-5xl md:text-6xl">Kasagga</span>
          </h1>

          {/* Typed role */}
          <div className="mt-4 mb-6 font-mono text-teal text-lg sm:text-xl font-medium tracking-wide flex items-center gap-1">
            <span>{typed}</span>
            <span className="inline-block w-0.5 h-5 bg-teal animate-blink" />
          </div>

          {/* Tagline */}
          <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-10 max-w-lg">
            I build modern web experiences — from clean, conversion-focused frontends
            to robust full-stack applications. Based in{' '}
            <span className="text-text-primary font-medium">Kampala, Uganda</span>.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a href="#projects" className="btn-solid">
              View My Work
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
            <a href="#contact" className="btn-primary">
              Get In Touch
            </a>
          </div>

          {/* Floating code snippets — subtle decorative elements */}
          <div className="mt-16 flex gap-8 flex-wrap">
            {['React.js', 'Django', 'Tailwind CSS'].map((t) => (
              <span key={t} className="floating-code opacity-40 text-xs">
                &lt;{t} /&gt;
              </span>
            ))}
          </div>
        </div>

        {/* Hero illustration — geometric dev icon */}
        <div
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:block"
          style={{ animation: 'float 5s ease-in-out infinite' }}
          aria-hidden="true"
        >
          <div className="relative w-72 h-72">
            {/* Outer ring */}
            <div className="absolute inset-0 border border-teal/10 rounded-full" />
            <div className="absolute inset-6 border border-teal/15 rounded-full" />

            {/* Central icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-36 h-36 bg-navy-card border border-teal/20 flex items-center justify-center"
                style={{ boxShadow: '0 0 40px rgba(0,229,196,0.08)' }}>
                <svg viewBox="0 0 80 80" className="w-20 h-20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 30L8 40l12 10" stroke="#00e5c4" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
                  <path d="M60 30l12 10-12 10" stroke="#00e5c4" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter"/>
                  <path d="M50 20L30 60" stroke="rgba(0,229,196,0.4)" strokeWidth="2" strokeLinecap="square"/>
                </svg>
              </div>
            </div>

            {/* Corner dots */}
            {[0, 90, 180, 270].map((deg) => (
              <div
                key={deg}
                className="absolute w-2 h-2 bg-teal/40"
                style={{
                  top: `calc(50% + ${Math.sin((deg * Math.PI) / 180) * 130}px - 4px)`,
                  left: `calc(50% + ${Math.cos((deg * Math.PI) / 180) * 130}px - 4px)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-navy to-transparent pointer-events-none" />
    </section>
  )
}

// ─── Projects Section ─────────────────────────────────────────────────────────

function ProjectCard({ project, delay = 0 }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      onClick={() => window.open(project.link, '_blank', 'noopener,noreferrer')}
      className="reveal card-hover bg-navy-card border border-white/8 flex flex-col cursor-pointer"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Card top bar */}
      <div className="h-0.5 bg-teal/30 w-full" />

      <div className="p-6 flex flex-col flex-1 gap-5">
        {/* Icon + Title */}
        <div className="flex items-start gap-4">
          {project.icon}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary text-lg leading-tight mb-1">
              {project.title}
            </h3>
            <div className="w-8 h-0.5 bg-teal/40" />
          </div>
        </div>

        {/* Description */}
        <p className="text-text-secondary text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>

        {/* CTA */}
        <span
          className="btn-primary self-start mt-auto text-xs"
        >
          Visit Site
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="square" strokeWidth="2" d="M7 17L17 7M7 7h10v10"/>
          </svg>
        </span>
      </div>
    </div>
  )
}

function ProjectsSection() {
  const titleRef = useReveal()

  return (
    <section id="projects" className="relative py-24 bg-navy-light overflow-hidden">
      <PixelBlocks side="right" />

      <div className="max-w-5xl mx-auto px-6">
        <div ref={titleRef} className="reveal mb-14">
          <div className="section-marker mb-4">Portfolio</div>
          <h2 className="font-bold text-text-primary text-3xl sm:text-4xl">
            Featured Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About Section ────────────────────────────────────────────────────────────

function AboutSection() {
  const leftRef = useReveal()
  const rightRef = useReveal()

  return (
    <section id="about" className="relative py-24 mosaic-bg overflow-hidden">
      <PixelBlocks side="left" />

      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left — identity card */}
          <div ref={leftRef} className="reveal">
            <div className="section-marker mb-6">About</div>

            {/* Avatar placeholder */}
            <div className="mb-8 flex flex-col items-start gap-6">
              <div
                className="w-24 h-24 border-2 border-teal/40 flex items-center justify-center bg-navy-card"
                style={{ boxShadow: '0 0 30px rgba(0,229,196,0.1)' }}
              >
                <svg viewBox="0 0 64 64" className="w-14 h-14" fill="none">
                  <circle cx="32" cy="22" r="12" stroke="#00e5c4" strokeWidth="2"/>
                  <path d="M8 56c0-13.3 10.7-24 24-24s24 10.7 24 24" stroke="#00e5c4" strokeWidth="2" strokeLinecap="square"/>
                </svg>
              </div>

              <div>
                <h2 className="font-bold text-text-primary text-2xl mb-1">Jerome Kasagga</h2>
                <p className="text-teal font-mono text-sm">Full Stack Developer</p>
                <p className="text-text-muted text-sm mt-1">Kampala, Uganda</p>
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                <a
                  href="mailto:jerometechguy@gmail.com"
                  className="text-text-muted hover:text-teal transition-colors p-2 border border-white/8 hover:border-teal/30"
                  aria-label="Email"
                  title="Email"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="square" strokeWidth="2" d="M4 4h16v16H4V4zm0 0l8 8 8-8"/>
                  </svg>
                </a>
                <a
                  href="https://github.com/JeromeKasagga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-teal transition-colors p-2 border border-white/8 hover:border-teal/30"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                  </svg>
                </a>
                <a
                  href="https://wa.me/256761577607"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-text-muted hover:text-teal transition-colors p-2 border border-white/8 hover:border-teal/30"
                  aria-label="WhatsApp"
                  title="WhatsApp"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right — bio + skills */}
          <div ref={rightRef} className="reveal reveal-delay-2">
            <h3 className="font-semibold text-text-primary text-xl mb-4">
              Get to know me
            </h3>
            <div className="space-y-4 text-text-secondary text-sm leading-relaxed mb-8">
              <p>
                I'm a 19-year-old full-stack developer from Kampala. I specialise in
                building responsive, modern web applications with <span className="text-text-primary font-medium">React</span> on
                the frontend and <span className="text-text-primary font-medium">Django</span> on
                the backend.
              </p>
              <p>
                I care about pixel-perfect interfaces, clean code, and shipping products
                that actually work. Whether you're a small business looking for your first
                website or a startup needing a full web platform, I can take it from idea
                to deployment.
              </p>
            </div>

            {/* Skills grid */}
            <div id="skills">
              <div className="section-marker mb-5">Skills</div>
              <div className="flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span key={s} className="skill-tag">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contact Section ──────────────────────────────────────────────────────────

function ContactSection() {
  const titleRef = useReveal()
  const cardRef = useReveal()

  return (
    <section id="contact" className="relative py-24 bg-navy-light overflow-hidden">
      <PixelBlocks side="left" />

      <div className="max-w-5xl mx-auto px-6">
        <div ref={titleRef} className="reveal mb-14">
          <div className="section-marker mb-4">Contact</div>
          <h2 className="font-bold text-text-primary text-3xl sm:text-4xl mb-3">
            Let's Work Together
          </h2>
          <p className="text-text-secondary text-sm max-w-md">
            Have a project in mind? I'd love to hear about it. Send me a message
            and I'll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <div ref={cardRef} className="reveal space-y-6">
            <p className="text-text-secondary text-sm leading-relaxed">
              Whether you need a landing page, a full web application, or just
              want to chat about a project — I'm available and ready to help.
            </p>

            <div className="space-y-4">
              {[
                {
                  label: 'Email',
                  value: 'jerometechguy@gmail.com',
                  href: 'mailto:jerometechguy@gmail.com',
                  icon: (
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <rect x="3" y="5" width="18" height="14" rx="0" strokeWidth="2"/>
                      <path strokeLinecap="square" strokeWidth="2" d="M3 5l9 8 9-8"/>
                    </svg>
                  ),
                },
                {
                  label: 'WhatsApp',
                  value: '+256 761 577 607',
                  href: 'https://wa.me/256761577607',
                  icon: (
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  ),
                },
                {
                  label: 'GitHub',
                  value: 'github.com/JeromeKasagga',
                  href: 'https://github.com/JeromeKasagga',
                  icon: (
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                    </svg>
                  ),
                },
              ].map(({ label, value, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 group text-text-secondary hover:text-text-primary transition-colors"
                >
                  <div className="text-teal">{icon}</div>
                  <div>
                    <div className="text-text-muted font-mono text-xs uppercase tracking-wider mb-0.5">{label}</div>
                    <div className="text-sm font-medium group-hover:text-teal transition-colors">{value}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Simple contact form */}
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

function ContactForm() {
  const ref = useReveal()
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit() {
    const { name, email, message } = form
    if (!name || !email || !message) return
    const subject = encodeURIComponent(`Project Inquiry from ${name}`)
    const body = encodeURIComponent(`Hi Jerome,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`)
    window.open(`mailto:jerometechguy@gmail.com?subject=${subject}&body=${body}`, '_blank')
    setSent(true)
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <div ref={ref} className="reveal reveal-delay-2">
      <div className="space-y-4">
        <div>
          <label className="block text-text-muted font-mono text-xs uppercase tracking-wider mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            className="w-full bg-navy border border-white/10 text-text-primary text-sm px-4 py-3 focus:outline-none focus:border-teal/50 placeholder:text-text-muted transition-colors"
          />
        </div>
        <div>
          <label className="block text-text-muted font-mono text-xs uppercase tracking-wider mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full bg-navy border border-white/10 text-text-primary text-sm px-4 py-3 focus:outline-none focus:border-teal/50 placeholder:text-text-muted transition-colors"
          />
        </div>
        <div>
          <label className="block text-text-muted font-mono text-xs uppercase tracking-wider mb-2">
            Message
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={4}
            placeholder="Tell me about your project..."
            className="w-full bg-navy border border-white/10 text-text-primary text-sm px-4 py-3 focus:outline-none focus:border-teal/50 placeholder:text-text-muted transition-colors resize-none"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn-solid w-full justify-center"
        >
          {sent ? '✓ Opening mail client...' : 'Send Message'}
        </button>
      </div>
    </div>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-navy border-t border-white/5 py-8">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-teal font-mono text-sm opacity-60">&lt;/&gt;</span>
          <span className="font-mono text-text-muted text-xs">
            © {year} Jerome Kasagga
          </span>
        </div>
        <div className="flex gap-6">
          {['#about', '#projects', '#contact'].map((href) => (
            <a
              key={href}
              href={href}
              className="text-text-muted hover:text-teal font-mono text-xs transition-colors capitalize"
            >
              {href.replace('#', '')}
            </a>
          ))}
        </div>
        <p className="text-text-muted font-mono text-xs">
          Built with React + Tailwind
        </p>
      </div>
    </footer>
  )
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Close menu on resize
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return (
    <div className="min-h-screen">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
