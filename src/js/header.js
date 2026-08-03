document.addEventListener('alpine:init', () => {
  Alpine.data('header', () => ({
    isOpen: false,
    scrolled: false,
    currentSection: 'hero',
    sections: ['hero', 'about', 'skills', 'projects', 'contact'],
    sectionTops: {},

    init() {
      this.cacheTops()
      window.addEventListener('resize', () => this.cacheTops())
      this.checkScroll()
      window.addEventListener('scroll', () => this.checkScroll())
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
