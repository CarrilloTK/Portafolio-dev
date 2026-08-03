import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const HEADER_OFFSET = 96
const EASE_OUT_QUART = (t) => 1 - Math.pow(1 - t, 4)

export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1.0,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false
  })

  lenis.on('scroll', ScrollTrigger.update)
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  function scrollToSection(target) {
    const distance = Math.abs(target.getBoundingClientRect().top - HEADER_OFFSET)
    const duration = Math.min(2.4, Math.max(1.0, distance / 850))
    lenis.scrollTo(target, {
      offset: -HEADER_OFFSET,
      duration,
      easing: EASE_OUT_QUART
    })
  }

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href')
      if (!href || href === '#') return
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        scrollToSection(target)
      }
    })
  })

  return lenis
}