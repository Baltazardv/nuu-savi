# Municipio de Ñuu Savi — Estado del Proyecto

> **Sitio web oficial del Municipio de Ñuu Savi, Guerrero** ("Pueblo de la lluvia").
> Documento de contexto y traspaso. **Última actualización: 4 de septiembre de 2026.**

---

## 1. Resumen ejecutivo

Rediseño completo del sitio web municipal con un **frontend moderno en React** y un **gestor de contenidos WordPress "headless"** para que el personal del municipio pueda actualizar la página sin tocar código.

**Estado actual:** ✅ Web desplegada y en vivo en **https://dev.nuu-savi.gob.mx**, conectada al CMS. Falta cargar contenido real, crear cuentas del personal y (tras aprobación) mover al dominio principal.

---

## 2. Arquitectura

```
┌─────────────────────────┐        REST API (solo lectura)        ┌──────────────────────────┐
│  WEB (React, estática)   │  ───────────────────────────────────▶ │  WordPress (headless)     │
│  dev.nuu-savi.gob.mx     │        /wp-json/wp/v2/...              │  cms.nuu-savi.gob.mx      │
│  (HTML + CSS + JS)       │  ◀───────────────────────────────────  │  (panel wp-admin)         │
└─────────────────────────┘        JSON (noticias, eventos…)       └──────────────────────────┘
        ▲                                                                     ▲
   El público ve esto                                          El personal edite aquí (login)
```

- **La web NO tiene login ni base de datos.** Es 100% estática (archivos), rapidísima y segura.
- **WordPress solo se usa como panel de edición.** El personal publica ahí; la web lo lee por la API y lo muestra con su propio diseño.
- Si el CMS estuviera caído o vacío, la web usa **datos de respaldo** y nunca se rompe.

### Stack
- **Frontend:** Vite + React 18 (JavaScript) + react-router-dom. Carpeta: `C:\WEB\Ñuu Savi\`.
- **CMS:** WordPress + plugins **CPT UI** (tipos de contenido) y **ACF** (campos).
- **Hosting:** cPanel en hospedando.com.mx (paquete "Total Libre"), servidor `svgtl110.cloud-mx-ns.net`.

---

## 3. Infraestructura (dominios y hosting)

Todo vive en **una sola cuenta de cPanel** (usuario `nuusavig`). El dominio ya apunta a ese servidor.

| Dominio | Carpeta (docroot) | Uso |
|---|---|---|
| `nuu-savi.gob.mx` (principal) | `/public_html` | 🔴 Sitio VIEJO en vivo (WordPress). No tocar hasta migrar. |
| `dev.nuu-savi.gob.mx` | `/dev.nuu-savi.gob.mx` | ✅ **Web nueva (React) — EN VIVO aquí.** |
| `cms.nuu-savi.gob.mx` | `/cms.nuu-savi.gob.mx` | ✅ **WordPress (panel de edición).** |

- **cPanel seguro:** `https://svgtl110.cloud-mx-ns.net:2083`
- **Panel de WordPress:** `https://cms.nuu-savi.gob.mx/wp-admin/`
- El repositorio de código está en GitHub: `github.com/Baltazardv/nuu-savi` (demo en GitHub Pages: `https://baltazardv.github.io/nuu-savi/`, con datos de ejemplo).

> ⚠️ **Credenciales (FTP/cPanel, admin de WordPress):** se manejan por canal seguro aparte. **No se guardan en el repositorio ni en este documento.**

---

## 4. El CMS (WordPress headless)

### Tipos de contenido y campos (ya configurados)

| Sección de la web | Tipo en WordPress | Campos (además de título e imagen destacada) |
|---|---|---|
| **Actualidades** | Entradas *(nativo)* | Categoría (nativa), **Video (URL)** opcional |
| **Eventos** | `evento` (CPT) | **fecha, lugar, categoria** |
| **Capacitaciones** | `capacitacion` (CPT) | **etiqueta** (el título es el pie de foto) |
| **Contratos** | `contrato` (CPT) | **anio, numero, archivo_contrato (PDF), archivo_insumos (PDF)** |

