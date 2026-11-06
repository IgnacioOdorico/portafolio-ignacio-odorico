# Egresado UTN: CV nuevo, "Sobre mí" y orden de proyectos

## Objetivo
Actualizar el portafolio para la búsqueda laboral: el usuario se recibió de la UTN (Técnico Universitario en Programación, 2026). El "Sobre mí" y el CV se escribieron cuando había un solo proyecto; hoy hay seis, más trabajo freelance y dominio del desarrollo con IA.

## Problema
- El "Sobre mí" dice "estudiante avanzado" y vende un perfil junior centrado en Java.
- El CV (PDF) muestra un solo proyecto (Planova), "Último semestre cursando" y una sección "Aprendiendo" con tecnologías que ya se usan en producción en sus proyectos.
- El link del correo en Contactos apunta a `cony20082008@gmail.com.com` (rebota).
- Las cards de proyectos no siguen un orden por impacto para un reclutador.

## Autorización
Pedido explícito del usuario (2026-11-05): reescribir el "Sobre mí" en base a los proyectos y al desarrollo con IA (SDD, ODD, OpenSpec, ventana de contexto, stacked PRs, Engram, automatizaciones, bots), dejar el CV "impresionante" en PDF (armado en otro formato y exportado), enlazarlo en el botón del portafolio y ordenar las cards por importancia. La sección Tecnologías del portafolio queda como está.

## Restricciones
- Todo lo que se afirma tiene que estar respaldado por las cards ya verificadas contra el código (ver `odd/tasks/*-portafolio-card.md`) o por el usuario.
- Experiencia freelance: el usuario confirmó que solo hay demos y propuestas, ningún cliente cerrado. Se presenta como emprendimiento propio, sin afirmar clientes pagos, entregas ni deploys.
- Copy en español neutro y profesional.
- Sin cambios en la sección Tecnologías.

## Modo de checks
- TDD: estricto por configuración global (`~/.claude/CLAUDE.md`), pero el proyecto es HTML/CSS/JS estático sin runner de tests. No hay RED/GREEN posible; los checks son verificación en navegador y lectura del PDF exportado.
- RDD: `off (decided by global)` según `gentle-ai review mode status`. No corre revisión nativa.

## Tareas
- [x] T1. Reordenar las cards por impacto para un reclutador: Anzuelo, Active Trace, Atendo, FoodStore, Candela Cartoons, Planova. (inline: un archivo, mover bloques) — `0310691`. Check: el multiset de líneas es idéntico al de `HEAD` (solo se movieron bloques); el orden se confirmó con los `aria-label` de las galerías.
- [x] T2. Reescribir el "Sobre mí" (egresado UTN, proyectos, desarrollo con IA, automatizaciones), actualizar el rol del hero y corregir el link del correo. (inline: `index.html` + bloque CSS aditivo; el contenido depende del contexto ya reunido) — `04466f4`. Check en navegador: a 1024 px, texto alineado a la izquierda y 4 datos en grilla; a 375 px, layout apilado, tarjeta de 345 px, `scrollWidth == innerWidth`, datos en 2×2. Números: +3.000 tests (1.850 Anzuelo + más de 1.300 Active Trace + casi 100 FoodStore); 780x medido en laboratorio (card de Atendo).
- [x] T3. Crear el CV en HTML (fuente editable) y exportarlo a PDF A4 con Chrome headless. (inline: un archivo nuevo) — `b95068c`. Check: PDF de 2 páginas A4, 483.043 bytes, fuente Inter cargada, 10 links clicables (mailto, WhatsApp, portafolio, GitHub, LinkedIn y repos). Se corrigió el orden de extracción del texto: las viñetas con `position: relative` salían al final del texto (capa de pintado aparte) y el `letter-spacing` partía los títulos ("E X PERI E N C I A"). Con marcadores nativos y `letter-spacing: 0.02em` el texto se extrae en orden de lectura.
- [x] T4. Enlazar el PDF nuevo en el botón (con versión anti-caché), verificar en navegador (desktop y 375 px) y actualizar el README. (inline + verificador independiente delegado para auditar las afirmaciones: el chequeo lee 5+ archivos)

## Verificación independiente (subagente de solo lectura)
Revisó unas 75 afirmaciones del CV y del "Sobre mí" contra las cards y las notas `odd/tasks/*-portafolio-card.md`. Links de GitHub: los 4 coinciden con las cards. Observaciones aplicadas en `df3e591`:
- "8 workflows de n8n con IA" → "8 workflows de n8n" (wf6-daily-summary, wf7-calcom y wf-errors no usan IA).
- 780x y 92,7 % marcados como medidos en laboratorio.
- Experiencia: "soluciones a medida" → "apps de pedidos online a medida" y el tercer punto describe demo + propuesta, sin implicar clientes.
- Perfil del CV: "asistentes que atienden clientes" → "asistentes que responden consultas".
No aplicadas: "POO, estructuras de datos…" e "Inglés técnico" vienen del CV anterior del usuario.

Con el texto nuevo el PDF pasó a 3 páginas; se recuperó con un texto más corto en Atendo y `.section { margin-top: 4mm }`. Queda en 2 páginas.

## Verificación en navegador (http-server, puerto 5501)
- Cards en orden: Anzuelo, Active Trace, Atendo, FoodStore, Candela Cartoons, Planova.
- Botón "Descargar CV": `cv/CV_Ignacio_Odorico.pdf?v=20261105` → 200, `application/pdf`, empieza con `%PDF-1.4`, `download="CV-Ignacio-Odorico.pdf"`.
- Link del correo: `to=cony20082008@gmail.com`.
- Sin "estudiante" ni "cursando" en la página; `meta description` presente; 0 imágenes rotas; 0 errores de consola.
- "Sobre mí": 4 datos en fila a 1280 px (176×125 cada uno); 2×2 a 375 px y a 296 px; `scrollWidth <= innerWidth` en todos los anchos.
- Tema Paper: tarjetas de datos legibles (usan las variables del tema).

