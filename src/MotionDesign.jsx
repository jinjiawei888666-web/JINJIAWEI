import { siteUrl } from './site-url.js'
import { useState } from 'react'
import './snow-project.css'
import './motion-design.css'

const clips = ['C0160_00026056', 'C0154_00025284', 'C0156_00025548']

function MotionClip({ name, index }) {
  const [failed, setFailed] = useState(false)
  const src = siteUrl(`motion-0${index + 1}.mov`)
  return <figure>
    <video controls playsInline preload="metadata" aria-label={`动态影像作品 ${index + 1}：${name}`} onError={() => setFailed(true)} onPlay={event => {
      // Keep sound and playback focused on the selected work.
      event.currentTarget.closest('section').querySelectorAll('video').forEach(video => { if (video !== event.currentTarget) video.pause() })
    }}><source src={src} />你的浏览器暂不支持此视频，可通过下方链接打开原片。</video>
    <figcaption><span>0{index + 1} / MOTION STUDY</span><h3>动态影像 0{index + 1}</h3><p>{name}</p>{failed && <p className="motion-error">当前浏览器无法播放此格式，请下载原片查看。</p>}<a href={src} download={`${name}.mov`}>下载原片 ↗</a></figcaption>
  </figure>
}

export default function MotionDesign() {
  return <main className="snow-case motion-design" id="motion-top">
    <nav className="case-nav"><a href={siteUrl('/#expertise')}>← 返回设计实践</a><span>JIN JIAWEI / IMAGE & MOTION</span><a href={siteUrl('/#works')}>精选项目 ↗</a></nav>
    <header className="case-header"><p className="case-kicker">03 — IMAGE & MOTION</p><h1>影像表达<span>以动态画面，延展视觉叙事。</span></h1><p className="case-lead">点击播放，观看动态影像作品。支持暂停、进度调节与全屏浏览。</p></header>
    <section aria-labelledby="motion-works-title"><div className="motion-section-head"><h2 id="motion-works-title">动态影像</h2><span>SELECTED MOTION / 03</span></div><div className="motion-grid">{clips.map((name, index) => <MotionClip name={name} index={index} key={name} />)}</div></section>
    <footer className="case-footer"><p>IMAGE & MOTION / SELECTED WORKS</p><a href={siteUrl('/#expertise')}>返回设计实践 ↗</a><a href="#motion-top">回到顶部 ↑</a></footer>
  </main>
}
