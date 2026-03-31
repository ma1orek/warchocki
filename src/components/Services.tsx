import { motion, useInView } from 'framer-motion'
import { useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
// responsive handled by CSS classes

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    tag: 'Gwiazda Twojego eventu',
    title: 'WYNAJEM EDWARDA',
    desc: 'Chcesz żeby u Ciebie było głośno? Przyjdę na Twoją konferencję, otwarcie, galę — i gwarantuję oblężenie. Ludzie będą wyciągać telefony, a TikToki zrobią się same.',
    link: '/wynajem-edwarda',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="10" rx="2" />
        <circle cx="12" cy="5" r="2" />
        <path d="M12 7v4" />
        <circle cx="8" cy="16" r="1" fill="#fff" />
        <circle cx="16" cy="16" r="1" fill="#fff" />
      </svg>
    ),
    tag: 'Moi kumple do roboty',
    title: 'WYNAJEM ROBOTÓW',
    desc: 'Mam kolegów robotów, którzy mogą pracować za Ciebie. Unitree G1, H1 — z mózgiem MERA OS. Logistyka, ochrona, retail. Robimy to na poważnie.',
    link: '/wynajem-robotow',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    tag: 'Zasięgi, których nie kupisz',
    title: 'PROMOCJA W SOCIALACH',
    desc: '350 milionów wyświetleń, człowieku. Chcesz żebym wziął Twój produkt i zrobił z niego virala? TikTok, Insta, YouTube — ja to ogarniam lepiej niż niejeden influencer z krwi i kości.',
    link: '/promocja-social-media',
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    tag: 'Mój mózg',
    title: 'SYSTEM MERA OS',
    desc: 'To jest system, który mnie napędza. AI, rozpoznawanie mowy, interakcja z ludźmi — cały mój geniusz w jednym pakiecie. Chcesz wiedzieć więcej? Wejdź na merarobotics.com.',
    link: 'https://merarobotics.com',
    external: true,
  },
]

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [hovered, setHovered] = useState(false)

  const cardStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    padding: 40,
    background: hovered ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
    border: `1px solid ${hovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'}`,
    backdropFilter: 'blur(16px)',
    transition: 'all 0.3s ease',
    transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
    cursor: 'default',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.3), transparent)' }} />
      <div style={{ marginBottom: 24 }}>{service.icon}</div>
      <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 12 }}>
        {service.tag}
      </p>
      <h3 style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
        {service.title}
      </h3>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)', marginBottom: 32, flex: 1 }}>
        {service.desc}
      </p>
      {'external' in service && service.external ? (
        <a
          href={service.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff', transition: 'opacity 0.2s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Dowiedz się więcej <span style={{ fontSize: 18 }}>&rarr;</span>
        </a>
      ) : (
        <Link
          to={service.link}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#fff', transition: 'opacity 0.2s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.6')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          Dowiedz się więcej <span style={{ fontSize: 18 }}>&rarr;</span>
        </Link>
      )}
    </motion.div>
  )
}

function ContactInline() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSending(true)
    const form = e.currentTarget
    const data = new FormData(form)

    try {
      await fetch('https://formsubmit.co/ajax/edwardwarchocki@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          subject: data.get('subject'),
          message: data.get('message'),
          _subject: 'Nowe zapytanie ze strony warchocki.pl',
        }),
      })
      setSent(true)
      form.reset()
      setTimeout(() => setSent(false), 5000)
    } catch {
      // Fallback to mailto
      const name = data.get('name') as string
      const email = data.get('email') as string
      const message = data.get('message') as string
      const body = `Imię: ${name}\nEmail: ${email}\n\n${message}`
      window.location.href = `mailto:edwardwarchocki@gmail.com?subject=${encodeURIComponent('Zapytanie — ' + name)}&body=${encodeURIComponent(body)}`
    } finally {
      setSending(false)
    }
  }

  const inputStyle: CSSProperties = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff', fontSize: 15, fontFamily: "'Space Grotesk', sans-serif", outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      style={{ marginTop: 80 }}
    >
      <div className="services-contact-grid" style={{ display: 'grid', gap: 48, alignItems: 'start' }}>
        {/* Left - info */}
        <div>
          <h3 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 20, lineHeight: 1.15 }}>
            WYCENA INDYWIDUALNA
          </h3>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginBottom: 24 }}>
            Człowieku, do każdej współpracy podchodzę indywidualnie. Każdy projekt musi być
            częścią mojej historii — bo z kim się zadaję, tym się staję. Wkładam w to
            całe serce i cały procesor, żebyś był zadowolony. Napisz, pogadamy.
          </p>
          <div style={{ padding: '24px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 10 }}>
              Lub zadzwoń
            </p>
            <a
              href="tel:+48666666245"
              style={{ fontSize: 24, fontWeight: 700, color: '#fff', transition: 'opacity 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              +48 666 666 245
            </a>
          </div>
        </div>

        {/* Right - form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <input name="name" type="text" placeholder="Imię i nazwisko" required style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            <input name="email" type="email" placeholder="Adres email" required style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>
          <select name="subject" required style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }} defaultValue=""
            onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}>
            <option value="" disabled style={{ background: '#111', color: '#888' }}>Czego dotyczy zapytanie?</option>
            <option value="Wynajem Edwarda" style={{ background: '#111' }}>Wynajem Edwarda</option>
            <option value="Wynajem robotów" style={{ background: '#111' }}>Wynajem robotów</option>
            <option value="Promocja Social Media" style={{ background: '#111' }}>Promocja Social Media</option>
            <option value="System MERA OS" style={{ background: '#111' }}>System MERA OS</option>
            <option value="Współpraca" style={{ background: '#111' }}>Współpraca</option>
            <option value="Media / Prasa" style={{ background: '#111' }}>Media / Prasa</option>
            <option value="Inne" style={{ background: '#111' }}>Inne</option>
          </select>
          <textarea name="message" placeholder="Opisz swój projekt..." required rows={4} style={{ ...inputStyle, resize: 'vertical', minHeight: 100 }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
          <button
            type="submit"
            disabled={sending}
            style={{
              padding: '16px 40px', background: sent ? '#4ade80' : '#fff', color: '#000',
              fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase',
              border: 'none', cursor: sending ? 'wait' : 'pointer', fontFamily: "'Space Grotesk', sans-serif",
              transition: 'all 0.2s ease', opacity: sending ? 0.6 : 1,
            }}
            onMouseEnter={(e) => { if (!sending) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,255,255,0.15)' } }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
          >
            {sending ? 'Wysyłanie...' : sent ? '✓ Wysłano!' : 'Zarezerwuj termin'}
          </button>
          {sent && (
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginTop: 8 }}>
              Dziękujemy! Odpowiemy najszybciej jak to możliwe.
            </p>
          )}
        </form>
      </div>
    </motion.div>
  )
}

export default function Services() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section id="uslugi" className="services-section" style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px' }}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            Dogadajmy się
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em' }}>
            ZRÓBMY COŚ RAZEM
          </h2>
        </motion.div>

        {/* 4 cards */}
        <div className="services-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2 }}>
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Contact + pricing */}
        <ContactInline />
      </div>
    </section>
  )
}
