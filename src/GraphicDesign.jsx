import { siteUrl } from './site-url.js'
import PhoneScroll from './PhoneScroll.jsx'
import './snow-project.css'
import './live-china-project.css'
import './graphic-design.css'

const posters = [
  ['graphic-tanboer-snow.png', '坦博尔 · 与雪共舞 雪舞山巅', 'CAMPAIGN VISUAL'],
  ['graphic-iqoo-618-tall.png', 'iQOO · 超值618', 'PRODUCT CAMPAIGN'],
  ['graphic-tmall-expo.jpg', '天猫双11 · 卖空进博会', 'CAMPAIGN VISUAL'],
  ['graphic-tmall-hotpot.png', '天猫双11 · 卖空火锅清单', 'CAMPAIGN VISUAL'],
]
const mobileWorks = [
  ['直播中国 · 丰收季新疆站', siteUrl('/live-china-scroll-content.jpg')],
  ['天猫双11 · 卖空火锅清单', siteUrl('/graphic-scroll-2.jpg')],
  ['天猫双11 · 卖空皮草秀场', siteUrl('/graphic-scroll-3.jpg')],
]

export default function GraphicDesign() {
  return <main className="snow-case graphic-design" id="graphic-top">
    <nav className="case-nav"><a href={siteUrl('/#expertise')}>← 返回设计实践</a><span>JIN JIAWEI / GRAPHIC DESIGN</span><a href={siteUrl('/#works')}>精选项目 ↗</a></nav>
    <header className="case-header"><p className="case-kicker">01 — GRAPHIC DESIGN</p><h1>平面设计<span>从主题主视觉，到移动端长图。</span></h1><p className="case-lead">品牌活动、产品传播与直播预热中的视觉表达。</p></header>
    <section aria-labelledby="graphic-posters-title"><div className="graphic-section-head"><h2 id="graphic-posters-title">海报与主视觉</h2><span>01 / POSTERS & KEY VISUALS</span></div>
      <div className="graphic-poster-grid">{posters.map(([file, title, type, layout], index) => <figure className={layout || ''} key={file}>
        <a className="graphic-poster-link" href={siteUrl(`${file}`)} target="_blank" rel="noopener noreferrer" aria-label={`查看${title}原图（新标签页）`}><img src={siteUrl(`${file}`)} alt={title} loading="lazy" /></a>
        <figcaption><span>{String(index + 1).padStart(2, '0')} / {type}</span><h3>{title}</h3><a href={siteUrl(`${file}`)} target="_blank" rel="noopener noreferrer">查看原图 ↗</a></figcaption>
      </figure>)}</div>
    </section>
    <section className="graphic-mobile" aria-labelledby="graphic-mobile-title"><div className="graphic-section-head"><div><p className="case-kicker">02 / MOBILE POSTERS</p><h2 id="graphic-mobile-title">活动延展海报展示</h2></div><p>在手机画面内上下拖拽或滚动，<br/>查看完整长图。</p></div>
      <div className="graphic-phone-grid">{mobileWorks.map(([title, src], index) => <article key={src}><header><span>0{index + 1}</span><h3>{title}</h3></header><PhoneScroll src={src} label={title} alt={`${title}活动长图海报`} /></article>)}</div>
    </section>
    <footer className="case-footer"><p>GRAPHIC DESIGN / SELECTED WORKS</p><a href={siteUrl('/#expertise')}>返回设计实践 ↗</a><a href="#graphic-top">回到顶部 ↑</a></footer>
  </main>
}
