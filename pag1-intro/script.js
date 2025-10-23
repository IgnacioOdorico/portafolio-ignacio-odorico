const btn = document.getElementById('continueBtn');
const loading = document.getElementById('loadingScreen');
const text = document.getElementById('loadingText');

const beep = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');

const loadingLines = [
  '> Iniciando interfaz...',
  '> Conectando al servidor creativo...',
  '> Cargando módulos visuales...',
  '> ¡Listo! 🚀 Redirigiendo...'
];

btn.addEventListener('click', () => {
  beep.play();
  loading.classList.add('active');
  let i = 0;
  text.textContent = '';

  const interval = setInterval(() => {
    text.textContent += loadingLines[i] + '\n';
    i++;
    if (i >= loadingLines.length) {
      clearInterval(interval);
      setTimeout(() => {
        // 👇 Aquí linkeá mi portafolio
        window.location.href = "../pag2-portafollio/index.html";
      }, 1500);
    }
  }, 1000);
});
