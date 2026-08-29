# Contexto del Proyecto — Sitio Web del Municipio de Ñuu Savi

> Documento de estado y contexto del proyecto. Última actualización: agosto 2026.

## 1. Resumen

Rediseño del sitio web oficial del **Municipio de Ñuu Savi**, Guerrero, México
(*«pueblo de la lluvia»* en mixteco). Municipio de reciente creación (31 de agosto de
2021, escindido de 37 localidades de Ayutla de los Libres; cabecera: **Coapinola**).

- **Objetivo:** migrar de WordPress a una solución de código libre, conservando la
  identidad institucional y mejorando diseño, organización y experiencia.
- **Coordinación:** "Balta" (desarrollador) y "Agus" (enlace con el municipio).
- Sitio original de referencia: https://nuu-savi.gob.mx/

## 2. Stack y arquitectura

- **Frontend:** React 18 + Vite (JavaScript), `react-router-dom`. Compila a estático.
- **Sin backend propio** por ahora. El contenido editable vive en `src/data/`.
- **CMS previsto (futuro):** WordPress *headless* (ver `GUIA-CMS-WORDPRESS.md`). El
  frontend ya está preparado para leer de la API REST de WP con respaldo a datos de
  ejemplo (`src/lib/wp.js`); se configura con `VITE_WP_URL` en un `.env`.
- **Rutas de assets base-aware** (`src/lib/asset.js`) para funcionar tanto en la raíz
  (cPanel) como en subcarpeta (GitHub Pages). `BrowserRouter` con `basename`.

## 3. Despliegue

| Entorno | Detalle |
|---|---|
| **Demo (GitHub Pages)** | https://baltazardv.github.io/nuu-savi/ — repo público `github.com/Baltazardv/nuu-savi`. Deploy automático en cada push a `main` vía `.github/workflows/deploy.yml` (build con `VITE_BASE=/nuu-savi/`, genera `404.html` para el ruteo SPA). Pages Source = *GitHub Actions*. |
| **Producción (oficial)** | Dominio `nuu-savi.gob.mx` en hosting cPanel (hospedando.com.mx). Subir el contenido de `dist/` (build con base `/`) a `public_html`. Incluye `.htaccess` para el fallback del enrutador. |

**Comandos:**
```bash
npm install      # instalar dependencias
npm run dev      # desarrollo → http://localhost:5180
npm run build    # producción → carpeta dist/
```

## 4. Estructura del proyecto

```
public/assets/
  escudo.png, escudo-ayuntamiento.png, intro.mp4     # logos + video de intro
  fotos/            # fotos del sitio (hero, cabildo, capacitaciones, mapa, greca, medallón)
  fotos/cabildo/    # retratos de los integrantes del cabildo
  fotos/eventos/    # fotos por evento (asamblea, grito, salud, lengua, reforestacion)
src/
  main.jsx, App.jsx, styles.css      # bootstrap, router y TODO el CSS
  components/  Intro, Header, Hero, SiteSearch, QuickAccess, CabildoTeaser,
               Territory, Servicios, Events, Gallery, News, FacebookFeed,
               Footer, Wave, PageHero, Icons
  pages/       Home, Cabildo, Historia, Transparencia, Contratos
  data/        site, nav, officials, events, news, contracts, services, searchIndex   # contenido editable
  lib/         asset (rutas base-aware), wp (cliente WordPress)
.github/workflows/deploy.yml    # CI de GitHub Pages
GUIA-CMS-WORDPRESS.md            # guía para montar WordPress headless
legacy-static/                  # versión estática HTML anterior (archivada)
docs/                           # material del cliente (biografías del cabildo)
```

## 5. Secciones y funcionalidades

**Home** (`src/pages/Home.jsx`):
1. **Intro de video** — el `intro.mp4` se reproduce a pantalla completa al entrar y
   hace *fade* al hero. Solo una vez por sesión; botón "Saltar" y fallback "Entrar".
2. **Hero** — foto real de la comunidad, buscador funcional, accesos rápidos
   (Comunidad, Ubicación, Servicios, Gobierno, Trámites), greca + medallón mixtecos.
3. **Sobre el municipio** ("Pueblo de la lluvia") — datos clave en tarjetas con borde
   degradado.
4. **Conoce a nuestro cabildo** — teaser con foto grupal → página de Cabildo.
5. **Explora el territorio** — leyenda de categorías (Salud, Educación, Cultura,
   Servicios públicos, Naturaleza) + **mapa ilustrado** + decoraciones (lluvia/hojas).
6. **Servicios en línea** — Transparencia (interno), Gaceta (por definir), **CURP** y
   **Acta de Nacimiento** con enlaces OFICIALES de gob.mx (badge "gob.mx", nueva pestaña).
7. **Próximos eventos** — **filtro por categoría** + tarjetas con badge/ícono/colores +
   banner "Enviar mi evento".
8. **Galería** ("Seguimos capacitando…") con lightbox.
9. **Actualidades** — noticia destacada + lista (conectable a WordPress).
10. **Facebook** — vista previa interactiva (Page Plugin oficial) de la página real.

**Buscador del sitio** (`SiteSearch` + `searchIndex.js`): al escribir sugiere en qué
sección/página aparece la palabra (sin acentos) y navega directo ahí.

**Páginas internas:** Cabildo (8 integrantes reales con foto + **modal de semblanza**),
Historia (creación del municipio + visor PDF), Transparencia (tabla de obligaciones),
Contratos (listado 001–033).

**Responsive:** auditado y verificado sin desbordes en 360, 390, 768 y desktop
(intro, menú móvil, modal, tablas con scroll interno, todas las secciones).

## 6. Identidad visual

- Colores: teal petróleo `#14716a` (primario) + amarillo maíz `#e6b23c` + terracota
  `#b5502f` + turquesa `#2f8f86`, sobre fondo blanco/papel.
- Tipografía: **Fraunces** (titulares) + **DM Sans** (cuerpo).
- Motivos: lluvia (*Savi*) y grecas mixtecas; medallón y cenefa (`greca.png`,
  `medallon.png`) proporcionados por el cliente.

## 7. Pendientes

**Del cliente (vía Agus):**
- Foto del regidor **Felipe García Camilo** (falta su retrato).
- **PDF histórico** → `public/assets/Cacicazgo-de-Coapinola.pdf` (activar visor en `Historia.jsx`).
- **PDFs de contratos** → `public/assets/contratos/`.
- Enlace de la **Gaceta Municipal** y validar contenido real de la **tabla de Transparencia**.
- Cartografía oficial para reemplazar el mapa ilustrativo (opcional).
- Traductor a mixteco (versión bilingüe, a futuro).

**Técnicos / próximos pasos:**
- Conectar **Cabildo y Contratos** a WordPress (mismo patrón que Actualidades/Eventos).
- Montar el **WordPress headless** en `cms.nuu-savi.gob.mx` (guía lista).
- Optimizar imágenes pesadas restantes (el mapa `mapa-territorio.png` ~2.4 MB).
- Definir roles Admin/Editor en WordPress (ya soportado por sus roles nativos).

## 8. Notas importantes

- ✅ **Seguridad resuelta:** el enlace "Acta de Nacimiento" del sitio original apuntaba
  a un dominio NO oficial (`wwvgob.mx`); ahora usa los enlaces oficiales de gob.mx.
- **Credenciales FTP/cPanel:** se gestionan por canal seguro aparte, NUNCA en el repo.
- **Contenido en vivo:** cuando WordPress esté conectado, las publicaciones aparecen sin
  recompilar (el frontend consulta la API en tiempo de ejecución).
