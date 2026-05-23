import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import Papa from 'papaparse';
import type { Project } from '../data/projects';
import type { NewsItem } from '../data/news';
import { newsData as fallbackNews } from '../data/news';
import type { ResearchItem } from '../data/research';
import { researchData as fallbackResearch } from '../data/research';
import { getCategoryFromTags } from '../utils/csvParser';

export interface HomeConfig {
  heroSlides: string[];
  gridItems: { id: string; aspect: string; span: string }[];
  hiddenMenu?: {
    projects: string;
    research: string;
    news: string;
    about: string;
  };
  icons?: Record<string, string>;
}

interface ProjectContextType {
  projects: Project[];
  news: NewsItem[];
  research: ResearchItem[];
  homeConfig: HomeConfig | null;
  loading: boolean;
  error: string | null;
  getProject: (idOrSlug: string | undefined) => Project | undefined;
  getPrevAndNext: (currentId: number) => { prev: Project; next: Project };
  getNewsItem: (id: string | undefined) => NewsItem | undefined;
  getResearchItem: (id: string | undefined) => ResearchItem | undefined;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

const fallbackNewsDetails: Record<string, {
  location?: string;
  contentCN?: string;
  contentEN?: string;
  gallery?: string[];
}> = {
  '20240515_lda': {
    location: 'Berlin, Germany',
    contentEN: 'rdi international lighting has been awarded the 2024 Lighting Design Award for its groundbreaking work in sustainable urban lighting. The jury praised our innovative approach to reducing light pollution while enhancing safety.',
    contentCN: 'rdi 国际照明凭借其在可持续城市照明领域的开创性成果，荣获 2024 年度照明设计大奖。评委会对我们在减少光污染、提高安全性方面的创新方法给予了高度评价。',
    gallery: [
      'https://images.unsplash.com/photo-1565019053026-6202497042a9',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
    ]
  },
  '20240422_sun': {
    location: 'Shanghai, China',
    contentEN: 'Our latest panel discussion at the Lighting Summit explored how modern cities can balance aesthetic appeal with energy efficiency. Experts shared insights on the next generation of LED technologies.',
    contentCN: '近期在照明峰会上进行的专题讨论探索了现代城市如何平衡美学吸引力与能源效率。专家们分享了关于下一代 LED 技术的见解。',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2'
    ]
  },
  '20250909_exh': {
    location: 'Shanghai, China'
  },
  '20260515_cau': {
    location: 'Shanghai, China',
    contentCN: '5月11日晚，同济大学建筑与城市规划学院 CAUP 红楼钟庭化作光影交织的奇幻秘境。联合国教科文组织（UNESCO）“国际光日”注册活动暨2026年建筑物理光环境课程作业展示评审活动璀璨启幕。',
    contentEN: 'On the evening of May 11, the Red Building Courtyard at Tongji University CAUP transformed into a fantasy realm of interwoven light and shadow. The UNESCO registered event and the 2026 Architectural Lighting Coursework Exhibition commenced.'
  },
  '20260501_ld': {
    location: 'Shanghai, China',
    contentCN: 'RDI及全体员工，向每一位辛勤耕耘的奋斗者致以诚挚敬意！祝大家五一劳动节快乐，诸事顺遂，劳有所获，岁岁安康！',
    contentEN: 'RDI wishes you and your family a happy Labor Day, good health and every success in work.'
  }
};

const fallbackResearchDetails: Record<string, {
  location?: string;
  contentCN?: string;
  contentEN?: string;
  gallery?: string[];
}> = {
  'street_lighting': {
    location: 'Berlin, Germany',
    contentEN: 'Our urban lighting research focuses on how smart LED technology can transform city nightscapes while reducing energy consumption by up to 40%.',
    contentCN: '我们的城市照明研究重点关注智能 LED 技术如何在将能源消耗降低高达 40% 的同时，重塑城市夜景。',
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb',
      'https://images.unsplash.com/photo-1540518614846-7eded433c457'
    ]
  },
  'museum_lighting': {
    location: 'Paris, France',
    contentEN: 'Exploring the transition from halogen to fiber optics and high-CRI LED solutions in preserving world-class artifacts.',
    contentCN: '探索在保护世界级文物过程中，从卤素灯到光纤及其高显色指数 LED 解决方案的转变。',
    gallery: [
      'https://images.unsplash.com/photo-1565019053026-6202497042a9'
    ]
  }
};

