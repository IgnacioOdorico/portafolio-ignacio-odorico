// script.js (completo y robusto)
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('theme-btn');
  const list = document.getElementById('theme-list');
  const music = document.getElementById('bg-music');
  const muteLi = document.getElementById('mute-music'); // coincide con el HTML corregido
  const banner = document.getElementById('audio-banner');
  const enableAudioBtn = document.getElementById('enable-audio');
  const root = document.documentElement;

  if (!music) return console.warn('No se encontró #bg-music');
  if (!btn) return console.warn('No se encontró #theme-btn');

  const THEMES = {
    light: { 
        '--marron-oscuro': '#3d2723',
        '--bg-marron-oscuro': '#3d2723',
        '--azul-oscuro': '#051439', 
        '--beige': ' #c5b093', 
        '--celeste':'#3e9ded',
        '--text-menu': '#fff',
        '--fondo-menu': 'rgba(13, 169, 225, 0.7)', 
        '--sombra-luz': '10px 10px 15px #888888', 
        '--sombra-oscura':'5px 5px 10px #000000'
    },
    dark:  { 
        '--bg-marron-oscuro': '#06141b',
        '--marron-oscuro': '#06141b',
        '--azul-oscuro': '#11212d', 
        '--beige': ' #253745', 
        '--celeste':'#4a5c6a',
        '--text-menu': '#ccd0cf',
        '--fondo-menu': '#9ba8ab)', 
        '--sombra-luz': '10px 10px 15px #888888', 
        '--sombra-oscura':'5px 5px 10px #000000' 
    },
    retro: { 
        '--bg-marron-oscuro': '#f4e1a6',
        '--marron-oscuro': '#f4e1a6', 
        '--azul-oscuro': '#3b3b3b', 
        '--beige': '#d97706', 
        '--celeste':'#93d3ae',
        '--text-menu': '#000000ff',
        '--fondo-menu': 'rgba(167, 247, 205, 0.7)', 
        '--sombra-luz': '10px 10px 15px #888888', 
        '--sombra-oscura':'5px 5px 10px #000000' 
    },
    cyberpunk:{ 
        '--bg-marron-oscuro':'#0f001f',
        '--marron-oscuro':'#0f001f',
        '--azul-oscuro':'#a7fff4',
        '--beige':'#ff00c8',
        '--celeste':'#025373',
        '--text-menu': '#7541f7ff',
        '--fondo-menu': 'rgba(215, 133, 236, 0.7)', 
        '--sombra-luz': '10px 10px 15px #888888', 
        '--sombra-oscura':'5px 5px 10px #000000'
         
    },
    paper: { 
        '--bg-marron-oscuro':'#fffdf6',
        '--marron-oscuro':'#fffdf6',
        '--azul-oscuro':'#f5f5dc',
        '--beige':'#333333',
        '--celeste':'#4b3f36',
        '--text-menu': '#fffdf6',
        '--fondo-menu': 'rgba(28, 26, 28, 0.7)', 
        '--sombra-luz': '10px 10px 15px #000000ff', 
        '--sombra-oscura':'5px 5px 10px #000000ff'
    },
    aurora:{ 
        '--bg-marron-oscuro':'linear-gradient(135deg,#1e3a8a,#6d28d9,#16a34a)',
        '--marron-oscuro':'#6d28d9',
        '--azul-oscuro':'#1c3847',
        '--beige':'#05c0a6',
        '--celeste':'#7acef5',
        '--text-menu': '#000000ff',
        '--fondo-menu': 'rgba(112, 182, 132, 0.7)', 
        '--sombra-luz': '10px 10px 15px #bb719b', 
        '--sombra-oscura':'5px 5px 10px #baa5ff'
    },
    synthwave:{ /*faltaaaa*/
        '--bg-marron-oscuro': 'linear-gradient(135deg, #240046, #3c096c, #5a189a)', /* fondo con gradiente violeta oscuro */
        '--marron-oscuro': '#240046', /* base principal */
        '--azul-oscuro': '#10002b',  /* secciones profundas */
        '--beige': '#ffb3c1', /* texto claro con tono cálido */
        '--celeste': '#00f5ff', /* acento principal tipo neón celeste */
        '--text-menu': '#ffffff',
        '--fondo-menu': 'rgba(58, 12, 163, 0.8)', /* fondo del menú translúcido púrpura */
        '--sombra-luz': '0 0 25px #ff00ff', /* brillo rosado */
        '--sombra-oscura': '0 0 15px #240046' /* sombra profunda */ 
    },
    system: { 
        '--bg-marron-oscuro':'#2e8b57',
        '--marron-oscuro':'#b2ec5d',
        '--azul-oscuro':'#a9ba9d',
        '--beige':'#682860',
        '--celeste':'#002147',
        '--text-menu': '#fffdf6',
        '--fondo-menu': 'rgba(28, 26, 28, 0.7)', 
        '--sombra-luz': '10px 10px 15px #b2ec5d', 
        '--sombra-oscura':'5px 5px 10px #002147'
    }
  };

  function applyThemeVars(varsObj){
    Object.entries(varsObj).forEach(([k,v]) => root.style.setProperty(k, v));
    localStorage.setItem('selectedTheme', JSON.stringify(varsObj));
  }

  // restaurar tema guardado
  const savedTheme = localStorage.getItem('selectedTheme');
  if (savedTheme) {
    try { applyThemeVars(JSON.parse(savedTheme)); } catch(e){ /* ignore */ }
  }

  // manejo del menu
  btn.addEventListener('click', e => {
    e.stopPropagation();
    const hidden = list.classList.toggle('hidden');
    const isHidden = list.classList.contains('hidden');
    list.setAttribute('aria-hidden', isHidden ? 'true' : 'false');
    btn.setAttribute('aria-expanded', isHidden ? 'false' : 'true');
  });

  document.addEventListener('click', () => {
    if (!list.classList.contains('hidden')) {
      list.classList.add('hidden');
      list.setAttribute('aria-hidden','true');
      btn.setAttribute('aria-expanded','false');
    }
  });

  list.addEventListener('click', (e) => {
    e.stopPropagation();
    const li = e.target.closest('li');
    if (!li) return;
    if (li.dataset.theme) {
      const t = li.dataset.theme;
      const vars = THEMES[t];
      if (vars) {
        applyThemeVars(vars);
        list.querySelectorAll('li[data-theme]').forEach(x => x.classList.remove('active'));
        li.classList.add('active');
      }
      list.classList.add('hidden');
    }
  });

  // AUDIO: estado inicial
  const savedMuted = localStorage.getItem('muted');
  music.muted = savedMuted === null ? false : (savedMuted === 'true');

  function updateMuteText(){
    if (!muteLi) return;
    muteLi.textContent = music.muted ? '🔇 Mute: On' : '🔊 Music: Off';
  }
  updateMuteText();

  if (muteLi) {
    muteLi.addEventListener('click', (e) => {
      e.stopPropagation();
      music.muted = !music.muted;
      localStorage.setItem('muted', music.muted);
      updateMuteText();
      list.classList.add('hidden');
    });
  }

  // intento autoplay
  window.addEventListener('load', () => {
    music.play().then(() => {
      if (banner) banner.classList.add('hidden');
      console.info('Audio reproduciendo (autoplay ok).');
    }).catch(err => {
      console.warn('Autoplay bloqueado:', err);
      if (banner) banner.classList.remove('hidden');
      // intentar reproducir en muted (algunos navegadores permiten eso)
      const prevMuted = music.muted;
      music.muted = true;
      music.play().catch(()=>{ music.muted = prevMuted; });
      updateMuteText();
    });
  });

  if (enableAudioBtn) {
    enableAudioBtn.addEventListener('click', () => {
      music.muted = false;
      music.play().then(() => {
        if (banner) banner.classList.add('hidden');
        localStorage.setItem('muted', 'false');
        updateMuteText();
      }).catch(err => {
        music.muted = true;
        localStorage.setItem('muted', 'true');
        updateMuteText();
        alert('No se pudo reproducir el audio. Revisa el archivo o la configuración del navegador.');
        console.warn(err);
      });
    });
  }

  // función debug útil
  window.resetAudioState = function() {
    localStorage.removeItem('muted');
    music.muted = false;
    music.currentTime = 0;
    music.play().catch(()=>{});
    updateMuteText();
    if (banner) banner.classList.add('hidden');
    console.info('Audio state reset.');
  };
});

