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

// The first-load signature (#boot-loader in index.html) fades itself out
// with CSS; once it has, take it out of the DOM and shorten the hero's wait
// to match the quicker page-change loader.
const bootLoader = document.getElementById('boot-loader')
const finishBoot = () => {
  bootLoader?.remove()
  document.documentElement.style.setProperty('--boot-delay', '800ms')
}
if (bootLoader && getComputedStyle(bootLoader).display !== 'none') {
  bootLoader.addEventListener('animationend', (e) => {
    if (e.animationName === 'sig-out') finishBoot()
  })
} else {
  finishBoot()
}
