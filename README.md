# Portafolio Fotográfico - BLNCRTSHOTS

Un portafolio web moderno y responsive para un fotógrafo profesional.

## Características

- **Diseño moderno**: Interfaz limpia y profesional con tipografía Montserrat
- **Responsive**: Se adapta perfectamente a dispositivos móviles y tablets
- **Animaciones suaves**: Transiciones y efectos hover para una experiencia interactiva
- **Secciones principales**:
  - Hero con llamada a la acción
  - Sobre mí con imagen del fotógrafo
  - Galería de portafolio con efectos hover
  - Información de contacto
  - Footer con enlaces sociales

## Tecnologías utilizadas

- HTML5 semántico
- CSS3 con Grid y Flexbox
- JavaScript vanilla para interactividad
- Boxicons para iconos
- Google Fonts

## Estructura del proyecto

```
BLNCRTSHOTS WEB/
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # JavaScript para interactividad
├── assets/
│   └── images/         # Imágenes del portafolio
├── css/                # Carpeta adicional para estilos
└── js/                 # Carpeta adicional para scripts
```

## Cómo usar

1. Abre `index.html` en tu navegador web
2. Navega por las diferentes secciones usando el menú
3. En dispositivos móviles, usa el botón hamburguesa para el menú

## Servidor local con Node.js

1. Abre una terminal en la carpeta del proyecto.
2. Ejecuta `npm install` para instalar dependencias.
3. Copia `.env.example` a `.env` y completa tus credenciales SMTP.
4. Ejecuta `npm start`.
5. Abre `http://localhost:3000` en el navegador.

> El formulario de contacto ahora envía los datos al servidor y éste reenvía el correo a `blncrtshots@gmail.com`.

## Personalización

- **Imágenes**: Reemplaza las imágenes en `assets/images/` con tus propias fotos
- **Contenido**: Edita el texto en `index.html`
- **Estilos**: Modifica `styles.css` para cambiar colores, fuentes, etc.
- **Información de contacto**: Actualiza el email, teléfono y ubicación en la sección de contacto

## Funcionalidades JavaScript

- Navegación suave entre secciones
- Menú móvil responsive
- Animaciones de entrada al hacer scroll
- Efectos hover en la galería
- Validación básica del formulario de contacto