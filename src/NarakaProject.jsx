import { siteUrl } from './site-url.js'
import './snow-project.css'
import './naraka-project.css'

const visualNotes = [
  ['01', '武侠符号与东方叙事', '以金龙、兵器人物剪影与屏风式分隔构成视觉骨架，将竞技主题放入东方武侠语境。龙纹负责营造气势，人物剪影提供角色联想，让画面保持叙事感与想象空间。'],
  ['02', '金棕层次与材质氛围', '深棕与暗红建立沉稳底色，金色标题、龙纹和浅色光面形成明暗对照。细腻的纹理与金属感字形共同传达庄重、复古的气质，使主题从背景中清晰浮现。'],
  ['03', '纵向构图与主次秩序', '上方集中呈现品牌与活动名称，中部以龙纹组织场景，下方由三组人物剪影收束画面。竖向屏风结构形成节奏，将文字识别、场景氛围与人物想象串联为连续的阅读路径。'],
]

const liveNotes = [
  ['01', '主题色与装饰语言', '直播应用图以棕红底色、金色描边和东方装饰纹样维持武侠气质。活动海报与直播包装通过相近的色彩关系和图形语汇建立联系，同时针对不同内容调整信息密度。'],
  ['02', '商品展示与人物画面分区', '顶部横向商品展示区以金色线框明确边界，左侧承接名称与价格，右侧呈现游戏角色内容；中部容纳人物互动，下方承接赛季主题信息，建立层次明确的观看顺序。'],
  ['03', '角色识别与身份提示', '画面中的角色立绘、服装展示及竖向主播名牌分别承担内容展示与身份提示。文字、人物和边框采用不同尺度，帮助观众区分游戏信息、现场人物与互动内容。'],
  ['04', '多层信息中的视觉一致性', '游戏角色、商品卡、现场互动与赛季文字共同组成复合画面。以统一色调与装饰边框连接不同模块，并在直播场景中关注字幕、评论和平台控件所占的区域，使包装信息与观看内容保持清晰关系。'],
]

export default function NarakaProject() {
  return <main className="snow-case naraka-case" id="case-top">
    <nav className="case-nav"><a href={siteUrl('/#works')}>← 返回精选项目</a><span>JIN JIAWEI / PROJECT 03</span><a href={siteUrl('/#contact')}>项目合作 ↗</a></nav>
    <header className="case-header">
      <p className="case-kicker">GAMING VISUAL / LIVE APPLICATION</p>
      <h1>永劫无间<span>以东方意象，构建竞技氛围。</span></h1>
      <div className="case-summary"><p>围绕「咏武斗剑大会」海报与永劫无间直播应用画面，呈现武侠题材在活动主视觉及直播包装中的表达。以金棕色调、龙纹和人物剪影建立氛围，再通过模块化信息布局承接角色展示与现场互动。</p><dl><div><dt>项目主题</dt><dd>永劫无间 · 咏武斗剑大会</dd></div><div><dt>展示内容</dt><dd>活动海报 / 直播应用图</dd></div><div><dt>风格关键词</dt><dd>东方武侠 · 金棕质感 · 屏风构图</dd></div></dl></div>
    </header>
    <section className="case-visual-grid" aria-labelledby="naraka-kv-title">
      <figure className="case-poster"><a href={siteUrl('/project-naraka-portrait.jpg')} target="_blank" rel="noopener noreferrer" aria-label="查看永劫无间活动海报原图（新标签页）"><img src={siteUrl('/project-naraka-portrait.jpg')} alt="永劫无间咏武斗剑大会海报：金色标题、龙纹屏风与武侠人物剪影" /></a><figcaption>01 / KEY VISUAL — 活动主视觉 · 点击查看原图 ↗</figcaption></figure>
      <div className="case-notes">
        <p className="case-kicker">VISUAL DIRECTION</p><h2 id="naraka-kv-title">以龙纹起势，<br/>以剪影入境。</h2><p className="case-lead">将武侠符号转化为画面的结构与层次，让主题识别、材质气氛与人物叙事共同构成视觉记忆。</p>
        {visualNotes.map(([number, title, description]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}
        <section className="case-type" aria-labelledby="naraka-type-title"><div><p className="case-kicker">TYPOGRAPHY & COLOR</p><h2 id="naraka-type-title">让字形有气势，<br/>让色彩有厚度。</h2></div><div><h3>金色书写符号 × 中英文字级</h3><p>醒目的金色书写符号与浅色中文活动名形成主标题组合，英文副题补充信息层级。深色背景承托浅色文字，金色细节贯穿图形与标题，在庄重的视觉基调中建立明确的阅读焦点。</p><div className="case-palette"><span>沉棕</span><span>鎏金</span><span>暖白</span></div><small>色彩关系示意 / 基于作品画面提炼</small></div></section>
      </div>
    </section>
    <section className="case-live" aria-labelledby="naraka-live-title">
      <div className="case-live-copy"><p className="case-kicker">IN-CONTEXT APPLICATION</p><h2 id="naraka-live-title">从武侠意象，<br/>到直播内容容器。</h2><p className="case-lead">通过提供的直播应用图，观察主题视觉如何与角色、商品和人物互动共同组织画面。</p>
        {liveNotes.map(([number, title, description]) => <article key={number}><h3>{number} / {title}</h3><p>{description}</p></article>)}
        <p className="case-caption">配图为提供的直播应用图；其中价格、互动与观看数字仅作画面展示，不作为本项目效果数据。</p>
      </div>
      <figure className="case-live-image"><a href={siteUrl('/project-naraka-live-phone.png')} target="_blank" rel="noopener noreferrer" aria-label="查看永劫无间直播应用原图（新标签页）"><img src={siteUrl('/project-naraka-live-phone.png')} alt="永劫无间直播手机样机：棕红金色包装、角色商品展示框、主播身份标识与赛季信息" loading="lazy" /></a><figcaption>02 / LIVE APPLICATION — 直播场景应用 · 点击查看原图 ↗</figcaption></figure>
    </section>
    <footer className="case-footer"><p>将题材气质，转化为清晰的视觉秩序。</p><a href={siteUrl('/#works')}>返回全部作品 ↗</a><a href="#case-top">回到顶部 ↑</a></footer>
  </main>
}
