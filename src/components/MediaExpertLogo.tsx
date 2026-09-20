// Media Expert - wordmark w pigułce (brak oficjalnego SVG w assetach; kolory zbliżone do brandu:
// granatowe tło + biały napis, "expert" grubszy). Używane przy koncentratach (sprzedaż online).
export default function MediaExpertLogo({ height = 18 }: { height?: number }) {
  const fs = Math.round(height * 0.78)
  return (
    <span
      aria-label="Media Expert"
      style={{
        display: 'inline-flex', alignItems: 'baseline', gap: 0, lineHeight: 1,
        background: '#0b2d8f', color: '#fff', borderRadius: Math.round(height * 0.35),
        padding: `${Math.round(height * 0.3)}px ${Math.round(height * 0.55)}px`,
        fontFamily: "'Inter', system-ui, sans-serif", fontSize: fs, letterSpacing: '-0.02em', whiteSpace: 'nowrap',
      }}
    >
      <span style={{ fontWeight: 500 }}>media</span>
      <span style={{ fontWeight: 800 }}>expert</span>
    </span>
  )
}
