import DinoLogo from './DinoLogo'

// Retail chains carrying the drinks. Each logo sits in its own white pill
// so the brand colors stay legible on the dark background.
const stores = [
  { name: 'Kaufland', src: '/kaufland-logo.svg' },
  { name: 'Auchan', src: '/auchan-logo.svg' },
  { name: 'SPAR', src: '/spar-logo.svg' },
]

export default function StoreLogos({ height = 18, align = 'flex-start' }: { height?: number; align?: 'flex-start' | 'center' }) {
  const pill = {
    display: 'inline-flex',
    alignItems: 'center',
    background: '#fff',
    borderRadius: 24,
    padding: `${Math.round(height * 0.28)}px ${Math.round(height * 0.6)}px`,
  } as const

  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: align, gap: 6 }}>
      <span style={pill}>
        <DinoLogo height={height} />
      </span>
      {stores.map((s) => (
        <span key={s.name} style={pill}>
          <img src={s.src} alt={s.name} decoding="async" style={{ height, width: 'auto', display: 'block' }} />
        </span>
      ))}
    </span>
  )
}
