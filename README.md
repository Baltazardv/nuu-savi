# Sitio web del Municipio de Ñuu Savi

Sitio oficial del **Municipio de Ñuu Savi**, Guerrero, México — *«pueblo de la lluvia»*.
Construido con **React + Vite** (código libre, sin WordPress en el frontend).

## Requisitos
- Node.js 18+

## Desarrollo
```bash
npm install
npm run dev
```
Abre http://localhost:5180

## Compilar para producción
```bash
npm run build
```
Genera la carpeta `dist/`.

## Despliegue

### cPanel (dominio oficial nuu-savi.gob.mx)
Sube el **contenido de `dist/`** a `public_html`. Incluye un `.htaccess` con el
fallback de rutas para el enrutador (SPA).

### GitHub Pages (demo)
El workflow `.github/workflows/deploy.yml` compila y publica automáticamente en
cada push a `main`. Actívalo en **Settings → Pages → Source: GitHub Actions**.
Demo: https://baltazardv.github.io/nuu-savi/

## Contenido editable
Los textos y datos están en `src/data/` (contacto, eventos, noticias, cabildo,
contratos) para que el municipio los actualice sin tocar los componentes.

## CMS (opcional)
El frontend puede leer contenido desde un **WordPress headless** (ver
`GUIA-CMS-WORDPRESS.md`). Configura `VITE_WP_URL` en un archivo `.env`
(ver `.env.example`). Sin él, el sitio usa datos de ejemplo.

## Estructura
```
public/assets/   imágenes, video de intro, logos, fotos
src/components/  Header, Hero, Footer, Cabildo, Galería, etc.
src/pages/       Inicio, Cabildo, Historia, Transparencia, Contratos
src/data/        contenido editable
```
