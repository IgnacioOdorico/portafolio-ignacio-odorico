// =======================
// 🌟 PORTAFOLIO IGNACIO ODORICO - SCRIPT UNIFICADO
// =======================
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("theme-btn");
  const list = document.getElementById("theme-list");
  const music = document.getElementById("bg-music");
  const muteLi = document.getElementById("mute-music");
  const banner = document.getElementById("audio-banner");
  const enableAudioBtn = document.getElementById("enable-audio");
  const root = document.documentElement;
  const character = document.querySelector(".img-flotante"); // 🔸 referencia al muñequito

  // ==========================
  // 🎨 TEMAS PERSONALIZADOS
  // ==========================
  const THEMES = {
    light: {
      "--marron-oscuro": "#3d2723",
      "--bg-marron-oscuro": "#3d2723",
      "--azul-oscuro": "#051439",
      "--beige": "#c5b093",
      "--celeste": "#3e9ded",
      "--text-menu": "#fff",
      "--fondo-menu": "rgba(13, 169, 225, 0.7)",
      "--sombra-luz": "10px 10px 15px #888888",
      "--sombra-oscura": "5px 5px 10px #000000",
    },
    dark: {
      "--bg-marron-oscuro": "#06141b",
      "--marron-oscuro": "#06141b",
      "--azul-oscuro": "#11212d",
      "--beige": "#253745",
      "--celeste": "#4a5c6a",
      "--text-menu": "#ccd0cf",
      "--fondo-menu": "#384f56ff",
      "--sombra-luz": "10px 10px 15px #888888",
      "--sombra-oscura": "5px 5px 10px #000000",
    },
    retro: {
      "--bg-marron-oscuro": "#f4e1a6",
      "--marron-oscuro": "#f4e1a6",
      "--azul-oscuro": "#3b3b3b",
      "--beige": "#d97706",
      "--celeste": "#93d3ae",
      "--text-menu": "#000000",
      "--fondo-menu": "rgba(167, 247, 205, 0.7)",
      "--sombra-luz": "10px 10px 15px #888888",
      "--sombra-oscura": "5px 5px 10px #000000",
    },
    cyberpunk: {
      "--bg-marron-oscuro": "#0f001f",
      "--marron-oscuro": "#0f001f",
      "--azul-oscuro": "#a7fff4",
      "--beige": "#ff00c8",
      "--celeste": "#025373",
      "--text-menu": "#7541f7",
      "--fondo-menu": "rgba(215,133,236,0.7)",
      "--sombra-luz": "10px 10px 15px #888888",
      "--sombra-oscura": "5px 5px 10px #000000",
    },
    paper: {
      "--bg-marron-oscuro": "#fffdf6",
      "--marron-oscuro": "#fffdf6",
      "--azul-oscuro": "#f5f5dc",
      "--beige": "#333333",
      "--celeste": "#4b3f36",
      "--text-menu": "#fffdf6",
      "--fondo-menu": "rgba(28,26,28,0.7)",
      "--sombra-luz": "10px 10px 15px #000000",
      "--sombra-oscura": "5px 5px 10px #000000",
    },
    aurora: {
      "--bg-marron-oscuro": "linear-gradient(135deg,#1e3a8a,#6d28d9,#16a34a)",
      "--marron-oscuro": "#6d28d9",
      "--azul-oscuro": "#1c3847",
      "--beige": "#05c0a6",
      "--celeste": "#7acef5",
      "--text-menu": "#000000",
      "--fondo-menu": "rgba(112,182,132,0.7)",
      "--sombra-luz": "10px 10px 15px #bb719b",
      "--sombra-oscura": "5px 5px 10px #baa5ff",
    },
    ruby_dev: {
      "--bg-marron-oscuro": "linear-gradient(135deg,#3c0000,#670010)",
      "--marron-oscuro": "#3c0000",
      "--azul-oscuro": "#960018",
      "--beige": "#cb4c46",
      "--celeste": "#ff8478",
      "--text-menu": "#030303ff",
      "--fondo-menu": "rgba(187, 51, 76, 0.74)",
      "--sombra-luz": "0 0 25px #ff0000ff",
      "--sombra-oscura": "0 0 15px #3b1111ff",
    },
    cakes: {
      "--bg-marron-oscuro": "#68f1e6",
      "--marron-oscuro": "#391332",
      "--azul-oscuro": "#f8a9eb",
      "--beige": "#f2f3c2",
      "--celeste": "#77dfff",
      "--text-menu": "#080808",
      "--fondo-menu": "rgba(234,233,162,0.7)",
      "--sombra-luz": "10px 10px 15px #8c116f",
      "--sombra-oscura": "5px 5px 10px #463153",
    },
  };

  // ==========================
  // 🧍 PERSONAJES SEGÚN TEMA
  // ==========================
  const CHARACTER_IMAGES = {
    light: "img/personajes/personaje_original.png",
    dark: "img/personajes/personaje_dark.png",
    retro: "img/personajes/personaje_retro.png",
    cyberpunk: "img/personajes/personaje_cyberpunk.png",
    paper: "img/personajes/personaje_paper.png",
    aurora: "img/personajes/personaje_aurora.png",
    ruby_dev: "img/personajes/personaje_ruby.png",
    cakes: "img/personajes/personaje_candy.png", //falta
  };

  // ==========================
  // 🌈 FUNCIÓN APLICAR TEMA + PERSONAJE
  // ==========================
  // Precargar imágenes para evitar lag en el cambio
  Object.values(CHARACTER_IMAGES).forEach(src => {
    const img = new Image();
    img.src = src;
  });

  function applyTheme(themeName) {
    const vars = THEMES[themeName];
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => root.style.setProperty(k, v));
      localStorage.setItem("selectedThemeName", themeName);
    }

    // 🔄 Cambiar muñequito con animación fluida ("pop")
    if (character && CHARACTER_IMAGES[themeName] && !character.src.includes(CHARACTER_IMAGES[themeName])) {
      character.classList.add("personaje-cambiando");
      
      // Esperar a que la animación esté en su punto más pequeño para cambiar el source
      setTimeout(() => {
        character.src = CHARACTER_IMAGES[themeName];
      }, 150);

      // Quitar la clase cuando termine la animación
      setTimeout(() => {
        character.classList.remove("personaje-cambiando");
      }, 300);
    }
  }

  // ==========================
  // 💾 Cargar tema guardado
  // ==========================
  const savedThemeName = localStorage.getItem("selectedThemeName");
  if (savedThemeName && THEMES[savedThemeName]) {
    applyTheme(savedThemeName);
  }

  // ==========================
  // ⚙️ Interacción menú de temas
  // ==========================
  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    const hidden = list.classList.toggle("hidden");
    if (!hidden) {
      list.querySelectorAll("li").forEach((li, i) => {
        li.animate(
          [
            { opacity: 0, transform: "scale(0.8)" },
            { opacity: 1, transform: "scale(1)" },
          ],
          { duration: 200, delay: i * 70, fill: "forwards", easing: "ease-out" }
        );
      });
    }
  });
  document.addEventListener("click", () => list.classList.add("hidden"));

  list.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (li?.dataset.theme) {
      applyTheme(li.dataset.theme);
      list.classList.add("hidden");
    }
  });

  // ==========================
  // 🎵 AUDIO
  // ==========================
  const savedMuted = localStorage.getItem("muted");
  music.muted = savedMuted === "true";
  function updateMuteText() {
    muteLi.textContent = music.muted ? "🔇 Mute: On" : "🔊 Music: Off";
  }
  updateMuteText();

  muteLi.addEventListener("click", () => {
    music.muted = !music.muted;
    localStorage.setItem("muted", music.muted);
    updateMuteText();
  });

  window.addEventListener("load", () => {
    music.play().then(() => banner.classList.add("hidden")).catch(() => banner.classList.remove("hidden"));
  });

  if (enableAudioBtn) {
    enableAudioBtn.addEventListener("click", () => {
      music.muted = false;
      music.play();
      banner.classList.add("hidden");
      localStorage.setItem("muted", "false");
      updateMuteText();
    });
  }

  // ==========================
  // ✨ EFECTOS Y ANIMACIONES
  // ==========================

  // --- 1. Scroll Animations (Fade-Up Escalonado Automático) ---
  const observerScroll = new IntersectionObserver((entries, obs) => {
    const intersectan = entries.filter(e => e.isIntersecting);
    intersectan.forEach((entry, i) => {
      setTimeout(() => {
        entry.target.classList.add("show-scroll");
      }, i * 150); // Efecto escalonado dinámico
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });

  document.querySelectorAll(".hidden-scroll").forEach(el => observerScroll.observe(el));

  // --- 2. Animación Hero ---
  const perfil = document.querySelector(".perfil-img");
  const nombre = document.querySelector(".info h1");
  const rol = document.querySelector(".info .rol");
  if (perfil && nombre && rol) {
    perfil.style.opacity = "0";
    nombre.style.opacity = "0";
    rol.style.opacity = "0";
    setTimeout(() => {
      perfil.animate([{ transform: "scale(0.9)", opacity: 0 }, { transform: "scale(1)", opacity: 1 }], { duration: 1000, fill: "forwards" });
      nombre.animate([{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 1000, delay: 500, fill: "forwards" });
      rol.animate([{ opacity: 0, transform: "translateY(10px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 1000, delay: 800, fill: "forwards" });
    }, 300);
  }

  // (Cascada en proyectos eliminada, ahora manejada por .hidden-scroll genérico)

  // --- 4. Parallax Hero ---
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (perfil) perfil.style.transform = `translateY(${scrollY * 0.2}px)`;
    if (nombre) nombre.style.transform = `translateY(${scrollY * 0.1}px)`;
  });

  // --- 5. Hover en proyectos ---
  document.querySelectorAll(".proyectos-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      card.style.transform = "translateY(-8px)";
      card.style.boxShadow = "0 8px 20px rgba(255,255,255,0.3)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });
  });

  // --- 6. Animación iconos tecnologías ---
  document.querySelectorAll(".iconos img").forEach(icon => {
    icon.addEventListener("mouseenter", () => {
      icon.animate([{ transform: "scale(1) rotate(0deg)" }, { transform: "scale(1.15) rotate(5deg)" }, { transform: "scale(1.15) rotate(-5deg)" }, { transform: "scale(1) rotate(0deg)" }], { duration: 800, iterations: 1, easing: "ease-in-out" });
    });
  });

  // --- 7. Cursor personalizado ---
  const cursor = document.createElement("div");
  cursor.id = "cursor";
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });
  document.addEventListener("mousedown", () => cursor.classList.add("click"));
  document.addEventListener("mouseup", () => cursor.classList.remove("click"));
  document.querySelectorAll("a, button").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });
});


