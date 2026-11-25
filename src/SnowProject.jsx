import { siteUrl } from './site-url.js'
import './snow-project.css'

const decisions = [
  ['01', '像素化场景语言', '以游戏入口、金币与方块雪景构成视觉线索，将雪场体验转译为具有探索感的「闯关」场景。像素元素贯穿宣传海报与直播包装，建立可延展的识别符号。'],
  ['02', '冷暖对比与视觉锚点', '冰蓝与雪白构成冬季氛围，黄色点缀集中在金币、皇冠和手写副标题。冷暖色差在统一画面中形成局部视觉锚点，使主题信息与趣味细节形成层次。'],
  ['03', '动势构图与空间纵深', '人物动作与滑行轨迹形成斜向动线，结合近景虚化、飞雪和远山，建立前、中、后景关系。主体突破场景边界，让静态海报具有运动瞬间的张力。'],
]


const materials = [
  ['snow-task-card.jpg', '任务卡', '以木纹任务面板承载目标与规则，图标与分组文字建立清晰的信息层级。', 'wide'],
  ['snow-supply-board.jpg', '雪场补给指示牌', '雪具图标与雪山场景组合，延续游戏地图中补给站的场景语言。', 'wide'],
  ['snow-coin-blue.png', '蓝色游戏币', '像素网格与货币符号组成直观的游戏道具识别。', 'icon'],
  ['snow-coin-gold.png', '金色游戏币', '橙金色阶强化奖励联想，与蓝色版本形成视觉区分。', 'icon'],
  ['snow-badge-shield.png', '盾形任务徽章', '盾牌、剑与金属色阶塑造成就感，保持像素边缘与主题符号一致。', 'icon'],
  ['snow-badge-explore.png', '探索任务徽章', '探索人物、山景与缎带构成叙事化徽章，呼应「开荒」主题。', 'icon'],
  ['snow-handheld-board.png', '雪道主题手举牌', '大字与雪板、雪道结合，白色外轮廓突出异形边缘与画面层次。', 'wide'],
  ['snow-handheld-slogan.png', '互动口号手举牌', '用蓝白主调与暖色关键词组织口号，传达轻松、活跃的现场情绪。', 'wide'],
]

