import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import type { Language } from '../App';
import { ChevronDown } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import { getCategoryLabel, getLocationLabel } from '../utils/projectHelpers';

interface ProjectsPageProps {
  lang: Language;
}

export default function ProjectsPage({ lang }: ProjectsPageProps) {
  const { projects, loading } = useProjects();
  const [activeFilters, setActiveFilters] = useState<string[]>(['ALL']);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const t = {
    title: lang === 'cn' ? '项目作品' : 'PROJECTS',
    filterBy: lang === 'cn' ? '筛选' : 'Filter by',
    all: lang === 'cn' ? '全部' : 'ALL',
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(projects.map(p => p.category)));
    return ['ALL', ...cats];
  }, [projects]);

  const toggleFilter = (cat: string) => {
    if (cat === 'ALL') {
      setActiveFilters(['ALL']);
    } else {
      setActiveFilters(prev => {
        const withoutAll = prev.filter(f => f !== 'ALL');
        if (withoutAll.includes(cat)) {
          const updated = withoutAll.filter(f => f !== cat);
          return updated.length === 0 ? ['ALL'] : updated;
        } else {
          return [...withoutAll, cat];
        }
      });
    }
  };

  const filteredProjects = useMemo(() => {
    if (activeFilters.includes('ALL')) return projects;
    return projects.filter(p => activeFilters.includes(p.category));
  }, [activeFilters, projects]);

  if (loading) {
    return (
      <div className="pt-24 pb-20 bg-white min-h-[80vh] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-gray-100"></div>
            <div className="absolute inset-0 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 animate-pulse">
            {lang === 'cn' ? '光影载入中...' : 'LOADING LIGHT AND SHADOW...'}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Aligned Page Header Container */}
      <div className="w-full px-6 md:px-12 mb-[2px] flex justify-center">
        <div className="w-full max-w-[1280px]">
          {/* Page Header */}
          <div className="flex justify-between items-baseline pb-3">
            <h1 className="text-[31px] md:text-[43px] font-bold tracking-[0.1em] uppercase">
              {t.title}
            </h1>
            <div 
              className="flex items-center gap-2 group cursor-pointer"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span className="text-[15px] font-bold uppercase tracking-[0.3em]">
                {activeFilters.includes('ALL') 
                  ? t.filterBy 
                  : activeFilters.join(' + ')
                }
              </span>
              <ChevronDown 
                size={14} 
                className={`transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} 
              />
            </div>
          </div>

          {/* Filter Options */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden bg-white"
              >
                <div className="py-3 flex flex-wrap justify-start gap-x-12 gap-y-2">
                  {categories.map((cat) => {
                    const isActive = activeFilters.includes(cat);
                    return (
                      <button
                        key={cat}
                        onClick={() => toggleFilter(cat)}
                        className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative py-1
                          ${isActive 
                            ? 'text-gray-900' 
                            : 'text-gray-400 hover:text-gray-600 hover:scale-105'
                          }
                        `}
                      >
                        {cat === 'ALL' ? t.all : cat}
                        {isActive && (
                          <motion.div 
                            layoutId="filter-underline"
                            className="absolute bottom-0 left-0 right-0 h-[1px] bg-gray-900"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Grid Layout - Dynamic Rendering from Data Source */}
      <div className="px-1 md:px-2 pt-2">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-3 gap-2 auto-rows-[250px] md:auto-rows-[300px] grid-flow-row-dense"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => {
              // Sanitize classes: filter out height and aspect ratio classes
              const aspectClasses = project.aspect || '';
              const spanClasses = project.span || '';
              const allTokens = `${spanClasses} ${aspectClasses}`.split(/\s+/);
              
              const filteredTokens = allTokens.filter(token => {
                const t = token.trim().toLowerCase();
                if (!t) return false;
                // Exclude helper aspect ratios or explicit/min height classes
                if (t.startsWith('aspect-') || t.startsWith('h-') || t.startsWith('min-h-') || t.startsWith('max-h-')) {
                  return false;
                }
                return true;
              });

              // Ensure we always have grid system col/row spans
              let finalGridArea = filteredTokens.join(' ').trim();
              if (!finalGridArea.includes('col-span')) {
                finalGridArea += ' md:col-span-1';
              }
              if (!finalGridArea.includes('row-span')) {
                finalGridArea += ' md:row-span-1';
              }

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className={finalGridArea.trim()}
                >
                  <Link 
                    to={`/project/${project.slug || project.id}`}
                    className="block w-full h-full"
                  >
                    <div className="group relative overflow-hidden bg-gray-50 h-full w-full">
                      {project.image.endsWith('.mp4') || project.image.includes('.mp4') ? (
                        <video 
                          src={project.image}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                        />
                      ) : (
                        <img 
                          src={project.image.includes('unsplash.com') ? `${project.image}?auto=format&fit=crop&q=80&w=1200` : project.image}
                          alt={lang === 'cn' ? project.titleCN : project.titleEN}
                          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      
                      {/* Premium gradient overlay for readability, becoming slightly more rich on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
                      
                      {/* Info on cards - same format as the main hero screen */}
                      <div className="absolute bottom-6 left-6 right-6 text-white z-10 select-none transform transition-all duration-700 group-hover:-translate-y-1.5">
                        <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.25em] text-white/70 block mb-1">
                          {getCategoryLabel(project.category, lang)}
                        </span>
                        <h3 className="text-lg md:text-2xl font-bold tracking-tight text-white mb-1.5 uppercase leading-tight line-clamp-2">
                          {lang === 'cn' ? project.titleCN : project.titleEN}
                        </h3>
                        <p className="text-[10px] md:text-xs font-medium tracking-wide text-white/60 uppercase">
                          {getLocationLabel(project.location, lang, project.locationEN)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

