import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import type { Language } from '../App';
import { newsData } from '../data/news';
import { ChevronDown } from 'lucide-react';

const getServiceLabel = (category: string, lang: Language) => {
  const cat = category.toUpperCase();
  if (cat === 'EXHIBITION') {
    return lang === 'cn' ? '展览策划与陈列服务' : 'Exhibition & Curation Service';
  }
  if (cat === 'AWARDS') {
    return lang === 'cn' ? '专业评审与荣誉服务' : 'Design Award & Honor Service';
  }
  if (cat === 'WORKSHOP') {
    return lang === 'cn' ? '光影技术工作坊服务' : 'Lighting Tech Workshop Service';
  }
  if (cat === 'EVENT') {
    return lang === 'cn' ? '国际活动与论坛服务' : 'International Event & Seminar';
  }
  if (cat === 'ANNOUNCEMENT') {
    return lang === 'cn' ? '企业公告与发布服务' : 'Corporate Announcement';
  }
  if (cat === 'FESTIVAL') {
    return lang === 'cn' ? '城市节庆照明设计服务' : 'Urban Festival Lighting Service';
  }
  return lang === 'cn' ? '高端建筑照明设计服务' : 'Architectural Lighting Service';
};

interface NewsPageProps {
  lang: Language;
}

export default function NewsPage({ lang }: NewsPageProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>(['ALL']);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const t = {
    title: lang === 'cn' ? '新闻动态' : 'NEWS',
    filterBy: lang === 'cn' ? '筛选' : 'Filter by',
    all: lang === 'cn' ? '全部' : 'ALL',
  };

  const categories = useMemo(() => {
    const cats = Array.from(new Set(newsData.map(item => item.category)));
    return ['ALL', ...cats];
  }, []);

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
    if (activeFilters.includes('ALL')) return newsData;
    return newsData.filter(item => activeFilters.includes(item.category));
  }, [activeFilters]);

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
                            layoutId="news-filter-underline"
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
                className={`${item.aspect || 'aspect-square'} ${item.span || ''}`}
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
                      {item.location ? (lang === 'cn' ? `${item.location} · ` : `${item.location} // `) : ''}{item.date}
                    </p>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 mt-4">
                      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
                        {getServiceLabel(item.category, lang)}
                      </span>
                      <span className="text-[11px] font-mono tracking-[0.1em] text-white/50 uppercase font-semibold">
                        [ {item.category} ]
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
