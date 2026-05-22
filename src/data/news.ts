export interface NewsItem {
  id: string;
  titleCN: string;
  titleEN: string;
  date: string;
  category: string;
  image: string;
  url?: string;
  aspect?: string;
  span?: string;
  contentEN?: string;
  contentCN?: string;
  gallery?: string[];
  location?: string;
}

export const newsData: NewsItem[] = [
  {
    id: '1',
    titleCN: 'rdi 荣获 2024 年度照明设计大奖',
    titleEN: 'rdi Wins 2024 Lighting Design Awards',
    date: '2024.05.15',
    category: 'AWARDS',
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457',
    aspect: 'aspect-square',
    span: 'md:row-span-2',
    location: 'Berlin, Germany',
    contentEN: 'rdi international lighting has been awarded the 2024 Lighting Design Award for its groundbreaking work in sustainable urban lighting. The jury praised our innovative approach to reducing light pollution while enhancing safety.',
    contentCN: 'rdi 国际照明凭借其在可持续城市照明领域的开创性成果，荣获 2024 年度照明设计大奖。评委会对我们在减少光污染、提高安全性方面的创新方法给予了高度评价。',
    gallery: [
      'https://images.unsplash.com/photo-1565019053026-6202497042a9',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
    ]
  },
  {
    id: '2',
    titleCN: '关于城市夜景可持续发展的探讨',
    titleEN: 'Discussion on Sustainable Urban Nightscapes',
    date: '2024.04.22',
    category: 'NEWS',
    image: 'https://images.unsplash.com/photo-1518005020251-58296d8f8d7d',
    aspect: 'aspect-square',
    span: '',
    location: 'Shanghai, China',
    contentEN: 'Our latest panel discussion at the Lighting Summit explored how modern cities can balance aesthetic appeal with energy efficiency. Experts shared insights on the next generation of LED technologies.',
    contentCN: '近期在照明峰会上进行的专题讨论探索了现代城市如何平衡美学吸引力与能源效率。专家们分享了关于下一代 LED 技术的见解。',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2'
    ]
  },
  {
    id: '3',
    titleCN: 'rdi 受邀参加米兰设计周',
    titleEN: 'rdi Invited to Milan Design Week',
    date: '2024.04.10',
    category: 'EVENT',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
    aspect: 'aspect-square',
    span: 'md:col-span-2'
  },
  {
    id: '4',
    titleCN: '光影工作坊：探索未来的照明材料',
    titleEN: 'Light Workshop: Exploring Future Materials',
    date: '2024.03.15',
    category: 'WORKSHOP',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    aspect: 'aspect-[4/5] md:aspect-auto h-full min-h-[400px]',
    span: 'md:row-span-2'
  },
  {
    id: '5',
    titleCN: 'rdi 柏林办公室正式成立',
    titleEN: 'rdi Berlin Office Officially Established',
    date: '2024.02.28',
    category: 'ANNOUNCEMENT',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    aspect: 'aspect-square',
    span: ''
  },
  {
    id: '6',
    titleCN: '灯光节开幕：城市的光影狂欢',
    titleEN: 'Light Festival Opening: Urban Light Carnival',
    date: '2024.02.10',
    category: 'FESTIVAL',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    aspect: 'aspect-[3/2] md:aspect-auto h-full',
    span: 'md:col-span-2'
  },
  {
    id: '7',
    titleCN: '3x10而励 - 都设+WEICO+RDI联合展即将开幕',
    titleEN: '3x10 Exhibition - Joint Exhibition of DSD + WEICO + RDI',
    date: '2025.09.09',
    category: 'EXHIBITION',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12',
    aspect: 'aspect-[2/1]',
    span: 'md:col-span-2',
    location: 'Shanghai, China'
  },
  {
    id: '8',
    titleCN: '光语无形 智感共生 ｜ CAUP光影秀闪耀，致敬2026国际光日（上）',
    titleEN: 'CAUP Light Show Shines, Saluting 2026 International Day of Light (Part I)',
    date: '2026.05.15',
    category: 'EXHIBITION',
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7',
    aspect: 'aspect-square',
    span: '',
    location: 'Shanghai, China',
    contentCN: '5月11日晚，同济大学建筑与城市规划学院 CAUP 红楼钟庭化作光影交织的奇幻秘境。联合国教科文组织（UNESCO）“国际光日”注册活动暨2026年建筑物理光环境课程作业展示评审活动璀璨启幕。',
    contentEN: 'On the evening of May 11, the Red Building Courtyard at Tongji University CAUP transformed into a fantasy realm of interwoven light and shadow. The UNESCO registered event and the 2026 Architectural Lighting Coursework Exhibition commenced.'
  },
  {
    id: '9',
    titleCN: '致敬劳动 不负耕耘 ｜ RDI五一劳动节特别致敬',
    titleEN: 'Tribute to Labor, Fulfilling Diligence | RDI Labor Day Special Dedication',
    date: '2026.05.01',
    category: 'FESTIVAL',
    image: 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b',
    aspect: 'aspect-square',
    span: '',
    location: 'Shanghai, China',
    contentCN: 'RDI及全体员工，向每一位辛勤耕耘的奋斗者致以诚挚敬意！祝大家五一劳动节快乐，诸事顺遂，劳有所获，岁岁安康！',
    contentEN: 'RDI wishes you and your family a happy Labor Day, good health and every success in work.'
  }
];
