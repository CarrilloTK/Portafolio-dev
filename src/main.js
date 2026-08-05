import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initAnimations } from './js/animations.js'
import { initLenis } from './js/lenis.js'
import './js/header.js'
import Alpine from 'alpinejs'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Make Alpine available globally
window.Alpine = Alpine

// Load partials and return a Promise that resolves when all are loaded.
// In production the partials are inlined into index.html at build time, so
// the fetch is skipped for containers that already have content.
function loadPartials() {
  const sections = [
    { id: 'header-container', file: 'header.html' },
    { id: 'hero-container', file: 'hero.html' },
    { id: 'about-container', file: 'about.html' },
    { id: 'skills-container', file: 'skills.html' },
    { id: 'projects-container', file: 'projects.html' },
    { id: 'contact-container', file: 'contact.html' },
    { id: 'footer-container', file: 'footer.html' }
  ]

  const promises = sections.map(({ id, file }) => {
    const container = document.getElementById(id)
    if (!container || container.children.length) return Promise.resolve()

    return fetch(`/partials/${file}`)
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html
      })
      .catch(err => console.error(`Error loading ${file}:`, err))
  })

  return Promise.all(promises)
}

// Embla (carousel) is only used in the projects section, below the fold.
// It is loaded on demand when the carousel gets close to the viewport.
function initCarouselLazy() {
  const root = document.querySelector('.embla')
  if (!root) return

  const load = () => import('./js/carousel.js').then(m => m.initCarousel())

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(e => e.isIntersecting)) {
          observer.disconnect()
          load().catch(err => console.error('Error loading carousel:', err))
        }
      },
      { rootMargin: '800px 0px' }
    )
    observer.observe(root)
  } else {
    load().catch(err => console.error('Error loading carousel:', err))
  }
}

// Initialize everything after partials are loaded
document.addEventListener('DOMContentLoaded', () => {
  loadPartials().then(() => {
    Alpine.start()
    try { initAnimations() } catch (err) { console.error('initAnimations error:', err) }
    try { initLenis() } catch (err) { console.error('initLenis error:', err) }
    try { initCarouselLazy() } catch (err) { console.error('initCarousel error:', err) }
  })
})
