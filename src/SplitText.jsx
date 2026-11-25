import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText as GSAPSplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import './split-text.css'

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP)

export default function SplitText({ tag: Tag = 'h2', className = '', children, ...props }) {
  const ref = useRef(null)
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    let mounted = true
    document.fonts.ready.then(() => {
      if (mounted) setFontsLoaded(true)
    })
    return () => { mounted = false }
  }, [])

  useGSAP(() => {
    if (!fontsLoaded) return
    const media = gsap.matchMedia()
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const split = new GSAPSplitText(ref.current, {
        type: 'chars',
        smartWrap: true,
        charsClass: 'split-char',
        ignore: '.split-ignore',
      })
      const animation = gsap.fromTo(split.chars, { opacity: 0, y: 40 }, {
        opacity: 1,
        y: 0,
        duration: 1.25,
        ease: 'power3.out',
        stagger: 0.05,
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 90%-=100px',
          once: true,
          fastScrollEnd: true,
        },
        force3D: true,
        clearProps: 'transform,opacity',
      })
      return () => {
        animation.scrollTrigger?.kill()
        animation.revert()
        split.revert()
      }
    })
    return () => media.revert()
  }, { scope: ref, dependencies: [fontsLoaded] })

  return <Tag ref={ref} className={`split-parent ${className}`} {...props}>{children}</Tag>
}
