import { siteUrl } from './site-url.js'
import { useId, useRef, useState } from 'react'

export default function PhoneScroll({ src = siteUrl('/live-china-scroll-content.jpg'), label = '直播中国长图', alt = '直播中国丰收季新疆站长图，包含主题主视觉、直播时间、嘉宾与七项直播内容安排' }) {
  const instructionsId = useId()
  const screen = useRef(null)
  const gesture = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [progress, setProgress] = useState(0)

  function startDrag(event) {
    // Touch uses native scrolling; pointer capture keeps mouse dragging continuous.
    if (event.pointerType === 'touch' || event.button !== 0) return
    gesture.current = { y: event.clientY, scroll: event.currentTarget.scrollTop }
    event.currentTarget.setPointerCapture(event.pointerId)
    event.currentTarget.focus({ preventScroll: true })
    setDragging(true)
    event.preventDefault()
  }

  function endDrag(event) {
    gesture.current = null
    setDragging(false)
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return <figure className="phone-demo">
    <div className="phone-mockup">
      <div ref={screen} className={`phone-screen${dragging ? ' is-dragging' : ''}`} tabIndex={0} role="region" aria-label={`${label}，可上下拖拽、滚轮或方向键浏览`} aria-describedby={instructionsId}
        onPointerDown={startDrag}
        onPointerMove={event => {
          if (gesture.current) event.currentTarget.scrollTop = gesture.current.scroll + gesture.current.y - event.clientY
        }}
        onPointerUp={endDrag} onPointerCancel={endDrag} onLostPointerCapture={() => { gesture.current = null; setDragging(false) }}
        onScroll={event => {
          const element = event.currentTarget
          setProgress(Math.round(element.scrollTop / Math.max(1, element.scrollHeight - element.clientHeight) * 100))
        }}>
        <img src={src} alt={alt} draggable={false} loading="lazy" />
      </div>
      <img className="phone-frame" src={siteUrl('/live-china-phone-frame.png')} alt="" aria-hidden="true" draggable={false} />
    </div>
    <figcaption id={instructionsId} className="phone-scroll-hint"><span aria-hidden="true">↕</span><div><strong>上下拖拽 · 滚动浏览</strong><small>在手机画面内操作，查看完整海报</small></div></figcaption>
    <div className="phone-controls"><span>浏览进度 {progress}%</span><button type="button" onClick={() => screen.current?.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>回到开头 ↑</button></div>
    <div className="phone-progress" aria-hidden="true"><span style={{ width: `${progress}%` }} /></div>
  </figure>
}
