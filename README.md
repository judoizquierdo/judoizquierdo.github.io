# judoizquierdo.github.io

Web estática de Izquierdo Club Judo (Zaragoza). Sin build ni framework: HTML5 + CSS3 + JS vanilla, servida directamente por GitHub Pages.

## Stack y despliegue

- No hay proceso de build. Lo que está en `master` es lo que se sirve.
- GitHub Pages despliega automáticamente al hacer push a `master`.
- `CNAME` fija el dominio custom (`www.judoizquierdo.es`) — no lo borres o se pierde el dominio.
- No hay `package.json`, ni linters, ni tests. Editar y comprobar en el navegador es el flujo de trabajo.

## Estructura

```
index.html      → todo el contenido y la estructura del sitio (una sola página)
css/styles.css  → todos los estilos
js/main.js      → todo el JS (nav, animaciones on-scroll, carrusel de galería, compartir, año del footer)
img/            → fotos (team/, gallery/)
robots.txt      → indexación para buscadores, apunta a sitemap.xml
sitemap.xml     → mapa del sitio (una sola URL, es una landing de una página)
llms.txt        → resumen del sitio para asistentes de IA (convención llms.txt)
```

Todo vive en estos tres archivos. No hay componentes, ni plantillas, ni includes: para editar cualquier texto o sección, es directamente en `index.html`.

## Decisiones de arquitectura

- **Una sola página, sin build**: el sitio es pequeño y lo mantiene gente sin perfil técnico entre actualizaciones. Se prioriza que cualquiera pueda abrir `index.html` y editar texto directamente, antes que meter un generador estático o un framework.
- **CSS con variables nativas** (`:root { --accent, --gray-*, ... }`) en vez de un preprocesador. No hace falta Sass/PostCSS para este tamaño de sitio.
- **JS vanilla sin dependencias**: el único comportamiento dinámico es el toggle del menú móvil, el fade-in on-scroll vía `IntersectionObserver`, la rotación de fotos del masonry, `navigator.share` y el año del footer. No justifica ningún framework ni bundler.
- **Contenido del CV del profesor y de la lista de cinturones negros vive directamente en el HTML** (no en JSON ni CMS). Son datos que cambian pocas veces al año; el coste de editar el HTML a mano es menor que mantener una capa de datos separada.
- **Sin gestor de contenidos ni backend**: es una landing informativa, no hay formularios que requieran servidor. El contacto es siempre vía enlace a WhatsApp (`wa.me`) o Google Maps.

## Puntos a los que prestar atención

- **Los nombres de cinturones negros** (`#cinturones`, sección "pyramid") están pensados para que el nombre de cada persona nunca se parta en dos líneas y para que el título del dan quede siempre encima de la lista de nombres (ver `CHANGELOG.md` para el porqué). Si añades cinturones nuevos, respeta la estructura `.pyramid__level > .pyramid__meta + .pyramid__names`.
- **El horario de clases** (`.ccard__schedule`) se muestra como texto plano ("Miércoles y Viernes · 09:30–10:30"), no como iconos de días. Fue una decisión explícita del cliente tras probar la versión con círculos de días — no reintroducir esa UI sin confirmarlo antes.
- **El CV del profesor está siempre visible** en la sección `#profesor`, sin modal ni botón "ver más". También fue un cambio pedido explícitamente; si se piensa en volver a ocultarlo tras un botón, confirmar con el cliente primero.

## Flujo de trabajo habitual

Para cambios de contenido (horarios, cinturones nuevos, textos), simplemente:
1. Editar `index.html` directamente en el sitio del cambio (buscar el texto con grep/búsqueda del editor).
2. Comprobar visualmente abriendo el archivo en el navegador (no requiere servidor, aunque un `python3 -m http.server` local es suficiente si hace falta rutas relativas correctas).
3. Commit + push a `master` → Pages lo publica solo.

Ver `CHANGELOG.md` para el historial de peticiones del cliente y cómo se resolvieron.
