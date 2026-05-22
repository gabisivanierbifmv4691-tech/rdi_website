export interface HomeGridItem {
  id: number;
  titleCN: string;
  titleEN: string;
  locationCN: string;
  locationEN: string;
  image: string;
  gridArea: string;
  url?: string;
}

export const homeGridData: HomeGridItem[] = [
  {
    id: 1,
    titleCN: "卡萨尔斯论坛",
    titleEN: "Casals Forum",
    locationCN: "克龙贝格",
    locationEN: "Kronberg",
    image: "https://images.unsplash.com/photo-1518005020251-58296d8f8d7d?auto=format&fit=crop&q=80&w=1200",
    gridArea: "md:col-span-2 md:row-span-2"
  },
  {
    id: 2,
    titleCN: "光之艺术 5",
    titleEN: "Licht Kunst 5",
    locationCN: "出版物",
    locationEN: "Publication",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800",
    gridArea: "md:col-span-1 md:row-span-1"
  },
  {
    id: 3,
    titleCN: "建筑照明设计",
    titleEN: "Lighting Design for Architecture",
    locationCN: "图书",
    locationEN: "Book",
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=800",
    gridArea: "md:col-span-1 md:row-span-1"
  },
  {
    id: 4,
    titleCN: "混凝土室内",
    titleEN: "Concrete Interior",
    locationCN: "柏林",
    locationEN: "Berlin",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200",
    gridArea: "md:col-span-1 md:row-span-3"
  },
  {
    id: 5,
    titleCN: "城市景观塔",
    titleEN: "Cityscape Tower",
    locationCN: "法兰克福",
    locationEN: "Frankfurt",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
    gridArea: "md:col-span-1 md:row-span-3"
  },
  {
    id: 6,
    titleCN: "艺术画廊",
    titleEN: "Art Gallery",
    locationCN: "巴黎",
    locationEN: "Paris",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
    gridArea: "md:col-span-1 md:row-span-3"
  },
  {
    id: 7,
    titleCN: "RDESIGN 团队",
    titleEN: "RDESIGN Team",
    locationCN: "巴塞罗那",
    locationEN: "Barcelona",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    gridArea: "md:col-span-1 md:row-span-1"
  },
  {
    id: 8,
    titleCN: "现代餐饮",
    titleEN: "Modern Dining",
    locationCN: "伦敦",
    locationEN: "London",
    image: "https://images.unsplash.com/photo-1550966841-3ee7adac166c?auto=format&fit=crop&q=80&w=1600",
    gridArea: "md:col-span-2 md:row-span-2"
  },
  {
    id: 9,
    titleCN: "办公室照明",
    titleEN: "Office Lighting",
    locationCN: "维也纳",
    locationEN: "Vienna",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=800",
    gridArea: "md:col-span-1 md:row-span-1"
  }
];
