const STORAGE_KEY = 'theme'
const TRANSITION_MS = 250

function storedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

// Store Alpine de tema.
// Default = dark (el sitio fue diseñado en oscuro). Solo se persiste si
// el usuario cambia manualmente el tema.
document.addEventListener('alpine:init', () => {
  Alpine.store('theme', {
    theme: storedTheme() === 'light' ? 'light' : 'dark',

    init() {
      this.apply()
    },

    toggle() {
      const root = document.documentElement
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      try {
        localStorage.setItem(STORAGE_KEY, this.theme)
      } catch {
        // localStorage no disponible: el cambio aplica solo en sesion
      }

      // C: View Transitions API (crossfade nativo del navegador, sin jank).
      // A: en navegadores sin soporte, usa la transicion CSS ligera.
      const apply = () => {
        this.apply()
        if (!document.startViewTransition) {
          root.classList.add('theme-transition')
        }
      }

      if (document.startViewTransition) {
        document.startViewTransition(apply)
      } else {
        apply()
        setTimeout(() => root.classList.remove('theme-transition'), TRANSITION_MS)
      }
    },

    apply() {
      document.documentElement.classList.toggle('light', this.theme === 'light')
    }
  })
})
