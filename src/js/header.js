document.addEventListener('alpine:init', () => {
  Alpine.data('header', () => ({
    isOpen: false,
    scrolled: false,
    currentSection: 'hero',
    sections: ['hero', 'about', 'skills', 'projects', 'contact'],
    sectionTops: {},

    init() {
      this.cacheTops()
      this.checkScroll()

      this.$watch('isOpen', (open) => {
        document.body.style.overflow = open ? 'hidden' : ''
        this.$nextTick(() => {
          if (open) {
            this.$refs.mobilePanel?.querySelector('a[href]')?.focus()
          } else {
            this.$refs.hamburger?.focus()
          }
        })
      })

      window.addEventListener('resize', () => {
        this.cacheTops()
        if (window.innerWidth >= 768) this.isOpen = false
      })
      window.addEventListener('scroll', () => this.onScroll(), { passive: true })
    },

    onScroll() {
      if (this._ticking) return
      this._ticking = true
      requestAnimationFrame(() => {
        this.checkScroll()
        this._ticking = false
      })
    },

    cacheTops() {
      this.sectionTops = {}
      this.sections.forEach(id => {
        const el = document.getElementById(id)
        if (el) this.sectionTops[id] = el.offsetTop
      })
    },

    checkScroll() {
      this.scrolled = (window.scrollY > 50)
      for (let i = this.sections.length - 1; i >= 0; i--) {
        const id = this.sections[i]
        if (typeof this.sectionTops[id] === 'number' && window.scrollY >= this.sectionTops[id] - 200) {
          this.currentSection = id
          break
        }
      }
    }
  }))
})
