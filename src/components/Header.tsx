import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { Language } from '../App';
import { useProjects } from '../context/ProjectContext';
import { 
  XiaohongshuIcon, 
  TikTokIcon, 
  WeChatIcon, 
  YoutubeIcon, 
  BilibiliIcon, 
  FacebookIcon, 
  InstagramIcon, 
  LinkedinIcon 
} from './SocialIcons';

interface HeaderProps {
  lang: Language;
  onToggleLang: () => void;
  showIntro?: boolean;
}

export default function Header({ lang, onToggleLang, showIntro = false }: HeaderProps) {
  const { homeConfig, projects = [], news = [], research = [] } = useProjects();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanding, setIsExpanding] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [isMenuLogoHovered, setIsMenuLogoHovered] = useState(false);
  const [expansionOrigin, setExpansionOrigin] = useState({ x: 0, y: 0 });
  const [expansionColor, setExpansionColor] = useState('black');
  const logoRef = useRef<HTMLDivElement>(null);
  const menuLogoRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogoClick = (e: React.MouseEvent, ref: React.RefObject<HTMLDivElement>, isInternalMenu = false) => {
    e.preventDefault();
    if (location.pathname === '/') {
      setIsMenuOpen(false);
      return;
    }
    
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setExpansionOrigin({ 
        x: rect.left + rect.width * 0.96, 
        y: rect.top + rect.height * 0.2 
      });
      
      // Determine color based on context
      if (isInternalMenu) {
        setExpansionColor('black');
      } else {
        setExpansionColor(isLightPage && !isScrolled ? 'black' : 'white');
      }
    }

    setIsExpanding(true);
    setTimeout(() => {
      setIsMenuOpen(false);
      navigate('/');
      setTimeout(() => {
        setIsExpanding(false);
      }, 500);
    }, 800);
  };

  const bgImages: Record<string, string> = {
    default: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/default.webp',
    projects: homeConfig?.hiddenMenu?.projects || 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/projects.webp',
    research: homeConfig?.hiddenMenu?.research || 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/research.webp',
    news: homeConfig?.hiddenMenu?.news || 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/news.webp',
    about: homeConfig?.hiddenMenu?.about || 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/about.webp'
  };

  const [activeBg, setActiveBg] = useState(bgImages.default);

  useEffect(() => {
    setActiveBg(bgImages.default);
  }, [homeConfig]);

  const getSocialIcon = (key: string, DefaultComponent: React.ComponentType<any>) => {
    return (
      <img 
        src={`https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_${key}.svg`} 
        alt={key} 
        className="w-5 h-5 object-contain hover:opacity-50 transition-opacity"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.indexOf('https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/') === -1) {
            target.src = `https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_${key}.svg`;
          }
        }}
      />
    );
  };

  const isLightPage = [
    '/projects', 
    '/news', 
    '/about', 
    '/research', 
    '/contact', 
    '/privacy', 
    '/imprint',
    '/join'
  ].includes(location.pathname) || location.pathname.startsWith('/research/') || location.pathname.startsWith('/news/');
  const textColor = (isLightPage && !isScrolled) ? 'text-black' : 'text-white';
  const iconColor = (isLightPage && !isScrolled) ? 'black' : 'white';
  const burgerBg = (isLightPage && !isScrolled) ? 'bg-black' : 'bg-white';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when menu or search is open
  useEffect(() => {
    if (isMenuOpen || isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen, isSearchOpen]);

  // Handle escape key to close search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const getFilteredResults = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return { projects: [], news: [], research: [] };

    const filteredProjects = projects.filter(p => {
      return (
        (p.titleCN && p.titleCN.toLowerCase().includes(query)) ||
        (p.titleEN && p.titleEN.toLowerCase().includes(query)) ||
        (p.conceptCN && p.conceptCN.toLowerCase().includes(query)) ||
        (p.conceptEN && p.conceptEN.toLowerCase().includes(query)) ||
        (itemMatchesTags(p.tagsCN, query)) ||
        (itemMatchesTags(p.tagsEN, query)) ||
        (p.location && p.location.toLowerCase().includes(query)) ||
        (p.locationEN && p.locationEN.toLowerCase().includes(query))
      );
    });

    const filteredNews = news.filter(n => {
      return (
        (n.titleCN && n.titleCN.toLowerCase().includes(query)) ||
        (n.titleEN && n.titleEN.toLowerCase().includes(query)) ||
        (n.contentCN && n.contentCN.toLowerCase().includes(query)) ||
        (n.contentEN && n.contentEN.toLowerCase().includes(query)) ||
        (itemMatchesTags(n.tagsCN, query)) ||
        (itemMatchesTags(n.tagsEN, query))
      );
    });

    const filteredResearch = research.filter(r => {
      return (
        (r.titleCN && r.titleCN.toLowerCase().includes(query)) ||
        (r.titleEN && r.titleEN.toLowerCase().includes(query)) ||
        (r.contentCN && r.contentCN.toLowerCase().includes(query)) ||
        (r.contentEN && r.contentEN.toLowerCase().includes(query)) ||
        (itemMatchesTags(r.tagsCN, query)) ||
        (itemMatchesTags(r.tagsEN, query))
      );
    });

    return {
      projects: filteredProjects,
      news: filteredNews,
      research: filteredResearch
    };
  };

  const itemMatchesTags = (tags: string | undefined, query: string) => {
    if (!tags) return false;
    return tags.toLowerCase().includes(query);
  };

  const results = getFilteredResults();
  const hasResults = results.projects.length > 0 || results.news.length > 0 || results.research.length > 0;

  const menuItems = lang === 'cn' 
    ? [
        { name: '首页', link: '/' }, 
        { name: '作品', link: '/projects' },        
        { name: '研究', link: '/research' },
        { name: '新闻', link: '/news' },
        { name: '关于', link: '/about' },
      ]
    : [
        { name: 'HOME', link: '/' },
        { name: 'PROJECTS', link: '/projects' },      
        { name: 'RESEARCH', link: '/research' },
        { name: 'NEWS', link: '/news' },
        { name: 'ABOUT', link: '/about' },
      ];

  const t = {
    menu: lang === 'cn' ? '菜单' : 'MENU',
    close: lang === 'cn' ? '关闭' : 'CLOSE',
    searchPlaceholder: lang === 'cn' ? '搜索作品、研究或新闻...' : 'Search projects, research or news...',
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 py-3 px-6 md:px-12 flex justify-center items-center ${
          isScrolled ? 'bg-black/90 backdrop-blur-md py-2' : 'bg-transparent'
        } ${textColor}`}
      >
        <div className="w-full max-w-[1280px] flex justify-between items-center">
          <div className="flex items-center gap-2">
              <div 
                id="header-logo-container"
                ref={logoRef}
                onClick={(e) => handleLogoClick(e, logoRef, false)}
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
                className="relative flex items-center cursor-pointer group"
                style={{ opacity: showIntro ? 0 : 1, transition: 'opacity 0.4s ease' }}
              >
                <div className="relative">
                  <img 
                    src="https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_logo.svg" 
                    alt="RDI Lighting" 
                    className={`h-10 w-auto object-contain transition-all duration-500 ${(isLightPage && !isScrolled) ? '' : 'invert'}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.indexOf('https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/') === -1) {
                        target.src = 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_logo.svg';
                      }
                    }}
                  />
                  {/* Animated Dot for feedback */}
                  <motion.div
                    animate={{
                      scale: isLogoHovered ? [1, 1.8, 1] : 1,
                      opacity: isExpanding ? 0 : 1
                    }}
                    transition={{
                      scale: {
                        duration: 1.2,
                        repeat: isLogoHovered ? Infinity : 0,
                        ease: "easeInOut"
                      },
                      opacity: { duration: 0.2 }
                    }}
                    className={`absolute w-[5px] h-[5px] rounded-full sm:w-1.5 sm:h-1.5 ${
                      isLightPage && !isScrolled ? 'bg-black' : 'bg-white'
                    }`}
                    style={{ top: '18%', right: '3.5%' }} // Positioned over the 'i' dot
                  />
                </div>
              </div>
          </div>
  
          <div className={`flex items-center gap-2 md:gap-3 ${textColor}`}>
            <button 
              onClick={onToggleLang}
              className={`flex items-center gap-1 font-bold tracking-widest transition-opacity hover:opacity-60 cursor-pointer uppercase translate-x-[7px] ${
                lang === 'cn' ? 'text-[14px]' : 'text-[15px]'
              }`}
            >
              {lang === 'cn' ? 'EN' : '中'}
            </button>
            <Search 
              size={22} 
              color={iconColor} 
              className="cursor-pointer hover:opacity-60 transition-opacity translate-x-[7px]" 
              strokeWidth={1.5} 
              onClick={() => setIsSearchOpen(true)}
            />
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="flex items-center group px-2 py-1"
              aria-label="Open Menu"
            >
              <div className="flex flex-col gap-1.5 w-6 group-hover:opacity-60 transition-opacity">
                <span className={`h-[1px] w-full ${burgerBg} transition-transform`}></span>
                <span className={`h-[1px] w-full ${burgerBg} transition-transform`}></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Full Screen Expansion Overlay */}
      <AnimatePresence>
        {isExpanding && (
          <motion.div
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 600, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
            className="fixed rounded-full z-[9999] pointer-events-none"
            style={{ 
              width: '10px', 
              height: '10px',
              left: expansionOrigin.x,
              top: expansionOrigin.y,
              transform: 'translate(-50%, -50%)',
              backgroundColor: expansionColor
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col bg-white overflow-y-auto"
          >
            {/* Background Image with Overlay */}
            <motion.div 
              key={activeBg}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale brightness-125 transition-all duration-1000"
              style={{ backgroundImage: `url("${activeBg}")` }}
            />

            {/* Menu Header (Replicating Main Header but with X) */}
            <div className="relative z-10 py-3 px-6 md:px-12 flex justify-center items-center text-black">
              <div className="w-full max-w-[1280px] flex justify-between items-center">
                <div 
                  ref={menuLogoRef}
                  className="relative cursor-pointer"
                  onMouseEnter={() => setIsMenuLogoHovered(true)}
                  onMouseLeave={() => setIsMenuLogoHovered(false)}
                  onClick={(e) => handleLogoClick(e, menuLogoRef, true)}
                >
                  <div className="relative">
                    <img 
                      src="https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_logo.svg" 
                      alt="RDI Lighting" 
                      className="h-10 w-auto object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.indexOf('https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/') === -1) {
                          target.src = 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_logo.svg';
                        }
                      }}
                    />
                    {/* Animated Dot for Menu Logo */}
                    <motion.div
                      animate={{
                        scale: isMenuLogoHovered ? [1, 1.8, 1] : 1,
                        opacity: isExpanding ? 0 : 1
                      }}
                      transition={{
                        scale: {
                          duration: 1.2,
                          repeat: isMenuLogoHovered ? Infinity : 0,
                          ease: "easeInOut"
                        },
                        opacity: { duration: 0.2 }
                      }}
                      className="absolute w-[5px] h-[5px] rounded-full sm:w-1.5 sm:h-1.5 bg-black"
                      style={{ top: '18%', right: '3.5%' }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3">
                  <button 
                    onClick={() => { onToggleLang(); setIsMenuOpen(false); }}
                    className={`font-bold tracking-widest hover:opacity-60 transition-opacity translate-x-[15px] ${
                      lang === 'cn' ? 'text-[14px]' : 'text-[15px]'
                    }`}
                  >
                    {lang === 'cn' ? 'EN' : '中'}
                  </button>
                  <Search 
                    size={22} 
                    strokeWidth={1.5} 
                    className="cursor-pointer hover:opacity-60 transition-opacity translate-x-[15px]" 
                    onClick={() => { setIsMenuOpen(false); setIsSearchOpen(true); }}
                  />
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center group px-2 py-1"
                    aria-label="Close Menu"
                  >
                    <X size={32} strokeWidth={1.5} className="p-1 group-hover:opacity-60 transition-opacity" />
                  </button>
                </div>
              </div>
            </div>

            {/* Centered Menu Links */}
            <div className="relative z-10 flex-grow flex flex-col items-center justify-center p-8">
              <nav className="flex flex-col items-center gap-4 md:gap-8 max-h-[70vh] overflow-y-auto scrollbar-hide">
                {[
                  { name: lang === 'cn' ? '作品' : 'Projects', link: '/projects', key: 'projects' },
                  { name: lang === 'cn' ? '研究' : 'Research', link: '/research', key: 'research' },
                  { name: lang === 'cn' ? '新闻' : 'News', link: '/news', key: 'news' },
                  { name: lang === 'cn' ? '关于' : 'About', link: '/about', key: 'about' },
                ].map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08 + 0.35, ease: [0.25, 1, 0.5, 1] }}
                    onMouseEnter={() => setActiveBg(bgImages[item.key])}
                    onMouseLeave={() => setActiveBg(bgImages.default)}
                  >
                    <Link
                      to={item.link}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-4xl md:text-6xl font-bold tracking-tight hover:opacity-50 transition-opacity"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </div>

            {/* Menu Footer */}
            <div className="relative z-10 p-8 md:p-12 flex justify-center items-center text-black">
              <div className="w-full max-w-[1280px] flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex gap-8 md:gap-12">
                  <Link 
                    to="/contact" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[17px] font-bold tracking-widest hover:opacity-50 transition-opacity uppercase"
                  >
                    {lang === 'cn' ? '联络我们' : 'Contact'}
                  </Link>
                  <Link 
                    to="/join" 
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[17px] font-bold tracking-widest hover:opacity-50 transition-opacity uppercase"
                  >
                    {lang === 'cn' ? '加入我们' : 'Join Us'}
                  </Link>
                </div>

                <div className="flex items-center gap-6">
                  <a href="#" className="hover:opacity-50 transition-opacity">{getSocialIcon('wechat', WeChatIcon)}</a>
                  <a href="#" className="hover:opacity-50 transition-opacity">{getSocialIcon('tiktok', TikTokIcon)}</a>
                  <a href="#" className="hover:opacity-50 transition-opacity">{getSocialIcon('rednote', XiaohongshuIcon)}</a>
                  <a href="#" className="hover:opacity-50 transition-opacity">{getSocialIcon('bilibili', BilibiliIcon)}</a>
                  <a href="#" className="hover:opacity-50 transition-opacity">{getSocialIcon('instagram', InstagramIcon)}</a>
                  <a href="#" className="hover:opacity-50 transition-opacity">{getSocialIcon('facebook', FacebookIcon)}</a>
                  <a href="#" className="hover:opacity-50 transition-opacity">{getSocialIcon('linkedin', LinkedinIcon)}</a>
                  <a href="#" className="hover:opacity-50 transition-opacity">{getSocialIcon('youtube', YoutubeIcon)}</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[110] bg-white flex flex-col"
          >
            {/* Replicating Header Row to keep Logo in original position exactly */}
            <div className="w-full py-3 px-6 md:px-12 flex justify-center items-center text-black shrink-0">
              <div className="w-full max-w-[1280px] flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div 
                    onClick={(e) => { setIsSearchOpen(false); setSearchQuery(''); handleLogoClick(e, logoRef, false); }}
                    className="relative flex items-center cursor-pointer group"
                  >
                    <div className="relative">
                      <img 
                        src="https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_logo.svg" 
                        alt="RDI Lighting" 
                        className="h-10 w-auto object-contain"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src.indexOf('https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/') === -1) {
                            target.src = 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/public/rdi_logo.svg';
                          }
                        }}
                      />
                      {/* Animated Dot for feedback */}
                      <motion.div
                        className="absolute w-[5px] h-[5px] rounded-full sm:w-1.5 sm:h-1.5 bg-black"
                        style={{ top: '18%', right: '3.5%' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                    className="flex items-center group px-2 py-1 text-black hover:opacity-60 transition-opacity"
                    aria-label="Close Search"
                  >
                    <X size={32} strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            </div>

            {/* Search Input Area */}
            <div className="w-full px-6 md:px-12 flex justify-center shrink-0">
              <div className="w-full max-w-[1280px] pt-10 pb-6 flex flex-col">
                <div className="flex justify-between items-center border-b border-black/15 pb-3">
                  <input 
                    autoFocus
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full bg-transparent text-xl md:text-3xl text-black font-light focus:outline-none placeholder-gray-400 p-0 m-0"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="text-black/40 hover:text-black transition-colors p-2 text-xs font-mono tracking-widest uppercase mr-2 whitespace-nowrap"
                    >
                      {lang === 'cn' ? '清空' : 'CLEAR'}
                    </button>
                  )}
                </div>

                {/* Suggestions row shown when searchQuery is empty */}
                {!searchQuery && (
                  <div className="mt-6 flex flex-wrap gap-4 text-black/50 text-sm p-0 m-0">
                    <span>{lang === 'cn' ? '热门:' : 'Popular:'}</span>
                    {(lang === 'cn' 
                      ? ['住宅', '办公', '美术馆', '商业', '文化', '建筑'] 
                      : ['Residential', 'Office', 'Gallery', 'Commercial', 'Cultural', 'Architectural']
                    ).map((tag) => (
                      <button 
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="hover:text-black transition-colors underline decoration-black/15 underline-offset-4"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Scrollable Results Area */}
            {searchQuery && (
              <div className="flex-grow overflow-y-auto pb-24 px-6 md:px-12 w-full flex justify-center scrollbar-thin">
                <div className="w-full max-w-[1280px]">
                {!hasResults ? (
                  <div className="py-20 text-center text-black/40">
                    <p className="text-2xl font-light mb-2">
                      {lang === 'cn' ? '未找到相关内容' : 'No results found'}
                    </p>
                    <p className="text-base font-light">
                      {lang === 'cn' ? '尝试搜索其他关键词，例如“住宅”或“美术馆”' : 'Try searching for other keywords, such as "Residential" or "Gallery"'}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-8">
                    {/* Projects Column */}
                    <div>
                      <div className="pb-3 mb-6">
                        <span className="text-base font-mono font-bold tracking-[0.3em] uppercase text-black/40">
                          {lang === 'cn' ? '设计作品' : 'PROJECTS'} ({results.projects.length})
                        </span>
                      </div>
                      {results.projects.length === 0 ? (
                        <p className="text-base text-black/30 font-light italic">
                          {lang === 'cn' ? '无匹配作品' : 'No matching projects'}
                        </p>
                      ) : (
                        <div className="space-y-6">
                          {results.projects.map((item) => (
                            <Link
                              key={item.slug || item.id}
                              to={`/project/${item.slug || item.id}`}
                              onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                              className="block group"
                            >
                              <div className="flex gap-4">
                                {item.image && (
                                  <div className="w-16 h-16 shrink-0 bg-black/5 overflow-hidden">
                                    <img 
                                      src={item.image} 
                                      alt="" 
                                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                )}
                                <div className="space-y-1">
                                  <h4 className="text-base font-bold text-black group-hover:text-amber-600 transition-colors leading-tight line-clamp-2">
                                    {lang === 'cn' ? item.titleCN : item.titleEN}
                                  </h4>
                                  <p className="text-sm text-black/40 font-light">
                                    {lang === 'cn' ? item.location : item.locationEN}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Research Column */}
                    <div>
                      <div className="pb-3 mb-6">
                        <span className="text-base font-mono font-bold tracking-[0.3em] uppercase text-black/40">
                          {lang === 'cn' ? '学术研究' : 'RESEARCH'} ({results.research.length})
                        </span>
                      </div>
                      {results.research.length === 0 ? (
                        <p className="text-base text-black/30 font-light italic">
                          {lang === 'cn' ? '无匹配研究' : 'No matching research'}
                        </p>
                      ) : (
                        <div className="space-y-6">
                          {results.research.map((item) => (
                            <Link
                              key={item.id}
                              to={`/research/${item.id}`}
                              onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                              className="block group"
                            >
                              <div className="flex gap-4">
                                {item.image && (
                                  <div className="w-16 h-16 shrink-0 bg-black/5 overflow-hidden">
                                    <img 
                                      src={item.image} 
                                      alt="" 
                                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                )}
                                <div className="space-y-1">
                                  <h4 className="text-base font-bold text-black group-hover:text-amber-600 transition-colors leading-tight line-clamp-2">
                                    {lang === 'cn' ? item.titleCN : item.titleEN}
                                  </h4>
                                  <p className="text-xs text-black/40 font-mono">
                                    {item.date}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* News Column */}
                    <div>
                      <div className="pb-3 mb-6">
                        <span className="text-base font-mono font-bold tracking-[0.3em] uppercase text-black/40">
                          {lang === 'cn' ? '新闻动态' : 'NEWS'} ({results.news.length})
                        </span>
                      </div>
                      {results.news.length === 0 ? (
                        <p className="text-base text-black/30 font-light italic">
                          {lang === 'cn' ? '无匹配新闻' : 'No matching news'}
                        </p>
                      ) : (
                        <div className="space-y-6">
                          {results.news.map((item) => (
                            <Link
                              key={item.id}
                              to={`/news/${item.id}`}
                              onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                              className="block group"
                            >
                              <div className="flex gap-4">
                                {item.image && (
                                  <div className="w-16 h-16 shrink-0 bg-black/5 overflow-hidden">
                                    <img 
                                      src={item.image} 
                                      alt="" 
                                      className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
                                      referrerPolicy="no-referrer"
                                    />
                                  </div>
                                )}
                                <div className="space-y-1">
                                  <h4 className="text-base font-bold text-black group-hover:text-amber-600 transition-colors leading-tight line-clamp-2">
                                    {lang === 'cn' ? item.titleCN : item.titleEN}
                                  </h4>
                                  <p className="text-xs text-black/40 font-mono">
                                    {item.date}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
