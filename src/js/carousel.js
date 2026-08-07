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
    align: 'center',
    duration: 30,
    speed: 12
  })

  const slides = [...container.children]

  function updateActive() {
    const { slideRegistry } = embla.internalEngine()
    const activeIndexes = slideRegistry[embla.selectedScrollSnap()] || []
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', activeIndexes.includes(i))
    })
  }

  updateActive()
  embla.on('select', updateActive)
  embla.on('reInit', updateActive)

  const prev = root.querySelector('.embla__prev')
  const next = root.querySelector('.embla__next')

  prev?.addEventListener('click', () => embla.scrollPrev())
  next?.addEventListener('click', () => embla.scrollNext())

  window.addEventListener('load', () => embla.reInit())
}
