import { useEffect } from 'react';
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

  // Parse seo_meta and geo_entities
  const seoInfo = (() => {
    const info: { slug?: string; title_cn?: string; title_en?: string; desc_cn?: string; desc_en?: string } = {};
    if (!researchItem || !researchItem.seoMeta) return info;
    researchItem.seoMeta.split('|').forEach(part => {
      const idx = part.indexOf(':');
      if (idx !== -1) {
        const key = part.substring(0, idx).trim().toLowerCase();
        const val = part.substring(idx + 1).trim();
        if (key === 'slug') info.slug = val;
        else if (key === 'title_cn') info.title_cn = val;
        else if (key === 'title_en') info.title_en = val;
        else if (key === 'desc_cn') info.desc_cn = val;
        else if (key === 'desc_en') info.desc_en = val;
      }
    });
    return info;
  })();

  const geoInfo = (() => {
    const info: { cn: string[]; en: string[] } = { cn: [], en: [] };
    if (!researchItem || !researchItem.geoEntities) return info;
    researchItem.geoEntities.split('|').forEach(part => {
      const idx = part.indexOf(':');
      if (idx !== -1) {
        const key = part.substring(0, idx).trim().toLowerCase();
        const val = part.substring(idx + 1).trim();
        const items = val.split(';').map(v => v.trim()).filter(Boolean);
        if (key === 'cn_entities') info.cn = items;
        else if (key === 'en_entities') info.en = items;
      }
    });
    return info;
  })();

  // Dynamic SEO & GEO optimization (document title, meta tags, and JSON-LD structured schema)
  useEffect(() => {
    if (researchItem) {
      const customTitle = lang === 'cn' 
        ? (seoInfo.title_cn || researchItem.titleCN) 
        : (seoInfo.title_en || researchItem.titleEN);
      document.title = `${customTitle} | RDI RDILighting`;

      // Meta Description
      const customDesc = lang === 'cn' ? seoInfo.desc_cn : seoInfo.desc_en;
      if (customDesc) {
        let metaDesc = document.querySelector('meta[name="description"]');
        if (!metaDesc) {
          metaDesc = document.createElement('meta');
          metaDesc.setAttribute('name', 'description');
          document.head.appendChild(metaDesc);
        }
        metaDesc.setAttribute('content', customDesc);
      }

      // Meta Keywords
      const keywords = lang === 'cn' ? geoInfo.cn.join(', ') : geoInfo.en.join(', ');
      if (keywords) {
        let metaKeywords = document.querySelector('meta[name="keywords"]');
        if (!metaKeywords) {
          metaKeywords = document.createElement('meta');
          metaKeywords.setAttribute('name', 'keywords');
          document.head.appendChild(metaKeywords);
        }
        metaKeywords.setAttribute('content', keywords);
      }

      // JSON-LD Schema
      const schemaData = {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        "headline": lang === 'cn' ? researchItem.titleCN : researchItem.titleEN,
        "alternativeHeadline": lang === 'cn' ? seoInfo.title_cn : seoInfo.title_en,
        "description": lang === 'cn' ? seoInfo.desc_cn : seoInfo.desc_en,
        "image": researchItem.image && (researchItem.image.startsWith('http') || researchItem.image.startsWith('/') ? researchItem.image : `/research/${researchItem.image}`),
        "datePublished": researchItem.date,
        "author": {
          "@type": "Organization",
          "name": lang === 'cn' ? "RDI 瑞逸照明设计" : "Radiant Design International"
        },
        "about": (lang === 'cn' ? geoInfo.cn : geoInfo.en).map(entity => ({
          "@type": "Thing",
          "name": entity
        }))
      };

      let scriptJsonLd = document.getElementById('jsonld-research-seo');
      if (!scriptJsonLd) {
        scriptJsonLd = document.createElement('script');
        scriptJsonLd.id = 'jsonld-research-seo';
        scriptJsonLd.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptJsonLd);
      }
      scriptJsonLd.textContent = JSON.stringify(schemaData);
    }
    return () => {
      document.title = "RDI Lighting";
      const scriptJsonLd = document.getElementById('jsonld-research-seo');
      if (scriptJsonLd) {
        scriptJsonLd.remove();
      }
    };
  }, [researchItem, lang, seoInfo, geoInfo]);

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
          <span>{lang === 'cn' ? (researchItem.categoryCN || researchItem.tagsCN || '学术研究') : (researchItem.categoryEN || researchItem.category || 'Academic Research')}</span>
          <span className="text-gray-200">/</span>
          <span>{researchItem.date}</span>
        </div>
      </div>

      <article className="w-full max-w-[1280px]">
        {!(researchItem.blocks && researchItem.blocks.some(b => b.type === 'hero_title')) && (
          <header className="mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-[29px] md:text-[45px] font-bold leading-[1.1] tracking-tight text-gray-900 mb-8 no-underline">
                {lang === 'cn' ? researchItem.titleCN : researchItem.titleEN}
              </h1>

              {/* Credits Section */}
              {(researchItem.creditsCN || researchItem.creditsEN) && (
                <div className="mt-8 pt-6 border-t border-gray-150 flex flex-col gap-2 max-w-2xl text-[13px] text-gray-500 font-light">
                  <span className="font-bold text-gray-950 tracking-[0.1em] uppercase">
                    {lang === 'cn' ? '研究团队' : 'RESEARCH TEAM & AUTHORS'}
                  </span>
                  <span className="opacity-95 leading-relaxed font-sans">
                    {lang === 'cn' 
                      ? (researchItem.creditsCN || '').split(';').join('、 ') 
                      : (researchItem.creditsEN || '').split(';').join(', ')
                    }
                  </span>
                </div>
              )}
            </motion.div>
          </header>
        )}

        {researchItem.blocks && researchItem.blocks.length > 0 ? (
          <div className="space-y-0">
            {researchItem.blocks.map((block, idx) => {
              const blockKey = `research-block-${idx}-${block.type}`;
              
              // 1. hero_title Block
              if (block.type === 'hero_title') {
                const title = lang === 'cn' ? (block.title_cn || researchItem.titleCN) : (block.title_en || researchItem.titleEN);
                const infoBody = lang === 'cn' ? block.body_cn : block.body_en;
                const imgUrl = (block.image_refs || '').trim();

                return (
                  <section key={blockKey} className="w-full mb-16">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1.0 }}
                      className="flex flex-col gap-8"
                    >
                      {/* Wide Aspect Header Banner */}
                      {imgUrl && (
                        <div className="w-full aspect-[21/9] md:aspect-[24/9] bg-neutral-100 overflow-hidden relative rounded-sm shadow-sm">
                          {imgUrl.endsWith('.mp4') || imgUrl.includes('.mp4') ? (
                            <video src={imgUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                          ) : (
                            <img src={imgUrl} alt={title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          )}
                        </div>
                      )}

                      {/* Title Typography Block */}
                      <div className="max-w-4xl mt-4">
                        <h1 className="text-[32px] md:text-[46px] lg:text-[52px] font-bold leading-[1.12] tracking-tight text-gray-900 font-sans mb-8">
                          {title}
                        </h1>

                        {infoBody && (
                          <div className="pt-6 border-t border-gray-150 flex flex-col gap-4 text-[13px] text-gray-500 font-light max-w-3xl">
                            <h4 className="font-bold text-gray-950 tracking-[0.1em] uppercase">
                              {lang === 'cn' ? '研究发表及发布团队' : 'RESEARCH JOURNAL & AUTHOR TEAM'}
                            </h4>
                            <div className="whitespace-pre-line leading-relaxed font-sans text-gray-600">
                              {infoBody}
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </section>
                );
              }

              // 2. text_1col Block
              if (block.type === 'text_1col') {
                const title = lang === 'cn' ? block.title_cn : block.title_en;
                const body = lang === 'cn' ? block.body_cn : block.body_en;
                if (!body) return null;
                const rawHtml = marked.parse(preprocessMarkdown(body), { breaks: true }) as string;
                return (
                  <section key={blockKey} className="py-12 bg-white border-b border-gray-100 last:border-0">
                    <div className="max-w-4xl mx-auto">
                      {title && (
                        <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 mb-6 font-sans">
                          {title}
                        </h3>
                      )}
                      <div 
                        className="text-[16px] md:text-[17px] leading-[1.85] text-neutral-700 font-light text-left
                                   [&_h4]:text-[18px] [&_h4]:font-bold [&_h4]:text-black [&_h4]:mb-4 [&_h4]:mt-6
                                   [&_p]:mb-4 [&_p]:last:mb-0 [&_p]:leading-[1.85]
                                   [&_strong]:font-semibold [&_strong]:text-black"
                        dangerouslySetInnerHTML={{ __html: rawHtml }}
                      />
                    </div>
                  </section>
                );
              }

              // 3. text_2col Block
              if (block.type === 'text_2col') {
                const titlePart = lang === 'cn' ? block.title_cn : block.title_en;
                const bodyPart = lang === 'cn' ? block.body_cn : block.body_en;
                if (!bodyPart) return null;

                let leftTitle = '';
                let rightTitle = '';
                if (titlePart) {
                  if (titlePart.includes('||')) {
                    const pts = titlePart.split('||');
                    leftTitle = pts[0]?.trim();
                    rightTitle = pts[1]?.trim();
                  } else if (titlePart.includes('|')) {
                    const pts = titlePart.split('|');
                    leftTitle = pts[0]?.trim();
                    rightTitle = pts[1]?.trim();
                  } else {
                    leftTitle = titlePart;
                  }
                }

                let leftBody = '';
                let rightBody = '';
                if (bodyPart.includes('||')) {
                  const pts = bodyPart.split('||');
                  leftBody = pts[0]?.trim();
                  rightBody = pts[1]?.trim();
                } else if (bodyPart.includes('|')) {
                  const pts = bodyPart.split('|');
                  leftBody = pts[0]?.trim();
                  rightBody = pts[1]?.trim();
                } else {
                  leftBody = bodyPart;
                }

                const htmlLeft = leftBody ? (marked.parse(preprocessMarkdown(leftBody), { breaks: true }) as string) : '';
                const htmlRight = rightBody ? (marked.parse(preprocessMarkdown(rightBody), { breaks: true }) as string) : '';

                return (
                  <section key={blockKey} className="py-12 bg-neutral-50/50 border-b border-gray-100 last:border-0 -mx-6 md:-mx-12 px-6 md:px-12 my-6">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                      <div className="space-y-4">
                        {leftTitle && <h4 className="text-lg font-bold text-gray-900 tracking-tight">{leftTitle}</h4>}
                        {htmlLeft && (
                          <div 
                            className="text-[15px] leading-[1.8] text-neutral-600 font-light text-left
                                       [&_p]:mb-4 [&_p]:last:mb-0 [&_strong]:font-semibold [&_strong]:text-black"
                            dangerouslySetInnerHTML={{ __html: htmlLeft }}
                          />
                        )}
                      </div>
                      <div className="space-y-4 border-t border-gray-200/65 pt-8 md:border-t-0 md:pt-0 md:border-l md:border-gray-200/80 md:pl-16">
                        {rightTitle && <h4 className="text-lg font-bold text-gray-900 tracking-tight">{rightTitle}</h4>}
                        {htmlRight && (
                          <div 
                            className="text-[15px] leading-[1.8] text-neutral-600 font-light text-left
                                       [&_p]:mb-4 [&_p]:last:mb-0 [&_strong]:font-semibold [&_strong]:text-black"
                            dangerouslySetInnerHTML={{ __html: htmlRight }}
                          />
                        )}
                      </div>
                    </div>
                  </section>
                );
              }

              // 4. image_grid Block
              if (block.type === 'image_grid') {
                const rawRefs = block.image_refs || '';
                const urls = rawRefs.split(/[;,]/)
                  .map((s: string) => s.trim())
                  .filter((s: string) => s.length > 0 && (s.startsWith('http') || s.startsWith('/') || s.includes('.')));
                
                if (urls.length === 0) return null;

                const title = lang === 'cn' ? block.title_cn : block.title_en;
                const body = lang === 'cn' ? block.body_cn : block.body_en;

                return (
                  <section key={blockKey} className="py-12 bg-white border-b border-gray-100 last:border-0">
                    <div className="w-full">
                      {urls.length === 1 ? (
                        <div className="w-full h-[50vh] md:h-[60vh] overflow-hidden bg-neutral-50 relative group rounded-sm shadow-sm">
                          {urls[0].endsWith('.mp4') || urls[0].includes('.mp4') ? (
                            <video src={urls[0]} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                          ) : (
                            <img src={urls[0]} alt="Full Width Reference" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                          )}
                        </div>
                      ) : urls.length === 2 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {urls.map((url, subIdx) => (
                            <div key={subIdx} className="h-[30vh] md:h-[45vh] overflow-hidden bg-neutral-50 relative group rounded-sm shadow-sm">
                              {url.endsWith('.mp4') || url.includes('.mp4') ? (
                                <video src={url} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                              ) : (
                                <img src={url} alt={`Grid item ${subIdx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              )}
                            </div>
                          ))}
                        </div>
                      ) : urls.length === 3 ? (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                          <div className="md:col-span-8 h-[40vh] md:h-[55vh] overflow-hidden bg-neutral-50 relative group rounded-sm shadow-sm">
                            {urls[0].endsWith('.mp4') || urls[0].includes('.mp4') ? (
                              <video src={urls[0]} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                            ) : (
                              <img src={urls[0]} alt="Grid large item" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                            )}
                          </div>
                          <div className="md:col-span-4 flex flex-col gap-4">
                            {urls.slice(1).map((url, subIdx) => (
                              <div key={subIdx} className="flex-1 h-[19vh] md:h-[26vh] overflow-hidden bg-neutral-50 relative group rounded-sm shadow-sm">
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
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                          {urls.map((url, imgIdx) => (
                            <div key={imgIdx} className="break-inside-avoid overflow-hidden bg-neutral-50 relative group rounded-sm shadow-sm">
                              {url.endsWith('.mp4') || url.includes('.mp4') ? (
                                <video src={url} autoPlay loop muted playsInline className="w-full h-auto object-cover max-h-[60vh]" />
                              ) : (
                                <img src={url} alt={`Gallery item ${imgIdx + 1}`} className="w-full h-auto object-cover max-h-[60vh]" referrerPolicy="no-referrer" />
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Caption details below grid */}
                      {(title || body) && (
                        <div className="mt-4 text-center max-w-2xl mx-auto">
                          {title && <p className="text-xs font-semibold text-gray-900 tracking-wider uppercase mb-1">{title}</p>}
                          {body && <p className="text-[11px] font-mono text-gray-400 capitalize">{body}</p>}
                        </div>
                      )}
                    </div>
                  </section>
                );
              }

              // 5. data_table Block
              if (block.type === 'data_table') {
                const title = lang === 'cn' ? block.title_cn : block.title_en;
                const bodyText = lang === 'cn' ? block.body_cn : block.body_en;
                if (!bodyText) return null;

                const rows = bodyText.split(/[\r\n]+/)
                  .map(line => line.trim())
                  .filter(Boolean)
                  .map(line => line.split(/[;；,，]/).map(cell => cell.trim()));

                if (rows.length === 0) return null;

                const headers = rows[0];
                const dataRows = rows.slice(1);

                return (
                  <section key={blockKey} className="py-12 bg-white border-b border-gray-100 last:border-0">
                    <div className="max-w-4xl mx-auto">
                      {title && (
                        <h4 className="text-sm font-bold text-gray-900 tracking-[0.15em] uppercase mb-6 text-center">
                          ⚡ {title}
                        </h4>
                      )}
                      <div className="overflow-x-auto border border-gray-150 rounded shadow-xs">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                          <thead>
                            <tr className="bg-neutral-50 border-b border-gray-200">
                              {headers.map((h, hIdx) => (
                                <th 
                                  key={hIdx} 
                                  className="py-4 px-5 text-[11px] font-bold text-gray-900 uppercase tracking-widest font-sans"
                                >
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {dataRows.map((r, rIdx) => (
                              <tr key={rIdx} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/40 transition-colors">
                                {r.map((cell, cIdx) => (
                                  <td 
                                    key={cIdx} 
                                    className="py-3.5 px-5 text-[13px] text-gray-600 font-light leading-relaxed font-sans"
                                  >
                                    {/^\d+/.test(cell) ? (
                                      <span className="font-mono text-xs text-neutral-800">{cell}</span>
                                    ) : (
                                      cell
                                    )}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </section>
                );
              }

              // 6. quote_highlight Block
              if (block.type === 'quote_highlight') {
                const title = lang === 'cn' ? block.title_cn : block.title_en;
                const body = lang === 'cn' ? block.body_cn : block.body_en;
                if (!body) return null;

                return (
                  <section key={blockKey} className="py-12 bg-white border-b border-gray-100 last:border-0 relative">
                    <div className="max-w-4xl mx-auto relative px-8 py-10 md:px-14 md:py-12 bg-neutral-50 border-l-[3px] border-black rounded-r-md overflow-hidden shadow-xs">
                      {/* Decorative quotes background overlay */}
                      <span className="absolute top-2 left-4 text-[120px] font-serif text-neutral-200/40 pointer-events-none select-none leading-none font-bold">
                        “
                      </span>
                      
                      <div className="relative z-10 space-y-4">
                        {title && (
                          <span className="text-[10px] font-bold tracking-[0.2em] text-neutral-400 uppercase block">
                            {title}
                          </span>
                        )}
                        <p className="text-[18px] md:text-[21px] font-medium leading-[1.65] text-gray-900 font-sans italic">
                          {body}
                        </p>
                      </div>
                    </div>
                  </section>
                );
              }

              // Fallback support for older models (e.g. image_full)
              if (block.type === 'image_full') {
                const imageUrl = (block.image_refs || block.c1_cn || '').trim();
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

              // Fallback support for older models (e.g. text_img)
              if (block.type === 'text_img') {
                const isTextLeft = block.style && (block.style.toLowerCase().includes('left') || block.style.toLowerCase().includes('右'));
                const textContent = lang === 'cn' ? (block.body_cn || block.c1_cn) : (block.body_en || block.c1_en);
                const imgUrl = (block.image_refs || block.c2_cn || '').trim();
                if (!textContent && !imgUrl) return null;
                const textHtml = textContent ? (marked.parse(preprocessMarkdown(textContent), { breaks: true }) as string) : '';
                return (
                  <section key={blockKey} className="py-12 bg-white border-b border-gray-100 last:border-0">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                      <div className={`md:col-span-5 space-y-6 ${isTextLeft ? 'md:order-1' : 'md:order-2'}`}>
                        <div 
                          className="text-[16px] leading-[1.8] text-neutral-700 font-light text-left
                                     [&_h3]:text-[20px] [&_h3]:font-extrabold [&_h3]:text-black [&_h3]:mb-6 [&_h3]:mt-2 [&_h3]:text-left [&_tracking-[0.05em]
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

        {/* SEO & GEO Semantic Grounding footers */}
        {(seoInfo.desc_cn || seoInfo.desc_en || (geoInfo.cn && geoInfo.cn.length > 0) || (geoInfo.en && geoInfo.en.length > 0)) && (
          <div className="mt-16 pt-8 border-t border-gray-100 max-w-4xl w-full mx-auto text-left font-mono">
            <details className="group cursor-pointer bg-neutral-50/50 p-5 rounded border border-neutral-100 hover:border-neutral-200 transition-all duration-300">
              <summary className="flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.15em] text-neutral-400 select-none">
                <span>{lang === 'cn' ? '⚡ 搜索引擎与人工智能检索优化 (SEO & GEO Grounding)' : '⚡ SEO & GEO SEARCH ENGINE METADATA'}</span>
                <span className="text-[9px] px-2 py-0.5 rounded border border-neutral-200 bg-white text-neutral-500 group-hover:bg-neutral-100 transition-colors">INDEXED</span>
              </summary>
              <div className="mt-4 pt-4 border-t border-dashed border-neutral-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-[10px] md:text-[11px] leading-relaxed text-neutral-500">
                {(seoInfo.desc_cn || seoInfo.desc_en) && (
                  <div>
                    <h5 className="font-bold text-neutral-700 uppercase tracking-wider mb-2">
                      {lang === 'cn' ? '💡 页面元描述 (Meta Description)' : '💡 Meta Description'}
                    </h5>
                    <p className="font-sans opacity-95">
                      {lang === 'cn' ? (seoInfo.desc_cn || seoInfo.desc_en) : (seoInfo.desc_en || seoInfo.desc_cn)}
                    </p>
                  </div>
                )}
                {((geoInfo.cn && geoInfo.cn.length > 0) || (geoInfo.en && geoInfo.en.length > 0)) && (
                  <div>
                    <h5 className="font-bold text-neutral-700 uppercase tracking-wider mb-2">
                      {lang === 'cn' ? '🧠 核心语义实体索引 (Semantic Entities / GEO)' : '🧠 Indexed Semantic Entities (GEO)'}
                    </h5>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {(lang === 'cn' ? geoInfo.cn : geoInfo.en).map((entity, sidx) => (
                        <span key={sidx} className="bg-white border border-neutral-200 text-neutral-600 px-2 py-0.5 rounded-sm">
                          #{entity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </details>
          </div>
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
