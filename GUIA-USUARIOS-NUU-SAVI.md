# Guía para administrar el sitio de Ñuu Savi

Manual práctico para las personas que cargarán contenido al sitio
**nuu-savi.gob.mx** desde el panel de WordPress.

> El sitio público (lo que ve la ciudadanía) y el panel donde se edita el
> contenido son **dos cosas distintas**:
> - **Sitio público:** https://nuu-savi.gob.mx
> - **Panel de edición (CMS):** https://cms.nuu-savi.gob.mx/wp-admin
>
> Tú editas en el panel; el sitio público se actualiza solo en unos minutos.

---

## 1. Usuarios y permisos

| Persona | Correo | Rol | Puede |
|---|---|---|---|
| Genaro Martínez Villanueva | comunicacionsocialsavi@gmail.com | **Administrador** | Todo: contenido, usuarios, ajustes |
| Alfonso García Estrada | d.planeacionnuusavi@gmail.com | **Editor** | Crear y publicar contenido |
| Juan Carlos Torralba Montes | solcartm@hotmail.com | **Editor** | Crear y publicar contenido |

**Cómo entrar:** abre https://cms.nuu-savi.gob.mx/wp-admin, escribe tu
usuario/correo y contraseña. La primera vez cambia tu contraseña por una
segura (Perfil → Nueva contraseña).

---

## 2. Qué sección se edita y dónde

En el menú izquierdo del panel verás estos apartados. Cada uno alimenta una
parte del sitio público:

| Menú en WordPress | En el sitio aparece en… |
|---|---|
| **Entradas** | Actualidades / Noticias |
| **Eventos** | Próximos eventos (home) |
| **Capacitaciones** | «Seguimos capacitando…» (galería) |
| **Contratos** | Transparencia → Contratos |
| **Gaceta** | Gaceta Municipal |
| **Transparencia** | Transparencia → Obligaciones por año |

> Regla general para TODO: después de llenar los campos, da clic en el botón
> azul **Publicar** (o **Actualizar** si estás editando). Si no publicas, no
> se ve en el sitio.

---

## 3. Cómo subir cada tipo de contenido

### 📰 Noticia (Actualidades)
1. **Entradas → Añadir nueva**.
2. Escribe el **título** y el texto de la nota.
3. A la derecha, en **Imagen destacada**, sube una foto.
4. (Opcional) En **Video**, pega un enlace de YouTube o Facebook.
5. **Publicar**.

### 📅 Evento
1. **Eventos → Añadir evento**.
2. Título del evento.
3. Llena **Fecha**, **Lugar** y **Categoría**.
4. Sube una **Imagen destacada** (opcional).
5. **Publicar**.

### 🎓 Capacitación (foto de la galería)
1. **Capacitaciones → Añadir capacitación**.
2. En el **título** escribe el pie de foto.
3. Sube la **Imagen destacada** (es la foto que se verá).
4. En **Etiqueta** pon una palabra: Taller, Reunión, Curso, etc.
5. **Publicar**.

### 📄 Contrato (con PDF)
1. **Contratos → Añadir contrato**.
2. Título / obra del contrato.
3. Llena **Año** y **Número** (folio, ej. 032).
4. En **PDF del contrato** sube el PDF; en **PDF de insumos** sube el otro.
5. **Publicar**.

### 📘 Publicación de la Gaceta (con PDF)
1. **Gaceta → Añadir publicación**.
2. En el **título** escribe el nombre de la publicación.
3. En **Número** pon el consecutivo (ej. 84 — sigue después del último).
4. En **PDF de la publicación** sube el archivo.
5. **Publicar**.

### 🛡️ Documento de Transparencia (con PDF)
1. **Transparencia → Añadir documento**.
2. En el **título** escribe el nombre del documento
   (ej. «Estado de Situación Financiera»).
3. Elige el **Ejercicio fiscal** (año) y la **Ley aplicable**.
4. En **PDF del documento** sube el archivo.
5. **Publicar**.
   El documento aparecerá en Transparencia, en ese año y bajo esa ley.

> **Sobre los PDF:** sí se pueden subir desde aquí (botón **Añadir archivo**).
> Procura que cada PDF no pese más de ~20 MB. Si un documento histórico ya
> está cargado en el sitio, no hace falta volver a subirlo.

---

## 4. Consejos

- **Guarda borradores** si aún no quieres publicar (botón «Guardar borrador»).
- Para **corregir** algo publicado: entra al apartado, abre el elemento,
  cambia lo que necesites y da **Actualizar**.
- Para **quitar** algo: ábrelo y usa **Mover a la papelera**.
- Si subes contenido y no lo ves en el sitio tras unos minutos, avisa al
  desarrollador (puede ser la caché del servidor).

---

## Anexo técnico (solo para el desarrollador)

**Importar los tipos de contenido Gaceta y Transparencia** (una sola vez):
1. En wp-admin, instala/usa **CPT UI** y **ACF** (ya instalados).
2. **CPT UI → Tools → Import/Export → Post Types**: pega el contenido de
   `cms/cpt-ui-nuu-savi.json` e importa (añade `gaceta` y `doc_transparencia`).
3. **ACF → Herramientas → Importar**: sube `cms/acf-campos-nuu-savi.json`
   (añade los grupos de campos de Gaceta y Transparencia).
4. Verifica que ambos CPTs tengan **Show in REST = true** (ya viene en el JSON).
5. El sitio React ya lee `/wp-json/wp/v2/gaceta` y `/wp-json/wp/v2/doc_transparencia`
   y los fusiona con el contenido base (si el CMS no responde, usa el base).

**Crear los 3 usuarios:** wp-admin → **Usuarios → Añadir nuevo**, con el correo
y rol de la tabla de la sección 1. Marca «Enviar notificación» para que reciban
su acceso (requiere que GoSMTP esté configurado para que salgan los correos).
