import { useEffect, useRef } from 'react'
import { Renderer, Program, Mesh, Triangle } from 'ogl'

const PAD = 20
const VERTEX = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`

const FRAGMENT = `#version 300 es
precision highp float;
uniform vec2 uCenter;
uniform vec2 uHalfSize;
uniform float uRadius;
uniform float uAngle;
uniform float uPx;
uniform float uIntensity;
out vec4 fragColor;

float roundedRect(vec2 p, vec2 b, float r) {
  vec2 q = abs(p) - b + r;
  return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
}

void main() {
  vec2 p = gl_FragCoord.xy - uCenter;
  float d = roundedRect(p, uHalfSize, uRadius);
  vec2 light = vec2(cos(uAngle), sin(uAngle));
  float base = (1.0 - smoothstep(0.0, uPx, abs(d))) * 0.45;
  vec2 normal = normalize(p / (uHalfSize * uHalfSize) + 1e-6);
  float phi = acos(clamp(abs(dot(normal, light)), 0.0, 1.0));
  float rim = 1.0 - smoothstep(-0.523599, 0.872765, phi);
  float x = d / (uPx + 1e-6);
  float line = exp(-mix(1.0, 1.6, smoothstep(0.0, 1.5, x)) * x * x);
  float edgeClamp = 1.0 - smoothstep(0.5 * uPx, 3.0 * uPx, abs(d));
  float highlight = line * rim * edgeClamp * uIntensity;
  vec3 color = vec3(0.32) * base + vec3(1.0) * highlight;
  fragColor = vec4(color, clamp(base + highlight, 0.0, 1.0));
}`

export default function SpecularEdge({ targetRef }) {
  const effectRef = useRef(null)

  useEffect(() => {
    const target = targetRef.current
    const effect = effectRef.current
    if (!target || !effect) return
    const canvas = document.createElement('canvas')
    const contextOptions = { alpha: true, premultipliedAlpha: true, antialias: true, depth: false }
    if (!canvas.getContext('webgl2', contextOptions)) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const renderer = new Renderer({ canvas, dpr, ...contextOptions })
    const gl = renderer.gl
    gl.clearColor(0, 0, 0, 0)
    const geometry = new Triangle(gl)
    delete geometry.attributes.uv
    const program = new Program(gl, {
      vertex: VERTEX,
      fragment: FRAGMENT,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        uCenter: { value: [0, 0] },
        uHalfSize: { value: [1, 1] },
        uRadius: { value: 23 * dpr },
        uAngle: { value: 2.4 },
        uPx: { value: dpr },
        uIntensity: { value: 0 },
      },
    })
    const mesh = new Mesh(gl, { geometry, program })
    effect.appendChild(canvas)

    const resize = () => {
      const { width, height } = target.getBoundingClientRect()
      renderer.setSize(width + PAD * 2, height + PAD * 2)
      program.uniforms.uCenter.value = [(PAD + width / 2) * dpr, (PAD + height / 2) * dpr]
      program.uniforms.uHalfSize.value = [width * dpr / 2, height * dpr / 2]
      program.uniforms.uRadius.value = Math.min(parseFloat(getComputedStyle(target).borderRadius), height / 2) * dpr
    }
    const observer = new ResizeObserver(resize)
    observer.observe(target)
    resize()

    let pointerAngle = 2.4
    let proximity = 0
    let angle = 2.4
    let brightness = 0
    let lastTime = performance.now()
    let frame
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handlePointerMove = event => {
      const rect = target.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      const distance = Math.hypot(
        Math.max(rect.left - event.clientX, 0, event.clientX - rect.right),
        Math.max(rect.top - event.clientY, 0, event.clientY - rect.bottom),
      )
      if (distance === 0) {
        const x = (event.clientX - centerX) / (rect.width / 2)
        const y = (centerY - event.clientY) / (rect.height / 2)
        pointerAngle = Math.atan2(2 / rect.height, -2 / rect.width) + x * 0.3 + y * 0.15
      } else {
        pointerAngle = Math.atan2(centerY - event.clientY, event.clientX - centerX)
      }
      const amount = Math.max(0, 1 - distance / 250)
      proximity = amount * amount * (3 - 2 * amount)
    }
    const resetPointer = () => { proximity = 0 }
    const handlePointerOut = event => {
      if (!event.relatedTarget) resetPointer()
    }

    const update = now => {
      const delta = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      const difference = ((pointerAngle - angle + Math.PI * 3) % (Math.PI * 2)) - Math.PI
      angle += difference * (1 - Math.exp(-delta * 7))
      brightness += (proximity - brightness) * (1 - Math.exp(-delta * 8))
      program.uniforms.uAngle.value = reducedMotion.matches ? 2.4 : angle
      program.uniforms.uIntensity.value = reducedMotion.matches ? 0 : brightness
      renderer.render({ scene: mesh })
      frame = requestAnimationFrame(update)
    }
    const handleVisibility = () => {
      cancelAnimationFrame(frame)
      if (!document.hidden) {
        lastTime = performance.now()
        frame = requestAnimationFrame(update)
      }
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerout', handlePointerOut)
    window.addEventListener('blur', resetPointer)
    document.addEventListener('visibilitychange', handleVisibility)
    handleVisibility()

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerout', handlePointerOut)
      window.removeEventListener('blur', resetPointer)
      document.removeEventListener('visibilitychange', handleVisibility)
      geometry.remove()
      program.remove()
      canvas.remove()
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [targetRef])

  return <span ref={effectRef} className="specular-edge" aria-hidden="true" />
}
