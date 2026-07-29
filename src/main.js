import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AOS from 'aos'
import { initAnimations } from './js/animations.js'
import { initLenis } from './js/lenis.js'
import { initUtils } from './js/utils.js'
import './js/header.js'
import Alpine from 'alpinejs'
import '@fontsource-variable/onest/wght.css'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Make Alpine available globally
window.Alpine = Alpine

// Load partials and return a Promise that resolves when all are loaded
function loadPartials() {
  const sections = [
    { id: 'header-container', file: 'header.html' },
    { id: 'hero-container', file: 'hero.html' },
    { id: 'about-container', file: 'about.html' },
    { id: 'skills-container', file: 'skills.html' },
    { id: 'projects-container', file: 'projects.html' },
    { id: 'experience-container', file: 'experience.html' },
    { id: 'contact-container', file: 'contact.html' },
    { id: 'footer-container', file: 'footer.html' }
  ]

  const promises = sections.map(({ id, file }) => {
    const container = document.getElementById(id)
    if (!container) return Promise.resolve()

    return fetch(`/src/partials/${file}`)
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html
      })
      .catch(err => console.error(`Error loading ${file}:`, err))
  })

  return Promise.all(promises)
}

// Initialize everything after partials are loaded
document.addEventListener('DOMContentLoaded', () => {
  loadPartials().then(() => {
    Alpine.start()
    initAnimations()
    initLenis()
    initUtils()
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100
    })
  })
})
