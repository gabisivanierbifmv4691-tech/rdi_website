import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import type { Language } from '../App';
import { useProjects } from '../context/ProjectContext';
import { getLocationLabel } from '../utils/projectHelpers';
import { marked } from 'marked';

// Helper to ensure markdown lines starting with ### are correctly spaced for parser to identify headers properly
const preprocessMarkdown = (text: string): string => {
  if (!text) return '';
  return text.replace(/^###[ \t]*(.*)/gm, '### $1');
};

const TRANSLATION_MAP: { pattern: string; zh: string }[] = [
  // shanghai-psa
  {
    pattern: "Shanghai Power Station of Art (PSA)",
    zh: "### 项目概况\n位于黄浦江畔的上海当代艺术博物馆（PSA）坐落于2010年上海世博会未来馆，前身是始建于1897年的南市发电厂。作为中国第一家公立当代艺术博物馆，其照明设计突破传统的高对比限制，采用明亮简洁的光环境，促进艺术品与观众之间的视觉互动。"
  },
  {
    pattern: "Industrial Echoes Respecting History",
    zh: "### 工业回响 尊重历史\n在历史建筑改造中，光是最温和的雕刻刀。设计团队保留了南市发电厂原有的粗犷工业结构，采用隐蔽式导轨和均匀漫射光，让粗糙的风化混凝土得以重新呼吸。"
  },
  {
    pattern: "Breaking Traditional Exhibition Lighting",
    zh: "### 打破传统展陈照明\n传统展馆往往采用极暗环境与高对比射灯来突出展品，而本案则主打明亮简洁、柔和的光学氛围，不仅切实减少了观众因长期逗留导致的疲劳，更为观众提供舒适惬意的驻足和互动空间。"
  },
  {
    pattern: "Symbiosis of Natural and Artificial Light",
    zh: "### 自然光与人工光的共生\n空间顶部的天窗系统被巧妙利用。通过智能调光系统，可随着室外日光强度的变化做出实时补偿，不仅高效节能，更能保护感光类珍稀展品。"
  },
  {
    pattern: "former industrial furnace",
    zh: "*曾经的工业烟囱，在当代光影的拥抱下，迎来新生。*"
  },

  // nanjing-baiyunting
  {
    pattern: "Awakening Urban Memories",
    zh: "### 唤醒工业时代的城市记忆\n南京白云亭文化艺术中心改建极富特色。通过在折扇型的银灰色冲孔铝板金属幕墙后安置LED线条投光，建筑在夜间犹如一顶轻盈灵动的水中灯笼，唤醒历史建筑的本真活力。"
  },
  {
    pattern: "Transformation of a Former Cold Storage",
    zh: "### 往昔冰库的华丽蜕变\n前身为南京白云亭副食品冷库，如今已蜕变成为一座高品质的城市公共艺术新地标，通过光色层次温润韵染，呈现出深邃而轻盈、富于呼吸感的建筑夜视肌理。"
  },
  {
    pattern: "Folded Fan Curtain Wall",
    zh: "### 折扇幕墙与光影灯笼\n灯光的微妙之处在于隐藏于冲孔板后端的洗墙结构，暖柔光源透过折起冲孔缝隙倾洒，在整体夜景中构成一幅雅致纸灯笼的长卷，散发浓郁水乡韵味。"
  },
  {
    pattern: "Optical Guidance in the Interior",
    zh: "### 室内空间的光学引导\n步入室内，天幕下温和自然的白天光与漫反射人工光和谐对话。合理的场景操控令宽敞宏大的中庭能在任何天气、时间维系通透、温暖和艺术感十足的交流氛围。"
  },
  {
    pattern: "Unobtrusive light and shadow silently",
    zh: "*不着痕迹的温润光影，正无声地诉说着设计的巧思与建筑生命的生生不息。*"
  },

  // shanghai-nhm
  {
    pattern: "Natural History Museum integrates",
    zh: "### 探索自然生态的光影奥秘\n上海自然博物馆建筑灵感取自鹦鹉螺壳体。整体照明设计秉持视觉展示、生态科学与低碳绿色三大原则，以极高显色控光与幕帘技术平衡日光，打造沉浸式生命画卷。"
  },
  {
    pattern: "Ecological Evolution from the Nautilus",
    zh: "### 鹦鹉螺的生态演化\n建筑轮廓如鹦鹉螺壳体盘旋而下，象征生命轨迹的递进。展厅设计大胆包容日光，阳光穿透巨大玻璃外壁，在自然呼吸的时光流动中重赋化石以灵动朝气。"
  },
  {
    pattern: "Strict Light Filtration",
    zh: "### 珍稀标本的严苛光防\n日光虽美也伴随紫外线侵害。团队基于多轮测算增配了智能反射格栅和智能无紫外调光，既极大增强通透视野，又严控光敏标本（皮毛等）曝晒，达致保护与展示的高度平衡。"
  },
  {
    pattern: "Survival Wisdom",
    zh: "### 地下展陈的深邃光影\n在“生存智慧”等地下展馆，光线由旷达走向聚拢。高显色性（CRI>95）导轨射灯如细致刻画的聚光灯，勾勒出动物毛发与骨骼纹理，在神秘幽光中展现生命奇迹。"
  },
  {
    pattern: "river of time, touching the pulse",
    zh: "*循着光的指引，游历生命演化长河，在灵动光影中，触碰自然造化的磅礴脉搏。*"
  },

  // guangzhou-xpeng
  {
    pattern: "Motors Headquarters interprets",
    zh: "### 探索未来的科技地标\n坐落于广州天河区，全新的小鹏汽车总部大楼以高识别度折线线条诠释未来出行美学。照明手法轻柔地将标志性的品牌“X”嵌入幕墙横格栅中，展现科技前卫之姿。"
  },
  {
    pattern: "Brand Symbol X Hidden",
    zh: "### 隐于格栅侧影的品牌图腾\n通过大楼外格栅翼板作为光伏承载体。策划与控光团队将小鹏汽车标志性的“X”光影进行转译，令其随数字脉搏闪烁，完美融合商业识别度与城市天际线。"
  },
  {
    pattern: "Minimalist Industrial Textured",
    zh: "### 极简精工的科技内部\n大厅内部也贯穿着克制、硬朗的理性风格。汽车展厅顶部满布的高透软膜大范围均匀泛光，好似纯洁的天幕，完美阐释出汽车特有的金属光泽与几何锋芒。"
  },
  {
    pattern: "Dynamic and Static Urban Pulse",
    zh: "### 呼吸生辉的都会律动\n作为空中焦点，大楼冠部在节日期间会切换可编程的动态照明，在大体量的外表皮中流动红绿霓彩，让建筑脱离冰冷质感，如有机搏动的未来信息体。"
  },
  {
    pattern: "future, illuminating the path",
    zh: "*让光成为驱动明日的引擎，以数字律动点亮人类探索未来的光辉征途。*"
  },

  // suzhou-jinxi
  {
    pattern: "An Ode to Elegant Jiangnan",
    zh: "### 江南水乡的光影颂歌\n苏州锦溪住宅展示区有机缝合了苏式江南文化与奢适起居体验。照明设计遵循“光是空间之诗”的留白哲学，不设直射，依靠大面积漫反射光晕晕散。"
  },
  {
    pattern: "Collision of Ink-Wash",
    zh: "### 水墨意蕴与当代豪邸的交融\n试图在现代人居中重塑中国泼墨写意画的底蕴。室内深色木饰面与自然大理石在暖黄光下舒缓起承转合，如同一抹月色被请入室内，静穆悠远。"
  },
  {
    pattern: "vibe of seeing light, not fixtures",
    zh: "### 见光不见灯的雅致意境\n大雅之堂，往往追求极致收敛。灯具完美隐蔽在装饰线槽与墙裙夹层中，高精光学镜面确保了无一丝冗余眩光射眼，润物无声地浸染着古雅艺术陈设。"
  },
  {
    pattern: "Blurring the Boundaries of Inside",
    zh: "### 解构室内外的呼吸有无\n落地长窗实现了内庭水景和空间的视觉不间断。景观灯也采用低矮、下倾退光，从屋舍由内而外渐进过渡，打破藩篱，给予住户无限包裹和放松感。"
  },
  {
    pattern: "Borrowing a ray of moonlight to dream",
    zh: "*借得月一缕，梦回冷江南；运用静谧的光影留白，写下属于现代隐逸生活的高雅章节。*"
  },

  // shanghai-suitangli
  {
    pattern: "The Light of an Ultimate Sensory Feast",
    zh: "### 缦妙奢华的饕餮光影\n镛舍新晋高精粤式中餐厅随堂里，将美食探索推高至戏剧化极致。整体环境大调多层低照度，利用极温色彩筑造私室质感，克制且极度生津。"
  },
  {
    pattern: "Psychology of Fine Dining",
    zh: "### 精致美馔的光影心理学\n随堂里的光，绝不仅是照明。2700K的烛影色度温柔拥抱整体环境，配合极暗的屏风背景，在公区中为每张圆桌阻隔出一道无形的温煦隐私安全屏障。"
  },
  {
    pattern: "Presenting Food as Artwork",
    zh: "### 每一碟菜，皆是珍品艺术\n餐盘是此处唯一高亢的视觉地表。微型高显指微型射灯从吊顶倾斜射来，将饱满、浓郁的菜品本色完美还原，仿佛天生滤镜，极大激发食欲。"
  },
  {
    pattern: "Reshaping of Shanghai-Style Elements",
    zh: "### 剪影折射出的复古海派肌理\n复刻经典石库门砖瓦与经典Art Deco雕线设计。幽光恰似老唱片的指针，仅以5-15 lux的漫反射探入暗格，低声唤起天鹅绒、黄铜在旧日风物中的流光溢彩。"
  },
  {
    pattern: "clinking glasses, what one tastes",
    zh: "*杯盏交错间，品味的不止是餐桌上的奇珍海错，更有那被光影雕刻出的一派优雅光阴。*"
  },

  // nanjing-changlefang
  {
    pattern: "District Reshaping Ming Dynasty",
    zh: "### 重塑大明优雅的沉浸街区\n属于历史街区修复的绝佳样本，金陵长乐坊以温润纸灯微光和2200K暖红灯色重铸秦淮烟雨。结合特制宫灯与飞檐剪影，缔造出一场跨越古今的时空沉浸大戏。"
  },
  {
    pattern: "Narrative Lighting: A Dream Back to Jinling",
    zh: "### 叙事防景：一梦回金陵\n以前身为织造厂的历史轴线为骨架，灯光设计以“赶考、高升”的江南书生线路作为照明游历主脉，从金陵门巍峨的大面积淡金投射，到石径窄弄中木制宫灯轻逸，光芒交织出历经600载的江南旧梦。"
  },
  {
    pattern: "Balancing Bustling Streets and",
    zh: "### 商街繁盛与内庭静溢的有机共构\n沿街店铺均采用高显柔润内透，汇聚现代金陵商机；而斜步折入静谧花池，照明一落到底，仅见草坪中微弱侧漏光照映假山与亭阁，收放自如，独享安宁。"
  },
  {
    pattern: "Precise Rendering of Ancient Materials",
    zh: "### 传统质地的无损还原\n如何在夜色中无损展示古老太湖石的温婉与朱红木漆的油亮？设计历经百次测试特提白红特谱，柔润抚摸着飞檐斗拱设计，不留现代的刺耳与机械之感。"
  },
  {
    pattern: "Old factories and alleys transform",
    zh: "*老厂深巷，化为了流光华彩；一灯在手，在明灭光影中，重温秦淮河畔千年的温柔繁华。*"
  },

  // shanghai-expo-greenhouse
  {
    pattern: "A Dreamlike Nocturnal Ecological",
    zh: "### 梦幻般的夜之生态剧场\n上海世博文化公园温室是一座将超现代异形钢结构骨架与奇特热带植物交融的玻璃温室。灯光方案秉持不着痕痕迹、渲染奇崛、唤醒生命灵性为上。"
  },
  {
    pattern: "Reshaping Nature Beyond Boundaries",
    zh: "### 边缘重构 异质生态\n白昼的自然生长规律在夜幕降临后被短暂冻结，取而代之的是由精确洗光渲染的奇幻植物世界。沙生异植在魔幻蓝蓝紫调、冷色洗墙的勾勒下生机勃勃。"
  },
  {
    pattern: "Strolling with Changing Views",
    zh: "### 移步易景的折叠式游园\n柔和灯晕根据参观节奏呼吸流溢。由于所有射灯全部遁入假石、草坪和林木内，完全抹去了电缆管道的机械冷感，微光柔美地好似从植物肌理中有机生长。"
  },
  {
    pattern: "Optical Challenges Beyond Botanical",
    zh: "### 跨越光学与热带生态的极限挑战\n面临极度潮湿、厚密雾气的玻璃温室内，光源耐候与抑制表面眩光极其严峻。在维护生物健康成长与满足人居参观通透感之上，完成了卓越、高精细的光环境典范。"
  },
  {
    pattern: "lungs of the city breathe in the night",
    zh: "*城市之肺在黑夜里静默呼吸；微光与绿意交融，宛如一首献给未来地球的诗意赞歌。*"
  },

  // zhengzhou-greenland
  {
    pattern: "Zhengzhou Greenland Center",
    zh: "### 中原地标的巍峨夜空图腾\n巍巍280米地标散发着卓尔不凡的东方气度。设计在塔尖置倾角镜面折射天光。夜幕降临，塔冠的魔幻溢彩勾勒出中原大地的核心地标夜空景象。"
  },
  {
    pattern: "Experiment in Natural Daylighting",
    zh: "### 引入天光的无畏尝试\n在SOM主创的宏伟超高塔中，将阳光深入漫射大堂是重大创举。方案在冠顶破开特设开口，以程序调试的镜面板向深邃空间反投日光，既绿色节能更震撼宏伟。"
  },
  {
    pattern: "Brilliant Fireworks in the Night Sky",
    zh: "### 满天星斗的夜空礼花\n夜幕交替，塔冠的反光系统华丽转身。向上投光的精细大功率LED照亮这些金属格栅，令原用于引光的格栅犹如礼花绽放夜空，耀眼非凡。"
  },
  {
    pattern: "Translucent Facade Baptism",
    zh: "### 立面晶莹的光华洗礼\n为了完美刻画幕墙上折角的凹凸阴阳面，上窄下款地紧密布灯。隐藏式配光令光感仿佛玉石内部温润漫散，极其宏伟有力，让其挺拔于中原之巅。"
  },
  {
    pattern: "Standing proudly in the clouds",
    zh: "*傲立于云端，拥抱星月；这不仅是对物理高度的突破，更是以温润光影重塑中原夜空的艺术灯塔。*"
  },

  // shanghai-tiandi-daguan
  {
    pattern: "Glimmer in the Darkroom",
    zh: "### 千年暗室的幽深微芒\n上海龙美术馆“天地大观”特展，是关于历史与艺术跨时空对话。照度极力压低至极致，在微茫幽暗中以高显指轨道聚光呼唤书画沉睡的本真。观众踏入时光隧道，体味被极度克制的光环境包裹的肃穆敬畏。"
  },

  // shenzhen-houhai-tairun
  {
    pattern: "Luminous Engine of the Bay Area",
    zh: "### 大湾区的璀璨光能引擎\n深圳后海泰伦商业多功能综合体与写字楼高耸于核心湾区。采用细密排布的LED线条矩阵，将KPF卓越的三维折角轮廓细致雕琢，室内通透流畅的商业内透与外景呼应，诠释未来商务与大都会格调。"
  },

  // shanghai-puan-yunchao
  {
    pattern: "Waterfront by the Huangpu River",
    zh: "### 黄浦江畔的魔幻滨水图卷\n上海浦江云起光影秀以黄浦江自然夜色为画幅。结合全息成像技术与动态艺术探照，将曾经静溢的滨水区于夜间点亮为流溢奇幻的数字舞台，提升徐汇地标魅力。"
  },

  // shanghai-daxue-road-kic
  {
    pattern: "Dialogue of 'Gather' and Light",
    zh: "### “聚”与光的雕塑对话\n位于上海大学路，以“@”符号为灵感的巨大光电雕塑拥有1658万种斑斓渐变。方案在保留艺术地标性的同时，通过传感器响应行人步履，将白天的街区枢纽化为活力的夜市狂欢中心。"
  },
  {
    pattern: "Interactive Transformation",
    zh: "### 互动创想"
  },
  {
    pattern: "Space Reshaping",
    zh: "### 空间重塑"
  },
  {
    pattern: "Photoelectric Control",
    zh: "### 精密光电操控"
  },
  {
    pattern: "neon lights never rest",
    zh: "*城市霓虹永不落幕，但唯有这一刻的水岸柔光，真正抚慰步履匆匆的灵魂。*"
  },

  // beijing-palace-museum-exhibition
  {
    pattern: "Cultural Heritage",
    zh: "### 华夏名物的文化之光\n故宫博物院“照见天地心”书画特展以行云流水、含蓄舒缓的漫射光重谱古典空间。灯光使宋元山水与现代先锋艺术同台对话，交织出含蓄、雅致的东方气度。"
  },
  {
    pattern: "Immersive Experience",
    zh: "### 沉浸式意境"
  },
  {
    pattern: "Cross-Boundary Dialogue",
    zh: "### 跨时空对话"
  },
  {
    pattern: "Optical Protection",
    zh: "### 故宫级严苛展陈光学\n展柜全部运用无紫外、高显指、极窄配光的低温射灯，在维系极致通透及古画材质光鲜度的同时，将照度与曝晒值减到最低，严密呵护顶级国宝的安全。"
  },
  {
    pattern: "hundreds of years, in this halo",
    zh: "*跨越千载沧桑，在盈盈光华里，大自然的无限生趣与宇宙胸怀昭然若揭。*"
  },
  {
    pattern: "thousands of years, in this halo",
    zh: "*跨越千载沧桑，在盈盈光华里，大自然的无限生趣与宇宙胸怀昭然若揭。*"
  },

  // shanghai-fusion-gym
  {
    pattern: "Sports Light Realm",
    zh: "### 律动力量的运动光场\n位于上海前滩太古里，FUSION GYM将前卫的力量感内饰与动感柔和的格线灯槽融合，营造极富科幻魅力的沉浸式力量训练世界。"
  },
  {
    pattern: "Geometric Light Matrix",
    zh: "### 几何光能矩阵"
  },
  {
    pattern: "Material Dialogue",
    zh: "### 材质声情表达"
  },
  {
    pattern: "Comfortable Vision",
    zh: "### 全护眼观感与高级触感\n运用高级深度防眩射灯与柔美二次反射漫射系统，保证激烈运动时的视觉舒爽质度。"
  },
  {
    pattern: "Sweat and light trails",
    zh: "*汗水与光轨交错律动；每一次跳跃，皆在雕琢更加出色的自己。*"
  },

  // suzhou-the-summit
  {
    pattern: "Glowing Box in Suzhou Skyline",
    zh: "### 姑苏天际线的莹亮玉盒\n毗邻金鸡湖畔，双子塔楼延伸苏州传统建筑黑白深灰调性，打造具有未来感的中正地标。裙房借助多层内发光结合烤漆彩釉玻璃，在夜间犹如通透、莹亮的悬空玉盒。"
  },
  {
    pattern: "Glowing Podium",
    zh: "### 发光的立体浮空裙房"
  },
  {
    pattern: "Interactive Silhouette",
    zh: "### 步履投影交互"
  },
  {
    pattern: "LEED-Grade Green Efficiency",
    zh: "### LEED绿色低碳典范\n在大楼空腔幕墙内精妙排布1.5万个超低耗能LED控光点位，严格吻合LEED生态金级建造标准。"
  },
  {
    pattern: "night of Gusu",
    zh: "*夜色姑苏，皎皎银河落凡尘；微光浮空，衬出东方大都会最具现代韵味的浪漫诗篇。*"
  },

  // guangzhou-zeekr-icc
  {
    pattern: "Technological Light Window",
    zh: "### 开启明日的出行动感之窗\n作为极氪首家全球旗舰体验中心，照明舍去花哨，以绝对纯净、温润的高级无主灯光，提炼重金属车的雕塑感，让客户在未来极简时空里感知智驾科技。"
  },
  {
    pattern: "Showroom Facade",
    zh: "### 大气极简的展厅立面"
  },
  {
    pattern: "Circular Focus",
    zh: "### 环幕视觉聚焦"
  },
  {
    pattern: "Masterless Light Space",
    zh: "### 无主灯的高级纯净感\n纯调暗格与不着痕迹的微洗墙配合，使庞大通透的立体交互时空纯净如洗。"
  },
  {
    pattern: "Minimalist light cuts through",
    zh: "*极简之光斩断时空桎梏，拉开面向未来数字宇宙的浩瀚窗帷。*"
  },

  // shanghai-sinan-books
  {
    pattern: "Shining Diamond under Plane Trees",
    zh: "### 法国梧桐树下的睿智发光钻\n坐落于上海思南公馆，这座流动快闪概念书店在夜景中犹如一颗熠熠生辉的钻石。隐于书架后的定制LED网格系统能在闭店后化作数字化流光背景，为这座大都市的人文街区燃起一盏温暖深邃的书香灯火。"
  },
  {
    pattern: "Media Facade",
    zh: "### 数字化多媒体光墙"
  },
  {
    pattern: "Centripetal Array",
    zh: "### 向心围拢布局"
  },
  {
    pattern: "Space Integration",
    zh: "### 弹丸之地的空间微集成"
  },
  {
    pattern: "softest literary dream",
    zh: "*法桐低语，清照书卷；在喧嚣的都会中央，这颗莹莹闪烁的钻石，是无数灵魂最好的精神栖息之所。*"
  },

  // shanghai-hengfeng-bridge
  {
    pattern: "Ripples on Suzhou",
    zh: "### 苏州河畔的光影时空气旋\n荣获A'DESIGN大奖的全球首创多功能景观照明装置。将窄角防眩激光、路投动态水纹完美兼容。夜幕升起，让百年老桥在水波潋滟的曼妙光影中轻舞飞扬。"
  },
  {
    pattern: "Suzhou River",
    zh: "### 苏州河畔的光影时空气旋\n荣获A'DESIGN大奖的全球首创多功能景观照明装置。将窄角防眩激光、路投动态水纹完美兼容。夜幕升起，让百年老桥在水波潋滟的曼妙光影中轻舞飞扬。"
  },
  {
    pattern: "Laser Weaving",
    zh: "### 极光编织"
  },
  {
    pattern: "Ripple Interaction",
    zh: "### 涟漪微步"
  },
  {
    pattern: "Safety and Aesthetics",
    zh: "### 安全驾驭与纯美极境的交融"
  },
  {
    pattern: "light net pours down",
    zh: "*极光如练，轻覆一河悠悠逝水；波影潋滟，倒映出百年风烟与这一瞬的永恒光华。*"
  },

  // hangzhou-ocean-kic
  {
    pattern: "Shining Eye of Night",
    zh: "### 都会新夜态的动感商机之眼\n以“YEAH（夜）”为核心创意。方案将大厦裙房幕墙的可编程流光与下沉广场的光伏灯带群有机融汇，创造出大运河畔极为震撼、兼具科技与欢腾感的潮流夜间重力场。"
  },
  {
    pattern: "Wave Cloud",
    zh: "### 潋滟水波与云影徘徊"
  },
  {
    pattern: "Water Wave Cloud Shadow",
    zh: "### 潋滟水波与云影徘徊"
  },
  {
    pattern: "Commercial Magnetic Field",
    zh: "### 繁华商街的夜间坐标"
  }
];

// Helper to retrieve text content, falling back gracefully to English or translating dynamically to elegant Chinese if lang === 'cn'
const getBlockText = (cnText: string | undefined, enText: string | undefined, lang: Language): string => {
  const cleanCN = (cnText || '').trim();
  const cleanEN = (enText || '').trim();
  
  if (lang === 'cn') {
    if (!cleanCN) {
      const found = TRANSLATION_MAP.find(item => cleanEN.toLowerCase().includes(item.pattern.toLowerCase()));
      if (found) return found.zh;
      return cleanEN;
    }
    
    // Check if it has any Chinese unified ideographs
    const hasChinese = /[\u4e00-\u9fa5]/.test(cleanCN);
    
    if (hasChinese) {
      return cleanCN;
    }
    
    // Check if it is a template/layout artifact pattern
    const isLayoutArtifact = /###\s+n-center|###\s+02col|###\s+n-left|\*lign-center|###\s+LEED/.test(cleanCN);
    if (isLayoutArtifact || !hasChinese) {
      const found = TRANSLATION_MAP.find(item => cleanEN.toLowerCase().includes(item.pattern.toLowerCase()));
      if (found) return found.zh;
    }
    
    return cleanEN;
  }
  
  return cleanEN;
};

interface ProjectDetailProps {
  lang: Language;
}

export default function ProjectDetail({ lang }: ProjectDetailProps) {
  const { id } = useParams<{ id: string }>();
  const { getProject, getPrevAndNext, loading, projects } = useProjects();

  if (loading) {
    return (
      <div className="pt-24 pb-20 bg-white min-h-[80vh] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-gray-100"></div>
            <div className="absolute inset-0 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 animate-pulse">
            {lang === 'cn' ? '光影详情载入中...' : 'LOADING CURATED DETAILS...'}
          </span>
        </div>
      </div>
    );
  }
  
  // Find project by slug or standard numeric ID
  const basicInfo = getProject(id) || projects[0];
  if (!basicInfo) {
    return (
      <div className="pt-24 pb-20 bg-white min-h-[80vh] flex flex-col justify-center items-center">
        <p className="text-neutral-500 mb-4">{lang === 'cn' ? '未找到该项目' : 'Project not found'}</p>
        <Link to="/projects" className="text-sm underline font-bold">{lang === 'cn' ? '返回项目列表' : 'Back to Projects'}</Link>
      </div>
    );
  }
  const projectId = basicInfo.id;

  const completionYear = basicInfo.completion || '2024';
  const yearDigits = completionYear.match(/\d+/)?.[0] || completionYear;

  const project = {
    category: (() => {
      const tagsStr = lang === 'cn' ? basicInfo.tagsCN : basicInfo.tagsEN;
      if (tagsStr) {
        return tagsStr.split(/[,，、]/).map(t => t.trim()).filter(Boolean).join(' / ');
      }
      return lang === 'cn' ? '项目作品' : 'PROJECT';
    })(),
    title: lang === 'cn' ? basicInfo.titleCN : basicInfo.titleEN,
    location: getLocationLabel(basicInfo.location, lang, basicInfo.locationEN),
    heroImage: basicInfo.heroMedia || basicInfo.image, 

    // Metadata Grid (Credits and Designer from CSV)
    metadata: (() => {
      const creditsToUse = (lang === 'cn' ? basicInfo.credits : (basicInfo.creditsEN || basicInfo.credits)) || '';
      let parsedItems: { label: string; value: string }[] = [];
      
      if (creditsToUse) {
        let items: string[] = [];
        if (creditsToUse.includes(';')) {
          items = creditsToUse.split(';').map(s => s.trim()).filter(Boolean);
        } else if (creditsToUse.includes('；')) {
          items = creditsToUse.split('；').map(s => s.trim()).filter(Boolean);
        } else if (creditsToUse.includes('，')) {
          items = creditsToUse.split('，').map(s => s.trim()).filter(Boolean);
        } else {
          items = creditsToUse.split(',').map(s => s.trim()).filter(Boolean);
        }

        parsedItems = items.map(item => {
          const colIndex = item.indexOf('：') !== -1 ? item.indexOf('：') : item.indexOf(':');
          if (colIndex === -1) {
            return {
              label: lang === 'cn' ? '项目详情' : 'Project Detail',
              value: item
            };
          }
          const label = item.slice(0, colIndex).trim();
          const value = item.slice(colIndex + 1).trim();
          return { label, value };
        }).filter(m => m.label && m.value);
      }

      const hasDesignerInCredits = parsedItems.some(item => {
        const l = item.label.toLowerCase();
        return l.includes('设计人员') || l.includes('designer') || l.includes('设计团队') || l.includes('主创') || l.includes('design team');
      });

      const designerToUse = (lang === 'cn' ? (basicInfo.designerCN || basicInfo.designer) : (basicInfo.designerEN || basicInfo.designerCN || basicInfo.designer)) || '';
      const designersToAppend = (!hasDesignerInCredits && designerToUse)
        ? [{ label: lang === 'cn' ? '设计人员' : 'Designers', value: designerToUse }]
        : [];

      const baseList = [
        ...designersToAppend,
        ...parsedItems,
      ];

      if (baseList.length === 0) {
        return [
          { label: lang === 'cn' ? '设计范围' : 'Design Scope', value: lang === 'cn' ? '照明设计' : 'Lighting Design' },
          { label: lang === 'cn' ? '设计团队' : 'Design Team', value: 'RDI Lighting Design' },
        ];
      }

      return baseList.filter(item => {
        const l = item.label.trim();
        return l !== '完成年份' && l !== 'Completion Year' && l !== '完成时间' && l !== 'Completion';
      });
    })(),

    // Curated concept description text from CSV block metadata
    description1: (lang === 'cn' ? basicInfo.conceptCN : basicInfo.conceptEN)
      ? (
          <p className="text-[18px] leading-[1.8] text-gray-700 whitespace-pre-line text-left">
            {lang === 'cn' ? basicInfo.conceptCN : basicInfo.conceptEN}
          </p>
        )
      : null
  };

  // Find next and previous projects
  const { prev: prevProject, next: nextProject } = getPrevAndNext(projectId);

  return (
    <div className="bg-white">
      {/* 1. Hero Section - 全屏英雄区 */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        {project.heroImage.endsWith('.mp4') || project.heroImage.includes('.mp4') ? (
          <video 
            src={project.heroImage}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img 
            src={project.heroImage.includes('unsplash.com') ? `${project.heroImage}?auto=format&fit=crop&q=95&w=2400` : project.heroImage} 
            alt="Project Hero"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        {/* 透明深色渐变覆盖，保证文字清晰 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* 顶部导航按钮 */}
        <div className="absolute top-10 left-0 right-0 pt-16 px-10 flex justify-center">
          <div className="w-full max-w-[1280px]">
            <Link to="/projects" className="text-white hover:opacity-50 transition-opacity flex items-center gap-2 w-fit">
              <ArrowLeft size={20} />
            </Link>
          </div>
        </div>

        {/* 核心标题区 */}
        <div className="absolute bottom-24 left-0 right-0 px-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[1280px]"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/80 block mb-4">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 uppercase">
              {project.title}
            </h1>
            <p className="text-sm md:text-base font-medium tracking-wide text-white/70 uppercase">
              {project.location}
            </p>
            {yearDigits && (
              <p className="text-sm md:text-base font-mono tracking-[0.2em] text-white/50 mt-2">
                {yearDigits}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* 2. Metadata Grid - 参数信息网格 */}
      <section className="px-10 py-20 border-b border-gray-100 flex justify-center">
        <div className="w-full max-w-[1280px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-y-12 gap-x-8">
          {project.metadata.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</h4>
              <p className="text-[15px] font-bold text-black leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Content Blocks or Fallback Content */}
      {basicInfo.blocks && basicInfo.blocks.length > 0 ? (
        <div className="space-y-0">
          {basicInfo.blocks.map((block, idx) => {
            const blockKey = `block-${idx}-${block.type}`;
            
            if (block.type === 'text_1col') {
              const textContent = getBlockText(block.c1_cn, block.c1_en, lang);
              if (!textContent) return null;
              const rawHtml = marked.parse(preprocessMarkdown(textContent), { breaks: true }) as string;
              return (
                <section key={blockKey} className="px-10 py-24 bg-white flex justify-center border-b border-gray-100">
                  <div className="max-w-4xl w-full text-center">
                    <div 
                      className="text-[18px] md:text-[20px] leading-[1.9] text-neutral-800 font-light text-left md:text-center
                                 [&_h3]:text-[24px] [&_h3]:md:text-[30px] [&_h3]:font-extrabold [&_h3]:text-black [&_h3]:mb-12 [&_h3]:mt-2 [&_h3]:text-center [&_h3]:tracking-[0.05em]
                                 [&_p]:mb-4 [&_p]:last:mb-0 [&_p]:text-neutral-700 [&_p]:leading-[1.9] [&_p]:text-left [&_p]:md:text-center"
                      dangerouslySetInnerHTML={{ __html: rawHtml }}
                    />
                  </div>
                </section>
              );
            }

            if (block.type === 'text_2col') {
              const textLeft = getBlockText(block.c1_cn, block.c1_en, lang);
              const textRight = getBlockText(block.c2_cn, block.c2_en, lang);
              if (!textLeft && !textRight) return null;
              const htmlLeft = textLeft ? (marked.parse(preprocessMarkdown(textLeft), { breaks: true }) as string) : '';
              const htmlRight = textRight ? (marked.parse(preprocessMarkdown(textRight), { breaks: true }) as string) : '';
              return (
                <section key={blockKey} className="px-10 py-24 bg-[#fafafa] flex justify-center border-b border-gray-100">
                  <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div 
                      className="text-[17px] leading-[1.8] text-neutral-700 font-light text-left
                                 [&_h3]:text-[22px] [&_h3]:font-extrabold [&_h3]:text-black [&_h3]:mb-9 [&_h3]:mt-2 [&_h3]:text-left [&_h3]:tracking-[0.05em]
                                 [&_p]:mb-4 [&_p]:last:mb-0 [&_p]:text-neutral-600 [&_p]:leading-[1.8]"
                      dangerouslySetInnerHTML={htmlLeft ? { __html: htmlLeft } : undefined}
                    />
                    <div 
                      className="text-[17px] leading-[1.8] text-neutral-700 font-light text-left
                                 [&_h3]:text-[22px] [&_h3]:font-extrabold [&_h3]:text-black [&_h3]:mb-9 [&_h3]:mt-2 [&_h3]:text-left [&_h3]:tracking-[0.05em]
                                 [&_p]:mb-4 [&_p]:last:mb-0 [&_p]:text-neutral-600 [&_p]:leading-[1.8]"
                      dangerouslySetInnerHTML={htmlRight ? { __html: htmlRight } : undefined}
                    />
                  </div>
                </section>
              );
            }

            if (block.type === 'image_full') {
              const imageUrl = (block.c1_cn || block.c1_en || '').trim();
              if (!imageUrl) return null;
              return (
                <section key={blockKey} className="w-full h-[55vh] md:h-[75vh] overflow-hidden relative border-b border-gray-100 bg-neutral-50">
                  {imageUrl.endsWith('.mp4') || imageUrl.includes('.mp4') ? (
                    <video 
                      src={imageUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img 
                      src={imageUrl} 
                      alt="Full Width View" 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                  )}
                </section>
              );
            }

            if (block.type === 'text_img') {
              const isTextLeft = block.style && (block.style.toLowerCase().includes('left') || block.style.toLowerCase().includes('左'));
              const textContent = getBlockText(block.c1_cn, block.c1_en, lang);
              const imgUrl = (block.c2_cn || block.c2_en || '').trim();
              if (!textContent && !imgUrl) return null;
              const textHtml = textContent ? (marked.parse(preprocessMarkdown(textContent), { breaks: true }) as string) : '';
              return (
                <section key={blockKey} className="px-10 py-24 bg-white flex justify-center border-b border-gray-100">
                  <div className="max-w-[1280px] w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className={`md:col-span-5 space-y-6 ${isTextLeft ? 'md:order-1' : 'md:order-2'}`}>
                      <div 
                        className="text-[17px] leading-[1.8] text-neutral-700 font-light text-left
                                   [&_h3]:text-[22px] [&_h3]:font-extrabold [&_h3]:text-black [&_h3]:mb-9 [&_h3]:mt-2 [&_h3]:text-left [&_h3]:tracking-[0.05em]
                                   [&_p]:mb-4 [&_p]:last:mb-0 [&_p]:text-neutral-600 [&_p]:leading-[1.8]"
                        dangerouslySetInnerHTML={textHtml ? { __html: textHtml } : undefined}
                      />
                    </div>
                    {imgUrl && (
                      <div className={`md:col-span-7 ${isTextLeft ? 'md:order-2' : 'md:order-1'} h-[40vh] md:h-[55vh] overflow-hidden bg-neutral-50 relative group`}>
                        {imgUrl.endsWith('.mp4') || imgUrl.includes('.mp4') ? (
                          <video src={imgUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        ) : (
                          <img src={imgUrl} alt="Visual Detail" className="w-full h-full object-cover hover:scale-102 transition-transform duration-[1.2s]" referrerPolicy="no-referrer" />
                        )}
                      </div>
                    )}
                  </div>
                </section>
              );
            }

            if (block.type === 'image_grid') {
              const urls = (block.c1_cn || block.c1_en || '').split(',')
                .map((s: string) => s.trim())
                .filter((s: string) => s.length > 0 && (s.startsWith('http') || s.startsWith('/') || s.includes('.')));
              
              if (urls.length === 0) return null;
              const isOneTwoStyle = block.style && (block.style.toLowerCase().includes('1-2') || block.style.toLowerCase().includes('左大'));

              return (
                <section key={blockKey} className="px-10 py-24 bg-white flex justify-center border-b border-gray-100">
                  <div className="w-full max-w-[1280px]">
                    {isOneTwoStyle && urls.length >= 2 ? (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                        <div className="md:col-span-7 h-[45vh] md:h-[65vh] overflow-hidden bg-neutral-50 relative group">
                          {urls[0].endsWith('.mp4') || urls[0].includes('.mp4') ? (
                            <video src={urls[0]} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000" />
                          ) : (
                            <img src={urls[0]} alt="Grid item 1" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000" referrerPolicy="no-referrer" />
                          )}
                        </div>
                        <div className="md:col-span-5 flex flex-col gap-2">
                          {urls.slice(1).map((url, subIdx) => (
                            <div key={subIdx} className="h-[20vh] md:h-[30vh] overflow-hidden bg-neutral-50 relative group">
                              {url.endsWith('.mp4') || url.includes('.mp4') ? (
                                <video src={url} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000" />
                              ) : (
                                <img src={url} alt={`Grid item ${subIdx + 2}`} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000" referrerPolicy="no-referrer" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="columns-1 sm:columns-2 lg:columns-3 gap-2 space-y-2">
                        {urls.map((url, imgIdx) => (
                          <div key={imgIdx} className="break-inside-avoid overflow-hidden bg-neutral-50 relative group shadow-sm hover:shadow-md transition-all duration-700">
                            {url.endsWith('.mp4') || url.includes('.mp4') ? (
                              <video src={url} autoPlay loop muted playsInline className="w-full h-auto object-cover max-h-[80vh]" />
                            ) : (
                              <img src={url} alt={`Gallery item ${imgIdx + 1}`} className="w-full h-auto object-cover max-h-[80vh] hover:scale-102 transition-transform duration-1000" referrerPolicy="no-referrer" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </section>
              );
            }

            return null;
          })}
        </div>
      ) : (
        <>
          {/* 3. Concept Section - 项目理念 */}
          {project.description1 && (
            <section className="px-10 py-32 bg-gray-50/50 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.4em] text-black/40 mb-12">
                  {lang === 'cn' ? '设计理念' : 'DESIGN CONCEPT'}
                </h2>
                <div className="text-[18px] text-gray-700 leading-relaxed font-normal text-left md:columns-1 gap-12">
                  {project.description1}
                </div>
              </div>
            </section>
          )}

          {/* Dynamic Asymmetrical Gallery Grid */}
          {basicInfo.gallery && basicInfo.gallery.length > 0 && (
            <section className="px-10 py-24 bg-white flex justify-center">
              <div className="w-full max-w-[1280px]">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.4em] text-black/40 mb-16 text-center">
                  {lang === 'cn' ? '项目精选画廊' : 'CURATED GALLERY'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-stretch">
                  {basicInfo.gallery.map((imgUrl, index) => {
                    let colSpanClass = 'md:col-span-6';
                    let heightClass = 'h-[40vh] md:h-[55vh]';
                    
                    if (basicInfo.gallery!.length === 1) {
                      colSpanClass = 'md:col-span-12';
                      heightClass = 'h-[50vh] md:h-[75vh]';
                    } else if (basicInfo.gallery!.length === 2) {
                      colSpanClass = index === 0 ? 'md:col-span-7' : 'md:col-span-5';
                      heightClass = 'h-[45vh] md:h-[65vh]';
                    } else if (basicInfo.gallery!.length === 3) {
                      if (index === 0) {
                        colSpanClass = 'md:col-span-12';
                        heightClass = 'h-[50vh] md:h-[75vh]';
                      } else if (index === 1) {
                        colSpanClass = 'md:col-span-8';
                        heightClass = 'h-[40vh] md:h-[55vh]';
                      } else {
                        colSpanClass = 'md:col-span-4';
                        heightClass = 'h-[40vh] md:h-[55vh]';
                      }
                    } else {
                      if (index % 3 === 0) {
                        colSpanClass = 'md:col-span-8';
                        heightClass = 'h-[40vh] md:h-[60vh]';
                      } else if (index % 3 === 1) {
                        colSpanClass = 'md:col-span-4';
                        heightClass = 'h-[40vh] md:h-[60vh]';
                      } else {
                        colSpanClass = 'md:col-span-12';
                        heightClass = 'h-[45vh] md:h-[65vh]';
                      }
                    }

                    return (
                      <div 
                        key={index} 
                        className={`${colSpanClass} ${heightClass} overflow-hidden bg-gray-50 group shadow-sm hover:shadow-lg transition-all duration-700 relative`}
                      >
                        {imgUrl.endsWith('.mp4') || imgUrl.includes('.mp4') ? (
                          <video 
                            src={imgUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        ) : (
                          <img
                            src={imgUrl}
                            alt={`${project.title} gallery view ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* 4. Pagination - 翻页导航 */}
      <section className="px-10 py-20 flex justify-center bg-white border-none">
        <div className="w-full max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Previous Project Button */}
          {prevProject ? (
            <Link 
              to={`/project/${prevProject.slug || prevProject.id}`} 
              className="flex items-center gap-3 group text-left max-w-full md:max-w-[350px] w-full md:w-auto"
            >
              <ChevronLeft size={20} className="text-gray-300 group-hover:text-black group-hover:-translate-x-1 transition-all shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">
                  {lang === 'cn' ? '上一个' : 'PREVIOUS'}
                </span>
                <span className="text-xs font-bold uppercase transition-colors group-hover:text-black line-clamp-1 leading-normal">
                  {lang === 'cn' ? prevProject.titleCN : prevProject.titleEN}
                </span>
              </div>
            </Link>
          ) : <div className="hidden md:block w-[350px]" />}

          {/* More Projects in the Center */}
          <Link 
            to="/projects" 
            className="text-[14px] font-bold uppercase tracking-[0.4em] text-gray-900 hover:opacity-60 transition-opacity whitespace-nowrap py-2 md:py-0"
          >
            {lang === 'cn' ? '更多作品' : 'More Projects'}
          </Link>

          {/* Next Project Button */}
          {nextProject ? (
            <Link 
              to={`/project/${nextProject.slug || nextProject.id}`} 
              className="flex items-center gap-3 group text-right max-w-full md:max-w-[350px] w-full md:w-auto justify-end"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">
                  {lang === 'cn' ? '下一个' : 'NEXT'}
                </span>
                <span className="text-xs font-bold uppercase transition-colors group-hover:text-black line-clamp-1 leading-normal">
                  {lang === 'cn' ? nextProject.titleCN : nextProject.titleEN}
                </span>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ) : <div className="hidden md:block w-[350px]" />}
        </div>
      </section>
    </div>
  );
}
