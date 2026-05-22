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
}

export default function Header({ lang, onToggleLang }: HeaderProps) {
  const { homeConfig } = useProjects();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
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
    default: '/media/public/default.webp',
    projects: homeConfig?.hiddenMenu?.projects || '/media/public/projects.webp',
    research: homeConfig?.hiddenMenu?.research || '/media/public/research.webp',
    news: homeConfig?.hiddenMenu?.news || '/media/public/news.webp',
    about: homeConfig?.hiddenMenu?.about || '/media/public/about.webp'
  };

  const [activeBg, setActiveBg] = useState(bgImages.default);

  useEffect(() => {
    setActiveBg(bgImages.default);
  }, [homeConfig]);

  const getSocialIcon = (key: string, DefaultComponent: React.ComponentType<any>) => {
    return (
      <img 
        src={`/media/public/rdi_${key}.svg`} 
        alt={key} 
        className="w-5 h-5 object-contain hover:opacity-50 transition-opacity"
        referrerPolicy="no-referrer"
        onError={(e) => {
          const target = e.currentTarget;
          if (target.src.indexOf('/media/public/') === -1) {
            target.src = `/media/public/rdi_${key}.svg`;
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
                ref={logoRef}
                onClick={(e) => handleLogoClick(e, logoRef, false)}
                onMouseEnter={() => setIsLogoHovered(true)}
                onMouseLeave={() => setIsLogoHovered(false)}
                className="relative flex items-center cursor-pointer group"
              >
                <div className="relative">
                  <img 
                    src="/media/public/rdi_logo.svg" 
                    alt="RDI Lighting" 
                    className={`h-10 w-auto object-contain transition-all duration-500 ${(isLightPage && !isScrolled) ? '' : 'invert'}`}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.indexOf('/media/public/') === -1) {
                        target.src = '/media/public/rdi_logo.svg';
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
              className="flex items-center gap-1 text-[13px] font-bold tracking-widest transition-opacity hover:opacity-60 cursor-pointer uppercase translate-x-[7px]"
            >
              {lang === 'cn' ? 'EN' : 'CN'}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                      src="/media/public/rdi_logo.svg" 
                      alt="RDI Lighting" 
                      className="h-10 w-auto object-contain"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (target.src.indexOf('/media/public/') === -1) {
                          target.src = '/media/public/rdi_logo.svg';
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
                    className="text-[13px] font-bold tracking-widest hover:opacity-60 transition-opacity translate-x-[15px]"
                  >
                    {lang === 'cn' ? 'EN' : 'CN'}
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
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
            className="fixed inset-0 z-[110] bg-black/95 flex flex-col"
          >
            <div className="flex justify-end p-8 md:p-12">
              <button 
                onClick={() => setIsSearchOpen(false)}
                className="text-white hover:opacity-60 transition-opacity px-4 py-2"
              >
                <X size={32} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="flex-grow flex items-center justify-center px-6 md:px-24">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-full max-w-4xl"
              >
                <input 
                  autoFocus
                  type="text" 
                  placeholder={t.searchPlaceholder}
                  className="w-full bg-transparent border-b border-white/30 py-4 text-2xl md:text-5xl text-white font-light focus:outline-none focus:border-white transition-colors"
                />
                <div className="mt-8 flex flex-wrap gap-4 text-white/50 text-sm">
                  <span>{lang === 'cn' ? '热门:' : 'Popular:'}</span>
                  <button className="hover:text-white transition-colors">Residential</button>
                  <button className="hover:text-white transition-colors">Public Space</button>
                  <button className="hover:text-white transition-colors">Art Installation</button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
