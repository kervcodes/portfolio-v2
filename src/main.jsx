import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary } from '@/components/ErrorBoundary'

const app = (
  <StrictMode>
    <ErrorBoundary>
      <HelmetProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </HelmetProvider>
    </ErrorBoundary>
  </StrictMode>
)

const root = document.getElementById('root')

// Prerendered routes ship with real markup already in root — hydrate it
// instead of wiping and re-rendering from scratch.
if (root.hasChildNodes()) {
  hydrateRoot(root, app)
} else {
  createRoot(root).render(app)
}

const bootLoader = document.getElementById('boot-loader')
const finishBoot = () => {
  bootLoader?.remove()
}
if (bootLoader && getComputedStyle(bootLoader).display !== 'none') {
  bootLoader.addEventListener('animationend', (e) => {
    if (e.animationName === 'sig-out' || e.animationName === 'sig-fade') finishBoot()
  })
} else {
  finishBoot()
}
