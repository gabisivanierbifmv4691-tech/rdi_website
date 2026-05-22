export interface ProjectBlock {
  order: number;
  type: string;
  style: string;
  c1_cn: string;
  c1_en: string;
  c2_cn: string;
  c2_en: string;
}

export interface Project {
  id: number;
  slug?: string;
  titleCN: string;
  titleEN: string;
  location: string;
  locationEN?: string;
  category: string;
  image: string;
  aspect?: string;
  span?: string;
  url?: string;
  heroMedia?: string;
  gallery?: string[];
  conceptCN?: string;
  conceptEN?: string;
  completion?: string;
  designer?: string;
  designerCN?: string;
  designerEN?: string;
  credits?: string;
  creditsEN?: string;
  blocks?: ProjectBlock[];
}

export const projectsData: Project[] = [
  { 
    id: 1, 
    slug: 'shanghai-psa',
    titleCN: '上海当代艺术博物馆展厅照明', 
    titleEN: 'Shanghai Power Station of Art Exhibition Lighting', 
    location: '上海', 
    locationEN: 'Shanghai',
    category: 'CULTURAL',
    image: 'https://rdilighting.com/projects/shanghai-psa/hero-image.jpg',
    heroMedia: 'https://rdilighting.com/projects/shanghai-psa/hero-image.jpg',
    aspect: 'aspect-[1/1] md:aspect-auto h-full min-h-[300px]', 
    span: 'md:row-span-2',
    gallery: ['https://rdilighting.com/projects/shanghai-psa/01.webp', 'https://rdilighting.com/projects/shanghai-psa/02.webp'],
    conceptCN: '该博物馆于2012年10月1日开馆，是中国大陆第一家公立的当代艺术博物馆。本项目的设计目标是实现艺术品与观众之间的视觉互动，为观众提供舒适的光照环境。设计着眼于整个艺术博物馆中观众的流线和艺术品的展陈关系。从定位和整体策略上来说，现代艺术的展馆摒弃把环境打得很暗，将展品照得很亮的高对比照明手法，而是采用明亮、简洁的照明方式。一方面缓解视觉疲劳，另一方面更好地展示艺术品的特色。综合节能与效果，采用LED照明，展品表面照度在300—400lx之间，环境照度100lx左右。在20米高空使用6度精确光束角解决光斑控制难题，不出现光逸散。',
    conceptEN: 'Opened on October 1, 2012, this is the first public contemporary art museum in mainland China. The design goal is to realize visual interaction between artworks and audiences, providing a comfortable lighting environment. The design focuses on the audience\'s circulation and the display relationship of the artworks. Strategically, it abandons the traditional high-contrast lighting of making the environment dark and exhibits bright, instead adopting a bright and concise lighting method. This relieves visual fatigue and better displays the characteristics of the artworks. It uses energy-efficient LED lighting with exhibit surface illuminance of 300-400lx and ambient illuminance of 100lx, and successfully addresses the challenge of 20-meter high space lighting using precise 6-degree beam angles to prevent light spill.',
    completion: '2012',
    designer: '胡国剑',
    credits: '业主单位: 上海世博土地控股有限公司, 建筑设计单位: 同济大学建筑设计研究院, 主建筑师: 章明, 照明设计单位: KGM瑞国际照明设计/上海傲特盛照明电器有限公司, 主设计师: 胡国剑, 施工单位: 上海建工二建集团有限公司'
  },
  { 
    id: 2, 
    slug: 'nanjing-baiyunting',
    titleCN: '南京白云亭文化艺术中心一期', 
    titleEN: 'Nanjing Baiyunting Cultural and Art Center', 
    location: '南京', 
    locationEN: 'Nanjing',
    category: 'CULTURAL',
    image: 'https://rdilighting.com/projects/nanjing-baiyunting/hero-video.mp4',
    heroMedia: 'https://rdilighting.com/projects/nanjing-baiyunting/hero-video.mp4',
    aspect: 'aspect-square', 
    span: '',
    gallery: ['https://rdilighting.com/projects/nanjing-baiyunting/01.webp', 'https://rdilighting.com/projects/nanjing-baiyunting/02.webp'],
    conceptCN: '建筑外形设计理念来源于全新的设计文化以及当代的先锋包裹艺术。建筑幕墙大面积使用了折扇型的银灰色冲孔铝板，将原有建筑体包裹在内，整体外观在日间仿佛云彩般轻盈、灵动。照明设计意图将建筑形体的体量感以及通透感在夜间得以延续。方案在建筑外幕墙背后的框架结构上设置LED线条灯具，向内侧的实墙投光，将其均匀打亮作为内部背光。反射的光线透过外层的冲孔铝板，使建筑整体形成了好似轻盈，明亮的灯笼一般的灯光效果。室内空间的照明设计结合建筑空间语言，充分利用与调和自然采光与人工光，拟定了多种合理的照明场景模式。',
    conceptEN: 'The architectural design concept originates from new design culture and contemporary avant-garde wrapping art. The curtain wall uses folded fan-shaped silver-gray perforated aluminum panels, wrapping the original building and making the exterior look light and agile like clouds during the day. The lighting design continues this sense of volume and transparency at night. LED linear lights are installed on the frame structure behind the exterior curtain wall to illuminate the solid wall inside, serving as internal backlighting. Reflected light passes through the perforated panels, creating a bright lantern-like effect. The interior lighting design combines architectural language, harmonizing natural and artificial light, and defines various rational lighting scene modes.',
    completion: '2015',
    designer: '胡国剑',
    credits: '业主: 南京白云亭文化艺术中心, 建筑师: 上海都设建筑设计有限公司, 摄影师: 苏圣亮/胡国剑'
  },
  { 
    id: 3, 
    slug: 'shanghai-nhm',
    titleCN: '上海自然博物馆室内展陈照明设计', 
    titleEN: 'Shanghai Natural History Museum Interior Exhibition Lighting', 
    location: '上海', 
    locationEN: 'Shanghai',
    category: 'CULTURAL',
    image: 'https://rdilighting.com/projects/shanghai-nhm/hero-image.jpg',
    heroMedia: 'https://rdilighting.com/projects/shanghai-nhm/hero-image.jpg',
    aspect: 'aspect-square', 
    span: 'md:col-span-2',
    gallery: ['https://rdilighting.com/projects/shanghai-nhm/01.webp', 'https://rdilighting.com/projects/shanghai-nhm/02.webp', 'https://rdilighting.com/projects/shanghai-nhm/03.webp'],
    conceptCN: '上海自然博物馆建筑设计灵感来源于“螺”的壳体结构。与传统博物馆不同的是，自然光成为展厅的重要的光源之一。在照明设计中，制定了视觉与展示、生态与科学、低炭与绿色三大原则。考虑到人工光和自然光的交接与转化过程中的视觉舒适性，采用了透视幕帘巧妙平衡室内展示照明和室外自然光，既可欣赏馆外景观，又避免高对比眩光。同时通过智能控制系统根据白天自然光的变化调节合适的照明等级。针对不同主题展厅灵活应用LED投射灯、深色导轨灯、发光灯箱等多种手段，并严格控制对光敏感展品（皮毛、动物标本等）的曝光量。',
    conceptEN: 'The architectural design of the Shanghai Natural History Museum is inspired by the nautilus shell structure. Unlike traditional museums, natural light is an important light source for the exhibition halls. The lighting design follows three principles: visual and display, ecological and scientific, and low-carbon and green. To ensure visual comfort during the transition between artificial and natural light, perspective curtains are used to ingeniously balance indoor exhibition lighting and outdoor natural light, allowing outside views while avoiding high-contrast glare. An intelligent control system adjusts appropriate lighting levels based on natural daylight changes. Various methods such as LED projection lights, dark track lights, and luminous light boxes are flexibly applied to different thematic exhibition halls, while strictly controlling the exposure of light-sensitive exhibits (fur, specimens, etc.).',
    completion: '2012',
    designer: '胡国剑',
    credits: '设计: 美国的帕金斯威尔建筑设计公司/同济大学设计集团, 业主: 上海科技馆, 照明设计: KGM瑞国际照明设计'
  },
  { 
    id: 4, 
    slug: 'zhengzhou-greenland',
    titleCN: '郑州绿地中心——千禧广场', 
    titleEN: 'Zhengzhou Greenland Center - Millennium Plaza', 
    location: '郑州', 
    locationEN: 'Zhengzhou',
    category: 'OFFICE',
    image: 'https://rdilighting.com/projects/zhengzhou-greenland/hero-video.mp4',
    heroMedia: 'https://rdilighting.com/projects/zhengzhou-greenland/hero-video.mp4',
    aspect: 'aspect-square', 
    span: '',
    gallery: ['https://rdilighting.com/projects/zhengzhou-greenland/01.webp', 'https://rdilighting.com/projects/zhengzhou-greenland/02.webp'],
    conceptCN: '郑州绿地中心高280米，外形充满了东方特色。照明设计考虑的第一要素是采光，特别是解决21层高、位于建筑中上部的酒店大堂采光问题。设计在塔顶正中间设置了一个开口，利用倾角控制的镜面反射材料，将阳光最大量地引入建筑物内部中庭并漫射开来。在夜间，镜面材料结构还能够结合灯光呈现出烟花一般的形态效果。在建筑外观照明方面，针对带有转折角度的幕墙，上部采用较窄的光束角，下部采用较宽的光束角，将灯具隐藏在每段平台上，使光和建筑自然协调统一。',
    conceptEN: 'Zhengzhou Greenland Center is 280 meters tall with an Oriental-style exterior. The primary consideration of the lighting design was natural daylighting, specifically solving the lighting for the 21-story hotel lobby located in the upper middle of the building. An opening was created in the center of the tower\'s top, using angle-controlled mirror reflective materials to guide maximum sunlight into the building\'s atrium where it diffuses. At night, this mirrored structure combines with lighting to create a firework-like effect. For exterior lighting, on curtain walls with turning angles, narrow beam angles were used for the upper part and wide beam angles for the lower part. Fixtures are hidden on platforms to harmonize light and architecture naturally.',
    completion: '2012',
    designer: '胡国剑',
    credits: '设计: 美国SOM设计事务所/上海华东建筑设计研究院, 业主: 绿地集团, 照明设计: KGM瑞国际照明设计'
  },
  { 
    id: 5, 
    titleCN: '现代博物馆', 
    titleEN: 'Modern Museum', 
    location: 'Zurich', 
    category: 'CULTURAL',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    aspect: 'aspect-square', 
    span: '' 
  },
  { 
    id: 6, 
    titleCN: '卡萨尔斯论坛', 
    titleEN: 'Casals Forum', 
    location: 'Kronberg', 
    category: 'CULTURAL',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    aspect: 'aspect-[4/2] md:aspect-auto h-full', 
    span: 'md:col-span-2' 
  },
  { 
    id: 7, 
    titleCN: '办公中庭', 
    titleEN: 'Office Atrium', 
    location: 'Vienna', 
    category: 'OFFICE',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c',
    aspect: 'aspect-square', 
    span: '' 
  },
  { 
    id: 8, 
    titleCN: '住宅区', 
    titleEN: 'Residential Quarter', 
    location: 'Munich', 
    category: 'LANDSCAPE',
    image: 'https://images.unsplash.com/photo-1550966841-3ee7adac166c',
    aspect: 'aspect-square', 
    span: '' 
  },
  { 
    id: 9, 
    titleCN: '灯光秀', 
    titleEN: 'Light Installation', 
    location: 'Barcelona', 
    category: 'ART',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
    aspect: 'aspect-[8/16] md:aspect-auto h-full min-h-[500px]', 
    span: 'md:row-span-2' 
  },
  { 
    id: 10, 
    titleCN: '未来中心', 
    titleEN: 'Future Center', 
    location: 'Frankfurt', 
    category: 'CULTURAL',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b',
    aspect: 'aspect-square', 
    span: '' 
  },
  { 
    id: 11, 
    titleCN: '城市地标', 
    titleEN: 'City Landmark', 
    location: 'London', 
    category: 'LANDSCAPE',
    image: 'https://images.unsplash.com/photo-1449156001437-33a3427ec7a0',
    aspect: 'aspect-[4/2]', 
    span: 'md:col-span-2' 
  },
  { 
    id: 12, 
    titleCN: '图书馆', 
    titleEN: 'Public Library', 
    location: 'Stockholm', 
    category: 'CULTURAL',
    image: 'https://images.unsplash.com/photo-1493397212122-2b85def82820',
    aspect: 'aspect-square', 
    span: '' 
  },
  { 
    id: 13, 
    titleCN: '会议中心', 
    titleEN: 'Conference Hall', 
    location: 'Geneva', 
    category: 'CULTURAL',
    image: 'https://images.unsplash.com/photo-1478147427282-58a87a120781',
    aspect: 'aspect-[16/9] lg:aspect-auto h-full', 
    span: 'lg:col-span-3' 
  },
  { 
    id: 14, 
    titleCN: '地下通道', 
    titleEN: 'Subway Lighting', 
    location: 'Hamburg', 
    category: 'LANDSCAPE',
    image: 'https://images.unsplash.com/photo-1428360935559-478bd993039d',
    aspect: 'aspect-square', 
    span: '' 
  },
  { 
    id: 15, 
    titleCN: '空中花园', 
    titleEN: 'Sky Garden', 
    location: 'Singapore', 
    category: 'LANDSCAPE',
    image: 'https://images.unsplash.com/photo-1469022563428-aa04fef9f5a7',
    aspect: 'aspect-[2/4] md:aspect-auto h-full min-h-[300px]', 
    span: 'md:row-span-2' 
  },
  { 
    id: 16, 
    titleCN: '大堂设计', 
    titleEN: 'Lobby Design', 
    location: 'Dubai', 
    category: 'HOSPITALITY',
    image: 'https://images.unsplash.com/photo-1490100667990-4fced8021649',
    aspect: 'aspect-square', 
    span: '' 
  },
  { 
    id: 17, 
    titleCN: '历史外立面', 
    titleEN: 'Historic Facade', 
    location: 'Rome', 
    category: 'CULTURAL',
    image: 'https://images.unsplash.com/photo-1496568816309-51d7c7083121',
    aspect: 'aspect-square', 
    span: '' 
  },
  { 
    id: 18, 
    titleCN: '光之雕塑', 
    titleEN: 'Light Sculpture', 
    location: 'Tokyo', 
    category: 'ART',
    image: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff',
    aspect: 'aspect-[4/2] md:aspect-auto h-full', 
    span: 'md:col-span-2' 
  },
  { 
    id: 19, 
    titleCN: '南京秦淮·长乐坊', 
    titleEN: 'Nanjing Changlefang', 
    location: 'Nanjing', 
    category: 'LANDSCAPE',
    image: 'https://images.unsplash.com/photo-1547989453-11e67ffb3885',
    aspect: 'aspect-square', 
    span: '' 
  },
];
