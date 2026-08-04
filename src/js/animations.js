import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
ScrollTrigger.config({ ignoreMobileResize: true })
window.addEventListener('load', () => ScrollTrigger.refresh())

export function initAnimations() {
  setTimeout(() => {
    headerAnimation()
    heroAnimations()
    revealAnimations()
    timelineAnimations()
    parallaxAnimations()
  }, 100)
}

function headerAnimation() {
  const navbar = document.querySelector('#navbar')
  const links = document.querySelectorAll('#nav-links li')

  if (navbar) {
    gsap.fromTo(navbar,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.1 }
    )
  }

  if (links.length) {
    gsap.fromTo(links,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.4 }
    )
  }
}

function heroAnimations() {
  const heroText = document.querySelector('#hero-text')
  if (!heroText) return

  const words = heroText.querySelectorAll('h1 .word')
  const badge = heroText.querySelector('.hero-badge')
  const subtitle1 = heroText.querySelector('.hero-subtitle')
  const subtitle2 = heroText.querySelector('.hero-subtitle-secondary')
  const socialIcons = heroText.querySelectorAll('.social-icons a')
  const ctaButtons = heroText.querySelectorAll('.hero-ctas a')
  const scrollIndicator = document.querySelector('#hero > a[href="#about"]')
  const blobs = document.querySelectorAll('#hero .animate-float')

  gsap.set([badge, subtitle1, subtitle2, socialIcons, ctaButtons, scrollIndicator], { opacity: 0 })
  gsap.set(blobs, { opacity: 0, scale: 0.85 })
  if (words.length) {
    gsap.set(words, { opacity: 0, x: -60 })
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

  if (badge) {
    tl.fromTo(badge, { y: -15, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.05)
  }

  if (words.length) {
    tl.to(words, {
      opacity: 1, x: 0,
      duration: 1.2, stagger: 0.1, ease: "power3.inOut"
    }, 0.15)
  }

  if (subtitle1) {
    tl.fromTo(subtitle1, { y: 20 }, { y: 0, opacity: 1, duration: 0.7 }, 0.35)
  }

  if (subtitle2) {
    tl.fromTo(subtitle2, { y: 15 }, { y: 0, opacity: 1, duration: 0.6 }, 0.45)
  }

  if (socialIcons.length) {
    tl.fromTo(socialIcons,
      { scale: 0.3 },
      { scale: 1, opacity: 1, duration: 0.4, stagger: 0.06, ease: 'back.out(1.7)' },
      0.55
    )
  }

  if (ctaButtons.length) {
    tl.fromTo(ctaButtons,
      { y: 15 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 },
      0.7
    )
  }

  if (scrollIndicator) {
    tl.fromTo(scrollIndicator,
      { y: 10 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
      0.85
    )
  }

  if (blobs.length) {
    tl.to(blobs, {
      opacity: 0.6, scale: 1,
      duration: 1.2, ease: 'power2.out'
    }, 1.0)
  }

  if (scrollIndicator) {
    gsap.to(scrollIndicator, {
      y: -8,
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 1.5
    })
  }

  if (words.length) {
    gsap.to(words, {
      backgroundPosition: '100% 100%',
      duration: 8,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: 2
    })
  }

  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      gsap.to(icon, { y: -4, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
    })
    icon.addEventListener('mouseleave', () => {
      gsap.to(icon, { y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
    })
  })

  ctaButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      gsap.to(btn, { scale: 1.05, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
    })
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { scale: 1, x: 0, y: 0, duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
    })
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2
      gsap.to(btn, { x: x * 0.2, y: y * 0.2, duration: 0.4, ease: 'power2.out', overwrite: 'auto' })
    })
  })

  if (scrollIndicator) {
    scrollIndicator.addEventListener('mouseenter', () => {
      gsap.to(scrollIndicator, { scale: 1.2, color: '#F59E0B', duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
    })
    scrollIndicator.addEventListener('mouseleave', () => {
      gsap.to(scrollIndicator, { scale: 1, color: 'rgba(255,255,255,0.5)', duration: 0.3, ease: 'power2.out', overwrite: 'auto' })
    })
  }

  const hero = document.querySelector('#hero')
  if (hero) {
    gsap.to(hero, {
      y: 60,
      ease: 'none',
      scrollTrigger: {
        trigger: hero,
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    })
  }
}

function revealAnimations() {
  document.querySelectorAll('[data-reveal]').forEach(el => {
    const delay = (parseFloat(el.getAttribute('data-reveal-delay')) || 0) / 1000
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: 'power3.out',
        clearProps: 'all',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      }
    )
  })
}

function timelineAnimations() {
  const timelineLine = document.querySelector('#timeline-line')

  if (timelineLine) {
    gsap.fromTo(timelineLine,
      { scaleY: 0, transformOrigin: 'top' },
      {
        scaleY: 1,
        duration: 2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: timelineLine,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1
        }
      }
    )
  }

  const timelineItems = document.querySelectorAll('#experience .glass-card')
  timelineItems.forEach((card, index) => {
    gsap.fromTo(card,
      { opacity: 0, x: index % 2 === 0 ? -50 : 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%'
        }
      }
    )
  })
}

function parallaxAnimations() {
  const blobs = document.querySelectorAll('.animate-float')
  blobs.forEach((blob, index) => {
    gsap.to(blob, {
      y: 100,
      scrollTrigger: {
        trigger: blob,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1
      }
    })
  })
}