export default function SnowProject() {
  return <main className="snow-case" id="case-top">
    <nav className="case-nav"><a href={siteUrl('/#works')}>← 返回精选项目</a><span>JIN JIAWEI / PROJECT 01</span><a href={siteUrl('/#contact')}>项目合作 ↗</a></nav>
    <header className="case-header">
      <p className="case-kicker">CAMPAIGN VISUAL / LIVE EXPERIENCE</p>
      <h1>卖空雪场<span>让冬日体验，成为视觉事件。</span></h1>
      <div className="case-summary"><p>围绕天猫双11「卖空雪场」主题，将冰雪运动、游戏化元素与电商传播结合，构建从宣传主视觉到直播应用场景的视觉表达。</p><dl><div><dt>项目主题</dt><dd>天猫双11 · 淘宝直播</dd></div><div><dt>展示内容</dt><dd>活动海报 / 直播场景应用</dd></div><div><dt>风格关键词</dt><dd>冰雪蓝调 · 像素趣味 · 运动张力</dd></div></dl></div>
    </header>
    <section className="case-visual-grid" aria-labelledby="case-kv-title">
      <figure className="case-poster"><a href={siteUrl('/project-01-snow-campaign.png')} target="_blank" rel="noopener noreferrer" aria-label="查看完整主视觉海报（新标签页）"><img src={siteUrl('/project-01-snow-campaign.png')} alt="卖空雪场宣传海报：冰蓝雪景、像素游戏装置与滑雪人物" /></a><figcaption>01 / KEY VISUAL — 活动主视觉 · 点击查看原图 ↗</figcaption></figure>
      <div className="case-notes"><p className="case-kicker">VISUAL DIRECTION</p><h2 id="case-kv-title">从冰雪场景，<br/>提炼传播记忆点。</h2><p className="case-lead">以鲜明的场景感承接活动主题，再通过信息层级与符号系统，让复杂画面保持清晰的阅读顺序。</p>{decisions.map(([number, title, description]) => <article key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div></article>)}<section className="case-type" aria-labelledby="case-type-title"><div><p className="case-kicker">TYPOGRAPHY & COLOR</p><h2 id="case-type-title">让信息有秩序，<br/>让风格有辨识度。</h2></div><div><h3>粗体主标题 × 手写副标题</h3><p>厚重、紧凑的白色字形承担第一层主题识别；黄色手写文字补充轻松、活跃的情绪。人物、场景与品牌信息围绕主题组织，底部集中承接时间、地点与行动提示，形成「主题—体验—行动」的阅读路径。</p><div className="case-palette"><span>冰雪蓝</span><span>雪白</span><span>活力黄</span></div><small>色彩关系示意 / 基于作品画面提炼</small></div></section></div>
    </section>

    <section className="case-live" aria-labelledby="case-live-title"><div className="case-live-copy"><p className="case-kicker">IN-CONTEXT APPLICATION</p><h2 id="case-live-title">从主视觉，<br/>走进直播现场。</h2><p className="case-lead">将画面放回真实观看场景，检视视觉识别、内容区域与平台信息之间的关系。</p><article><h3>01 / 顶部品牌识别区</h3><p>直播顶部延续冰蓝色调、像素入口与主题大字，保持与活动海报一致的视觉语汇，让不同触点形成连贯的品牌印象。</p></article><article><h3>02 / 分区与视觉节奏</h3><p>白色折线切分顶部主题画面与下方实景直播，建立明确的内容边界；上方传达活动概念，下方承载人物与现场互动。</p></article><article><h3>03 / 场景化延展</h3><p>现场可见的像素雪景装饰与手持物料呼应主视觉符号，形成数字画面与实体场景之间的连接。平台商品浮层与互动控件则提示了直播包装需要关注的遮挡关系。</p></article><article><h3>04 / 游戏环节物料制作</h3><p>围绕任务发布、游戏奖励、成就反馈与镜头互动，将像素视觉延展为任务卡、游戏币、任务徽章、补给指示牌与手举牌。任务卡通过「任务目标—任务规则」的信息分组建立清晰指引；蓝、金游戏币与盾形、探索徽章构成差异化符号；手举牌以大字、深色描边和异形轮廓强化镜头中的辨识度，让物料既服务互动流程，也延续雪场主题的游戏感。</p><a className="case-material-link" href="#case-materials">查看物料设计 ↓</a></article><p className="case-caption">配图为提供的直播应用截图；平台界面、商品信息与观看数字仅作场景展示，不作为本项目效果数据。</p></div><figure className="case-live-image"><a href={siteUrl('/project-snow-live-application.png')} target="_blank" rel="noopener noreferrer" aria-label="查看直播应用截图（新标签页）"><img src={siteUrl('/project-snow-live-application.png')} alt="卖空雪场直播应用截图，包含顶部主题包装、现场装饰与直播平台控件" loading="lazy" /></a><figcaption>02 / LIVE APPLICATION — 直播场景应用 ↗</figcaption></figure></section>
    <section className="case-materials" id="case-materials" aria-labelledby="case-materials-title"><header><div><p className="case-kicker">04 / GAME PROPS & PRINT DESIGN</p><h2 id="case-materials-title">让游戏机制，<br/>拥有可触摸的视觉语言。</h2></div><p>以像素风格为统一线索，将信息指引、游戏道具与互动传播组织成一套物料系统。从屏幕中的主题识别，延伸到现场可读、可持、可互动的视觉载体。</p></header><div className="case-materials-grid">{materials.map(([image, title, description, size]) => <figure className={`case-material ${size}`} key={image}><a href={siteUrl(`${image}`)} target="_blank" rel="noopener noreferrer" aria-label={`查看${title}原图（新标签页）`}><img src={siteUrl(`${image}`)} alt={title} loading="lazy" /></a><figcaption><h3>{title}</h3><p>{description}</p></figcaption></figure>)}</div></section>
    <footer className="case-footer"><p>让视觉语言，在不同触点保持一致。</p><a href={siteUrl('/#works')}>返回全部作品 ↗</a><a href="#case-top">回到顶部 ↑</a></footer>
  </main>
}
