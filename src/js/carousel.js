import EmblaCarousel from 'embla-carousel'

export function initCarousel() {
  const root = document.querySelector('.embla')
  if (!root) return

  const viewport = root.querySelector('.embla__viewport')
  const container = root.querySelector('.embla__container')
  if (!viewport || !container) {
    console.error('[carousel] viewport o container no encontrados')
    return
  }

  const embla = EmblaCarousel(viewport, {
    loop: true,
    align: 'start',
    duration: 30,
    speed: 12
  })

  const prev = root.querySelector('.embla__prev')
  const next = root.querySelector('.embla__next')

  prev?.addEventListener('click', () => embla.scrollPrev())
  next?.addEventListener('click', () => embla.scrollNext())

  window.addEventListener('load', () => embla.reInit())
}