## Commits
| Tarea | Commit |
|-------|--------|
| T1 | `0310691` feat: ordenar las cards de proyectos por impacto para reclutadores |
| T2 | `04466f4` feat: reescribir el sobre mi como egresado UTN con proyectos e IA aplicada |
| T3 | `b95068c` feat: rehacer el CV como egresado UTN con seis proyectos y experiencia freelance |
| T3 (fix) | `df3e591` fix: precisar afirmaciones del CV y del sobre mi segun la verificacion |
| T4 | `1ec9b86` docs: enlazar el CV nuevo con version anti-cache y actualizar el README |
| T5 | `79c93d8` refactor: sacar la fila de datos destacados del CV y del sobre mi |
| T6 | feat: destacar la ingenieria inversa de los resolvers de Candela Cartoons |

## Cambio aceptado: ingeniería inversa de Candela Cartoons (T6)
- [x] T6. Contar en la card, el CV y el "Sobre mí" la capa de extracción de Candela Cartoons. (exploración delegada a un subagente de solo lectura sobre `D:\programacion nacho\cartoon api`, porque son 19 archivos de providers; escritura inline)

Pedido del usuario: los "interceptores" por servidor de video son lo más fuerte del proyecto y no aparecían; quería contarlo sin que suene a algo malo.

Decisión de framing: se presenta como **ingeniería inversa de reproductores web** y arquitectura de resolvers, nunca como "vulnerabilidades", "gratis" ni "saltear protecciones". Se cita la aclaración del README del proyecto ("proyecto educativo… no aloja, descarga ni almacena video").

Evidencia (`cartoon api`, verificada con spot-check):
- `api/interceptors/providers/`: 19 archivos; `registry.js` registra 18 módulos con `{ name, supportsPuppeteer, ttl, extract }`; filemoon, fastream y waaw pausados → **17 resolvers activos**.
- `utils/provider-labels.js`: `DOMAIN_PROVIDER_MAP` con **41 dominios**.
- Técnicas: unpacker `eval(function(p,a,c,k,e,d)…)` (`streamwish.js`, `vidhide.js`, `filelions.js`, `dhtpre.js`), AES-128-CBC (`utils/cubeembed-crypto.js`), desafío Altcha PBKDF2/SHA-256 + CSRF (`voe.js`), APIs internas (`vkvideo.js`, `cubeembed.js`, `archiveorg.js`), intercepción de respuestas con Puppeteer (`generic-puppeteer.js`).
- Resiliencia: caché en SQLite con TTL por proveedor y vencimiento de la URL (`api/interceptors/cache.js`), HTTP → Puppeteer (`interceptor.js`), límite de concurrencia por proveedor (`api/rate-limiter.js`).
- Proxy HLS (`api/proxy/hls.proxy.js`): reescribe playlists y `URI=`, reenvía `Range`, CORS, renueva el token ante 410.
- 96 archivos `*.test.js`.
- Corrección de paso: la card decía "sincronización automática"; el cron solo encola propuestas para revisión del admin → "sincronización programada que propone cambios para revisar".

No se afirma: "más de 20 servidores" funcionando (son 17 activos), eliminación de publicidad, deploy público, monetización, monitoreo automático de proveedores, protección SSRF del proxy.

Check: PDF en 2 páginas (texto en orden, fila "IA y automatización" en un renglón); card de Candela con "Ver más" (202 px recortada → 564 px expandida → vuelve), tag HLS, 375 px sin desborde, 0 errores de consola.

## Cambio aceptado: sin fila de datos destacados (T5)
- [x] T5. Sacar las 4 cajas de números del CV y del "Sobre mí" y pasar "más de 3.000 tests automatizados" al texto. (inline: los mismos dos archivos ya conocidos + CSS sobrante)

Motivo (acordado con el usuario): los números chicos en letra grande (6, 8) se ven chicos, el 780x y el 92,7 % necesitan la aclaración "en laboratorio" y no deberían ser titulares, y la fila ocupaba lo más visible de la página 1. El único dato fuerte sin asterisco (+3.000 tests) quedó en negrita dentro del perfil y del "Sobre mí".

Check: el PDF sigue en 2 páginas y ahora Atendo entra en la página 1 (los 3 proyectos principales sin cambiar de página); el texto se extrae en orden. En el navegador, a 1280 px la tarjeta mide 826×821 y a 375 px se apila (345 px); `scrollWidth <= innerWidth`; CSS `?v=20261105c`; 0 errores de consola; no queda `.sobre-mi-datos` en el HTML ni en el CSS.

## Criterios de aceptación
- No queda texto "estudiante" ni "cursando" en el sitio ni en el CV.
- El CV es un PDF A4 con texto seleccionable, links clicables y como máximo 2 páginas.
- El botón "Descargar CV" baja el PDF nuevo.
- Sin overflow horizontal a 375 px y 0 errores de consola.

## Progreso
- Rama: `feat/egresado-cv-sobre-mi`. Todas las tareas hechas; nada pusheado ni integrado en `main`.

## Próximo paso
Que el usuario revise el CV y el "Sobre mí", y decida si se integra en `main` y se publica (GitHub Pages sirve desde `main`).
