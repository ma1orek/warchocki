// Prerender przy buildzie (scripts/prerender.mjs): ta sama aplikacja, ale ze StaticRouterem,
// żeby każda trasa miała w HTML prawdziwą treść dla wyszukiwarek i botów AI, które nie uruchamiają JS.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { AppRoutes } from './App'

export { products } from './lib/products'

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>,
  )
}
