import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './perspective-grid.css'

const PerspectiveGrid = ({
  width = '100%',
  height = 400,
  speed = 0.5,
  color = '#FF9FFC',
  gridScale = 1,
  lineThickness = 1,
  antialiasQuality = 64,
  autoPlay = true,
  opacity = 1,
  fadeSmoothness = 1,
  perspective = 0,
  gridLength = 10,
  curve = 0,
  bottomFade = '#0a0a0a',
  className = '',
  children,
}) => {
  const containerRef = useRef(null)
  const rafRef = useRef(0)
  const startTimeRef = useRef(0)
  const isPausedRef = useRef(!autoPlay)

  useEffect(() => {
    if (!containerRef.current) return undefined

    const container = containerRef.current
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result
        ? {
            r: parseInt(result[1], 16) / 255,
            g: parseInt(result[2], 16) / 255,
            b: parseInt(result[3], 16) / 255,
          }
        : { r: 1, g: 0.62, b: 0.98 }
    }

    const rgb = hexToRgb(color)
    const rect = container.getBoundingClientRect()
    const actualWidth = Math.max(1, rect.width)
    const actualHeight = Math.max(1, rect.height)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setClearColor(0x000000, 0)
    const pixelRatio = Math.min(window.devicePixelRatio, 2)
    renderer.setSize(actualWidth, actualHeight, false)
    renderer.setPixelRatio(pixelRatio)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector3(actualWidth * pixelRatio, actualHeight * pixelRatio, 1) },
      uColor: { value: new THREE.Vector3(rgb.r, rgb.g, rgb.b) },
      uGridScale: { value: gridScale },
      uLineThickness: { value: lineThickness },
      uAntialiasQuality: { value: antialiasQuality },
      uOpacity: { value: opacity },
      uFadeSmoothness: { value: fadeSmoothness },
      uPerspective: { value: perspective },
      uGridLength: { value: gridLength },
      uCurve: { value: curve },
    }

    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;
        uniform vec3 uColor;
        uniform float uGridScale;
        uniform float uLineThickness;
        uniform float uAntialiasQuality;
        uniform float uOpacity;
        uniform float uFadeSmoothness;
        uniform float uPerspective;
        uniform float uGridLength;
        uniform float uCurve;

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
          vec2 uv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
          if (uv.y > 0.0) {
            fragColor = vec4(0.0);
            return;
          }

          uv.y = -uv.y;
          float perspectiveRad = radians(uPerspective);
          float cosP = cos(perspectiveRad);
          float sinP = sin(perspectiveRad);
          float uvYRotated = max(uv.y * cosP, 0.001);
          float depthAdjust = uv.y * sinP;
          float d = min((1.0 / abs(uvYRotated)) * (1.0 + depthAdjust), uGridLength);
          vec2 pv = vec2(uv.x * d, d);

          if (uCurve > 0.0) {
            float curveAmount = uCurve * (1.0 - uvYRotated);
            pv.x += sign(pv.x) * pow(abs(pv.x), 1.0 + curveAmount * 0.3) * curveAmount * 0.2;
          }

          pv.y += iTime;
          pv *= uGridScale;
          vec2 grid = fract(pv);
          vec2 derivative = fwidth(pv);
          vec2 gridDist = min(grid, 1.0 - grid);
          vec2 aa = derivative * (1.0 + uLineThickness * 2.0);
          vec2 gridAA = smoothstep(aa, vec2(0.0), gridDist);
          float gridPattern = max(gridAA.x, gridAA.y);
          float fadeFactor = smoothstep(0.0, 0.4, uv.y) * smoothstep(uGridLength, 2.0, d);
          float alpha = gridPattern * fadeFactor * uOpacity;
          alpha = smoothstep(0.15, 0.15 + uFadeSmoothness, alpha);
          alpha *= alpha;

          if (alpha < 0.05) {
            fragColor = vec4(0.0);
          } else {
            fragColor = vec4(uColor * alpha, alpha);
          }
        }

        void main() {
          vec4 color = vec4(0.0);
          mainImage(color, gl_FragCoord.xy);
          gl_FragColor = color;
        }
      `,
      transparent: true,
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneFactor,
      blendDst: THREE.OneMinusSrcAlphaFactor,
      depthTest: false,
      depthWrite: false,
      premultipliedAlpha: true,
    })

    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    startTimeRef.current = performance.now()

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate)
      if (!isPausedRef.current) uniforms.iTime.value = ((performance.now() - startTimeRef.current) / 1000) * speed
      renderer.render(scene, camera)
    }
    animate()

    const handleResize = () => {
      const newRect = container.getBoundingClientRect()
      const newWidth = Math.max(1, newRect.width)
      const newHeight = Math.max(1, newRect.height)
      renderer.setSize(newWidth, newHeight, false)
      uniforms.iResolution.value.set(newWidth * pixelRatio, newHeight * pixelRatio, 1)
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(rafRef.current)
      scene.remove(mesh)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
      if (renderer.domElement.parentNode === container) container.removeChild(renderer.domElement)
    }
  }, [speed, color, gridScale, lineThickness, antialiasQuality, autoPlay, opacity, fadeSmoothness, perspective, gridLength, curve])

  const widthStyle = typeof width === 'number' ? `${width}px` : width
  const heightStyle = typeof height === 'number' ? `${height}px` : height

  return (
    <div className={`perspective-grid-container ${className}`} style={{ width: widthStyle, height: heightStyle }}>
      <div ref={containerRef} className="perspective-grid-canvas" />
      {bottomFade && <div className="perspective-grid-bottom-fade" style={{ background: `linear-gradient(to top, ${bottomFade}, transparent)` }} />}
      {children && <div className="perspective-grid-content">{children}</div>}
    </div>
  )
}

export default PerspectiveGrid
