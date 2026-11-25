import { siteUrl, sitePathname } from './site-url.js'
import { StrictMode, useRef } from 'react'
import { createRoot } from 'react-dom/client'
import { motion, useReducedMotion } from 'motion/react'
import './styles.css'
import './hero.css'
import './theme.css'
import './works.css'
import SnowProject from './SnowProject.jsx'
import IqooProject from './IqooProject.jsx'
import NarakaProject from './NarakaProject.jsx'
import LiveChinaProject from './LiveChinaProject.jsx'
import GraphicDesign from './GraphicDesign.jsx'
import StageDesign from './StageDesign.jsx'
import MotionDesign from './MotionDesign.jsx'
import PortfolioNav from './PortfolioNav.jsx'
import ShinyText from './ShinyText.jsx'
import SplitText from './SplitText.jsx'
import PerspectiveGrid from './PerspectiveGrid.jsx'
import Grainient from './Grainient.jsx'
import Lanyard from './Lanyard.jsx'
import lanyardFace from './lanyard-face.js'
import DepthCard from './DepthCard.jsx'
import BorderGlow from './BorderGlow.jsx'
import VaporType from './VaporType.jsx'
import './contact-galaxy.css'

const projects = [
  { number: '01', type: 'Campaign Visual', title: '天猫双11 · 卖空雪场', tone: 'snow', image: siteUrl('/project-01-snow-campaign.png'), href: siteUrl('/projects/snow/') },
  { number: '02', type: 'Campaign Visual', title: 'iQOO·北京大学场', tone: 'iqoo', image: siteUrl('/project-iqoo-peking-university.jpg'), href: siteUrl('/projects/iqoo/') },
  { number: '03', type: 'Gaming Visual', title: '永劫无间 · 咏武斗剑大会', tone: 'naraka', image: siteUrl('/project-naraka-portrait.jpg'), href: siteUrl('/projects/naraka/') },
  { number: '04', type: 'Editorial Design', title: '直播中国 · 内蒙古丰收季', tone: 'grassland', image: siteUrl('/project-04-live-china.jpg'), href: siteUrl('/projects/live-china/') },
]

const strengths = [
  ['01', '平面设计', '专注于品牌、海报与印刷物的系统化视觉表达。', 'graphic', 'GRAPHIC DESIGN'],
  ['02', '舞美设计', '理解空间、舞台与观众视线之间的现场关系。', 'stage', 'STAGE DESIGN'],
  ['03', '影像表达', '以摄影、剪辑和动态视觉延展设计的叙事边界。', 'motion', 'IMAGE & MOTION'],
]

const revealViewport = { once: true, amount: 0.18 }

function reveal(offset, delay = 0, duration = 0.5) {
  return {
    initial: { opacity: 0, y: offset },
    whileInView: { opacity: 1, y: 0 },
    viewport: revealViewport,
    transition: { duration, delay, ease: 'easeOut' },
  }
}

