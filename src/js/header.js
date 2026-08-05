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
      window.addEventListener('resize', () => this.cacheTops())
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
