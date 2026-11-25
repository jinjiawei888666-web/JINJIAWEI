import { siteUrl } from './site-url.js'
import './snow-project.css'
import './stage-design.css'

const scenes = [
  ['stage-festive-interior.png', 'Haier品牌·新春主题生活场景', '浙江国际影视中心600㎡演播厅', 'STUDIO / SPATIAL DESIGN', '以红色基调、灯笼与屋檐造型串联厨房、餐桌和客厅区域，在同一空间中组织不同生活场景。', '新春主题演播空间，包含厨房、餐桌、客厅和红色节庆装饰'],
  ['stage-outdoor-entrance.png', '杭州商务局·Ai潮购季活动', '杭州亚奥万象天地', 'ENTRANCE / WAYFINDING', '以人物轮廓、彩色图形与入口框架构成迎宾节点，让活动识别与建筑立面、夜间环境建立联系。', '夜间建筑入口的彩色活动迎宾装置与人物立牌'],
  ['stage-blue-lighting.png', '杭州商务局·Ai潮购季主舞台', '杭州亚奥万象天地', 'LIGHTING / SPATIAL ATMOSPHERE', '以蓝色灯光聚焦通道尽端，树间点状灯饰与地面倒影形成层次，串联行进动线与远处的视觉焦点。', '夜间蓝色灯光通道，树间点状灯饰与湿润地面倒影'],
]

export default function StageDesign() {
  return <main className="snow-case stage-design" id="stage-top">
    <nav className="case-nav"><a href={siteUrl('/#expertise')}>← 返回设计实践</a><span>JIN JIAWEI / STAGE DESIGN</span><a href={siteUrl('/#works')}>精选项目 ↗</a></nav>
    <header className="case-header"><p className="case-kicker">02 — STAGE DESIGN</p><h1>舞美设计<span>从空间场景，到舞台现场。</span></h1><p className="case-lead">演播空间、入口装置与活动舞台的现场呈现。</p></header>
    <section aria-labelledby="stage-scenes-title"><div className="stage-section-head"><h2 id="stage-scenes-title">空间与现场</h2><span>SELECTED SPACES / 03</span></div>
      <div className="stage-scene-grid">{scenes.map(([file, title, venue, type, description, alt], index) => <figure key={file}>
        <a className="stage-scene-image" href={siteUrl(`${file}`)} target="_blank" rel="noopener noreferrer" aria-label={`查看${title}原图（新标签页）`}><img src={siteUrl(`${file}`)} alt={alt} loading="lazy" /></a>
        <figcaption>
          <span>0{index + 1} / {type}</span>
          <h3>{title}</h3>
          <p>地点：{venue}</p>
          <p>{description}</p>
          <a href={siteUrl(`${file}`)} target="_blank" rel="noopener noreferrer">查看原图 ↗</a>
        </figcaption>
      </figure>)}</div>
    </section>
    <footer className="case-footer"><p>STAGE DESIGN / SELECTED WORKS</p><a href={siteUrl('/#expertise')}>返回设计实践 ↗</a><a href="#stage-top">回到顶部 ↑</a></footer>
  </main>
}
