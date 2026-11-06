<h1 align="center">🌐 Portafolio — Ignacio Odorico</h1>

<p align="center">
  <a href="https://ignacioodorico.github.io/portafolio-ignacio-odorico/" target="_blank">
    <img src="https://img.shields.io/badge/🚀%20Ver%20en%20vivo-Deploy-3e9ded?style=for-the-badge&logo=github-pages" alt="Ver en vivo" />
  </a>
  <img src="https://img.shields.io/badge/Estado-Activo-brightgreen?style=for-the-badge" alt="Estado activo" />
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript" />
</p>

---

## 👤 Sobre este portafolio

Portafolio personal desarrollado con **HTML, CSS vanilla y JavaScript puro**, sin frameworks. Diseño multi-tema, animaciones CSS y navegación fluida entre secciones.

Incluye:
- 🎨 **7 temas visuales** (Dark, Cyberpunk, Aurora, Retro, Paper, Ruby Dev, Candy Mist)
- 🎵 **Música de fondo** opcional con control de reproducción
- 🃏 **Flip card** interactiva con foto real y dibujo al hover
- 🧩 **Sección de proyectos** con cards técnicas por proyecto
- 🛠️ **Sección de tecnologías** separada por categorías
- 📬 **Contactos** directos a GitHub, LinkedIn, Email y WhatsApp
- 📄 **Descarga de CV** en PDF

---

## 🚀 Deploy

🔗 **[ignacioodorico.github.io/portafolio-ignacio-odorico](https://ignacioodorico.github.io/portafolio-ignacio-odorico/)**

> Hosteado en **GitHub Pages** directamente desde la rama `main`.

---

## 🗂️ Estructura del proyecto

```
Portafollio/
├── index.html               # Redirect a pag1-intro
├── pag1-intro/              # Página de entrada / splash
└── pag2-portafollio/        # Página principal
    ├── index.html           # Estructura principal
    ├── styles.css           # Estilos y temas
    ├── script.js            # Lógica de temas, música, interacciones
    ├── audio/               # Música de fondo
    ├── cv/                  # CV: fuente HTML editable + PDF exportado (descargable)
    ├── img/
    │   ├── img-logos/           # Logos de tecnologías (SVG)
    │   ├── img-iconos/          # Íconos de navegación
    │   ├── personajes/          # Personaje animado flotante
    │   ├── de proyectos/        # Capturas y videos demo de proyectos
    │   │   ├── anzuelo/         # Galería y video de Anzuelo
    │   │   ├── active-trace/    # Galería y video de Active Trace
    │   │   ├── atendo/          # Galería y videos de Atendo
    │   │   ├── foodstore/       # Galería y video de FoodStore
    │   │   ├── candela/         # Galería y video de Candela Cartoons
    │   │   └── planova/         # Galería y video de Planova
    │   └── ...                  # Imágenes de perfil y secciones
```

---

## 🛠️ Tecnologías

| Área | Stack |
|------|-------|
| Estructura | HTML5 semántico |
| Estilos | CSS3 vanilla, variables CSS, animaciones |
| Lógica | JavaScript ES6+ |
| Deploy | GitHub Pages |

---

## 📂 Proyectos destacados

En el mismo orden que en el portafolio:

| Proyecto | Qué es | Stack | Repo |
|----------|--------|-------|------|
| Anzuelo | CRM de prospección con IA y 8 workflows de n8n | n8n, OpenAI, FastAPI, PostgreSQL, React | Privado (video en el portafolio) |
| Active Trace | Plataforma multi-tenant de gestión académica sobre Moodle | FastAPI, PostgreSQL, React, OpenTelemetry | [active-trace](https://github.com/IgnacioOdorico/active-trace) |
| Atendo | Atención al cliente con IA por WhatsApp, Telegram y correo (trabajo integrador UTN) | n8n, GPT-4o-mini, FastAPI, React | [Repositorio](https://github.com/IgnacioOdorico/Automatizacion-de-Atencion-al-Cliente-en-E-commerce-e-Inteligencia-Artificial) |
| FoodStore | Pedidos y gestión para locales de comida con MercadoPago y WebSockets | FastAPI, PostgreSQL, React | [FoodStore-completo](https://github.com/IgnacioOdorico/FoodStore-completo) |
| Candela Cartoons | Streaming de dibujos clásicos con proxy HLS propio | React, Node.js, SQLite, Puppeteer | Privado (video en el portafolio) |
| Planova | Gestor de tareas Kanban | Spring Boot, React, MySQL | [PLANOVA](https://github.com/IgnacioOdorico/PLANOVA) |

## 📄 Regenerar el CV

El CV se edita en `pag2-portafollio/cv/CV_Ignacio_Odorico.html` y se exporta a PDF con Chrome headless (desde la raíz del repo):

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="pag2-portafollio/cv/CV_Ignacio_Odorico.pdf" "file:///D:/programacion%20nacho/Portafollio/pag2-portafollio/cv/CV_Ignacio_Odorico.html"
```

Después de exportarlo, hay que subir la versión del link en `pag2-portafollio/index.html` (`CV_Ignacio_Odorico.pdf?v=AAAAMMDD`) para que GitHub Pages no sirva el PDF viejo desde la caché.

---

## 📬 Contacto

| Canal | Link |
|-------|------|
| GitHub | [@IgnacioOdorico](https://github.com/IgnacioOdorico) |
| Email | cony20082008@gmail.com |
| WhatsApp | +54 9 261 301-4463 |

---

<p align="center">
  <em>Hecho con 💙 y mucho café — Ignacio Odorico · 2026</em>
</p>
