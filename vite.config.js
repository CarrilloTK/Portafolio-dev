import { defineConfig } from 'vite'
import { readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const PARTIALS = {
  'header-container': 'header.html',
  'hero-container': 'hero.html',
  'about-container': 'about.html',
  'skills-container': 'skills.html',
  'projects-container': 'projects.html',
  'contact-container': 'contact.html',
  'footer-container': 'footer.html'
}

// Inline partials into index.html at build/dev time so content is available
// in the first HTML paint instead of being fetched by JS at runtime.
function inlinePartials() {
  return {
    name: 'inline-partials',
    transformIndexHtml(html) {
      let result = html
      for (const [id, file] of Object.entries(PARTIALS)) {
        const filePath = resolve('public/partials', file)
        let content
        try {
          content = readFileSync(filePath, 'utf8')
        } catch {
          continue
        }
        const re = new RegExp(`(<div id="${id}"[^>]*>)[\\s\\S]*?<\\/div>`)
        result = result.replace(re, `$1${content}</div>`)
      }
      return result
    }
  }
}

// Preload the Onest latin woff2 (the only subset actually used) so the hero
// heading font starts downloading before the render-blocking CSS is parsed.
function preloadFonts() {
  return {
    name: 'preload-fonts',
    apply: 'build',
    closeBundle() {
      const htmlPath = resolve('dist/index.html')
      const srcDir = resolve('dist/src')
      let font
      try {
        font = readdirSync(srcDir).find(f => f.startsWith('onest-latin-') && f.endsWith('.woff2'))
      } catch {
        return
      }
      if (!font) return
      const html = readFileSync(htmlPath, 'utf8')
      const link = `<link rel="preload" href="/src/${font}" as="font" type="font/woff2" crossorigin>`
      if (html.includes(link)) return
      writeFileSync(htmlPath, html.replace('<!-- Fonts -->', link + '\n  <!-- Fonts -->'))
    }
  }
}

export default defineConfig({
  root: '.',
  build: {
    outDir: 'dist',
    assetsDir: 'src',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return
          if (id.includes('gsap')) return 'gsap'
          if (id.includes('alpinejs')) return 'alpine'
          if (id.includes('lenis')) return 'lenis'
          if (id.includes('embla')) return 'embla'
        }
      }
    }
  },
  plugins: [inlinePartials(), preloadFonts()],
  server: {
    open: true
  }
})
