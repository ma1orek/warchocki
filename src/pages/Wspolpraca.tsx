import { motion } from 'framer-motion'
import { useRef, useState, type FormEvent, type FocusEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const TYPES = [
  { id: 'Urodziny', emoji: '🎂', desc: 'Przyjęcia urodzinowe, imprezy' },
  { id: 'Eventy', emoji: '🎪', desc: 'Targi, otwarcia, konferencje' },
  { id: 'Szkoła', emoji: '🏫', desc: 'Dni otwarte, akademie, spotkania' },
  { id: 'Reklama', emoji: '📱', desc: 'TikTok, Instagram, YouTube' },
  { id: 'Media', emoji: '📰', desc: 'Prasa, TV, podcast, wywiad' },
  { id: 'Fan', emoji: '⭐', desc: 'Spotkanie z fanem, meet & greet' },
]

const BUDGETS = ['Do ustalenia', 'Do 5 000 zł', '5 000 – 15 000 zł', '15 000 – 50 000 zł', 'Powyżej 50 000 zł']

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
  boxSizing: 'border-box' as const,
}
const focusOn = (e: FocusEvent<HTMLElement>) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)' }
const focusOff = (e: FocusEvent<HTMLElement>) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }

const label = { fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.55)', marginBottom: 7, display: 'block' }
const sectionTitle = { fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: 'rgba(255,255,255,0.35)', marginBottom: 18 }

