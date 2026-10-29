# Atendo — card del portfolio (verificación + rediseño de videos)

## Objetivo
Dejar la card de Atendo presentable para reclutadores: copy honesto, botón de videos con tamaño correcto, selector de videos ordenado y descrito con precisión.

## Problema
El agente anterior dejó tres defectos:
1. El botón "Ver videos del proyecto" ocupa el ancho completo con un SVG sin dimensionar (300×150 por defecto) → se ve gigante.
2. Los tres videos están mal etiquetados. `video2` figura como "Defensa del Trabajo Integrador ante el tribunal" y no lo es.
3. El copy afirma stack y métricas sin verificar (`Node.js` como núcleo de la API cuando es FastAPI; "0 ventas sin stock" sin el contexto medido; "WhatsApp + web" cuando el sistema también soporta Telegram y correo).

## Autorización
Implementación autorizada por el usuario ("revisalo y terminá de hacer su trabajo… dejarlo flama para reclutadores").

## Rutas tomadas
- Investigación: inline + delegación de mapeo al agente `explore` (proyecto fuera del workspace).
- Verificación de contenido de videos: ffmpeg + OCR local (Windows.Media.Ocr), sin interpretación especulativa.
- Escritura: inline (3 archivos cohesivos, una sola unidad de cambio).

## Tareas

- [x] T1. Verificar canales reales del sistema (WhatsApp, Telegram, correo) contra código y UI del panel.
- [x] T2. Verificar stack real: FastAPI + PostgreSQL + React/TS + n8n + GPT-4o-mini + Docker + Grafana.
- [x] T3. Verificar el origen y alcance de las métricas (1,47 s; 92,7 %; 0 sobreventas; 780×).
- [x] T4. Identificar el contenido real de video1/video2/video3 mediante OCR de fotogramas y duración.
- [x] T5. Generar posters propios por video (ffmpeg `thumbnail`) para el selector.
- [x] T6. Corregir el tamaño del botón de videos y el layout de acciones de la card.
- [x] T7. Reescribir descripción de la card, captions de capturas y descripciones de videos con datos verificados.
- [x] T8. Rediseñar el selector de videos: miniatura, duración, título y alcance de cada video.
- [x] T9. Refactor del JS: el selector reutiliza el lightbox (pausa la música, devuelve el foco correctamente).
- [x] T10. Verificar en navegador: sin overflow, teclado, foco, mobile.

## Evidencia de verificación

- Canales: `CLAUDE.md:24` (Flujo 2 recibe WhatsApp `/webhook/whatsapp`, Telegram y Gmail poll); `workflows/Flujo 2 - Chatbot WhatsApp + Telegram.json`; UI del panel `/conexiones` en video1: WhatsApp (Meta, solicitud pendiente de aprobación), Telegram (conectado), Gmail (desconectado).
- Stack: `dashboard-api/requirements.txt` (FastAPI 0.115, SQLAlchemy, psycopg), `dashboard-web/package.json` (React 18 + TS + TanStack Query), `docker-compose.yml` (n8n 2.12, postgres 15, grafana 13, mailpit, nginx gateway), `CLAUDE.md:24` (GPT-4o-mini).
- Métricas: `PLAN_REGENERACION_EVIDENCIA.md:701` (92,7 % exactitud de clasificación), `:867` (49,13 s manual por orden), `:880` (780×, IC 95 % 687–872), `:891` (0,063 s es pipeline local con Mailpit: cota superior de laboratorio), `README.md:546` (el 92,7 % es literal de Grafana, no métrica en vivo).
- Videos: `video1.mp4` 11:25 = recorrido en pantalla del producto real; `video2.mp4` 2:55 y `video3.mp4` 6:00 = explicadores animados con Pictory.
- Capturas: OCR de `01..05-demo.webp` confirma landing, sección problema, chat, panel de tickets y métricas.

- Navegador (Chrome headless 1280×900 y 390×844, `puppeteer-core`):
  - Botón de videos: 284×44 (antes ~150 px de alto por el SVG sin dimensionar). SVG 16×16.
  - Sin overflow horizontal: `scrollWidth == innerWidth` en ambos viewports.
  - Selector: panel 607×473 desktop / 354×505 mobile; 3 opciones con miniatura 129×73 / 94×52.
  - Flujo completo OK: clic en botón → selector visible (foco en el botón de cierre, body con scroll bloqueado) → clic en opción → lightbox en modo video con `src` y `poster` correctos → Escape cierra y devuelve el foco al botón de la card.
  - `node --check script.js`: sin errores.

## Incidente corregido
La primera escritura de `styles.css` se hizo con `Set-Content` de PowerShell 5.1, que leyó el UTF-8 como ANSI: corrompió acentos y emojis (54 marcas de mojibake) y agregó BOM. Se restauró el archivo desde git y se reescribió concatenando bytes con .NET (`ReadAllBytes`/`WriteAllBytes`), verificando: sin BOM, 0 marcas de mojibake, llaves balanceadas (282/282). Regla para el futuro: nunca reescribir archivos UTF-8 del repo con `Set-Content`/`Out-File`.

## Optimización de videos para la web (post-decisión)
Los 3 videos se mantienen (decisión del usuario). Se reencodearon a 720p H.264 CRF 26–27 + AAC 96k + faststart porque **`video3.mp4` pesaba 103,1 MB y supera el límite duro de 100 MB por archivo de GitHub: el push se habría rechazado**.

| Video | Antes | Después |
|---|---|---|
| video1.mp4 (11:25) | 27,5 MB | 15,3 MB |
| video2.mp4 (2:55) | 47,6 MB | 17,6 MB |
| video3.mp4 (6:00) | 103,1 MB | 34,8 MB |
| **Total** | **178,5 MB** | **67,7 MB** |

- Originales respaldados en `D:\programacion nacho\_backup-atendo-videos\` (fuera del repo) porque no están versionados.
- Legibilidad verificada de forma objetiva: OCR (es-MX) de fotogramas originales vs. reencodeados recupera el mismo texto (video1 min 5:00, video3 min 2:30 y 4:10).
- Reproducción verificada en Chrome headless: los 3 abren en el lightbox con `readyState ≥ 1`, duración correcta (176 s / 360 s / 686 s), 1280×720, `currentTime` avanza y 0 errores de consola.

## Estado
Completado. Decisión del usuario (2026-10-28): se mantienen los 3 videos, incluidos los dos explicadores animados con watermark de Pictory. El selector los deja identificados como animados, así que no hay riesgo de que un reclutador los lea como demo en vivo. Pendiente: commit + push (no ejecutados sin pedido explícito).
