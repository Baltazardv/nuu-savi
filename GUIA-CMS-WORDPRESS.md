# Guía — WordPress *headless* como CMS de Ñuu Savi

Sistema de edición de contenido para el sitio de Ñuu Savi. El **personal edita en
WordPress** (login, roles, subida de imágenes y PDFs) y el **sitio público React**
lee ese contenido por la API REST. WordPress queda **solo como backend**: nadie ve
la interfaz de WordPress en el sitio público.

```
Personal → wp-admin (login + roles)  ──REST API──►  React (sitio público, solo lectura)
```

> Como el sitio React consulta la API **en vivo**, cuando el personal publica una
> entrada aparece en el sitio **sin necesidad de recompilar**.

---

## 1. Dónde instalar WordPress

**Recomendado: un subdominio** `cms.nuu-savi.gob.mx` (más limpio y aislado del sitio
público). Alternativa: un subdirectorio `nuu-savi.gob.mx/cms`.

En el cPanel de hospedando.com.mx:
1. **Dominios → Subdominios** → crear `cms` sobre `nuu-savi.gob.mx`.
2. **Softaculous / Instalador de WordPress** → instalar WordPress en ese subdominio.
3. Activar **HTTPS** (certificado SSL) en el subdominio.

---

## 2. Plugins necesarios

| Plugin | Para qué |
|---|---|
| **CPT UI** | Crear tipos de contenido: `evento`, `contrato`, `integrante` (cabildo) |
| **Advanced Custom Fields (ACF)** | Campos extra: fecha y lugar de eventos, PDFs de contratos, cargo del cabildo |
| **Members** *o* **User Role Editor** | Ajustar los roles (Administrador / Editor) con permisos exactos |
| **Wordfence** o **Limit Login Attempts** | Seguridad del login (sitio de gobierno) |

Mantén WordPress y plugins **actualizados**.

---

## 3. Roles (lo acordado con el municipio)

- **Administrador** → rol nativo *Administrador* de WordPress (todo: crear, editar,
  eliminar, ocultar, gestionar usuarios y ajustes).
- **Editor** → crear un rol personalizado (con *Members*/*User Role Editor*) que
  **pueda crear y editar y subir archivos, pero NO eliminar ni ocultar**:
  - Permitir: `edit_posts`, `edit_published_posts`, `publish_posts`, `upload_files`.
  - Quitar: `delete_posts`, `delete_published_posts`, `delete_others_posts`,
    `manage_options`, `edit_users`.

---

## 4. Modelo de contenido

| Sección del sitio | En WordPress | Campos |
|---|---|---|
| **Actualidades** *(ya conectado)* | Entradas (*posts*) nativas + Categorías | Título, contenido, extracto, imagen destacada |
| **Eventos** *(ya conectado)* | CPT `evento` | ACF: `fecha` (fecha), `lugar` (texto), `categoria` (texto) + imagen destacada |
| **Cabildo** *(pendiente conectar)* | CPT `integrante` | ACF: `cargo`, `area`, `orden` + foto (imagen destacada) |
| **Contratos** *(pendiente conectar)* | CPT `contrato` | ACF: `numero`, `pdf_contrato` (archivo), `pdf_insumos` (archivo) |
| **Historia** | Página + PDF en biblioteca de medios | — |

**Importante — exponer todo en la API REST:**
- Al crear cada CPT en CPT UI: **Show in REST API = true** (usa el mismo *slug*:
  `evento`, `contrato`, `integrante`).
- En cada grupo de campos de ACF: activar **"Show in REST API"** (o instalar
  *ACF to REST API*) para que los campos `acf` salgan en la respuesta.

Las **Actualidades** no requieren nada: los *posts* nativos ya salen en
`…/wp-json/wp/v2/posts`.

---

## 5. Conectar el frontend React

1. En la raíz del proyecto, copia `.env.example` a `.env` y pon tu URL:
   ```
   VITE_WP_URL=https://cms.nuu-savi.gob.mx
   ```
2. Recompila y sube: `npm run build` → subir el contenido de `dist/` al `public_html`.

Sin `.env` (o si WordPress no responde), el sitio usa datos de ejemplo y **no se rompe**.

---

## 6. CORS (si WordPress está en un subdominio distinto)

Como el sitio público (`nuu-savi.gob.mx`) y WordPress (`cms.nuu-savi.gob.mx`) son
orígenes distintos, hay que permitir la lectura entre ambos. Crea el archivo
`wp-content/mu-plugins/cors-nuu-savi.php` en WordPress:

```php
<?php
// Permite que el sitio público lea la API REST de este WordPress.
add_action('rest_api_init', function () {
  remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
  add_filter('rest_pre_serve_request', function ($value) {
    header('Access-Control-Allow-Origin: https://nuu-savi.gob.mx');
    header('Access-Control-Allow-Methods: GET');
    header('Access-Control-Allow-Headers: Accept, Content-Type');
    return $value;
  }, 10, 1);
}, 15);
```

---

## 7. Medios: imágenes, PDFs y **videos**

- **Imágenes y PDFs** → biblioteca de medios de WordPress (arrastrar y soltar).
- **Videos** → **no subirlos al hosting** (consumen mucho espacio y ancho de banda
  en el hosting compartido). Súbelos a **YouTube o Vimeo** (pueden ser "no listados")
  e incrusta el enlace. El video de intro actual (10 MB) sí puede quedarse como
  archivo estático, pero una biblioteca de videos debe ir en YouTube/Vimeo.

---

## 8. Flujo de trabajo del personal

1. Entrar a `https://cms.nuu-savi.gob.mx/wp-admin` e iniciar sesión.
2. **Entradas → Añadir nueva** (artículo), o **Eventos → Añadir nuevo**, etc.
3. Escribir, subir imagen destacada / PDF, **Publicar**.
4. El contenido aparece automáticamente en el sitio público.

---

## Pendiente de mi lado (frontend)
- Conectar **Cabildo** y **Contratos** a sus CPT (mismo patrón que Actualidades/Eventos).
- Opcional: página "Todas las noticias" y detalle de artículo dentro del React.
