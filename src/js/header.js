document.addEventListener('alpine:init', () => {
  Alpine.data('header', () => ({
    isOpen: false,
    scrolled: false,
    currentSection: 'hero',
    sections: ['hero', 'about', 'skills', 'projects', 'contact'],

    init() {
      this.checkScroll()
      window.addEventListener('scroll', () => this.checkScroll())
    },

    checkScroll() {
      this.scrolled = (window.scrollY > 50)
      for (let i = this.sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(this.sections[i])
        if (el && window.scrollY >= el.offsetTop - 200) {
          this.currentSection = this.sections[i]
          break
        }
      }
    }
  }))
})
