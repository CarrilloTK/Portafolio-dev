# Portafolio - Kevin Carrillo

Desarrollo de mi portafolio personal como desarrollador web Full Stack. Sitio web construido con Vite, Tailwind CSS y animaciones fluidas mediante GSAP.

**Ver sitio en vivo:** [portafolio-dev-mauve.vercel.app](https://portafolio-dev-mauve.vercel.app/)

---

## Tecnologías utilizadas

- **Build:** Vite
- **Estilos:** Tailwind CSS v4
- **Animaciones:** GSAP (GreenSock Animation Platform)
- **Scroll suave:** Lenis
- **Carrusel:** Embla Carousel
- **Interactividad:** Alpine.js
- **Fuente:** Onest (variable)

---

## Estructura del proyecto

```
├── public/
│   ├── img/              # Imágenes del sitio
│   └── partials/         # Secciones HTML (header, hero, about, skills, projects, contact, footer)
├── src/
│   ├── assets/img/       # Imágenes optimizadas
│   ├── fonts/            # Fuentes locales
│   ├── js/               # Módulos JavaScript
│   │   ├── animations.js # Animaciones GSAP
│   │   ├── carousel.js   # Configuración Embla
│   │   ├── header.js     # Lógica del header
│   │   ├── lenis.js      # Scroll suave
│   │   └── theme.js      # Toggle modo oscuro/claro
│   ├── main.js           # Punto de entrada
│   └── style.css         # Estilos globales
├── index.html
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

---

## Características

- Modo oscuro / claro con persistencia en localStorage
- Diseño responsive (mobile-first)
- Scroll suave con Lenis
- Animaciones de entrada con GSAP y ScrollTrigger
- Carrusel de proyectos con Embla
- Partial HTML inline en tiempo de build para mejor performance

---

## Ejecutar localmente

```bash
# Clonar el repositorio
git clone https://github.com/CarrilloTK/Portafolio-dev.git

# Entrar al directorio
cd Portafolio-dev

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

El sitio se abrirá automáticamente en `http://localhost:5173`.

---

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Vista previa de la versión de producción |

---

## Contacto

- **Email:** kevincarrillo1609@gmail.com
- **LinkedIn:** [kevincarrillo160997](https://www.linkedin.com/in/kevincarrillo160997/)
- **GitHub:** [CarrilloTK](https://github.com/CarrilloTK)
