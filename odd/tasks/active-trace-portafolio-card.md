# Active Trace — card del portfolio

## Objetivo
Agregar el proyecto [active-trace](https://github.com/IgnacioOdorico/active-trace) al portfolio con el mismo formato que las demás cards: galería de capturas, botón "Ver video del proyecto", botón "Ir a GitHub", descripción y tecnologías verificadas contra el código.

## Autorización
Pedido explícito del usuario (2026-11-05): "agrégame este proyecto al portafolio … con el video y el botón de ver video y ir a ver a GitHub, y las capturas como las tienen los demás proyectos".

## Rutas tomadas
- Verificación del repo: delegada a un agente `Explore` (repo con 4+ archivos relevantes) + spot-check inline.
- Capturas: ffmpeg sobre `D:\Videos\active-trace-portfolio.mp4`, inline.
- Escritura: inline (una card en `index.html` + una línea del README).

## Tareas
- [x] T1. Verificar qué es el producto y qué afirma el README contra el código.
- [x] T2. Elegir fotogramas limpios del video y exportarlos a `.webp`.
- [x] T3. Agregar la card en el lugar del primer placeholder "Title".
- [x] T4. Verificar en navegador (desktop y mobile).
- [x] T5. Actualizar la estructura del README.

## Evidencia de verificación (repo, commit `a128282`)
- Producto: plataforma de gestión académica multi-tenant sobre Moodle (`CLAUDE.md:5`); primer tenant TUPAD (`docs/PRD.md:23`).
- Multi-tenancy: filtro `tenant_id` en `backend/app/repositories/base.py` y validación del tenant del JWT en `backend/app/core/dependencies.py`.
- 7 roles (`backend/app/core/seed.py`): ADMIN, COORDINADOR, PROFESOR, TUTOR, ALUMNO, NEXO, FINANZAS.
- JWT con refresh rotativo (`backend/app/api/v1/routers/auth.py:104-129`), 2FA TOTP con pyotp, Argon2 (`argon2-cffi`).
- AES-256 (modo CBC) en `backend/app/core/security.py`; campos cifrados `email, dni, cuil, cbu, alias_cbu` (`backend/app/services/usuario_service.py:11`).
- Auditoría de solo escritura a nivel aplicación (repositorio sin update/delete) e impersonación auditada (`backend/app/api/v1/routers/audit.py`).
- Worker de comunicaciones en `docker-compose.yml` (servicio `worker`) con aprobación previa.
- OpenTelemetry (`backend/app/core/observability.py`) y logs JSON.
- Tests: 1175 funciones `test_` en backend + 147 `it/test` en frontend = 1322 → "más de 1.300 tests".
- 22 migraciones Alembic.

### Afirmaciones del README que NO se pusieron en la card
n8n (no aparece en el código), sincronización en vivo con la API de Moodle (cliente existe pero ningún endpoint lo usa; lo real es importar CSV/XLSX), CI/CD (no hay `.github/`), cobertura ≥80 % (no hay umbral configurado), AES-GCM (es CBC), envío real de mensajes (el worker usa un proveedor mock).

## Capturas (desde el video, 2:24, 1920×1080)
Recorte de 8 px por lado (borde oscuro y esquinas redondeadas de la ventana grabada) → 1904×1064, `libwebp -quality 82`.
En `07-grilla-salarial.webp` se tapó con el color del sidebar (`#F3F3F3`) el tooltip de URL del navegador en la esquina inferior izquierda.

| Archivo | Segundo |
|---|---|
| 01-inicio-coordinador | 10 |
| 02-alumnos-atrasados | 28,5 |
| 03-comunicaciones | 40 |
| 04-portal-alumno | 49 |
| 05-finanzas | 62 |
| 06-auditoria | 85 |
| 07-grilla-salarial | 104,5 |
| 08-usuarios | 115 |
| poster (1280×720) | 2,8 (portada del video) |

Video copiado sin reencodear: 13,2 MB, H.264 yuv420p, `moov` antes de `mdat` (ya tiene faststart).

## Verificación en navegador (http-server local, puerto 5500)
- 10 imágenes de la card cargan (0 rotas); 6 miniaturas visibles con contador `+2`.
- Clic en miniatura 7 → lightbox en modo galería "7 / 8" con el caption de la grilla salarial.
- Botón de video → lightbox en modo video, `readyState 4`, 1920×1080, 144,2 s, poster correcto.
- Mobile 375 px: `scrollWidth == innerWidth`, card de 313 px.
- Consola: 0 errores.

## Estado
Implementado y verificado localmente. Pendiente: publicar en `main` (GitHub Pages).
