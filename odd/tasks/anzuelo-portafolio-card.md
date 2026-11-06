# Anzuelo — card del portfolio

## Objetivo
Agregar ANZUELO (proyecto insignia, repo privado) al portfolio con el mismo formato que las demás cards: galería de capturas, botón "Ver video del proyecto" (sin botón de GitHub, igual que Candela Cartoons), descripción y tecnologías verificadas contra el código.

## Autorización
Pedido explícito del usuario (2026-11-05): agregar ANZUELO con el video y las 17 imágenes, repo privado → solo botón de video; "es mi mejor proyecto … sábelo vender".

## Rutas tomadas
- Verificación del código: delegada a un agente `Explore` (proyecto con 4+ archivos relevantes) + spot-check inline de los números.
- Capturas y video: ffmpeg, inline.
- Escritura: inline (una card en `index.html`, un badge en `styles.css`, una línea del README).

## Decisiones
- La card va **primera** en la grilla (proyecto insignia) con badge "Proyecto destacado" + "Repo privado".
- Se elimina el último placeholder "Title / coming soon": la grilla queda en 6 proyectos reales.

## Tareas
- [x] T1. Verificar qué es el producto y qué afirma el README contra el código.
- [x] T2. Procesar las 17 capturas a `.webp`, poster y video.
- [x] T3. Agregar la card primera en la grilla y quitar el placeholder.
- [x] T4. Verificar en navegador (desktop y mobile).
- [x] T5. Actualizar la estructura del README.

## Evidencia de verificación (ANZUELO, 156 commits)
- 8 workflows de n8n en `n8n/workflows/` (wf1-scraping, wf2-analysis, wf3-messages, wf4-email, wf5-email-replies, wf6-daily-summary, wf7-calcom, wf-errors).
- Scraping: actor de Apify `compass~crawler-google-places` (Google Maps) en `wf1-scraping.json`; dedupe por teléfono, email, Instagram y `google_place_id`.
- IA: OpenAI, modelo por defecto `gpt-4o-mini` (`apps/api/app/core/config.py:34`) con cadena de fallback; analiza y puntúa, redacta mensajes, clasifica respuestas.
- Human-in-the-loop: WhatsApp/Instagram solo arman el link (`wa.me/...?text=`), el envío es manual (`services/queue.py`); email automático por SMTP con límites.
- Límites diarios, horario hábil y espaciado aplicados por la API; warm-up por casilla y pausa por rebote; lectura IMAP con UID base.
- Seguridad: Argon2, 2FA TOTP con códigos de recuperación hasheados, secreto TOTP cifrado (Fernet), rate limit de login, revocación de sesiones.
- 90 endpoints (`@router.*` en `apps/api/app/routers`), 1295 `def test_` backend + 555 `it/test` frontend = 1850 → "más de 1.800 tests".
- CI en `.github/workflows/ci.yml` (ruff + pytest con Postgres 16; lint + build del web). Existe `deploy.yml` por SSH, pero el VPS está postergado → la card no afirma deploy en VPS.
- Frontend: React 19, Vite 8, TypeScript, PWA (`vite-plugin-pwa`), recharts, leaflet.

### Lo que NO se afirma en la card
A/B testing (solo hay tasa de respuesta por plantilla), multi-tenant/SaaS (es de un solo usuario), notificaciones push, Telegram, tests del frontend en CI, deploy en VPS.

## Capturas
Recorte de 8 px por lado (borde de la ventana) → 1904×1064, `libwebp -quality 82`. Se borró con `delogo` el círculo gris del grabador (abajo a la derecha) en las 17. En `11-pipeline-sin-contactar` y `17-agenda` se tapó el tooltip de URL con el mismo recorte del sidebar tomado de otra captura limpia.
Poster 1280×720 desde el segundo 2,5 del video (placa "Anzuelo · CRM de prospección semi-automatizado").
Video copiado sin reencodear: 29,3 MB, 4:57, 1080p60 H.264, `moov` antes de `mdat` (ya tiene faststart).

## Verificación en navegador (http-server local, puerto 5500)
- Grilla: 6 cards reales, Anzuelo primera; placeholder eliminado.
- 18 imágenes de la card cargan (0 rotas); 6 miniaturas visibles con contador `+11`.
- Clic en la miniatura 6 → lightbox en modo galería "6 / 17"; flechas del teclado → "9 / 17" con el caption de los workflows.
- Botón de video → lightbox en modo video, `anzuelo-demo.mp4`, 1920×1080, 297,5 s, poster correcto.
- CSS cargado con `?v=20261105a`; badge "Proyecto destacado" con gradiente naranja.
- Mobile 375 px: `scrollWidth == innerWidth`, card de 313 px.
- Consola: 0 errores.

## Estado
Publicado. El usuario lo aprobó ("Sí, publicala"); `6510700` se integró en `main` por fast-forward y se pusheó. GitHub Pages sirvió la card a los ~70 s. En vivo: `styles.css?v=20261105a` con `.badge-destacado`, capturas (`image/webp`) y `anzuelo-demo.mp4` (`video/mp4`, 29.250.272 bytes), todo con 200.
