import { useEffect, useRef, useState } from 'react'
import './vapor-type.css'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

const VaporType = ({
  words = ['Imagine'],
  color = 'currentColor',
  vaporColor = '#8b7cff',
  density = 1,
  particleSize = 1.35,
  spread = 1.1,
  rise = 0.75,
  turbulence = 0.85,
  sweep = 'left',
  condense = 1.8,
  startOnView = true,
  className = '',
}) => {
  const hostRef = useRef(null)
  const canvasRef = useRef(null)
  const rafRef = useRef(0)
  const [reducedMotion, setReducedMotion] = useState(false)
  const text = words.map((word) => word.trim()).filter(Boolean)[0] || 'Imagine'

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReducedMotion(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (reducedMotion) return undefined
    const host = hostRef.current
    const canvas = canvasRef.current
    if (!host || !canvas) return undefined

    const context = canvas.getContext('2d')
    if (!context) return undefined

    let particles = []
    let started = false
    let finished = false
    let startTime = 0
    let bleed = 0
    let width = 0
    let height = 0
    let dpr = 1
    let fontSize = 16
    let lineHeight = 18
    let letterSpacing = 0
    let font = ''
    let resolvedColor = '#ffffff'

    const drawLine = (ctx, line, centerX, baseline) => {
      const glyphs = Array.from(line)
      const widths = glyphs.map((glyph) => ctx.measureText(glyph).width)
      const total = widths.reduce((sum, value) => sum + value, 0) + Math.max(0, glyphs.length - 1) * letterSpacing
      let x = centerX - total / 2
      glyphs.forEach((glyph, index) => {
        ctx.fillText(glyph, x, baseline)
        x += widths[index] + letterSpacing
      })
    }

    const drawText = (ctx, offsetX, offsetY, fill) => {
      const lines = text.split('\n')
      const totalHeight = lineHeight * lines.length
      const firstBaseline = offsetY + (height - totalHeight) / 2 + fontSize * 0.82
      ctx.font = font
      ctx.textAlign = 'left'
      ctx.textBaseline = 'alphabetic'
      ctx.fillStyle = fill
      lines.forEach((line, index) => drawLine(ctx, line, offsetX + width / 2, firstBaseline + index * lineHeight))
    }

    const makeParticles = () => {
      const sample = document.createElement('canvas')
      sample.width = Math.max(1, Math.ceil(width))
      sample.height = Math.max(1, Math.ceil(height))
      const sampleContext = sample.getContext('2d', { willReadFrequently: true })
      if (!sampleContext) return []
      sampleContext.clearRect(0, 0, width, height)
      drawText(sampleContext, 0, 0, '#ffffff')
      const pixels = sampleContext.getImageData(0, 0, sample.width, sample.height).data
      const step = Math.max(3, Math.round(5 / Math.max(0.45, density)))
      const points = []

      for (let y = 0; y < sample.height; y += step) {
        for (let x = 0; x < sample.width; x += step) {
          if (pixels[(y * sample.width + x) * 4 + 3] < 80) continue
          const seed = Math.random()
          const order = sweep === 'right' ? 1 - x / width : sweep === 'center' ? Math.abs(x / width - 0.5) * 2 : sweep === 'top' ? y / height : sweep === 'scatter' ? seed : x / width
          const angle = Math.random() * Math.PI * 2
          const distance = fontSize * spread * (0.35 + Math.random() * 0.9)
          points.push({
            tx: x + bleed,
            ty: y + bleed,
            sx: x + bleed + Math.cos(angle) * distance,
            sy: y + bleed + Math.sin(angle) * distance + fontSize * rise,
            seed,
            delay: clamp(order * 0.38 + Math.random() * 0.16, 0, 0.58),
          })
        }
      }
      return points
    }

    const layout = () => {
      const rect = host.getBoundingClientRect()
      const style = getComputedStyle(host)
      width = Math.max(1, rect.width)
      height = Math.max(1, rect.height)
      fontSize = Number.parseFloat(style.fontSize) || 16
      lineHeight = Number.parseFloat(style.lineHeight) || fontSize * 1.06
      letterSpacing = Number.parseFloat(style.letterSpacing) || 0
      font = `${style.fontStyle} ${style.fontWeight} ${fontSize}px ${style.fontFamily}`
      resolvedColor = color === 'currentColor' ? style.color : color
      bleed = fontSize * 0.48
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      const fullWidth = width + bleed * 2
      const fullHeight = height + bleed * 2
      canvas.width = Math.ceil(fullWidth * dpr)
      canvas.height = Math.ceil(fullHeight * dpr)
      canvas.style.width = `${fullWidth}px`
      canvas.style.height = `${fullHeight}px`
      canvas.style.left = `${-bleed}px`
      canvas.style.top = `${-bleed}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = makeParticles()
      if (finished) {
        context.clearRect(0, 0, fullWidth, fullHeight)
        drawText(context, bleed, bleed, resolvedColor)
      }
    }

    const render = (now) => {
      const duration = Math.max(0.5, condense) * 1000
      const progress = clamp((now - startTime) / duration, 0, 1)
      context.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr)
      context.fillStyle = vaporColor

      particles.forEach((particle) => {
        const local = clamp((progress - particle.delay) / Math.max(0.001, 1 - particle.delay), 0, 1)
        if (local <= 0) return
        const eased = 1 - Math.pow(1 - local, 3)
        const vapor = 1 - eased
        const wobble = Math.sin(particle.seed * 40 + local * 11) * fontSize * 0.055 * turbulence * vapor
        const x = particle.sx + (particle.tx - particle.sx) * eased + wobble
        const y = particle.sy + (particle.ty - particle.sy) * eased - vapor * fontSize * rise * 0.18
        context.globalAlpha = clamp(local * 1.8, 0, 1) * (0.56 + particle.seed * 0.44)
        context.beginPath()
        context.arc(x, y, Math.max(0.65, particleSize * (0.7 + particle.seed * 0.55)), 0, Math.PI * 2)
        context.fill()
      })

      const textAlpha = clamp((progress - 0.68) / 0.32, 0, 1)
      if (textAlpha > 0) {
        context.globalAlpha = textAlpha
        drawText(context, bleed, bleed, resolvedColor)
      }
      context.globalAlpha = 1

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(render)
      } else {
        finished = true
      }
    }

    const start = () => {
      if (started) return
      started = true
      startTime = performance.now()
      rafRef.current = requestAnimationFrame(render)
    }

    layout()
    const resizeObserver = new ResizeObserver(layout)
    resizeObserver.observe(host)
    const observer = startOnView
      ? new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            start()
            observer.disconnect()
          }
        }, { threshold: 0.28, rootMargin: '40px' })
      : null

    if (observer) observer.observe(host)
    else start()

    return () => {
      cancelAnimationFrame(rafRef.current)
      resizeObserver.disconnect()
      observer?.disconnect()
    }
  }, [color, condense, density, particleSize, reducedMotion, rise, spread, startOnView, sweep, text, turbulence, vaporColor])

  return (
    <span ref={hostRef} className={`vapor-type ${className}`}>
      <span className="vapor-type-sr-only">{text}</span>
      <span className="vapor-type-sizer" aria-hidden="true">{text}</span>
      {!reducedMotion && <canvas ref={canvasRef} className="vapor-type-canvas" aria-hidden="true" />}
    </span>
  )
}

export default VaporType
