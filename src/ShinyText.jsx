import { useEffect, useRef, useState } from 'react'
import { motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useTransform } from 'motion/react'
import './shiny-text.css'

export default function ShinyText({
  text,
  disabled = false,
  speed = 2,
  className = '',
  color = '#b5b5b5',
  shineColor = '#ffffff',
  spread = 120,
  yoyo = false,
  pauseOnHover = false,
  direction = 'left',
  delay = 0,
}) {
  const ref = useRef(null)
  const inView = useInView(ref)
  const reducedMotion = useReducedMotion()
  const [isPaused, setIsPaused] = useState(false)
  const progress = useMotionValue(direction === 'left' ? 0 : 100)
  const elapsedRef = useRef(0)
  const lastTimeRef = useRef(null)
  const duration = Math.max(0.01, speed) * 1000
  const cycleDuration = duration + Math.max(0, delay) * 1000

  useAnimationFrame(time => {
    if (disabled || isPaused || reducedMotion || !inView) {
      lastTimeRef.current = null
      return
    }
    if (lastTimeRef.current === null) {
      lastTimeRef.current = time
      return
    }
    elapsedRef.current += time - lastTimeRef.current
    lastTimeRef.current = time
    const cycle = Math.floor(elapsedRef.current / cycleDuration)
    const cycleTime = elapsedRef.current % cycleDuration
    let position = Math.min(cycleTime / duration, 1) * 100
    if (yoyo && cycle % 2 === 1) position = 100 - position
    progress.set(direction === 'left' ? position : 100 - position)
  })

  useEffect(() => {
    elapsedRef.current = 0
    lastTimeRef.current = null
    progress.set(direction === 'left' ? 0 : 100)
  }, [direction, speed, delay, yoyo, progress])

  const backgroundPosition = useTransform(progress, value => `${150 - value * 2}% center`)

  return <motion.span
    ref={ref}
    className={`shiny-text ${className}`}
    style={{
      color,
      backgroundImage: `linear-gradient(${spread}deg, ${color} 0%, ${color} 35%, ${shineColor} 50%, ${color} 65%, ${color} 100%)`,
      backgroundPosition,
    }}
    onMouseEnter={() => { if (pauseOnHover) setIsPaused(true) }}
    onMouseLeave={() => setIsPaused(false)}
  >{text}</motion.span>
}
