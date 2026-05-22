export interface ResearchItem {
  id: string;
  titleCN: string;
  titleEN: string;
  category: string;
  image: string;
  date?: string;
  url?: string;
  aspect?: string;
  span?: string;
  contentEN?: string;
  contentCN?: string;
  gallery?: string[];
  location?: string;
}

export const researchData: ResearchItem[] = [
  {
    id: '1',
    titleCN: '城市之光：街道照明研究',
    titleEN: 'Urban Light: Street Lighting Study',
    category: 'URBAN',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72',
    date: '2026.04.15',
    aspect: 'aspect-[3/4] md:aspect-auto h-full min-h-[300px]',
    span: 'md:row-span-2',
    location: 'Berlin, Germany',
    contentEN: 'Our urban lighting research focuses on how smart LED technology can transform city nightscapes while reducing energy consumption by up to 40%.',
    contentCN: '我们的城市照明研究重点关注智能 LED 技术如何在将能源消耗降低高达 40% 的同时，重塑城市夜景。',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457'
    ]
  },
  {
    id: '2',
    titleCN: '博物馆照明系统的演变',
    titleEN: 'Evolution of Museum Lighting Systems',
    category: 'CULTURAL',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f',
    date: '2026.03.11',
    aspect: 'aspect-square',
    span: '',
    location: 'Paris, France',
    contentEN: 'Exploring the transition from halogen to fiber optics and high-CRI LED solutions in preserving world-class artifacts.',
    contentCN: '探索在保护世界级文物过程中，从卤素灯到光纤及其高显色指数 LED 解决方案的转变。',
    gallery: [
      'https://images.unsplash.com/photo-1565019053026-6202497042a9'
    ]
  },
  {
    id: '3',
    titleCN: '极简主义光影美学',
    titleEN: 'Minimalist Light Aesthetics',
    category: 'DESIGN',
    image: 'https://images.unsplash.com/photo-1518005020251-58296d8f8d7d',
    date: '2026.02.20',
    aspect: 'aspect-video md:aspect-auto h-full',
    span: 'md:col-span-2'
  },
  {
    id: '4',
    titleCN: '光环境对心理的影响',
    titleEN: 'Circadian Rhythm & Light Environment',
    category: 'WELLNESS',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
    date: '2026.01.18',
    aspect: 'aspect-[4/5] md:aspect-auto h-full min-h-[400px]',
    span: 'md:row-span-2'
  },
  {
    id: '5',
    titleCN: '可持续性照明技术',
    titleEN: 'Sustainable Lighting Technology',
    category: 'TECH',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab',
    date: '2025.12.05',
    aspect: 'aspect-square',
    span: ''
  },
  {
    id: '6',
    titleCN: '建筑投影艺术',
    titleEN: 'Architectural Projection Mapping',
    category: 'ART',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c',
    date: '2025.11.12',
    aspect: 'aspect-[3/2] md:aspect-auto h-full',
    span: 'md:col-span-2'
  },
];