- Los 3 tipos personalizados tienen **`show_in_rest` activado** → aparecen en la API.
- Los campos ACF tienen **"Show in REST API"** → viajan en la respuesta bajo la clave `acf`.
- Las configuraciones de importación están respaldadas en el repo: **`cms/cpt-ui-nuu-savi.json`** (tipos) y **`cms/acf-campos-nuu-savi.json`** (campos).

### Endpoints de la API (verificados ✅)
- `https://cms.nuu-savi.gob.mx/wp-json/wp/v2/posts` — Actualidades
- `https://cms.nuu-savi.gob.mx/wp-json/wp/v2/evento` — Eventos
- `https://cms.nuu-savi.gob.mx/wp-json/wp/v2/capacitacion` — Capacitaciones
- `https://cms.nuu-savi.gob.mx/wp-json/wp/v2/contrato` — Contratos

### Roles de usuario
Se usan los **roles nativos de WordPress** (no hace falta plugin):
- **Administrador:** control total (crear/editar/eliminar/ocultar, medios, usuarios, ajustes).
- **Editor:** crear, editar, publicar y eliminar publicaciones + subir imágenes. **No** toca ajustes, plugins ni usuarios.

---

## 5. Cómo cargar contenido (mini-guía para el personal)

1. Entrar a **https://cms.nuu-savi.gob.mx/wp-admin/** con su usuario y contraseña.
2. En el menú izquierdo elegir la sección: **Entradas** (noticias), **Eventos**, **Capacitaciones** o **Contratos**.
3. **Añadir nuevo** → escribir el **Título**, poner **Imagen destacada** (derecha) y llenar los campos del bloque de datos (fecha, lugar, etc.).
4. Clic en **Publicar**.
5. El contenido aparece **automáticamente en la web** (puede tardar unos minutos si hay caché).

> La página fea `cms.nuu-savi.gob.mx/evento/…` es solo el "backstage". El público nunca la ve; solo se usa el panel para escribir.

---

## 6. Conexión web ↔ CMS (técnico)

- La URL del CMS se define en **`.env`** (local) o en el build: `VITE_WP_URL=https://cms.nuu-savi.gob.mx`.
- Cliente y mapeos: **`src/lib/wp.js`** (funciones `getActualidades`, `getEventos`, `getCapacitaciones`, `getContratos`). Cada componente hace fetch y, si no hay datos, usa su **respaldo** en `src/data/`.
- **CORS:** WordPress ya envía los encabezados correctos para lectura entre subdominios (no requiere plugin).
- El build actual de `dev` tiene la URL del CMS **embebida** → la web en vivo jala del CMS en tiempo real.

---

## 7. Estructura del proyecto (archivos clave)

```
src/
  components/   Header, Hero, QuickAccess, Territory, GuerreroLocator, Events,
                Gallery, News, FacebookFeed, VisitCounter, Footer, Icons, ...
  pages/        Home, Conociendo, Cabildo, Historia, Transparencia, Contratos
  data/         site, nav, officials, events, news, contracts, services,
                facebook, guerrero, searchIndex   (contenido de respaldo, editable)
  lib/          wp.js (cliente CMS), asset.js (rutas base-aware)
  styles.css    Todo el CSS
public/
  assets/       imágenes, video de intro, cartografías, escudos, greca…
  .htaccess     Redirección SPA para Apache/cPanel (rutas internas sin 404)
cms/            Configs de importación del CMS (CPT UI + ACF)
deploy/         ZIP compilado para subir a cPanel (no se versiona)
.env            VITE_WP_URL (local, no se versiona)
```

---

## 8. Cómo compilar y desplegar

```bash
npm install        # una vez
npm run dev        # desarrollo local (http://localhost:5180)
npm run build      # genera dist/ (estático, listo para subir)
```

**Desplegar en cPanel (dev):**
1. `npm run build` → se crea la carpeta `dist/`.
2. Comprimir el contenido de `dist/` en un ZIP.
3. Subir el ZIP en **cPanel → Administrador de archivos** dentro de `/dev.nuu-savi.gob.mx/` y **Extraer**.
4. Deben quedar: `index.html`, `assets/`, `.htaccess` (+ `cgi-bin`, `.well-known` que NO se borran).

