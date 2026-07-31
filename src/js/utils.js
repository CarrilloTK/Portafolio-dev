export function initUtils() {
  activeNavLink()
  smoothScroll()
}

// ================================
// ACTIVE NAV LINK
// ================================
function activeNavLink() {
  const sections = document.querySelectorAll('section[id]')
  const navLinks = document.querySelectorAll('#nav-links a')

  window.addEventListener('scroll', () => {
    let current = ''

    sections.forEach(section => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id')
      }
    })

    navLinks.forEach(link => {
      link.classList.remove('text-white')
      link.classList.add('text-white/70')

      if (link.getAttribute('href') === `#${current}`) {
        link.classList.remove('text-white/70')
        link.classList.add('text-white')
      }
    })
  })
}

// ================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ================================
function smoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href')
      if (href === '#') return

      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
    })
  })
}
