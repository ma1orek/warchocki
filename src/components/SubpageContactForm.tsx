import { useState, type FormEvent, type CSSProperties } from 'react'

const inputStyle: CSSProperties = {
  width: '100%', padding: '14px 16px',
  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff', fontSize: 15, fontFamily: "'Space Grotesk', sans-serif", outline: 'none',
  transition: 'border-color 0.2s ease',
}

export default function SubpageContactForm({ defaultSubject }: { defaultSubject: string }) {
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
          subject: defaultSubject,
          message: data.get('message'),
          _subject: `Zapytanie: ${defaultSubject} — warchocki.pl`,
        }),
      })
      setSent(true)
      form.reset()
      setTimeout(() => setSent(false), 5000)
    } catch {
      const name = data.get('name') as string
      const email = data.get('email') as string
      const message = data.get('message') as string
      window.location.href = `mailto:edwardwarchocki@gmail.com?subject=${encodeURIComponent(defaultSubject + ' — ' + name)}&body=${encodeURIComponent(`Imię: ${name}\nEmail: ${email}\n\n${message}`)}`
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ marginTop: 64, padding: '48px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'start' }}>
        <div>
          <h3 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 16 }}>
            Napisz do mnie
          </h3>
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>
            Człowieku, napisz czego potrzebujesz. Odpiszę najszybciej jak się da.
          </p>
          <div style={{ paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>
              Lub zadzwoń
            </p>
            <a href="tel:+48666666245" style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>
              +48 666 666 245
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            <input name="name" type="text" placeholder="Imię i nazwisko" required style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
            <input name="email" type="email" placeholder="Adres email" required style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
          </div>
          <textarea name="message" placeholder="Opisz czego potrzebujesz..." required rows={4} style={{ ...inputStyle, resize: 'vertical' as const, minHeight: 100 }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')} />
          <button type="submit" disabled={sending} style={{
            padding: '16px 40px', background: sent ? '#4ade80' : '#fff', color: '#000',
            fontSize: 14, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const,
            border: 'none', cursor: sending ? 'wait' : 'pointer', fontFamily: "'Space Grotesk', sans-serif",
            transition: 'all 0.2s ease', opacity: sending ? 0.6 : 1,
          }}>
            {sending ? 'Wysyłanie...' : sent ? 'Wysłano!' : 'Wyślij zapytanie'}
          </button>
          {sent && <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>Dzięki! Odezwę się najszybciej jak mogę.</p>}
        </form>
      </div>
    </div>
  )
}
