import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Language } from '../App';
import { useProjects } from '../context/ProjectContext';
import { marked } from 'marked';

// Helper to ensure markdown lines starting with ### are correctly spaced for parser
const preprocessMarkdown = (text: string): string => {
  if (!text) return '';
  return text.replace(/^###[ \t]*(.*)/gm, '### $1');
};

interface ResearchDetailProps {
  lang: Language;
}

const ResearchDetail = ({ lang }: ResearchDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const { getResearchItem, loading, research } = useProjects();
  const researchItem = getResearchItem(id);

  const currentIndex = research && researchItem ? research.findIndex(r => r.id === researchItem.id) : -1;
  const prevResearch = (research && research.length > 0 && currentIndex !== -1)
    ? research[(currentIndex - 1 + research.length) % research.length]
    : null;
  const nextResearch = (research && research.length > 0 && currentIndex !== -1)
    ? research[(currentIndex + 1) % research.length]
    : null;

  if (loading) {
    return (
      <div className="pt-24 pb-20 bg-white min-h-[80vh] flex flex-col justify-center items-center">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-gray-100"></div>
          <div className="absolute inset-0 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!researchItem) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center animate-fade-in">
        <h1 className="text-2xl font-bold mb-8 text-neutral-800">Research Not Found / 未找到研究内容</h1>
        <Link to="/research" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">
          Back to Research / 返回研究
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pt-24 pb-20 px-6 md:px-12 flex flex-col items-center">
      {/* 顶部导航与日期、分类 / Top Navigation, Date and Category row */}
      <div className="w-full max-w-[1280px] mb-12 flex justify-between items-center pb-6">
        <Link 
          to="/research" 
          className="group flex items-center gap-3 text-gray-400 hover:text-gray-950 transition-colors inline-flex"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[13px] font-bold uppercase tracking-[0.2em]">
            {lang === 'cn' ? '返回' : 'Back'}
          </span>
        </Link>

        <div className="flex items-center gap-4 text-gray-400 text-[12px] font-bold uppercase tracking-widest">
          <span>{lang === 'cn' ? (researchItem.tagsCN || '研究') : (researchItem.tagsEN || researchItem.category || 'RESEARCH')}</span>
          <span className="text-gray-200">/</span>
          <span>{researchItem.date}</span>
        </div>
      </div>

      <article className="w-full max-w-[1280px]">
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-[29px] md:text-[45px] font-bold leading-[1.1] tracking-tight text-gray-900 mb-8 no-underline">
              {lang === 'cn' ? researchItem.titleCN : researchItem.titleEN}
            </h1>
          </motion.div>
        </header>

        {researchItem.blocks && researchItem.blocks.length > 0 ? (
          <div className="space-y-0">
            {researchItem.blocks.map((block, idx) => {
              const blockKey = `research-block-${idx}-${block.type}`;
              
              if (block.type === 'text_1col') {
                const textContent = lang === 'cn' ? block.c1_cn : block.c1_en;
                if (!textContent) return null;
                const rawHtml = marked.parse(preprocessMarkdown(textContent), { breaks: true }) as string;
                return (
                  <section key={blockKey} className="py-12 bg-white border-b border-gray-100 last:border-0">
                    <div className="max-w-4xl mx-auto text-center">
                      <div 
                        className="text-[17px] md:text-[18px] leading-[1.9] text-neutral-800 font-light text-left md:text-center
                                   [&_h3]:text-[22px] [&_h3]:md:text-[26px] [&_h3]:font-extrabold [&_h3]:text-black [&_h3]:mb-8 [&_h3]:mt-2 [&_h3]:text-center [&_h3]:tracking-[0.05em]
                                   [&_p]:mb-4 [&_p]:last:mb-0 [&_p]:text-neutral-700 [&_p]:leading-[1.9] [&_p]:text-left [&_p]:md:text-center"
                        dangerouslySetInnerHTML={{ __html: rawHtml }}
                      />
                    </div>
                  </section>
                );
              }

              if (block.type === 'text_2col') {
                const textLeft = lang === 'cn' ? block.c1_cn : block.c1_en;
                const textRight = lang === 'cn' ? block.c2_cn : block.c2_en;
                if (!textLeft && !textRight) return null;
                const htmlLeft = textLeft ? (marked.parse(preprocessMarkdown(textLeft), { breaks: true }) as string) : '';
                const htmlRight = textRight ? (marked.parse(preprocessMarkdown(textRight), { breaks: true }) as string) : '';
                return (
                  <section key={blockKey} className="py-12 bg-[#fafafa] border-b border-gray-100 last:border-0">
                    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                      <div 
                        className="text-[16px] leading-[1.8] text-neutral-700 font-light text-left
                                   [&_h3]:text-[20px] [&_h3]:font-extrabold [&_h3]:text-black [&_h3]:mb-6 [&_h3]:mt-2 [&_h3]:text-left [&_h3]:tracking-[0.05em]
                                   [&_p]:mb-4 [&_p]:last:mb-0 [&_p]:text-neutral-600 [&_p]:leading-[1.8]"
                        dangerouslySetInnerHTML={htmlLeft ? { __html: htmlLeft } : undefined}
                      />
                      <div 
                        className="text-[16px] leading-[1.8] text-neutral-700 font-light text-left
                                   [&_h3]:text-[20px] [&_h3]:font-extrabold [&_h3]:text-black [&_h3]:mb-6 [&_h3]:mt-2 [&_h3]:text-left [&_h3]:tracking-[0.05em]
                                   [&_p]:mb-4 [&_p]:last:mb-0 [&_p]:text-neutral-600 [&_p]:leading-[1.8]"
                        dangerouslySetInnerHTML={htmlRight ? { __html: htmlRight } : undefined}
                      />
                    </div>
                  </section>
                );
              }

              if (block.type === 'image_full') {
                const imageUrl = (block.c1_cn || block.c1_en || '').trim();
                if (!imageUrl) return null;
                return (
                  <section key={blockKey} className="w-full h-[50vh] md:h-[65vh] overflow-hidden relative border-b border-gray-100 last:border-0 bg-neutral-50 my-12">
                    {imageUrl.endsWith('.mp4') || imageUrl.includes('.mp4') ? (
                      <video src={imageUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                    ) : (
                      <img src={imageUrl} alt="Full Width View" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    )}
                  </section>
                );
              }

              if (block.type === 'text_img') {
                const isTextLeft = block.style && (block.style.toLowerCase().includes('left') || block.style.toLowerCase().includes('左'));
                const textContent = lang === 'cn' ? block.c1_cn : block.c1_en;
                const imgUrl = (block.c2_cn || block.c2_en || '').trim();
                if (!textContent && !imgUrl) return null;
                const textHtml = textContent ? (marked.parse(preprocessMarkdown(textContent), { breaks: true }) as string) : '';
                return (
                  <section key={blockKey} className="py-12 bg-white border-b border-gray-100 last:border-0">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                      <div className={`md:col-span-5 space-y-6 ${isTextLeft ? 'md:order-1' : 'md:order-2'}`}>
                        <div 
                          className="text-[16px] leading-[1.8] text-neutral-700 font-light text-left
                                     [&_h3]:text-[20px] [&_h3]:font-extrabold [&_h3]:text-black [&_h3]:mb-6 [&_h3]:mt-2 [&_h3]:text-left [&_h3]:tracking-[0.05em]
                                     [&_p]:mb-4 [&_p]:last:mb-0 [&_p]:text-neutral-600 [&_p]:leading-[1.8]"
                          dangerouslySetInnerHTML={textHtml ? { __html: textHtml } : undefined}
                        />
                      </div>
                      {imgUrl && (
                        <div className={`md:col-span-7 ${isTextLeft ? 'md:order-2' : 'md:order-1'} h-[35vh] md:h-[50vh] overflow-hidden bg-neutral-50 relative group`}>
                          {imgUrl.endsWith('.mp4') || imgUrl.includes('.mp4') ? (
                            <video src={imgUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                          ) : (
                            <img src={imgUrl} alt="Visual Detail" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          )}
                        </div>
                      )}
                    </div>
                  </section>
                );
              }

              if (block.type === 'image_grid') {
                const urls = (block.c1_cn || block.c1_en || '').split(',')
                  .map((s: string) => s.trim())
                  .filter((s: string) => s.length > 0 && (s.startsWith('http') || s.startsWith('/') || s.includes('.')));
                
                if (urls.length === 0) return null;
                const isOneTwoStyle = block.style && (block.style.toLowerCase().includes('1-2') || block.style.toLowerCase().includes('左大'));

                return (
                  <section key={blockKey} className="py-12 bg-white border-b border-gray-100 last:border-0">
                    {isOneTwoStyle && urls.length >= 2 ? (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                        <div className="md:col-span-7 h-[40vh] md:h-[55vh] overflow-hidden bg-neutral-50 relative group">
                          {urls[0].endsWith('.mp4') || urls[0].includes('.mp4') ? (
                            <video src={urls[0]} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                          ) : (
                            <img src={urls[0]} alt="Grid item 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          )}
                        </div>
                        <div className="md:col-span-5 flex flex-col gap-2">
                          {urls.slice(1).map((url, subIdx) => (
                            <div key={subIdx} className="h-[19vh] md:h-[26vh] overflow-hidden bg-neutral-50 relative group">
                              {url.endsWith('.mp4') || url.includes('.mp4') ? (
                                <video src={url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                              ) : (
                                <img src={url} alt={`Grid item ${subIdx + 2}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="columns-1 sm:columns-2 lg:columns-3 gap-2 space-y-2">
                        {urls.map((url, imgIdx) => (
                          <div key={imgIdx} className="break-inside-avoid overflow-hidden bg-neutral-50 relative group shadow-sm">
                            {url.endsWith('.mp4') || url.includes('.mp4') ? (
                              <video src={url} autoPlay loop muted playsInline className="w-full h-auto object-cover max-h-[70vh]" />
                            ) : (
                              <img src={url} alt={`Gallery item ${imgIdx + 1}`} className="w-full h-auto object-cover max-h-[70vh]" referrerPolicy="no-referrer" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                );
              }

              return null;
            })}
          </div>
        ) : (
          <>
            {/* Fallback to original layout if no blocks are parsed */}
            {/* Hero Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-video bg-gray-100 overflow-hidden mb-20"
            >
              <img 
                src={`${researchItem.image}?auto=format&fit=crop&q=80&w=2400`}
                alt={lang === 'cn' ? researchItem.titleCN : researchItem.titleEN}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            {/* Content Section */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
              <div className="md:col-span-8">
                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-8 text-[15px]">
                  <div className="space-y-6">
                    <p className="text-lg font-medium text-gray-900 leading-relaxed italic border-l-2 border-gray-900 pl-6 py-2">
                      {lang === 'cn' 
                        ? (researchItem.contentCN ? researchItem.contentCN.substring(0, 50) + "..." : "光不仅是视觉的媒介，更是情感与认知的触媒。")
                        : (researchItem.contentEN ? researchItem.contentEN.substring(0, 50) + "..." : "Light is not just a medium for vision, but a catalyst for emotion and cognition.")
                      }
                    </p>
                    <p>
                      {lang === 'cn' ? researchItem.contentCN : researchItem.contentEN}
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-gray-100 pt-12 md:pt-0 md:pl-12">
                <div className="space-y-10">
                  {researchItem.location && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Focus Region / 研究区域</h4>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">{researchItem.location}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Share / 分享</h4>
                    <div className="flex gap-4">
                      <a href="#" className="text-[10px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">Copy Link</a>
                      <a href="#" className="text-[10px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">WeChat</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Gallery */}
            {researchItem.gallery && researchItem.gallery.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
                {researchItem.gallery.map((img, index) => (
                  <div key={index} className="aspect-square bg-gray-100 overflow-hidden group">
                    <img 
                      src={img} 
                      alt={`Research Detail ${index + 1}`} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Footer Navigation */}
        <footer className="pt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-none">
          {/* Previous Research Button */}
          {prevResearch ? (
            <Link 
              to={`/research/${prevResearch.id}`} 
              className="flex items-center gap-3 group text-left max-w-full md:max-w-[350px] w-full md:w-auto"
            >
              <ChevronLeft size={20} className="text-gray-300 group-hover:text-black group-hover:-translate-x-1 transition-all shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {lang === 'cn' ? '上一个研究' : 'PREVIOUS RESEARCH'}
                </span>
                <span className="text-xs font-bold text-gray-900 group-hover:text-black line-clamp-1 leading-normal transition-colors">
                  {lang === 'cn' ? prevResearch.titleCN : prevResearch.titleEN}
                </span>
              </div>
            </Link>
          ) : <div className="hidden md:block w-[350px]" />}

          {/* More Research in the Center */}
          <Link 
            to="/research" 
            className="text-[14px] font-bold uppercase tracking-[0.4em] text-gray-900 hover:opacity-60 transition-opacity whitespace-nowrap py-2 md:py-0"
          >
            {lang === 'cn' ? '更多研究' : 'More Research'}
          </Link>

          {/* Next Research Button */}
          {nextResearch ? (
            <Link 
              to={`/research/${nextResearch.id}`} 
              className="flex items-center gap-3 group text-right max-w-full md:max-w-[350px] w-full md:w-auto justify-end"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {lang === 'cn' ? '下一个研究' : 'NEXT RESEARCH'}
                </span>
                <span className="text-xs font-bold text-gray-900 group-hover:text-black line-clamp-1 leading-normal transition-colors">
                  {lang === 'cn' ? nextResearch.titleCN : nextResearch.titleEN}
                </span>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ) : <div className="hidden md:block w-[350px]" />}
        </footer>
      </article>
    </div>
  );
};

export default ResearchDetail;
