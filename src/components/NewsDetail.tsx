import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Share2, ChevronLeft, ChevronRight
} from 'lucide-react';
import type { Language } from '../App';
import { useProjects } from '../context/ProjectContext';
import CAUPLightShowExhibition from './CAUPLightShowExhibition';
import LaborDaySpecial from './LaborDaySpecial';
import { marked } from 'marked';

// Helper to ensure markdown lines starting with ### are correctly spaced for parser to identify headers properly
const preprocessMarkdown = (text: string): string => {
  if (!text) return '';
  return text.replace(/^###[ \t]*(.*)/gm, '### $1');
};

interface NewsDetailProps {
  lang: Language;
}

export default function NewsDetail({ lang }: NewsDetailProps) {
  const { id } = useParams<{ id: string }>();
  const { getNewsItem, news } = useProjects();
  const newsItem = getNewsItem(id);

  const currentIndex = news && newsItem ? news.findIndex(n => n.id === newsItem.id) : -1;
  const prevNews = (news && news.length > 0 && currentIndex !== -1)
    ? news[(currentIndex - 1 + news.length) % news.length]
    : null;
  const nextNews = (news && news.length > 0 && currentIndex !== -1)
    ? news[(currentIndex + 1) % news.length]
    : null;

  if (!newsItem) {
    return (
      <div className="h-screen flex items-center justify-center bg-white text-gray-900">
        <div className="text-center">
          <h2 className="text-2xl font-light mb-4">News Not Found / 未找到该新闻</h2>
          <Link to="/news" className="text-sm underline uppercase tracking-widest">Back to News / 返回新闻列表</Link>
        </div>
      </div>
    );
  }

  // Check if this is the special CAUP 2026 Light Show exhibition (id '20260515_cau')
  if (newsItem.id === '20260515_cau') {
    return <CAUPLightShowExhibition lang={lang} />;
  }

  // Check if this is the special Labor Day holiday tribute (id '20260501_ld')
  if (newsItem.id === '20260501_ld') {
    return <LaborDaySpecial lang={lang} />;
  }

  // Fallback to original standard dynamic news detail rendering
  return (
    <div className="bg-white min-h-screen pt-24 pb-20 px-6 md:px-12 flex flex-col items-center">
      {/* 顶部导航与日期、分类 / Top Navigation, Date and Category row */}
      <div className="w-full max-w-[1280px] mb-12 flex justify-between items-center pb-6">
        <Link 
          to="/news" 
          className="group flex items-center gap-3 text-gray-400 hover:text-gray-950 transition-colors inline-flex"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[13px] font-bold uppercase tracking-[0.2em]">
            {lang === 'cn' ? '返回' : 'Back'}
          </span>
        </Link>

        <div className="flex items-center gap-4 text-gray-400 text-[12px] font-bold uppercase tracking-widest">
          <span>{lang === 'cn' ? (newsItem.tagsCN || '动态') : (newsItem.tagsEN || newsItem.category || 'NEWS')}</span>
          <span className="text-gray-200">/</span>
          <span>{newsItem.date}</span>
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
              {lang === 'cn' ? newsItem.titleCN : newsItem.titleEN}
            </h1>
          </motion.div>
        </header>

        {newsItem.blocks && newsItem.blocks.length > 0 ? (
          <div className="space-y-0">
            {newsItem.blocks.map((block, idx) => {
              const blockKey = `news-block-${idx}-${block.type}`;
              
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
                  <section key={blockKey} className="w-full h-[45vh] md:h-[65vh] overflow-hidden relative border-b border-gray-100 bg-neutral-50 last:border-0 mb-12 last:mb-0">
                    {imageUrl.endsWith('.mp4') || imageUrl.includes('.mp4') ? (
                      <video 
                        src={imageUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img 
                        src={imageUrl} 
                        alt="Full Width View" 
                        className="w-full h-full object-cover" 
                        referrerPolicy="no-referrer"
                      />
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
                    <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
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
                            <img src={imgUrl} alt="Visual Detail" className="w-full h-full object-cover hover:scale-101 transition-transform duration-[1.2s]" referrerPolicy="no-referrer" />
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
                    <div className="w-full max-w-[1280px] mx-auto">
                      {isOneTwoStyle && urls.length >= 2 ? (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                          <div className="md:col-span-7 h-[40vh] md:h-[55vh] overflow-hidden bg-neutral-50 relative group">
                            {urls[0].endsWith('.mp4') || urls[0].includes('.mp4') ? (
                              <video src={urls[0]} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-1000" />
                            ) : (
                              <img src={urls[0]} alt="Grid item 1" className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-1000" referrerPolicy="no-referrer" />
                            )}
                          </div>
                          <div className="md:col-span-5 flex flex-col gap-2">
                            {urls.slice(1).map((url, subIdx) => (
                              <div key={subIdx} className="h-[18vh] md:h-[26vh] overflow-hidden bg-neutral-50 relative group">
                                {url.endsWith('.mp4') || url.includes('.mp4') ? (
                                  <video src={url} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-1000" />
                                ) : (
                                  <img src={url} alt={`Grid item ${subIdx + 2}`} className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-1000" referrerPolicy="no-referrer" />
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-2 space-y-2">
                          {urls.map((url, imgIdx) => (
                            <div key={imgIdx} className="break-inside-avoid overflow-hidden bg-neutral-50 relative group shadow-sm hover:shadow-md transition-all duration-700">
                              {url.endsWith('.mp4') || url.includes('.mp4') ? (
                                <video src={url} autoPlay loop muted playsInline className="w-full h-auto object-cover max-h-[70vh]" />
                              ) : (
                                <img src={url} alt={`Gallery item ${imgIdx + 1}`} className="w-full h-auto object-cover max-h-[70vh] hover:scale-101 transition-transform duration-1000" referrerPolicy="no-referrer" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </section>
                );
              }

              return null;
            })}
          </div>
        ) : (
          <>
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="aspect-[16/9] overflow-hidden bg-gray-100 mb-16"
            >
              <img 
                src={newsItem.image} 
                alt="Hero" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
              <div className="md:col-span-8">
                <div className="prose prose-sm max-w-none text-gray-600 leading-relaxed space-y-8 text-[15px]">
                  <div className="space-y-6">
                    <p className="text-lg font-medium text-gray-900 leading-relaxed italic border-l-2 border-gray-900 pl-6 py-2">
                      {lang === 'cn' 
                        ? (newsItem.contentCN ? newsItem.contentCN.substring(0, 60) + "..." : newsItem.titleCN)
                        : (newsItem.contentEN ? newsItem.contentEN.substring(0, 60) + "..." : newsItem.titleEN)
                      }
                    </p>
                    <p>
                      {lang === 'cn' ? newsItem.contentCN : newsItem.contentEN}
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-gray-100 pt-12 md:pt-0 md:pl-12">
                <div className="space-y-10">
                  {newsItem.location && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Location / 地点</h4>
                      <p className="text-xs font-bold text-gray-900 uppercase tracking-widest">{newsItem.location}</p>
                    </div>
                  )}
                  <div>
                    <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-4">Share / 分享</h4>
                    <div className="flex gap-4">
                      <button className="text-gray-400 hover:text-gray-900 transition-colors">
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {newsItem.gallery && newsItem.gallery.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
                {newsItem.gallery.map((img, index) => (
                  <div key={index} className="aspect-square bg-gray-100 overflow-hidden group">
                    <img 
                      src={img} 
                      alt={`Detail ${index + 1}`} 
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
          {/* Previous News Button */}
          {prevNews ? (
            <Link 
              to={`/news/${prevNews.id}`} 
              className="flex items-center gap-3 group text-left max-w-full md:max-w-[350px] w-full md:w-auto"
            >
              <ChevronLeft size={20} className="text-gray-300 group-hover:text-black group-hover:-translate-x-1 transition-all shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {lang === 'cn' ? '上一个动态' : 'PREVIOUS NEWS'}
                </span>
                <span className="text-xs font-bold text-gray-900 group-hover:text-black line-clamp-1 leading-normal transition-colors">
                  {lang === 'cn' ? prevNews.titleCN : prevNews.titleEN}
                </span>
              </div>
            </Link>
          ) : <div className="hidden md:block w-[350px]" />}

          {/* More News in the Center */}
          <Link 
            to="/news" 
            className="text-[14px] font-bold uppercase tracking-[0.4em] text-gray-900 hover:opacity-60 transition-opacity whitespace-nowrap py-2 md:py-0"
          >
            {lang === 'cn' ? '更多动态' : 'More News'}
          </Link>

          {/* Next News Button */}
          {nextNews ? (
            <Link 
              to={`/news/${nextNews.id}`} 
              className="flex items-center gap-3 group text-right max-w-full md:max-w-[350px] w-full md:w-auto justify-end"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                  {lang === 'cn' ? '下一个动态' : 'NEXT NEWS'}
                </span>
                <span className="text-xs font-bold text-gray-900 group-hover:text-black line-clamp-1 leading-normal transition-colors">
                  {lang === 'cn' ? nextNews.titleCN : nextNews.titleEN}
                </span>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ) : <div className="hidden md:block w-[350px]" />}
        </footer>
      </article>
    </div>
  );
}
