import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import './depth-card.css'

const DepthCard = ({
  children,
  href,
  target = '_self',
  className = '',
  ariaLabel,
  entrance,
  maxRotation = 7.5,
  maxTranslation = 10,
  spotlight = true,
  spotlightColor = 'rgba(247, 171, 84, 0.42)',
  imageSelector = '.project-art img',
}) => {
  const cardRef = useRef(null)
  const innerRef = useRef(null)
  const imageRef = useRef(null)
  const spotlightRef = useRef(null)
  const rafRef = useRef(0)
  const [isHovered, setIsHovered] = useState(false)
  const disabledRef = useRef(false)
  const targetRef = useRef({ x: 0, y: 0, rotateX: 0, rotateY: 0 })
  const currentRef = useRef({ x: 0, y: 0, rotateX: 0, rotateY: 0 })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const updateMotion = () => { disabledRef.current = mediaQuery.matches || window.innerWidth < 700 }
    updateMotion()
    mediaQuery.addEventListener('change', updateMotion)
    window.addEventListener('resize', updateMotion)
    imageRef.current = innerRef.current?.querySelector(imageSelector) ?? null

    const lerp = (start, end, factor) => start + (end - start) * factor
    const animate = () => {
      const target = targetRef.current
      const current = currentRef.current
      current.x = lerp(current.x, target.x, 0.11)
      current.y = lerp(current.y, target.y, 0.11)
      current.rotateX = lerp(current.rotateX, target.rotateX, 0.11)
      current.rotateY = lerp(current.rotateY, target.rotateY, 0.11)

      if (innerRef.current) {
        innerRef.current.style.transform = `rotateX(${current.rotateX}deg) rotateY(${current.rotateY}deg)`
      }
      if (imageRef.current) {
        imageRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 28px) scale(1.08)`
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      mediaQuery.removeEventListener('change', updateMotion)
      window.removeEventListener('resize', updateMotion)
    }
  }, [imageSelector])

  const handlePointerMove = useCallback((event) => {
    if (!cardRef.current || disabledRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const percentX = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const percentY = ((event.clientY - rect.top) / rect.height) * 2 - 1
    targetRef.current = {
      x: percentX * -maxTranslation,
      y: percentY * -maxTranslation,
      rotateX: percentY * -maxRotation,
      rotateY: percentX * maxRotation,
    }

    if (spotlight && spotlightRef.current) {
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      spotlightRef.current.style.background = `radial-gradient(420px circle at ${x}px ${y}px, ${spotlightColor} 0%, rgba(255, 255, 255, 0.08) 35%, transparent 68%)`
    }
  }, [maxRotation, maxTranslation, spotlight, spotlightColor])

  const enter = useCallback(() => {
    setIsHovered(true)
    if (spotlightRef.current) spotlightRef.current.style.opacity = '1'
  }, [])

  const leave = useCallback(() => {
    setIsHovered(false)
    targetRef.current = { x: 0, y: 0, rotateX: 0, rotateY: 0 }
    if (spotlightRef.current) spotlightRef.current.style.opacity = '0'
  }, [])

  const Wrapper = href ? motion.a : motion.div

  return (
    <Wrapper
      {...entrance}
      ref={cardRef}
      className={`depth-card-wrapper ${className}`}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      onPointerMove={handlePointerMove}
      onPointerEnter={enter}
      onPointerLeave={leave}
      onFocus={enter}
      onBlur={leave}
    >
      <div ref={innerRef} className={`depth-card-surface ${isHovered ? 'is-hovered' : ''}`}>
        {children}
        {spotlight && <span ref={spotlightRef} className="depth-card-spotlight" aria-hidden="true" />}
      </div>
    </Wrapper>
  )
}

export default DepthCard