async function fetchAndParseCSV(url: string): Promise<string[][]> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}, status: ${response.status}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  let csvText = '';
  try {
    csvText = new TextDecoder('utf-8', { fatal: true }).decode(arrayBuffer);
  } catch {
    csvText = new TextDecoder('gbk').decode(arrayBuffer);
  }
  
  const parseResult = Papa.parse<string[]>(csvText, {
    skipEmptyLines: true
  });
  return parseResult.data;
}

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [research, setResearch] = useState<ResearchItem[]>([]);
  const [homeConfig, setHomeConfig] = useState<HomeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    
    async function fetchData() {
      try {
        const [rawRows, rawBlockRows, rawHomeRows, rawNewsRows, rawResearchRows] = await Promise.all([
          fetchAndParseCSV('/projects/rdi_web_projects.csv?v=' + Date.now()),
          fetchAndParseCSV('/projects/rdi_web_projects_blocks.csv?v=' + Date.now()),
          fetchAndParseCSV('/public/rdi_web_home.csv?v=' + Date.now()),
          fetchAndParseCSV('/News/rdi_web_news.csv?v=' + Date.now()),
          fetchAndParseCSV('/research/rdi_web_research.csv?v=' + Date.now())
        ]);

        if (!active) return;

        // Process block data
        const blocksMap: Record<string, any[]> = {};
        for (let i = 0; i < rawBlockRows.length; i++) {
          const row = rawBlockRows[i];
          if (row.length < 3) continue;
          const blockId = row[0] ? row[0].trim() : '';
          const block_order = parseInt(row[1]) || 0;
          const block_type = row[2] ? row[2].trim() : '';
          const layout_style = row[3] ? row[3].trim() : '';

          // Skip headers
          if (
            !blockId ||
            blockId === 'project_id' ||
            blockId.includes('字段名') ||
            blockId.includes('填写说明') ||
            blockId.includes('网页排版') ||
            blockId.includes('是否选填') ||
            block_type === 'block_type'
          ) {
            continue;
          }

          const c1_cn = row[4] ? row[4].trim() : '';
          const c1_en = row[5] ? row[5].trim() : '';
          const c2_cn = row[6] ? row[6].trim() : '';
          const c2_en = row[7] ? row[7].trim() : '';

          if (!blocksMap[blockId]) {
            blocksMap[blockId] = [];
          }
          blocksMap[blockId].push({
            order: block_order,
            type: block_type,
            style: layout_style,
            c1_cn,
            c1_en,
            c2_cn,
            c2_en
          });
        }

        // Sort blocks by order
        for (const pid in blocksMap) {
          blocksMap[pid].sort((a, b) => a.order - b.order);
        }

        // Process main project data
        const parsedProjects: Project[] = [];
        for (let i = 0; i < rawRows.length; i++) {
          const row = rawRows[i];
          if (row.length < 5) continue;

          const firstCell = row[0] ? row[0].trim() : '';
          const noCell = row[1] ? row[1].trim() : '';
          const idCell = row[2] ? row[2].trim() : '';

          // Skip header and instruction lines (first 5 lines)
          if (
            firstCell.includes('列号') || 
            firstCell.includes('字段名') || 
            firstCell.includes('填写说明') || 
            firstCell.includes('网页排版') || 
            firstCell.includes('是否选填') ||
            i < 5
          ) {
            continue;
          }

          if (!idCell) continue;

          const idNum = parseInt(noCell) || (i - 4);
          const titleCN = row[3] ? row[3].trim() : '';
          const titleEN = row[4] ? row[4].trim() : '';
          const locationCN = row[5] ? row[5].trim() : '';
          const locationEN = row[6] ? row[6].trim() : '';
          const tagsCN = row[7] ? row[7].trim() : '';
          const tagsEN = row[8] ? row[8].trim() : '';
          const rawImage = row[9] ? row[9].trim() : '';
          const aspect = row[10] ? row[10].trim() : '';
          const span = row[11] ? row[11].trim() : '';
          const completion = row[12] ? row[12].trim() : '';
          const heroMedia = row[13] ? row[13].trim() : '';
          const designerCN = row[14] ? row[14].trim() : '';
          const designerEN = row[15] ? row[15].trim() : '';
          const credits = row[16] ? row[16].trim() : '';
          const creditsEN = row[17] ? row[17].trim() : '';

          // Attach parsed blocks for this project, falling back to empty list if none
          const blocks = blocksMap[idCell] || [];

          // Dynamically extract concept text and gallery from blocks
          let conceptCN = '';
          let conceptEN = '';
          const gallerySet = new Set<string>();

          for (const block of blocks) {
            if (!conceptCN && block.type === 'text_1col') {
              conceptCN = block.c1_cn ? block.c1_cn.replace(/^###.*?\n/gm, '').replace(/^###.*/gm, '').trim() : '';
              conceptEN = block.c1_en ? block.c1_en.replace(/^###.*?\n/gm, '').replace(/^###.*/gm, '').trim() : '';
            }
            if (block.type === 'image_full' && block.c1_cn) {
              gallerySet.add(block.c1_cn.trim());
            } else if (block.type === 'text_img' && block.c2_cn) {
              gallerySet.add(block.c2_cn.trim());
            } else if (block.type === 'image_grid' && block.c1_cn) {
              const urls = block.c1_cn.split(',').map((u: string) => u.trim()).filter(Boolean);
              urls.forEach((u: string) => gallerySet.add(u));
            }
          }
          const gallery = Array.from(gallerySet);

          // Fallback image logic
          let image = rawImage;
          if (!image) {
            if (heroMedia && !heroMedia.endsWith('.mp4')) {
              image = heroMedia;
            } else if (gallery.length > 0) {
              image = gallery[0];
            } else {
              image = heroMedia; // will be handled gracefully if video
            }
          }

          const category = getCategoryFromTags(tagsEN, tagsCN);

          parsedProjects.push({
            id: idNum,
            slug: idCell,
            titleCN,
            titleEN,
            location: locationCN,
            locationEN: locationEN,
            category,
            image: image || heroMedia,
            aspect,
            span,
            heroMedia,
            gallery,
            conceptCN,
            conceptEN,
            completion,
            designer: designerCN,
            designerCN,
            designerEN,
            credits: credits,
            creditsEN,
            tagsCN,
            tagsEN,
            blocks
          });
        }

        if (parsedProjects.length > 0) {
          setProjects(parsedProjects);
          setError(null);
        } else {
          setProjects([]);
        }

        // Process Home config CSV data
        const heroSlides: string[] = [];
        const gridItems: { id: string; aspect: string; span: string }[] = [];
        const hiddenMenu = {
          projects: 'https://kgmlighting.com.cn/public/projects.webp',
          research: 'https://kgmlighting.com.cn/public/research.webp',
          news: 'https://kgmlighting.com.cn/public/news.webp',
          about: 'https://kgmlighting.com.cn/public/about.webp'
        };
        const icons: Record<string, string> = {};

        let heroHeaderIndex = -1;
        let gridHeaderIndex = -1;
        let hiddenMenuHeaderIndex = -1;
        let iconsHeaderIndex = -1;

        for (let i = 0; i < rawHomeRows.length; i++) {
          const cell0 = rawHomeRows[i][0] ? rawHomeRows[i][0].trim() : '';
          if (cell0.includes('首屏大图')) {
            heroHeaderIndex = i;
          } else if (cell0.includes('图片栏')) {
            gridHeaderIndex = i;
          } else if (cell0.includes('隐藏菜单')) {
            hiddenMenuHeaderIndex = i;
          } else if (cell0.includes('图标')) {
            iconsHeaderIndex = i;
          }
        }

        if (heroHeaderIndex !== -1 && rawHomeRows[heroHeaderIndex + 1]) {
          const idRow = rawHomeRows[heroHeaderIndex + 1];
          for (let j = 1; j < idRow.length; j++) {
            const val = idRow[j] ? idRow[j].trim() : '';
            if (val && val.toLowerCase() !== 'id') {
              heroSlides.push(val);
            }
          }
        }

        if (gridHeaderIndex !== -1) {
          let idRow: string[] = [];
          let aspectRow: string[] = [];
          let spanRow: string[] = [];

          for (let i = gridHeaderIndex + 1; i < rawHomeRows.length; i++) {
            const cell0 = rawHomeRows[i][0] ? rawHomeRows[i][0].toLowerCase().trim() : '';
            if (cell0 === 'id') {
              idRow = rawHomeRows[i];
            } else if (cell0 === 'aspect') {
              aspectRow = rawHomeRows[i];
            } else if (cell0 === 'span') {
              spanRow = rawHomeRows[i];
            }
          }

          if (idRow.length > 0) {
            for (let j = 1; j < idRow.length; j++) {
              const idVal = idRow[j] ? idRow[j].trim() : '';
              if (idVal) {
                const aspectVal = (aspectRow && aspectRow[j]) ? aspectRow[j].trim() : '';
                const spanVal = (spanRow && spanRow[j]) ? spanRow[j].trim() : '';
                gridItems.push({
                  id: idVal,
                  aspect: aspectVal,
                  span: spanVal
                });
              }
            }
          }
        }

        if (hiddenMenuHeaderIndex !== -1 && rawHomeRows[hiddenMenuHeaderIndex + 1]) {
          const valRow = rawHomeRows[hiddenMenuHeaderIndex + 1];
          if (valRow[1]) hiddenMenu.projects = valRow[1].trim();
          if (valRow[2]) hiddenMenu.research = valRow[2].trim();
          if (valRow[3]) hiddenMenu.news = valRow[3].trim();
          if (valRow[4]) hiddenMenu.about = valRow[4].trim();
        }

        if (iconsHeaderIndex !== -1 && rawHomeRows[iconsHeaderIndex] && rawHomeRows[iconsHeaderIndex + 1]) {
          const headerRow = rawHomeRows[iconsHeaderIndex];
          const valRow = rawHomeRows[iconsHeaderIndex + 1];
          for (let j = 1; j < headerRow.length; j++) {
            const platform = headerRow[j] ? headerRow[j].trim().toLowerCase() : '';
            const iconUrl = valRow[j] ? valRow[j].trim() : '';
            if (platform && iconUrl) {
              icons[platform] = iconUrl;
            }
          }
        }

        setHomeConfig({
          heroSlides,
          gridItems,
          hiddenMenu,
          icons
        });

        // Process News config CSV data
        const parsedNews: NewsItem[] = [];
        for (let i = 0; i < rawNewsRows.length; i++) {
          const row = rawNewsRows[i];
          if (row.length < 5) continue;

          const firstCell = row[0] ? row[0].trim() : '';
          const noCell = row[1] ? row[1].trim() : '';
          const idCell = row[2] ? row[2].trim() : '';

          // Skip header and instruction lines (first 5 lines)
          if (
            firstCell.includes('列号') || 
            firstCell.includes('字段名') || 
            firstCell.includes('填写说明') || 
            firstCell.includes('网页排版') || 
            firstCell.includes('是否选填') ||
            i < 5
          ) {
            continue;
          }

          if (!idCell) continue;

          const titleCN = row[3] ? row[3].trim() : '';
          const titleEN = row[4] ? row[4].trim() : '';
          const tagsCN = row[5] ? row[5].trim() : '';
          const tagsEN = row[6] ? row[6].trim() : '';
          const image = row[7] ? row[7].trim() : '';
          const aspect = row[8] ? row[8].trim() : '';
          const span = row[9] ? row[9].trim() : '';
          const date = row[10] ? row[10].trim() : '';

          const category = tagsEN ? tagsEN.toUpperCase() : 'NEWS';
          const detail = fallbackNewsDetails[idCell] || {};

          parsedNews.push({
            id: idCell,
            titleCN,
            titleEN,
            date,
            category,
            image,
            aspect,
            span,
            tagsCN,
            tagsEN,
            location: detail.location || '',
            contentCN: detail.contentCN || '',
            contentEN: detail.contentEN || '',
            gallery: detail.gallery || []
          });
        }
        setNews(parsedNews.length > 0 ? parsedNews : fallbackNews);

        // Process Research config CSV data
        const parsedResearch: ResearchItem[] = [];
        for (let i = 0; i < rawResearchRows.length; i++) {
          const row = rawResearchRows[i];
          if (row.length < 5) continue;

          const firstCell = row[0] ? row[0].trim() : '';
          const noCell = row[1] ? row[1].trim() : '';
          const idCell = row[2] ? row[2].trim() : '';

          // Skip header and instruction lines (first 5 lines)
          if (
            firstCell.includes('列号') || 
            firstCell.includes('字段名') || 
            firstCell.includes('填写说明') || 
            firstCell.includes('网页排版') || 
            firstCell.includes('是否选填') ||
            i < 5
          ) {
            continue;
          }

          if (!idCell) continue;

          const titleCN = row[3] ? row[3].trim() : '';
          const titleEN = row[4] ? row[4].trim() : '';
          const tagsCN = row[5] ? row[5].trim() : '';
          const tagsEN = row[6] ? row[6].trim() : '';
          const image = row[7] ? row[7].trim() : '';
          const aspect = row[8] ? row[8].trim() : '';
          const span = row[9] ? row[9].trim() : '';
          const date = row[10] ? row[10].trim() : '';

          const category = tagsEN ? tagsEN.toUpperCase() : 'URBAN';
          const detail = fallbackResearchDetails[idCell] || {};

          parsedResearch.push({
            id: idCell,
            titleCN,
            titleEN,
            date,
            category,
            image,
            aspect,
            span,
            tagsCN,
            tagsEN,
            location: detail.location || '',
            contentCN: detail.contentCN || '',
            contentEN: detail.contentEN || '',
            gallery: detail.gallery || []
          });
        }
        setResearch(parsedResearch.length > 0 ? parsedResearch : fallbackResearch);

        setLoading(false);
      } catch (err) {
        console.error('Failed to parse remote data, falling back to static local data:', err);
        if (active) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setProjects([]);
          setNews(fallbackNews);
          setResearch(fallbackResearch);
          setHomeConfig({
            heroSlides: ['shanghai-psa', 'nanjing-baiyunting', 'shanghai-nhm', 'zhengzhou-greenland', 'zibo-mixc'],
            gridItems: [
              { id: 'shanghai-psa', aspect: 'aspect-[4/4] md:aspect-auto h-full min-h-[300px]', span: 'md:row-span-2' },
              { id: 'nanjing-baiyunting', aspect: 'aspect-square', span: '' },
              { id: 'shanghai-nhm', aspect: 'aspect-square', span: 'md:row-span-2' },
              { id: 'zhengzhou-greenland', aspect: 'aspect-square', span: '' },
              { id: 'zibo-mixc', aspect: 'aspect-[4/4] md:aspect-auto h-full min-h-[300px]', span: '' },
            ],
            hiddenMenu: {
              projects: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/projects.webp',
              research: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/research.webp',
              news: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/news.webp',
              about: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/about.webp'
            },
            icons: {
              bilibili: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_bilibili.svg',
              facebook: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_facebook.svg',
              instagram: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_instagram.svg',
              tiktok: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_tiktok.svg',
              rednote: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_rednote.svg',
              wechat: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_wechat.svg',
              linkedin: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_linkedin.svg',
              youtube: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_youtube.svg'
            }
          });
          setLoading(false);
        }
      }
    }
    
    fetchData();
    
    return () => {
      active = false;
    };
  }, []);

  const getProject = (idOrSlug: string | undefined): Project | undefined => {
    if (!idOrSlug) return undefined;
    return projects.find(
      p => p.slug === idOrSlug || p.id.toString() === idOrSlug
    );
  };

  const getPrevAndNext = (currentId: number): { prev: Project; next: Project } => {
    if (projects.length === 0) return { prev: {} as Project, next: {} as Project };
    const currentIndex = projects.findIndex(p => p.id === currentId);
    
    const prev = projects[currentIndex - 1] || projects[projects.length - 1];
    const next = projects[currentIndex + 1] || projects[0];
    
    return { prev, next };
  };

  const getNewsItem = (id: string | undefined): NewsItem | undefined => {
    if (!id) return undefined;
    return news.find(n => n.id === id);
  };

  const getResearchItem = (id: string | undefined): ResearchItem | undefined => {
    if (!id) return undefined;
    return research.find(r => r.id === id);
  };

  return (
    <ProjectContext.Provider value={{ projects, news, research, homeConfig, loading, error, getProject, getPrevAndNext, getNewsItem, getResearchItem }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
}

