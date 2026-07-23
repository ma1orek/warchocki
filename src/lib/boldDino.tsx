import { Fragment, type ReactNode } from 'react'

// Pogrubia każde wystąpienie "DINO"/"Dino" w tekście (user: „dino pogrub zawsze").
// Zwraca tablicę węzłów do wstawienia bezpośrednio w JSX.
export function boldDino(text: string): ReactNode {
  const parts = text.split(/(\bDINO\b|\bDino\b)/g)
  return parts.map((part, i) =>
    /^(DINO|Dino)$/.test(part)
      ? <strong key={i} style={{ color: '#fff', fontWeight: 800 }}>{part}</strong>
      : <Fragment key={i}>{part}</Fragment>
  )
}
