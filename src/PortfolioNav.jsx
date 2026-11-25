import { useEffect, useRef, useState } from 'react'
import SpecularEdge from './SpecularEdge.jsx'
import GooeyNav from './GooeyNav.jsx'
import './portfolio-nav.css'

const links = [
  { id: 'top', title: '首页', english: 'HOME' },
  { id: 'about', title: '个人介绍', english: 'PROFILE' },
  { id: 'works', title: '精选项目', english: 'SELECTED PROJECTS' },
  { id: 'expertise', title: '更多作品', english: 'MORE WORKS' },
  { id: 'contact', title: '联系我', english: 'CONTACT' },
]

const items = links.map(({ id, title, english }) => ({
  href: `#${id}`,
  label: <>
    <span className="portfolio-navigation-title">{title}</span>
    <span className="portfolio-navigation-english" lang="en">{english}</span>
  </>,
}))

export default function PortfolioNav() {
  const [activeSection, setActiveSection] = useState('top')
  const [scrollProgress, setScrollProgress] = useState(null)
  const navRef = useRef(null)
  const navigationRef = useRef(null)
  const scrollFrameRef = useRef(null)

  const navigate = (index, item, event) => {
    event?.preventDefault()
    cancelAnimationFrame(scrollFrameRef.current)
    const id = links[index].id
    const section = document.getElementById(id)
    const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0
    const maximum = document.documentElement.scrollHeight - window.innerHeight
    const destination = Math.min(maximum, Math.max(0, window.scrollY + section.getBoundingClientRect().top - margin))
    const arrived = Math.abs(destination - window.scrollY) < 2
    navigationRef.current = arrived ? null : { start: window.scrollY, destination }
    setScrollProgress(arrived ? 1 : 0)
    setActiveSection(id)
    window.history.pushState(null, '', item.href)
    if (arrived) return
    const start = window.scrollY
    const distance = destination - start
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = reducedMotion ? 0 : Math.min(1000, Math.max(360, Math.sqrt(Math.abs(distance)) * 14))
    let startTime
    const scroll = time => {
      startTime ??= time
      const elapsed = duration === 0 ? 1 : Math.min(1, (time - startTime) / duration)
      const progress = elapsed < 0.5 ? 4 * elapsed ** 3 : 1 - (-2 * elapsed + 2) ** 3 / 2
      window.scrollTo({ top: start + distance * progress, behavior: 'instant' })
      setScrollProgress(progress)
      if (elapsed < 1) scrollFrameRef.current = requestAnimationFrame(scroll)
      else {
        navigationRef.current = null
        scrollFrameRef.current = null
        setScrollProgress(1)
      }
    }
    scrollFrameRef.current = requestAnimationFrame(scroll)
  }

  useEffect(() => {
    let frame
    const updateActiveSection = () => {
      const navigation = navigationRef.current
      if (navigation) return
      const readingLine = Math.min(180, window.innerHeight * 0.3)
      const currentSection = links.findLast(({ id }) =>
        document.getElementById(id).getBoundingClientRect().top <= readingLine
      )
      setActiveSection(currentSection?.id || 'top')
    }
    const scheduleUpdate = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActiveSection)
    }
    const interruptNavigation = () => {
      if (!navigationRef.current) return
      cancelAnimationFrame(scrollFrameRef.current)
      scrollFrameRef.current = null
      navigationRef.current = null
      setScrollProgress(1)
      scheduleUpdate()
    }
    const handleKeyDown = event => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) interruptNavigation()
    }

    updateActiveSection()
    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('resize', scheduleUpdate)
    window.addEventListener('wheel', interruptNavigation, { passive: true })
    window.addEventListener('touchstart', interruptNavigation, { passive: true })
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      cancelAnimationFrame(scrollFrameRef.current)
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('resize', scheduleUpdate)
      window.removeEventListener('wheel', interruptNavigation)
      window.removeEventListener('touchstart', interruptNavigation)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return <div className="portfolio-navigation-slot">
    <GooeyNav
      navRef={navRef}
      ariaLabel="作品集导航"
      className="portfolio-navigation"
      items={items}
      initialActiveIndex={0}
      activeIndex={links.findIndex(({ id }) => id === activeSection)}
      onChange={navigate}
      scrollProgress={scrollProgress}
      theme="dark"
      size="md"
      frame={true}
      particleCount={8}
      spread={28}
      animationTime={520}
      timeVariance={300}
      gooeyness={0.5}
      wobble={0.2}
      hoverEffect={true}
    >
      <SpecularEdge targetRef={navRef} />
    </GooeyNav>
  </div>
}