// =======================
// 🌟 ANIMACIONES AVANZADAS
// =======================
document.addEventListener("DOMContentLoaded", () => {

  // --- 1. Efecto de aparición (scroll reveal) ---
  const secciones = document.querySelectorAll(".hero, .sobre-mi, .proyectos, .tecnologias, .contactos");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  secciones.forEach(sec => {
    sec.classList.add("oculto");
    observer.observe(sec);
  });

  // --- 2. Entrada animada en Hero ---
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

  // --- 3. Cascada de aparición en proyectos ---
  const proyectosSection = document.querySelector(".proyectos");
  const proyectos = document.querySelectorAll(".proyectos-card");

  // Estado inicial
  proyectos.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
  });

  const observerProyectos = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        proyectos.forEach((card, i) => {
          setTimeout(() => {
            card.animate(
              [
                { opacity: 0, transform: "translateY(40px)" },
                { opacity: 1, transform: "translateY(0)" }
              ],
              { duration: 700, fill: "forwards", easing: "ease-out" }
            );
          }, 200 * i);
        });
        observerProyectos.unobserve(proyectosSection); // solo una vez
      }
    });
  }, { threshold: 0.3 });

  if (proyectosSection) observerProyectos.observe(proyectosSection);


  // --- 4. Parallax en Hero ---
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroImg = document.querySelector(".perfil-img");
    const info = document.querySelector(".info");
    if (heroImg) heroImg.style.transform = `translateY(${scrollY * 0.2}px)`;
    if (info) info.style.transform = `translateY(${scrollY * 0.1}px)`;
  });

  // --- 5. Animación hover en proyectos ---
  document.querySelectorAll(".proyectos-card").forEach(card => {
    card.addEventListener("mouseenter", () => {
      card.style.transition = "transform 0.3s ease, box-shadow 0.3s ease";
      card.style.transform = "translateY(-8px)";
      card.style.boxShadow = "0 8px 20px rgba(255, 255, 255, 0.3)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.boxShadow = "none";
    });
  });

  // --- 6. Íconos de tecnologías animados ---
  const iconos = document.querySelectorAll(".iconos img");
  iconos.forEach(icon => {
    icon.addEventListener("mouseenter", () => {
      icon.animate(
        [
          { transform: "scale(1) rotate(0deg)" },
          { transform: "scale(1.15) rotate(5deg)" },
          { transform: "scale(1.15) rotate(-5deg)" },
          { transform: "scale(1) rotate(0deg)" }
        ],
        { duration: 800, iterations: 1, easing: "ease-in-out" }
      );
    });
  });

  // --- 7. Animación del menú de temas ---
  const btn = document.getElementById("theme-btn");
  const list = document.getElementById("theme-list");
  if (btn && list) {
    btn.addEventListener("click", () => {
      if (!list.classList.contains("hidden")) {
        list.querySelectorAll("li").forEach((li, i) => {
          li.animate([{ opacity: 0, transform: "scale(0.8)" }, { opacity: 1, transform: "scale(1)" }],
            { duration: 200, delay: i * 70, fill: "forwards", easing: "ease-out" });
        });
      }
    });
  }

  // --- 8. Cursor personalizado ---
  const cursor = document.createElement("div");
  cursor.id = "cursor";
  document.body.appendChild(cursor);

  // Movimiento del cursor
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
  });

  // Efecto click
  document.addEventListener("mousedown", () => cursor.classList.add("click"));
  document.addEventListener("mouseup", () => cursor.classList.remove("click"));

  // 🎯 Efecto "hover" en elementos interactivos
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
    el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
  });

});

