export function initUtils() {
  scrollTopButton()
  activeNavLink()
  smoothScroll()
}

// ================================
// SCROLL TO TOP BUTTON
// ================================
function scrollTopButton() {
  const scrollTopBtn = document.querySelector('#scroll-top')

  if (!scrollTopBtn) return

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollTopBtn.style.opacity = '1'
      scrollTopBtn.style.pointerEvents = 'auto'
    } else {
      scrollTopBtn.style.opacity = '0'
      scrollTopBtn.style.pointerEvents = 'none'
    }
  })

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
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
