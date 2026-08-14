import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Stop the browser from restoring the previous scroll position on refresh —
// without this, reloading mid-page snaps back to wherever you were before.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}
if (!window.location.hash) {
  window.scrollTo(0, 0);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
