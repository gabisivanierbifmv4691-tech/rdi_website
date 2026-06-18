import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import type { Language } from '../App';
import { useProjects } from '../context/ProjectContext';

interface HeroProps {
  lang: Language;
}

export default function Hero({ lang }: HeroProps) {
  const { projects, homeConfig } = useProjects();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Fallback slides in case of network issue or before loading
  const fallbackSlides = [
    {
      id: 'shanghai-psa',
      title: '',
      location: '',
      image: 'https://rdilighting.oss-cn-hongkong.aliyuncs.com/projects/shanghai-psa/hero-image.jpg',
    }
  ];

  let slides = fallbackSlides;
  if (homeConfig && homeConfig.heroSlides && homeConfig.heroSlides.length > 0 && projects.length > 0) {
    const mapped = homeConfig.heroSlides.map(slug => {
      const p = projects.find(proj => proj.slug === slug);
      if (p) {
        return {
          id: p.slug,
          title: lang === 'cn' ? p.titleCN : p.titleEN,
          location: lang === 'cn' ? p.location : p.locationEN,
          image: p.image || p.heroMedia,
        };
      }
      return null;
    }).filter(Boolean) as any[];

    if (mapped.length > 0) {
      slides = mapped;
    }
  }

  const slidesLength = slides.length;
  const safeIndex = currentIndex < slidesLength ? currentIndex : 0;

  // Preload all slideshow images eagerly
  useEffect(() => {
    slides.forEach(slide => {
      const url = slide.image;
      if (url && !loadedImages[url] && !failedImages[url]) {
        const img = new Image();
        img.referrerPolicy = 'no-referrer';
        img.src = url;
        img.onload = () => {
          setLoadedImages(prev => ({ ...prev, [url]: true }));
        };
        img.onerror = () => {
          setFailedImages(prev => ({ ...prev, [url]: true }));
        };
      }
    });
  }, [slides]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slidesLength);
    }, 4000);

    return () => clearInterval(timer);
  }, [slidesLength]);

  const content = {
    type: lang === 'cn' ? '项目' : 'Project',
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Images */}
      <AnimatePresence>
        <motion.div
          key={safeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-black"
        >
          {slides[safeIndex] && (
            <Link to={`/project/${slides[safeIndex].id}`}>
              {slides[safeIndex].image && !failedImages[slides[safeIndex].image] && (
                <img 
                  src={slides[safeIndex].image} 
                  alt={slides[safeIndex].title}
                  className={`w-full h-full object-cover transition-opacity duration-700 ${
                    loadedImages[slides[safeIndex].image] ? 'opacity-100' : 'opacity-0'
                  }`}
                  referrerPolicy="no-referrer"
                  onLoad={() => {
                    const imgUrl = slides[safeIndex].image;
                    setLoadedImages(prev => ({ ...prev, [imgUrl]: true }));
                  }}
                  onError={() => {
                    const imgUrl = slides[safeIndex].image;
                    setFailedImages(prev => ({ ...prev, [imgUrl]: true }));
                  }}
                />
              )}
              {loadedImages[slides[safeIndex].image] && (
                <div className="absolute inset-0 bg-black/40" />
              )}
            </Link>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Content Overlay Container */}
      <div className="absolute inset-0 z-10 pointer-events-none flex justify-center px-8 md:px-12">
        <div className="w-full max-w-[1280px] relative h-full">
          {/* Text Content */}
          <div className="absolute bottom-24 left-0 text-white max-w-5xl grid grid-cols-1 grid-rows-1 pointer-events-none">
            <AnimatePresence initial={false}>
              {slides[safeIndex] && slides[safeIndex].title && loadedImages[slides[safeIndex].image] && !failedImages[slides[safeIndex].image] && (
                <motion.div
                  key={safeIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="col-start-1 row-start-1 pointer-events-auto"
                >
                  <Link to={`/project/${slides[safeIndex].id}`} className="block">
                    <h1 className="text-[27px] md:text-[41px] lg:text-[51px] font-medium tracking-tight mb-2 uppercase leading-tight">
                      {slides[safeIndex].title}
                    </h1>
                    {slides[safeIndex].location && (
                      <p className="text-[16px] md:text-[22px] lg:text-[27px] font-light opacity-90 mb-4">
                        {slides[safeIndex].location}
                      </p>
                    )}
                    <div className="text-[15px] md:text-[17px] lg:text-[21px] font-bold uppercase tracking-widest mt-6">
                      <span>{content.type}</span>
                    </div>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Slider Indicators */}
          {slides[safeIndex] && slides[safeIndex].title && loadedImages[slides[safeIndex].image] && !failedImages[slides[safeIndex].image] && slides.length > 1 && (
            <div className="absolute bottom-12 right-0 flex gap-[3px] pointer-events-auto">
              {slides.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrentIndex(i)}
                  onMouseEnter={() => setCurrentIndex(i)}
                  className="group py-4 px-1 cursor-pointer outline-none"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <div 
                    className={`h-[2px] w-6 md:w-16 transition-all duration-500 ${
                      i === safeIndex ? 'bg-white' : 'bg-white/30 group-hover:bg-white/60'
                    }`} 
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