export default function Wspolpraca() {
  const [params] = useSearchParams()
  const formRef = useRef<HTMLFormElement>(null)
  const [type, setType] = useState<string>(params.get('typ') === 'fan' ? 'Fan' : '')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  // Wysyłka AJAX-em przez FormSubmit — formularz ZOSTAJE na stronie, ZERO captchy
  // (_captcha:false), zero przekierowań. Leady lecą na maila; auto-odpowiedzi
  // świadomie brak (FormSubmit wysyła ją tylko z włączoną captchą).
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const d = new FormData(form)
    // honeypot: bot wypełni ukryte pole -> udajemy sukces i nie wysyłamy
    if ((d.get('website') as string)?.trim()) { setSent(true); form.reset(); return }
    setSending(true)
    setError('')
    const g = (k: string) => ((d.get(k) as string) || '').trim()
    const who = g('Nazwa firmy / organizacji') || `${g('Imię')} ${g('Nazwisko')}`.trim() || 'warchocki.pl'
    const stamp = new Date().toLocaleString('pl-PL', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
    const kat = (type || 'Ogólne').toUpperCase()
    try {
      const res = await fetch('https://formsubmit.co/ajax/edwardwarchocki@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          // Kategoria [RODZAJ] na początku + znacznik czasu = widać co kto pisze
          // i Gmail nie wątkuje maili razem (każdy osobno).
          _subject: `[${kat}] Zapytanie o współpracę — ${who} • ${stamp}`,
          _template: 'table',
          _captcha: 'false',
          'Rodzaj współpracy': type || '—',
          'Nazwa firmy / organizacji': g('Nazwa firmy / organizacji') || '—',
          'Imię': g('Imię'),
          'Nazwisko': g('Nazwisko'),
          'Stanowisko': g('Stanowisko') || '—',
          'Telefon': g('Telefon') || '—',
          email: g('email'),
          'Termin / Data': g('Termin / Data') || '—',
          'Budżet orientacyjny': g('Budżet orientacyjny') || '—',
          'Opis potrzeby': g('Opis potrzeby'),
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setSent(true)
      form.reset()
      setType('')
    } catch {
      setError('Coś nie zadziałało. Napisz bezpośrednio na edwardwarchocki@gmail.com')
    } finally {
      setSending(false)
    }
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000', color: '#fff' }}>
      <Navbar />
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '140px 24px 80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' as const }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>
            Współpraca
          </p>
          <h1 style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 18 }}>
            WSPÓŁPRACA<br />Z EDWARDEM
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.5)' }}>
            Napisz do nas, a wrócimy w ciągu 24 godzin.
          </p>
        </motion.div>

        {sent ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', padding: '48px 24px', border: '1px solid rgba(255,255,255,0.14)', background: 'rgba(255,255,255,0.03)' }}
          >
            <div style={{ fontSize: 40, marginBottom: 14 }}>🤖</div>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>Wysłane!</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)' }}>
              Dostaliśmy Twoje zapytanie i już na nie patrzymy. Odezwiemy się najszybciej jak się da — zwykle w ciągu 24 godzin. No i elegancko!
            </p>
          </motion.div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 44 }}>
            {/* honeypot anty-spam (niewidoczny dla ludzi) */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} aria-hidden="true" />

            {/* 1. Rodzaj współpracy */}
            <div>
              <p style={sectionTitle}>1 · Rodzaj współpracy</p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 10 }}>
                {TYPES.map((t) => {
                  const active = type === t.id
                  return (
                    <button
                      type="button"
                      key={t.id}
                      onClick={() => setType(t.id)}
                      style={{
                        display: 'flex', flexDirection: 'column', gap: 6, textAlign: 'left',
                        padding: '14px 16px', cursor: 'pointer',
                        background: active ? '#fff' : 'rgba(255,255,255,0.03)',
                        color: active ? '#000' : '#fff',
                        border: `1px solid ${active ? '#fff' : 'rgba(255,255,255,0.12)'}`,
                        fontFamily: "'Space Grotesk', sans-serif", transition: 'all 0.15s ease',
                      }}
                    >
                      <span style={{ fontSize: 22 }}>{t.emoji}</span>
                      <span style={{ fontSize: 14, fontWeight: 700 }}>{t.id}</span>
                      <span style={{ fontSize: 11, lineHeight: 1.35, color: active ? 'rgba(0,0,0,0.55)' : 'rgba(255,255,255,0.4)' }}>{t.desc}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* 2. Dane */}
            <div>
              <p style={sectionTitle}>2 · Dane kontaktowe</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={label}>Nazwa firmy / organizacji</label>
                  <input name="Nazwa firmy / organizacji" style={inputStyle} placeholder="np. Magiczna Księgarnia Sp. z o.o." onFocus={focusOn} onBlur={focusOff} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={label}>Imię *</label>
                    <input name="Imię" required style={inputStyle} placeholder="Imię" onFocus={focusOn} onBlur={focusOff} />
                  </div>
                  <div>
                    <label style={label}>Nazwisko *</label>
                    <input name="Nazwisko" required style={inputStyle} placeholder="Nazwisko" onFocus={focusOn} onBlur={focusOff} />
                  </div>
                </div>
                <div>
                  <label style={label}>Stanowisko</label>
                  <input name="Stanowisko" style={inputStyle} placeholder="np. Marketing Manager" onFocus={focusOn} onBlur={focusOff} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={label}>Telefon *</label>
                    <input name="Telefon" type="tel" required style={inputStyle} placeholder="+48 600 000 000" onFocus={focusOn} onBlur={focusOff} />
                  </div>
                  <div>
                    <label style={label}>E-mail *</label>
                    <input name="email" type="email" required style={inputStyle} placeholder="kontakt@firma.pl" onFocus={focusOn} onBlur={focusOff} />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Szczegóły */}
            <div>
              <p style={sectionTitle}>3 · Szczegóły</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div>
                    <label style={label}>Termin / Data</label>
                    <input name="Termin / Data" style={inputStyle} placeholder="np. 15 czerwca 2026 lub Q3" onFocus={focusOn} onBlur={focusOff} />
                  </div>
                  <div>
                    <label style={label}>Budżet orientacyjny</label>
                    <select name="Budżet orientacyjny" defaultValue="" style={{ ...inputStyle, appearance: 'none' as const, cursor: 'pointer' }} onFocus={focusOn} onBlur={focusOff}>
                      <option value="" style={{ background: '#111' }}>Wybierz przedział</option>
                      {BUDGETS.map((b) => <option key={b} value={b} style={{ background: '#111' }}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={label}>Opisz czego potrzebujesz *</label>
                  <textarea name="Opis potrzeby" required rows={5} style={{ ...inputStyle, resize: 'vertical' as const, minHeight: 130 }} placeholder="Opisz projekt, czego oczekujesz od Edwarda, co chcesz osiągnąć..." onFocus={focusOn} onBlur={focusOff} />
                </div>
              </div>
            </div>

            {error && <p style={{ fontSize: 14, color: '#ff8a8a' }}>{error}</p>}

            <div>
              <button
                type="submit"
                disabled={sending}
                style={{
                  width: '100%', padding: '18px', background: sending ? 'rgba(255,255,255,0.5)' : '#fff', color: '#000',
                  fontSize: 15, fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase',
                  border: 'none', cursor: sending ? 'wait' : 'pointer', fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {sending ? 'Wysyłanie...' : 'Wyślij zapytanie 💼'}
              </button>
              <p style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(255,255,255,0.35)', textAlign: 'center', marginTop: 14 }}>
                Wysyłając zapytanie zgadzasz się na kontakt zwrotny i przetwarzanie podanych danych w celu jego obsługi.
              </p>
            </div>
          </form>
        )}
      </section>
      <Footer />
    </div>
  )
}
