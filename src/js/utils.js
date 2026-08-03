export function initUtils() {
  activeNavLink()
}

// ================================
// ACTIVE NAV LINK
// ================================
function activeNavLink() {
  const sections = Array.from(document.querySelectorAll('section[id]'))
  const navLinks = document.querySelectorAll('#nav-links a')
  let sectionTops = []

  const cacheTops = () => {
    sectionTops = sections.map(s => ({ id: s.getAttribute('id'), top: s.offsetTop }))
  }
  cacheTops()
  window.addEventListener('resize', cacheTops)
  window.addEventListener('load', cacheTops)

  window.addEventListener('scroll', () => {
    const y = window.scrollY
    let current = ''

    for (const s of sectionTops) {
      if (y >= s.top - 200) {
        current = s.id
      }
    }

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
