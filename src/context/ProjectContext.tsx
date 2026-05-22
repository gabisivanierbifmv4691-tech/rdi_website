import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Project } from '../data/projects';
import { projectsData as fallbackProjects } from '../data/projects';
import { parseCSV, getCategoryFromTags } from '../utils/csvParser';

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
  homeConfig: HomeConfig | null;
  loading: boolean;
  error: string | null;
  getProject: (idOrSlug: string | undefined) => Project | undefined;
  getPrevAndNext: (currentId: number) => { prev: Project; next: Project };
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

interface ProjectProviderProps {
  children: ReactNode;
}

export function ProjectProvider({ children }: ProjectProviderProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [homeConfig, setHomeConfig] = useState<HomeConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    
    async function fetchData() {
      try {
        const [projRes, homeRes] = await Promise.all([
          fetch('/api/projects?t=' + Date.now()),
          fetch('/api/home-config?t=' + Date.now())
        ]);
        
        if (!projRes.ok) {
          throw new Error(`Failed to fetch projects, status: ${projRes.status}`);
        }
        
        const projData = await projRes.json();
        let fetchedHomeConfig: HomeConfig | null = null;
        if (homeRes.ok) {
          const homeData = await homeRes.json();
          if (homeData.success) {
            fetchedHomeConfig = {
              heroSlides: homeData.heroSlides || [],
              gridItems: homeData.gridItems || [],
              hiddenMenu: homeData.hiddenMenu,
              icons: homeData.icons
            };
          }
        }

        if (!active) return;
        
        if (projData.success && Array.isArray(projData.projects) && projData.projects.length > 0) {
          setProjects(projData.projects);
          setError(null);
        } else {
          console.warn('API returned success but no projects, using static fallback:', projData);
          setProjects(fallbackProjects);
        }

        if (fetchedHomeConfig) {
          setHomeConfig(fetchedHomeConfig);
        } else {
          // Fallback home layout based on static project sequence
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
        }

        setLoading(false);
      } catch (err) {
        console.error('Failed to parse remote data, falling back to static local data:', err);
        if (active) {
          setError(err instanceof Error ? err.message : 'Unknown error');
          setProjects(fallbackProjects);
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
    // Find either by slug matching idOrSlug or id (numeric index) matching idOrSlug
    return projects.find(
      p => p.slug === idOrSlug || p.id.toString() === idOrSlug
    );
  };

  const getPrevAndNext = (currentId: number): { prev: Project; next: Project } => {
    if (projects.length === 0) return { prev: fallbackProjects[0], next: fallbackProjects[0] };
    const currentIndex = projects.findIndex(p => p.id === currentId);
    
    const prev = projects[currentIndex - 1] || projects[projects.length - 1];
    const next = projects[currentIndex + 1] || projects[0];
    
    return { prev, next };
  };

  return (
    <ProjectContext.Provider value={{ projects, homeConfig, loading, error, getProject, getPrevAndNext }}>
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