function App() {
  const reduceMotion = useReducedMotion()
  const heroTitle = useRef(null)
  const pathname = sitePathname(window.location.pathname)
  if (pathname === '/expertise/motion') return <MotionDesign />
  if (pathname === '/expertise/stage') return <StageDesign />
  if (pathname === '/expertise/graphic') return <GraphicDesign />
  const category = strengths.find(([, , , slug]) => pathname === `/expertise/${slug}`)
  if (category) return <main className="expertise-page shell"><nav><a href={siteUrl('/#expertise')}>← 返回设计实践</a><span>JIN JIAWEI / {category[4]}</span></nav><header><p className="section-label">{category[0]} — {category[4]}</p><h1>{category[1]}</h1><p>{category[2]}</p></header><div className="expertise-empty"><p>作品内容即将更新</p></div><a className="expertise-back" href={siteUrl('/#works')}>浏览精选项目 ↗</a></main>
  if (pathname === '/projects/live-china') return <LiveChinaProject />
  if (pathname === '/projects/snow') return <SnowProject />
  if (pathname === '/projects/iqoo') return <IqooProject />
  if (pathname === '/projects/naraka') return <NarakaProject />
  return <main>
    <section className="hero" id="top">
      <div className="hero-panel shell">
        <Grainient color1="#7e4b8a" color2="#0c076a" color3="#b497cf" />
        <nav className="nav">
          <p className="availability"><b /> Open to work</p>
          <motion.a className="nav-contact" href="#contact"
            {...(reduceMotion ? {} : { ...reveal(10, 0.25), whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 } })}
          >联系我 ↗</motion.a>
        </nav>
        <div className="hero-lanyard" aria-label="金嘉炜的作品集工牌">
          <img className="hero-lanyard-fallback" src={siteUrl('/lanyard-back.svg')} alt="" />
          <Lanyard frontImage={siteUrl('/lanyard-back.svg')} backImage={lanyardFace} strapImage={siteUrl('/lanyard-strap.svg')}
            cardColor="#191325" size={0.54} strapLength={0.43} strapColor="#251a37"
            finish="matte" keepCardInView leftBoundaryRef={heroTitle}
            interactive={!reduceMotion} intro={!reduceMotion} breeze={reduceMotion ? 0 : 0.32} />
        </div>
        <div className="hero-content">
          <motion.p className="hero-role" {...(reduceMotion ? {} : reveal(-8))}>VISUAL / GRAPHIC / STAGE DESIGNER</motion.p>
          <motion.h1 ref={heroTitle} {...(reduceMotion ? {} : reveal(-10, 0.08))}><ShinyText text={'JIAWEI\nJIN'} /></motion.h1>
          <p className="hero-cn"><strong>金嘉炜</strong><span className="hero-cn-divider" aria-hidden="true" /><span>视觉设计师</span><span>平面设计师</span><span>舞美设计师</span></p>
          <div className="hero-contact-grid"><p><small>BASED IN</small>HANGZHOU, CN</p></div>
        </div>
      </div>
    </section>

    <PortfolioNav />

    <section className="about shell section" id="about">
      <div className="section-label">01 — PROFILE</div>
      <div className="about-grid">
        <div className="bio">
          <p className="eyebrow accent">ABOUT ME</p>
          <SplitText>用视觉，<br/>构建<span>感知。</span></SplitText>
          <p className="bio-copy">金嘉炜，视觉设计师 / 平面设计师 / 舞美设计师。具备扎实的美术基础与审美眼光，擅长以品牌视觉、空间场景及影像叙事回应不同语境。</p>
        </div>
        <div className="facts">
          <p>BASED IN <strong>HANGZHOU / CN</strong></p><p>EDUCATION <strong>宁波财经学院·设计专业</strong></p>
          <div className="stats"><div><b>06<span>+</span></b><small>YEARS OF PRACTICE</small></div><div><b>24</b><small>SELECTED WORKS</small></div><div><b>05</b><small>AWARDS &amp; HONORS</small></div></div>
        </div>
      </div>
    </section>

    <section className="works section" id="works">
      <div className="shell works-head">
        <div className="works-heading">
          <motion.div className="section-label" {...(reduceMotion ? {} : reveal(-8))}>02 — SELECTED WORKS</motion.div>
          <SplitText>精选<span>项目</span><sup className="split-ignore">{String(projects.length).padStart(2, '0')}</sup></SplitText>
        </div>
        <motion.div className="works-intro" {...(reduceMotion ? {} : reveal(10, 0.15))}>
          <p>视觉不只是装饰，<br/>而是一次清晰、有力的表达。</p>
          <span>CAMPAIGN / EDITORIAL / GAMING</span>
        </motion.div>
        <motion.div className="works-divider" aria-hidden="true" {...(reduceMotion ? {} : {
          initial: { scaleX: 0 },
          whileInView: { scaleX: 1 },
          viewport: { once: true },
          transition: { duration: 0.6, delay: 0.1, ease: 'easeOut' },
        })} />
      </div>
      <div className="project-list shell">{projects.map((project, index) => <DepthCard className={`project-card ${project.tone}`} key={project.number} href={project.href || project.image} target="_blank" ariaLabel={`查看${project.title}${project.href ? '项目解析' : '完整作品'}（新标签页）`} entrance={reduceMotion ? undefined : reveal(20, 0.12 + index * 0.08)}>
        <div className="project-art"><img src={project.image} alt={`${project.title}设计作品`} loading="lazy" /></div>
        <div className="project-info"><div><small>{project.number} / {project.type}</small><h3>{project.title}</h3><p>查看完整作品 <span aria-hidden="true">↗</span></p></div><span className="project-open" aria-hidden="true">↗</span></div>
      </DepthCard>)}</div>
    </section>

    <section className="strengths shell section" id="expertise">
      <div className="section-label">03 — EXPERTISE</div><div className="strength-title"><SplitText>多维的<br/><span>设计实践。</span></SplitText><p>从二维平面到三维现场，保持一致的洞察与控制力。</p></div>
      <div className="strength-grid">
        {strengths.map(([number, title, desc, slug], index) => (
          <DepthCard
            key={slug}
            className="strength-depth-card"
            href={siteUrl(`expertise/${slug}/`)}
            entrance={reduceMotion ? undefined : reveal(16, index * 0.08)}
            imageSelector=".border-glow-cover img"
          >
            <BorderGlow
              color={['#c084fc', '#f472b6', '#38bdf8'][index]}
              cover={siteUrl(`expertise-${slug}-cover.jpg`)}
            >
              <small>{number}</small>
              <span className="arrow" aria-hidden="true">↗</span>
              <h3>{title}</h3>
              <p>{desc}</p>
            </BorderGlow>
          </DepthCard>
        ))}
      </div>
    </section>

    <section className="contact contact-perspective-section" id="contact">
      <PerspectiveGrid width="100%" height="100%" speed={0.26} color="#8b7cff" gridScale={0.9} lineThickness={0.75} antialiasQuality={64} opacity={0.52} fadeSmoothness={0.74} perspective={14} gridLength={12} curve={0.32} bottomFade="#090a0c" className="contact-perspective" />
      <div className="shell contact-inner"><p className="eyebrow">04 — GET IN TOUCH</p><h2 className="contact-fold-heading"><VaporType words={['让下一个想法，\n成为现场。']} color="#ffffff" vaporColor="#8b7cff" density={1.05} particleSize={1.3} spread={1.15} rise={0.7} turbulence={0.9} sweep="left" condense={1.9} startOnView /></h2><p className="contact-translation">LET THE NEXT IDEA TAKE THE STAGE.</p><SplitText tag="a" className="email" href="https://github.com/jinjiawei888666-web">GitHub 主页 <span>↗</span></SplitText><div className="contact-bottom"><p>HANGZHOU, CHINA<br/>AVAILABLE FOR SELECTED PROJECTS</p><p>© 2026 JIN JIAWEI</p><a href="#top">BACK TO TOP ↑</a></div></div>
    </section>
  </main>
}

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>)
