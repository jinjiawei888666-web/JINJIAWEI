import character from './lanyard-anime-violet-portrait.png?inline'

const artwork = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="900" viewBox="0 0 640 900">
  <rect width="640" height="900" fill="#191325"/>
  <circle cx="565" cy="260" r="245" fill="#6840c8"/>
  <circle cx="565" cy="260" r="185" fill="none" stroke="#c3a0fa" stroke-width="2"/>
  <text x="56" y="126" fill="#f9f1ff" font-family="Arial,sans-serif" font-size="26"
    font-weight="600" letter-spacing="5">DESIGN PORTFOLIO</text>
  <path d="M56 147H584" stroke="#ded0ed" stroke-opacity=".65" stroke-width="2"/>
  <image href="${character}" x="30" y="197" width="580" height="716.77"/>
</svg>`

export default `data:image/svg+xml;charset=utf-8,${encodeURIComponent(artwork)}`
