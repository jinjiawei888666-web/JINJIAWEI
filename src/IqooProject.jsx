import { siteUrl } from './site-url.js'
import './snow-project.css'
import './iqoo-project.css'

const visualNotes = [
  ['01', '篮球语境与校园场景', '以篮球、篮架、球场线条与北京大学建筑构成场景线索，将产品发布主题置于年轻、热血的校园运动语境。地标与运动符号共同建立活动的地点识别和情绪基调。'],
  ['02', '产品主导的视觉层级', '放大的手机主体占据中下部视觉中心，呈现机身与镜头细节；球场、建筑与篮球作为辅助元素，围绕产品组织。上方主题文字与下方产品展示形成明确分工。'],
  ['03', '拼贴语言与运动张力', '手机、建筑与运动元素采用白色描边的拼贴表达，配合手绘箭头、闪光符号和倾斜文字，建立轻松直接的街头感。写实产品与图形化场景叠置，强化主次与空间层次。'],
]

const liveNotes = [
  ['01', '蓝黄体系的现场延展', '直播画面以蓝灰色背景和黄色主题字、线框建立识别关系，延续海报中的蓝黄对比。色彩在宣传与现场两个触点中保持呼应，形成连续的活动印象。'],
  ['02', '信息与产品的展示分区', '主题口号位于背景上方，中部线框与产品展示区域形成视觉中心，下方保留人物交流与互动空间。背景信息采用明确分区，让品牌内容与直播主体形成层次。'],
  ['03', '篮球元素与活动叙事', '现场篮球、球衣和球场地面呼应宣传海报的运动主题，使抽象的热血氛围转化为可观看的互动场景；产品展示与人物交流共同承接发布会内容。'],
  ['04', '镜头中的物料与识别', '截图中可见的话筒标识、手持信息板和背景产品展示，共同构成直播镜头内的多层信息载体。以字级、对比色和简洁轮廓区分品牌识别与内容提示，并关注平台浮层对画面的遮挡关系。'],
]

export default function IqooProject() {
  return <main className="snow-case iqoo-case" id="case-top">
    <nav className="case-nav">
      <a href={siteUrl('/#works')}>← 返回精选项目</a>
      <span>JIN JIAWEI / PROJECT 02</span>
      <a href={siteUrl('/#contact')}>项目合作 ↗</a>
    </nav>
    <header className="case-header">
      <p className="case-kicker">CAMPAIGN VISUAL / CAMPUS & BASKETBALL</p>
      <h1>iQOO·北京大学场<span>将产品表达，融入热血球场。</span></h1>
      <div className="case-summary">
        <p>围绕 iQOO 校园篮球主题活动，将手机产品、街头运动与北京大学场景结合，以蓝黄配色和拼贴语言建立年轻、有冲劲的视觉表达，并通过直播应用画面呈现主题在现场的延展。</p>
        <dl>
          <div><dt>项目主题</dt><dd>iQOO · 校园篮球主题活动</dd></div>
          <div><dt>展示内容</dt><dd>产品海报 / 直播场景应用</dd></div>
          <div><dt>风格关键词</dt><dd>蓝黄对比 · 街头拼贴 · 运动活力</dd></div>
        </dl>
      </div>
    </header>
    <section className="case-visual-grid" aria-labelledby="iqoo-kv-title">
      <figure className="case-poster">
        <a href={siteUrl('/project-iqoo-peking-university.jpg')} target="_blank" rel="noopener noreferrer" aria-label="查看iQOO产品海报原图（新标签页）"><img src={siteUrl('/project-iqoo-peking-university.jpg')} alt="iQOO北京大学场产品海报：蓝色球场、黄色主题文字、手机产品与校园建筑拼贴" /></a>
        <figcaption>01 / KEY VISUAL — 产品主视觉 · 点击查看原图 ↗</figcaption>
      </figure>
      <div className="case-notes">
        <p className="case-kicker">VISUAL DIRECTION</p>
        <h2 id="iqoo-kv-title">以球场为语境，<br/>让产品成为焦点。</h2>
        <p className="case-lead">围绕运动情绪与产品识别组织画面，在商业信息、校园场景和视觉趣味之间建立清晰的主次关系。</p>
        {visualNotes.map(([number, title, description]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}
        <section className="case-type" aria-labelledby="iqoo-type-title">
          <div><p className="case-kicker">TYPOGRAPHY & COLOR</p><h2 id="iqoo-type-title">用对比建立节奏，<br/>用字形传递态度。</h2></div>
          <div><h3>蓝黄对比 × 手写动势</h3><p>蓝色构建球场与产品的整体氛围，黄色突出主题关键词，白色用于信息补充和拼贴轮廓。大幅手写标题以倾斜、伸展的笔画强化运动感；时间、地点与店铺入口集中于画面下方，形成「主题—产品—行动信息」的阅读层级。</p><div className="case-palette"><span>球场蓝</span><span>活力黄</span><span>轮廓白</span></div><small>色彩关系示意 / 基于作品画面提炼</small></div>
        </section>
      </div>
    </section>
    <section className="case-live" aria-labelledby="iqoo-live-title">
      <div className="case-live-copy">
        <p className="case-kicker">IN-CONTEXT APPLICATION</p>
        <h2 id="iqoo-live-title">从产品海报，<br/>延展到互动现场。</h2>
        <p className="case-lead">以实际直播截图观察主题色、产品陈列、人物活动与平台界面之间的关系，让视觉表达回到真实观看情境。</p>
        {liveNotes.map(([number, title, description]) => <article key={number}><h3>{number} / {title}</h3><p>{description}</p></article>)}
        <p className="case-caption">配图为提供的直播应用截图；平台界面、商品信息与观看数字仅作场景展示，不作为本项目效果数据。</p>
      </div>
      <figure className="case-live-image">
        <a href={siteUrl('/project-iqoo-live-application.png')} target="_blank" rel="noopener noreferrer" aria-label="查看iQOO直播应用截图（新标签页）"><img src={siteUrl('/project-iqoo-live-application.png')} alt="iQOO篮球主题直播应用截图：蓝黄主题背景、手机展示与球场人物互动" loading="lazy" /></a>
        <figcaption>02 / LIVE APPLICATION — 直播场景应用 · 点击查看原图 ↗</figcaption>
      </figure>
    </section>
    <footer className="case-footer"><p>让品牌识别与运动情绪，在不同触点形成呼应。</p><a href={siteUrl('/#works')}>返回全部作品 ↗</a><a href="#case-top">回到顶部 ↑</a></footer>
  </main>
}