> Para el **dominio principal** más adelante: mismo proceso pero en `/public_html/` (tras respaldar/migrar el sitio viejo).

---

## 9. Estado: hecho ✅ / pendiente ⏳

### Hecho
- ✅ Diseño completo, responsive (móvil/tablet/escritorio), con contenido real del municipio.
- ✅ Todas las secciones (Inicio, Conociendo Ñuu Savi, Cabildo, Historia, Territorio con cartografías, Ventanilla digital/trámites, Eventos, Capacitaciones, Actualidades, Facebook, Transparencia, Contratos, Footer).
- ✅ WordPress CMS instalado, seguro y configurado (4 secciones editables).
- ✅ Web desplegada y conectada en **dev.nuu-savi.gob.mx**.
- ✅ Contador de visitas, buscador del sitio, mapa interactivo, localizador de Guerrero, números de emergencia, plataformas de transparencia (PNT + ITAIGro).

### Pendiente
1. 🔒 **Seguridad:** pedir a hospedando un **escaneo Imunify** de la cuenta y revisar el sitio principal `nuu-savi.gob.mx` (WordPress viejo, posible infección) **antes de migrar**.
2. **Cargar contenido real** en WordPress (noticias, eventos, capacitaciones, contratos).
3. **Crear cuentas de Editor** del personal (falta la lista nombres/correos) + configurar **GoSMTP** para los correos de invitación.
4. **Mini-guía impresa/PDF** para el personal.
5. **Migrar al dominio principal** `nuu-savi.gob.mx` cuando el cliente apruebe (+ activar Force HTTPS ahí).

---

## 10. Seguridad — nota importante

Al desplegar en `dev`, se encontró que la carpeta contenía un **WordPress abandonado** (intento previo de otros programadores, rechazado por el cliente) que se había **infectado con malware** (archivos tipo webshell: `aishiteru5.php`, `gec1.php`, `cache.php`, `cache.zip.zip`). Se **limpió** la carpeta (se conservaron `cgi-bin` y `.well-known` para el SSL) y se desplegó la web estática (sin PHP, no reinfectable).

**Acción pendiente recomendada:** solicitar al hosting un escaneo completo con **Imunify360** y revisar el sitio principal en vivo, ya que un WordPress viejo comprometido en la cuenta es un riesgo.

---

## 11. Contenido pendiente del municipio (a proporcionar)

- Reseña oficial (texto de presentación) para Inicio / "Conociendo Ñuu Savi".
- Datos reales de la tabla de Transparencia (2021–2024) e info del Registro Civil.
- PDF histórico del Cacicazgo de Coapinola → `public/assets/Cacicazgo-de-Coapinola.pdf`.
- PDFs de los contratos (o cargarlos directo en WordPress).
- Correo de contacto real (hoy se muestra `contacto@nuu-savi.gob.mx` — confirmar/crear la cuenta).
- Lista del personal que tendrá cuenta (nombre, correo, rol Editor/Administrador).

---

## 12. Datos del municipio (referencia)

- **Nombre:** Municipio de Ñuu Savi ("Pueblo de la lluvia", del mixteco *Ñuu* 'pueblo' + *Savi* 'lluvia').
- **Cabecera:** Coapinola, Guerrero. **Creado:** 31 de agosto de 2021 (37 localidades escindidas de Ayutla de los Libres). Uno de los 85 municipios de Guerrero.
- **Teléfono:** 745 119 3790 · **Horario:** Lunes a viernes de 9:00 a 15:00 h.
- **Emergencias 24 h:** 911 · Seguridad Pública Municipal y Protección Civil: 744 321 7801.
- **Cabildo (2024–2027, Sistema Normativo Propio):** 8 integrantes con foto y semblanza (ver `src/data/officials.js`).
- **Facebook:** página oficial (H. Ayuntamiento Municipal de Ñuu Savi 2024-2027).

---

*Documento generado para respaldo y traspaso del proyecto. Para dudas técnicas, revisar también `GUIA-CMS-WORDPRESS.md` y `README.md`.*
