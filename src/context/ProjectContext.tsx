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
        const [rawRows, rawBlockRows, rawHomeRows, rawNewsRows, rawNewsBlockRows, rawResearchRows, rawResearchBlockRows] = await Promise.all([
          fetchAndParseCSV('/projects/rdi_web_projects.csv?v=' + Date.now()),
          fetchAndParseCSV('/projects/rdi_web_projects_blocks.csv?v=' + Date.now()),
          fetchAndParseCSV('/public/rdi_web_home.csv?v=' + Date.now()),
          fetchAndParseCSV('/news/rdi_web_news.csv?v=' + Date.now()),
          fetchAndParseCSV('/news/rdi_web_news_blocks.csv?v=' + Date.now()),
          fetchAndParseCSV('/research/rdi_web_research.csv?v=' + Date.now()),
          fetchAndParseCSV('/research/rdi_web_research_blocks.csv?v=' + Date.now())
        ]);

        if (!active) return;

        // Process project block data
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
            blockId === 'id' ||
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

        // Process news block data
        const newsBlocksMap: Record<string, any[]> = {};
        for (let i = 0; i < rawNewsBlockRows.length; i++) {
          const row = rawNewsBlockRows[i];
          if (row.length < 3) continue;
          const blockId = row[0] ? row[0].trim() : '';
          const block_order = parseInt(row[1]) || 0;
          const block_type = row[2] ? row[2].trim() : '';
          const layout_style = row[3] ? row[3].trim() : '';

          // Skip headers
          if (
            !blockId ||
            blockId === 'id' ||
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

          if (!newsBlocksMap[blockId]) {
            newsBlocksMap[blockId] = [];
          }
          newsBlocksMap[blockId].push({
            order: block_order,
            type: block_type,
            style: layout_style,
            c1_cn,
            c1_en,
            c2_cn,
            c2_en
          });
        }

        // Sort news blocks by order
        for (const nid in newsBlocksMap) {
          newsBlocksMap[nid].sort((a, b) => a.order - b.order);
        }

        // Process research block data
        const researchBlocksMap: Record<string, any[]> = {};
        for (let i = 0; i < rawResearchBlockRows.length; i++) {
          const row = rawResearchBlockRows[i];
          if (row.length < 3) continue;
          const blockId = row[0] ? row[0].trim() : '';
          const block_order = parseInt(row[1]) || 0;
          const block_type = row[2] ? row[2].trim() : '';
          const layout_style = row[3] ? row[3].trim() : '';

          // Skip headers
          if (
            !blockId ||
            blockId === 'id' ||
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

          if (!researchBlocksMap[blockId]) {
            researchBlocksMap[blockId] = [];
          }
          researchBlocksMap[blockId].push({
            order: block_order,
            type: block_type,
            style: layout_style,
            c1_cn,
            c1_en,
            c2_cn,
            c2_en
          });
        }

        // Sort research blocks by order
        for (const rid in researchBlocksMap) {
          researchBlocksMap[rid].sort((a, b) => a.order - b.order);
        }

        // Process main project data
        const parsedProjects: Project[] = [];
        const seenProjectIds = new Set<string>();
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
          if (seenProjectIds.has(idCell)) continue;
          seenProjectIds.add(idCell);

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
          projects: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/projects.webp',
          research: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/research.webp',
          news: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/news.webp',
          about: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/about.webp'
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
        const seenNewsIds = new Set<string>();
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
          if (seenNewsIds.has(idCell)) continue;
          seenNewsIds.add(idCell);

          const titleCN = row[3] ? row[3].trim() : '';
          const titleEN = row[4] ? row[4].trim() : '';
          const tagsCN = row[5] ? row[5].trim() : '';
          const tagsEN = row[6] ? row[6].trim() : '';
          const image = row[7] ? row[7].trim() : '';
          const aspect = row[8] ? row[8].trim() : '';
          const span = row[9] ? row[9].trim() : '';
          const date = row[10] ? row[10].trim() : '';

          const category = tagsEN ? tagsEN.toUpperCase() : 'NEWS';
          const blocks = newsBlocksMap[idCell] || [];

          // Dynamically extract concept text and gallery from blocks if needed
          let contentCN = '';
          let contentEN = '';
          const gallerySet = new Set<string>();

          for (const block of blocks) {
            if (!contentCN && block.type === 'text_1col') {
              contentCN = block.c1_cn ? block.c1_cn.replace(/^###.*?\n/gm, '').replace(/^###.*/gm, '').trim() : '';
              contentEN = block.c1_en ? block.c1_en.replace(/^###.*?\n/gm, '').replace(/^###.*/gm, '').trim() : '';
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
            location: '',
            contentCN,
            contentEN,
            gallery,
            blocks
          });
        }
        setNews(parsedNews.length > 0 ? parsedNews : fallbackNews);

        // Process Research config CSV data
        const parsedResearch: ResearchItem[] = [];
        const seenResearchIds = new Set<string>();
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
          if (seenResearchIds.has(idCell)) continue;
          seenResearchIds.add(idCell);

          const titleCN = row[3] ? row[3].trim() : '';
          const titleEN = row[4] ? row[4].trim() : '';
          const tagsCN = row[5] ? row[5].trim() : '';
          const tagsEN = row[6] ? row[6].trim() : '';
          const image = row[7] ? row[7].trim() : '';
          const aspect = row[8] ? row[8].trim() : '';
          const span = row[9] ? row[9].trim() : '';
          const date = row[10] ? row[10].trim() : '';

          const category = tagsEN ? tagsEN.toUpperCase() : 'URBAN';
          const blocks = researchBlocksMap[idCell] || [];

          // Dynamically extract content text and gallery from blocks if needed
          let contentCN = '';
          let contentEN = '';
          const gallerySet = new Set<string>();

          for (const block of blocks) {
            if (!contentCN && block.type === 'text_1col') {
              contentCN = block.c1_cn ? block.c1_cn.replace(/^###.*?\n/gm, '').replace(/^###.*/gm, '').trim() : '';
              contentEN = block.c1_en ? block.c1_en.replace(/^###.*?\n/gm, '').replace(/^###.*/gm, '').trim() : '';
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
            location: '',
            contentCN,
            contentEN,
            gallery,
            blocks
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

