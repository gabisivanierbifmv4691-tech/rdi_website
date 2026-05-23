import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import type { Language } from '../App';
import { useProjects } from '../context/ProjectContext';
import { ChevronDown } from 'lucide-react';

const formatYearMonth = (dateStr: string) => {
  if (!dateStr) return '';
  const parts = dateStr.split(/[.\-\/]/);
  if (parts.length >= 2) {
    return `${parts[0]}.${parts[1]}`;
  }
  return dateStr;
};

interface NewsPageProps {
  lang: Language;
}

export default function NewsPage({ lang }: NewsPageProps) {
  const { news } = useProjects();
  const [activeFilters, setActiveFilters] = useState<string[]>(['ALL']);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const t = {
    title: lang === 'cn' ? '新闻动态' : 'NEWS',
    filterBy: lang === 'cn' ? '筛选' : 'Filter by',
    all: lang === 'cn' ? '全部' : 'ALL',
  };

  const categories = useMemo(() => {
    const tagsSet = new Set<string>();
    news.forEach(item => {
      const tagsStr = lang === 'cn' ? item.tagsCN : item.tagsEN;
      if (tagsStr) {
        const tags = tagsStr.split(/[,，、]/).map(t => t.trim()).filter(Boolean);
        tags.forEach(t => tagsSet.add(t));
      }
    });
    return ['ALL', ...Array.from(tagsSet)];
  }, [news, lang]);

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

  const filteredItems = useMemo(() => {
    if (activeFilters.includes('ALL')) return news;
    return news.filter(item => {
      const tagsStr = lang === 'cn' ? item.tagsCN : item.tagsEN;
      if (!tagsStr) return false;
      const tags = tagsStr.split(/[,，、]/).map(t => t.trim()).filter(Boolean);
      return tags.some(t => activeFilters.includes(t));
    });
  }, [activeFilters, news, lang]);

  return (
    <div className="pt-24 pb-20 bg-white">
      {/* Aligned Page Header Container */}
      <div className="w-full px-6 md:px-12 mb-[2px] flex justify-center">
        <div className="w-full max-w-[1280px]">
          {/* Page Header */}
          <div className="flex justify-between items-end pb-3 border-b border-neutral-100">
            <h1 className="text-[31px] md:text-[43px] font-bold tracking-[0.1em] uppercase leading-none">
              {t.title}
            </h1>
            <div 
              className="flex items-center gap-2 group cursor-pointer pb-[1px]"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <span className="text-[15px] font-bold uppercase tracking-[0.3em] leading-none">
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

          {/* Filter Bar */}
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden bg-white"
              >
                <div className="py-3 flex flex-wrap justify-start gap-x-6 gap-y-2">
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
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="px-1 md:px-2 pt-2">
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 auto-rows-min grid-flow-row-dense"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <Link 
                key={item.id} 
                to={`/news/${item.id}`}
                className={`block w-full ${item.aspect || 'aspect-square'} ${item.span || ''}`}
              >
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden bg-gray-50 h-full w-full"
                >
                  <img 
                    src={`${item.image}?auto=format&fit=crop&q=80&w=1000`}
                    alt={lang === 'cn' ? item.titleCN : item.titleEN}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Elegant dark gradient overlay for steady readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/15 transition-opacity duration-500 group-hover:from-black/90 group-hover:via-black/50" />
                  
                  {/* Floating Content formatted exactly like Hero style */}
                  <div className="absolute bottom-6 left-6 right-6 text-white z-10 transition-transform duration-500 group-hover:translate-y-[-4px]">
                    <h3 className="text-sm md:text-base lg:text-[17px] font-medium tracking-tight uppercase leading-snug mb-1 md:mb-1.5 line-clamp-2">
                      {lang === 'cn' ? item.titleCN : item.titleEN}
                    </h3>
                    
                    <p className="text-[11px] md:text-[12px] font-light opacity-85 mb-3">
                      {formatYearMonth(item.date)}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mt-4">
                      <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-white/70">
                        {(() => {
                          const tagsStr = lang === 'cn' ? item.tagsCN : item.tagsEN;
                          if (tagsStr) {
                            const tags = tagsStr.split(/[,，、]/).map(t => t.trim()).filter(Boolean);
                            if (tags.length > 0) return tags[0];
                          }
                          return lang === 'cn' ? '智库动态' : 'NEWS INTEL';
                        })()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
