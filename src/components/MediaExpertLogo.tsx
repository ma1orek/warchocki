// Media Expert - oficjalny wordmark (SVG z nagłówka mediaexpert.pl: żółte „media" + białe „expert" + żółte
// kółko z trójkątem) zaprojektowany na CZARNE tło - stąd czarna pigułka, nie biała jak inne sieci.
// BEZ loading="lazy" (małe logo o początkowej szerokości 0 nigdy się nie ładuje - patrz StoreLogos).
export default function MediaExpertLogo({ height = 18 }: { height?: number }) {
  return (
    <span
      style={{
        display: 'inline-flex', alignItems: 'center', background: '#000', borderRadius: Math.round(height * 0.5),
        padding: `${Math.round(height * 0.32)}px ${Math.round(height * 0.6)}px`, border: '1px solid rgba(255,255,255,0.14)',
      }}
    >
      <img src="/mediaexpert-logo.svg" alt="Media Expert" decoding="async" style={{ height, width: 'auto', display: 'block' }} />
    </span>
  )
}
