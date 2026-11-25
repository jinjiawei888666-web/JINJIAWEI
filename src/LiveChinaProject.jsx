import { siteUrl } from './site-url.js'
import './snow-project.css'
import './live-china-project.css'
import PhoneScroll from './PhoneScroll.jsx'

const visualNotes = [
  ['01', '地域影像与场景叙事', '以草地、牛群、水面与远景天空构建产地语境。前景主体与开阔背景形成尺度对比，让地域特征成为第一层视觉信息，为“源头优选”的主题提供直观的场景支撑。'],
  ['02', '纵向层级与阅读动线', '顶部集中呈现品牌标识、栏目名与丰收季主题，中部由自然影像承接氛围。大尺度标题与细节文字拉开字级差，建立从栏目识别到地域体验的阅读顺序。'],
  ['03', '自然色彩与版面呼吸', '天空蓝、草原绿与白色文字形成清爽的色彩关系。利用天空的低信息密度区域安置标题，减少文字与主体影像的竞争，让画面兼具现场感与清晰度。'],
]
const scrollNotes = [
  ['01', '系列延展与地域切换', '手机中展示新疆站长图，作为“直播中国·丰收季”的系列延展。沿用栏目识别与主题字级，通过雪山、人物组合及地域内容切换站点叙事，与内蒙古海报共同呈现系列视觉的适配方式。'],
  ['02', '长图叙事与模块编排', '将主视觉、时间信息和直播流程沿纵向串联，形成逐屏展开的阅读节奏。流程内容以重复的模块结构组织，既保留统一性，也方便观众快速定位感兴趣的环节。'],
  ['03', '手机视口与连续浏览', '固定手机边框与灵动岛，将长图约束在屏幕区域内。通过拖拽、滚轮或触屏滑动逐段浏览，使作品的实际阅读尺度和上下文关系得到更直观的呈现。'],
]

export default function LiveChinaProject() {
  return <main className="snow-case live-china-case" id="case-top">
    <nav className="case-nav"><a href={siteUrl('/#works')}>← 返回精选项目</a><span>JIN JIAWEI / PROJECT 04</span><a href={siteUrl('/#contact')}>项目合作 ↗</a></nav>
    <header className="case-header"><p className="case-kicker">EDITORIAL DESIGN / CAMPAIGN SERIES</p><h1>直播中国<span>以产地风景，展开丰收叙事。</span></h1>
      <div className="case-summary"><p>围绕「直播中国·丰收季」，以自然影像、清晰字级与纵向信息编排，连接栏目识别与地域内容。这里展示内蒙古站宣传海报，并以新疆站长图演示系列视觉在手机端的连续阅读体验。</p><dl><div><dt>项目主题</dt><dd>直播中国 · 内蒙古丰收季</dd></div><div><dt>展示内容</dt><dd>宣传海报 / 系列长图 / 手机浏览演示</dd></div><div><dt>风格关键词</dt><dd>自然纪实 · 地域叙事 · 信息层级</dd></div></dl></div>
    </header>
    <section className="case-visual-grid" aria-labelledby="china-visual-title">
      <figure className="case-poster"><a href={siteUrl('/project-04-live-china.jpg')} target="_blank" rel="noopener noreferrer" aria-label="查看直播中国内蒙古海报原图（新标签页）"><img src={siteUrl('/project-04-live-china.jpg')} alt="直播中国内蒙古丰收季海报，蓝天草原中的牛群与水面倒影" /></a><figcaption>01 / KEY VISUAL — 内蒙古站宣传海报 · 点击查看原图 ↗</figcaption></figure>
      <div className="case-notes"><p className="case-kicker">VISUAL DIRECTION</p><h2 id="china-visual-title">让地域成为语言，<br/>让风景承载主题。</h2><p className="case-lead">将自然影像转化为栏目叙事的一部分，在品牌识别与产地氛围之间建立平衡。</p>
        {visualNotes.map(([number, title, description]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}
        <section className="case-type" aria-labelledby="china-type-title"><div><p className="case-kicker">TYPOGRAPHY & COLOR</p><h2 id="china-type-title">让标题清晰，<br/>让自然有层次。</h2></div><div><h3>大字识别 × 自然影像留白</h3><p>白色栏目字与蓝色天空构成鲜明对比，主题副标题补充内容层级。以自然影像中的蓝绿关系统一基调，通过疏密变化与文字尺度控制，让画面在移动端仍具备明确的视觉重心。</p><div className="case-palette"><span>天空蓝</span><span>草原绿</span><span>云白</span></div><small>色彩关系示意 / 基于作品画面提炼</small></div></section>
      </div>
    </section>
    <section className="case-live" aria-labelledby="china-scroll-title"><div className="case-live-copy"><p className="case-kicker">CAMPAIGN EXTENSIONS</p><h2 id="china-scroll-title">活动延展海报展示</h2><p className="case-lead">在手机内上下滑动，查看完整的系列长图设计。</p>
      {scrollNotes.map(([number, title, description]) => <article key={number}><h3>{number} / {title}</h3><p>{description}</p></article>)}
      <a className="case-material-link" href={siteUrl('/live-china-scroll-content.jpg')} target="_blank" rel="noopener noreferrer">查看完整长图 ↗</a>
    </div><PhoneScroll /></section>
    <footer className="case-footer"><p>以统一的视觉语言，呈现不同产地的风景。</p><a href={siteUrl('/#works')}>返回全部作品 ↗</a><a href="#case-top">回到顶部 ↑</a></footer>
  </main>
}
