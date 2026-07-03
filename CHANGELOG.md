# Changelog

Historial de cambios solicitados por el cliente, con el motivo y la solución aplicada. Pensado para que quien retome el proyecto entienda el porqué de ciertas decisiones sin tener que reconstruir la conversación original.

## 2026-07-03

### Estadísticas de la sección de clases
El cliente pidió eliminar los datos de "cinturones negros formados", "años impartiendo clase" y "alumnos por clase" de la barra de estadísticas junto a las tarjetas de clases (se dejó solo temporalmente el de "nivel del profesor" hasta que se aclaró que quería quitar el bloque entero). Se retiró toda la barra de estadísticas (`.classes-stats`) y su CSS asociado, ya sin uso.

### CV del profesor: dato de Tokyo
Se añadió "de Tokyo" al certificado "Curso de Técnica KODOKAN 2013" en el listado de títulos oficiales, para que quede consistente con el resto de certificaciones del Kodokan Judo Institute de Tokyo.

### Nombres de cinturones negros no se cortan en móvil
El listado de cinturones negros por grado (sección "Cinturones negros") cortaba nombres largos a mitad de palabra en pantallas pequeñas. Se corrigió para que cada nombre se mantenga siempre en una única línea.

Al solucionarlo se detectó un problema relacionado: en tablets (ej. iPad mini) el nombre del grado (ej. "7.º Dan") ocupaba una columna fija a la izquierda, dejando poco espacio a los nombres más largos y volviendo a producir el mismo problema de ajuste. Se decidió, con el visto bueno del cliente, unificar el layout en todas las resoluciones: el grado/dan se muestra siempre encima, y la lista de nombres debajo a ancho completo. En móvil, además, los nombres van uno por línea (nunca dos nombres compartiendo fila).

### CV del profesor siempre visible
El CV completo (títulos oficiales + experiencia profesional) estaba detrás de un botón "Ver currículum completo" que abría un modal. El cliente prefiere que esté siempre visible en la página, sin necesidad de interactuar con nada. Se eliminó el modal, el botón y el JS asociado, y el contenido del CV se integró directamente en la sección "Tu profesor", debajo de la biografía.

Como parte de este cambio se ajustó el espaciado entre el bloque de credenciales del profesor y el bloque del CV, que se había duplicado (quedaba un hueco mayor ahí que en el resto de la sección) tras integrar el CV en la página.

### Horarios de clases: texto en vez de círculos de días
El cliente no quería el horario representado con círculos de iniciales de día (L M X J V) marcando los días activos; prefiere el horario escrito de forma legible (ej. "Miércoles y Viernes · 09:30 – 10:30"). Se sustituyó esa UI por texto plano, alineando el nombre de los días a la izquierda y la hora a la derecha para que no queden apelmazados, incluso con nombres de días largos (ej. "Lunes, Martes, Miércoles y Jueves").

### Enlace a Google Maps en el footer
La dirección del club en el footer era texto plano. La sección principal de contacto ya enlazaba a Google Maps, así que se añadió el mismo enlace en la dirección del footer para que sea clicable en cualquier parte del sitio donde aparezca.

### SEO y descubribilidad
Se añadieron `robots.txt`, `sitemap.xml` y `llms.txt` para mejorar la indexación en buscadores y dar contexto estructurado a asistentes de IA sobre el sitio. No se añadió un feed RSS: el sitio es una landing de una sola página sin sección de novedades, por lo que un RSS no aporta nada hasta que exista contenido periódico (blog, noticias) que justifique una suscripción.

### Limpieza: lightbox sin usar
Se detectó que el markup del lightbox (`#lightbox` en `index.html`) y su función `closeLightbox()` en `main.js` no tenían ningún disparador que los abriera — ninguna imagen de la galería llamaba a esa función. Era código heredado sin uso real. Se eliminó por completo (HTML, JS y CSS) en vez de dejarlo a medias.