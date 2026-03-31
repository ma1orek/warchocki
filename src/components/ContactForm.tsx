import { motion, useInView } from 'framer-motion'
import { useRef, useState, type FormEvent } from 'react'

export default function ContactForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setSending(true)

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
      const name = data.get('name') as string
      const email = data.get('email') as string
      const message = data.get('message') as string
      const body = `Imię: ${name}\nEmail: ${email}\n\n${message}`
      window.location.href = `mailto:edwardwarchocki@gmail.com?subject=${encodeURIComponent('Zapytanie — ' + name)}&body=${encodeURIComponent(body)}`
    } finally {
      setSending(false)
    }
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    color: '#fff',
    fontSize: 15,
    fontFamily: "'Space Grotesk', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s ease',
  }

  return (
    <section id="kontakt" style={{ position: 'relative', padding: '120px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 48px' }}>
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          {/* Left - info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
              Kontakt
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 24, lineHeight: 1.1 }}>
              GOTOWY NA
              <br />
              PRZYSZŁOŚĆ?
            </h2>
            <p style={{ fontSize: 17, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginBottom: 32, maxWidth: 450 }}>
              Napisz do nas — odpowiadamy w ciągu 24 godzin. Opowiedz nam
              o swoim projekcie, a przygotujemy spersonalizowaną ofertę.
            </p>

            <div style={{ marginBottom: 24 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>Email</p>
              <a href="mailto:edwardwarchocki@gmail.com" style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>
                edwardwarchocki@gmail.com
              </a>
            </div>

            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>Technologia</p>
              <a href="https://merarobotics.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>
                merarobotics.com
              </a>
            </div>
          </motion.div>

          {/* Right - form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input
                  name="name"
                  type="text"
                  placeholder="Imię i nazwisko"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Adres email"
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
                  onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                />
              </div>
              <select
                name="subject"
                required
                style={{ ...inputStyle, appearance: 'none' as const, cursor: 'pointer' }}
                defaultValue=""
                onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              >
                <option value="" disabled style={{ background: '#111', color: '#888' }}>Czego dotyczy zapytanie?</option>
                <option value="Wynajem Edwarda" style={{ background: '#111' }}>Wynajem Edwarda</option>
                <option value="Wynajem robotów" style={{ background: '#111' }}>Wynajem robotów</option>
                <option value="Promocja Social Media" style={{ background: '#111' }}>Promocja Social Media</option>
                <option value="Współpraca" style={{ background: '#111' }}>Współpraca</option>
                <option value="Media / Prasa" style={{ background: '#111' }}>Media / Prasa</option>
                <option value="Inne" style={{ background: '#111' }}>Inne</option>
              </select>
              <textarea
                name="message"
                placeholder="Twoja wiadomość..."
                required
                rows={5}
                style={{ ...inputStyle, resize: 'vertical' as const, minHeight: 120 }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
              />
              <button
                type="submit"
                disabled={sending}
                style={{
                  padding: '16px 40px',
                  background: sending ? 'rgba(255,255,255,0.5)' : '#fff',
                  color: '#000',
                  fontSize: 14,
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase' as const,
                  border: 'none',
                  cursor: sending ? 'wait' : 'pointer',
                  fontFamily: "'Space Grotesk', sans-serif",
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => { if (!sending) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(255,255,255,0.15)' } }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                {sending ? 'Wysyłanie...' : sent ? 'Wysłano!' : 'Wyślij zapytanie'}
              </button>
              {sent && (
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
                  Dziękujemy! Odpowiemy najszybciej jak to możliwe.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
