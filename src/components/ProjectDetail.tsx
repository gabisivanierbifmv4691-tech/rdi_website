import { motion } from 'motion/react';
import { ArrowLeft, ChevronRight, ChevronLeft } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import type { Language } from '../App';
import { useProjects } from '../context/ProjectContext';
import { getLocationLabel } from '../utils/projectHelpers';
import { marked } from 'marked';

// Helper to ensure markdown lines starting with ### are correctly spaced for parser to identify headers properly
const preprocessMarkdown = (text: string): string => {
  if (!text) return '';
  return text.replace(/^###[ \t]*(.*)/gm, '### $1');
};

interface ProjectDetailProps {
  lang: Language;
}

export default function ProjectDetail({ lang }: ProjectDetailProps) {
  const { id } = useParams<{ id: string }>();
  const { getProject, getPrevAndNext, loading, projects } = useProjects();

  if (loading) {
    return (
      <div className="pt-24 pb-20 bg-white min-h-[80vh] flex flex-col justify-center items-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-2 border-gray-100"></div>
            <div className="absolute inset-0 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-neutral-400 animate-pulse">
            {lang === 'cn' ? '光影详情载入中...' : 'LOADING CURATED DETAILS...'}
          </span>
        </div>
      </div>
    );
  }
  
  // Find project by slug or standard numeric ID
  const basicInfo = getProject(id) || projects[0];
  if (!basicInfo) {
    return (
      <div className="pt-24 pb-20 bg-white min-h-[80vh] flex flex-col justify-center items-center">
        <p className="text-neutral-500 mb-4">{lang === 'cn' ? '未找到该项目' : 'Project not found'}</p>
        <Link to="/projects" className="text-sm underline font-bold">{lang === 'cn' ? '返回项目列表' : 'Back to Projects'}</Link>
      </div>
    );
  }
  const projectId = basicInfo.id;

  const completionYear = basicInfo.completion || '2024';
  const yearDigits = completionYear.match(/\d+/)?.[0] || completionYear;

  const project = {
    category: (() => {
      const tagsStr = lang === 'cn' ? basicInfo.tagsCN : basicInfo.tagsEN;
      if (tagsStr) {
        return tagsStr.split(/[,，、]/).map(t => t.trim()).filter(Boolean).join(' / ');
      }
      return lang === 'cn' ? '项目作品' : 'PROJECT';
    })(),
    title: lang === 'cn' ? basicInfo.titleCN : basicInfo.titleEN,
    location: getLocationLabel(basicInfo.location, lang, basicInfo.locationEN),
    heroImage: basicInfo.heroMedia || basicInfo.image, 

    // Metadata Grid (Credits and Designer from CSV)
    metadata: (() => {
      const creditsToUse = (lang === 'cn' ? basicInfo.credits : (basicInfo.creditsEN || basicInfo.credits)) || '';
      let parsedItems: { label: string; value: string }[] = [];
      
      if (creditsToUse) {
        let items: string[] = [];
        if (creditsToUse.includes(';')) {
          items = creditsToUse.split(';').map(s => s.trim()).filter(Boolean);
        } else if (creditsToUse.includes('；')) {
          items = creditsToUse.split('；').map(s => s.trim()).filter(Boolean);
        } else if (creditsToUse.includes('，')) {
          items = creditsToUse.split('，').map(s => s.trim()).filter(Boolean);
        } else {
          items = creditsToUse.split(',').map(s => s.trim()).filter(Boolean);
        }

        parsedItems = items.map(item => {
          const colIndex = item.indexOf('：') !== -1 ? item.indexOf('：') : item.indexOf(':');
          if (colIndex === -1) {
            return {
              label: lang === 'cn' ? '项目详情' : 'Project Detail',
              value: item
            };
          }
          const label = item.slice(0, colIndex).trim();
          const value = item.slice(colIndex + 1).trim();
          return { label, value };
        }).filter(m => m.label && m.value);
      }

      const hasDesignerInCredits = parsedItems.some(item => {
        const l = item.label.toLowerCase();
        return l.includes('设计人员') || l.includes('designer') || l.includes('设计团队') || l.includes('主创') || l.includes('design team');
      });

      const designerToUse = (lang === 'cn' ? (basicInfo.designerCN || basicInfo.designer) : (basicInfo.designerEN || basicInfo.designerCN || basicInfo.designer)) || '';
      const designersToAppend = (!hasDesignerInCredits && designerToUse)
        ? [{ label: lang === 'cn' ? '设计人员' : 'Designers', value: designerToUse }]
        : [];

      const baseList = [
        ...designersToAppend,
        ...parsedItems,
      ];

      if (baseList.length === 0) {
        return [
          { label: lang === 'cn' ? '设计范围' : 'Design Scope', value: lang === 'cn' ? '照明设计' : 'Lighting Design' },
          { label: lang === 'cn' ? '设计团队' : 'Design Team', value: 'RDI Lighting Design' },
        ];
      }

      return baseList.filter(item => {
        const l = item.label.trim();
        return l !== '完成年份' && l !== 'Completion Year' && l !== '完成时间' && l !== 'Completion';
      });
    })(),

    // Curated concept description text from CSV block metadata
    description1: (lang === 'cn' ? basicInfo.conceptCN : basicInfo.conceptEN)
      ? (
          <p className="text-[18px] leading-[1.8] text-gray-700 whitespace-pre-line text-left">
            {lang === 'cn' ? basicInfo.conceptCN : basicInfo.conceptEN}
          </p>
        )
      : null
  };

  // Find next and previous projects
  const { prev: prevProject, next: nextProject } = getPrevAndNext(projectId);

  return (
    <div className="bg-white">
      {/* 1. Hero Section - 全屏英雄区 */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden">
        {project.heroImage.endsWith('.mp4') || project.heroImage.includes('.mp4') ? (
          <video 
            src={project.heroImage}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <img 
            src={project.heroImage.includes('unsplash.com') ? `${project.heroImage}?auto=format&fit=crop&q=95&w=2400` : project.heroImage} 
            alt="Project Hero"
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        )}
        {/* 透明深色渐变覆盖，保证文字清晰 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* 顶部导航按钮 */}
        <div className="absolute top-10 left-0 right-0 pt-16 px-10 flex justify-center">
          <div className="w-full max-w-[1280px]">
            <Link to="/projects" className="text-white hover:opacity-50 transition-opacity flex items-center gap-2 w-fit">
              <ArrowLeft size={20} />
            </Link>
          </div>
        </div>

        {/* 核心标题区 */}
        <div className="absolute bottom-24 left-0 right-0 px-10 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full max-w-[1280px]"
          >
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white/80 block mb-4">
              {project.category}
            </span>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4 uppercase">
              {project.title}
            </h1>
            <p className="text-sm md:text-base font-medium tracking-wide text-white/70 uppercase">
              {project.location}
            </p>
            {yearDigits && (
              <p className="text-sm md:text-base font-mono tracking-[0.2em] text-white/50 mt-2">
                {yearDigits}
              </p>
            )}
          </motion.div>
        </div>
      </section>

      {/* 2. Metadata Grid - 参数信息网格 */}
      <section className="px-10 py-20 border-b border-gray-100 flex justify-center">
        <div className="w-full max-w-[1280px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-y-12 gap-x-8">
          {project.metadata.map((item, idx) => (
            <div key={idx} className="space-y-2">
              <h4 className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">{item.label}</h4>
              <p className="text-[15px] font-bold text-black leading-relaxed">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dynamic Content Blocks or Fallback Content */}
      {basicInfo.blocks && basicInfo.blocks.length > 0 ? (
        <div className="space-y-0">
          {basicInfo.blocks.map((block, idx) => {
            const blockKey = `block-${idx}-${block.type}`;
            
            if (block.type === 'text_1col') {
              const textContent = lang === 'cn' ? block.c1_cn : block.c1_en;
              if (!textContent) return null;
              const rawHtml = marked.parse(preprocessMarkdown(textContent), { breaks: true }) as string;
              return (
                <section key={blockKey} className="px-10 py-24 bg-white flex justify-center border-b border-gray-100">
                  <div className="max-w-4xl w-full text-center">
                    <div 
                      className="text-[18px] md:text-[20px] leading-[1.9] text-neutral-800 font-light text-left md:text-center
                                 [&_h3]:text-[24px] [&_h3]:md:text-[30px] [&_h3]:font-extrabold [&_h3]:text-black [&_h3]:mb-12 [&_h3]:mt-2 [&_h3]:text-center [&_h3]:tracking-[0.05em]
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
                <section key={blockKey} className="px-10 py-24 bg-[#fafafa] flex justify-center border-b border-gray-100">
                  <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div 
                      className="text-[17px] leading-[1.8] text-neutral-700 font-light text-left
                                 [&_h3]:text-[22px] [&_h3]:font-extrabold [&_h3]:text-black [&_h3]:mb-9 [&_h3]:mt-2 [&_h3]:text-left [&_h3]:tracking-[0.05em]
                                 [&_p]:mb-4 [&_p]:last:mb-0 [&_p]:text-neutral-600 [&_p]:leading-[1.8]"
                      dangerouslySetInnerHTML={htmlLeft ? { __html: htmlLeft } : undefined}
                    />
                    <div 
                      className="text-[17px] leading-[1.8] text-neutral-700 font-light text-left
                                 [&_h3]:text-[22px] [&_h3]:font-extrabold [&_h3]:text-black [&_h3]:mb-9 [&_h3]:mt-2 [&_h3]:text-left [&_h3]:tracking-[0.05em]
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
                <section key={blockKey} className="w-full h-[55vh] md:h-[75vh] overflow-hidden relative border-b border-gray-100 bg-neutral-50">
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
                <section key={blockKey} className="px-10 py-24 bg-white flex justify-center border-b border-gray-100">
                  <div className="max-w-[1280px] w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                    <div className={`md:col-span-5 space-y-6 ${isTextLeft ? 'md:order-1' : 'md:order-2'}`}>
                      <div 
                        className="text-[17px] leading-[1.8] text-neutral-700 font-light text-left
                                   [&_h3]:text-[22px] [&_h3]:font-extrabold [&_h3]:text-black [&_h3]:mb-9 [&_h3]:mt-2 [&_h3]:text-left [&_h3]:tracking-[0.05em]
                                   [&_p]:mb-4 [&_p]:last:mb-0 [&_p]:text-neutral-600 [&_p]:leading-[1.8]"
                        dangerouslySetInnerHTML={textHtml ? { __html: textHtml } : undefined}
                      />
                    </div>
                    {imgUrl && (
                      <div className={`md:col-span-7 ${isTextLeft ? 'md:order-2' : 'md:order-1'} h-[40vh] md:h-[55vh] overflow-hidden bg-neutral-50 relative group`}>
                        {imgUrl.endsWith('.mp4') || imgUrl.includes('.mp4') ? (
                          <video src={imgUrl} autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        ) : (
                          <img src={imgUrl} alt="Visual Detail" className="w-full h-full object-cover hover:scale-102 transition-transform duration-[1.2s]" referrerPolicy="no-referrer" />
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
                <section key={blockKey} className="px-10 py-24 bg-white flex justify-center border-b border-gray-100">
                  <div className="w-full max-w-[1280px]">
                    {isOneTwoStyle && urls.length >= 2 ? (
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-2">
                        <div className="md:col-span-7 h-[45vh] md:h-[65vh] overflow-hidden bg-neutral-50 relative group">
                          {urls[0].endsWith('.mp4') || urls[0].includes('.mp4') ? (
                            <video src={urls[0]} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000" />
                          ) : (
                            <img src={urls[0]} alt="Grid item 1" className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000" referrerPolicy="no-referrer" />
                          )}
                        </div>
                        <div className="md:col-span-5 flex flex-col gap-2">
                          {urls.slice(1).map((url, subIdx) => (
                            <div key={subIdx} className="h-[20vh] md:h-[30vh] overflow-hidden bg-neutral-50 relative group">
                              {url.endsWith('.mp4') || url.includes('.mp4') ? (
                                <video src={url} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000" />
                              ) : (
                                <img src={url} alt={`Grid item ${subIdx + 2}`} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-1000" referrerPolicy="no-referrer" />
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
                              <video src={url} autoPlay loop muted playsInline className="w-full h-auto object-cover max-h-[80vh]" />
                            ) : (
                              <img src={url} alt={`Gallery item ${imgIdx + 1}`} className="w-full h-auto object-cover max-h-[80vh] hover:scale-102 transition-transform duration-1000" referrerPolicy="no-referrer" />
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
          {/* 3. Concept Section - 项目理念 */}
          {project.description1 && (
            <section className="px-10 py-32 bg-gray-50/50 text-center">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.4em] text-black/40 mb-12">
                  {lang === 'cn' ? '设计理念' : 'DESIGN CONCEPT'}
                </h2>
                <div className="text-[18px] text-gray-700 leading-relaxed font-normal text-left md:columns-1 gap-12">
                  {project.description1}
                </div>
              </div>
            </section>
          )}

          {/* Dynamic Asymmetrical Gallery Grid */}
          {basicInfo.gallery && basicInfo.gallery.length > 0 && (
            <section className="px-10 py-24 bg-white flex justify-center">
              <div className="w-full max-w-[1280px]">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.4em] text-black/40 mb-16 text-center">
                  {lang === 'cn' ? '项目精选画廊' : 'CURATED GALLERY'}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-2 items-stretch">
                  {basicInfo.gallery.map((imgUrl, index) => {
                    let colSpanClass = 'md:col-span-6';
                    let heightClass = 'h-[40vh] md:h-[55vh]';
                    
                    if (basicInfo.gallery!.length === 1) {
                      colSpanClass = 'md:col-span-12';
                      heightClass = 'h-[50vh] md:h-[75vh]';
                    } else if (basicInfo.gallery!.length === 2) {
                      colSpanClass = index === 0 ? 'md:col-span-7' : 'md:col-span-5';
                      heightClass = 'h-[45vh] md:h-[65vh]';
                    } else if (basicInfo.gallery!.length === 3) {
                      if (index === 0) {
                        colSpanClass = 'md:col-span-12';
                        heightClass = 'h-[50vh] md:h-[75vh]';
                      } else if (index === 1) {
                        colSpanClass = 'md:col-span-8';
                        heightClass = 'h-[40vh] md:h-[55vh]';
                      } else {
                        colSpanClass = 'md:col-span-4';
                        heightClass = 'h-[40vh] md:h-[55vh]';
                      }
                    } else {
                      if (index % 3 === 0) {
                        colSpanClass = 'md:col-span-8';
                        heightClass = 'h-[40vh] md:h-[60vh]';
                      } else if (index % 3 === 1) {
                        colSpanClass = 'md:col-span-4';
                        heightClass = 'h-[40vh] md:h-[60vh]';
                      } else {
                        colSpanClass = 'md:col-span-12';
                        heightClass = 'h-[45vh] md:h-[65vh]';
                      }
                    }

                    return (
                      <div 
                        key={index} 
                        className={`${colSpanClass} ${heightClass} overflow-hidden bg-gray-50 group shadow-sm hover:shadow-lg transition-all duration-700 relative`}
                      >
                        {imgUrl.endsWith('.mp4') || imgUrl.includes('.mp4') ? (
                          <video 
                            src={imgUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                          />
                        ) : (
                          <img
                            src={imgUrl}
                            alt={`${project.title} gallery view ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
        </>
      )}

      {/* 4. Pagination - 翻页导航 */}
      <section className="px-10 py-20 flex justify-center bg-white border-none">
        <div className="w-full max-w-[1280px] flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Previous Project Button */}
          {prevProject ? (
            <Link 
              to={`/project/${prevProject.slug || prevProject.id}`} 
              className="flex items-center gap-3 group text-left max-w-full md:max-w-[350px] w-full md:w-auto"
            >
              <ChevronLeft size={20} className="text-gray-300 group-hover:text-black group-hover:-translate-x-1 transition-all shrink-0" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">
                  {lang === 'cn' ? '上一个' : 'PREVIOUS'}
                </span>
                <span className="text-xs font-bold uppercase transition-colors group-hover:text-black line-clamp-1 leading-normal">
                  {lang === 'cn' ? prevProject.titleCN : prevProject.titleEN}
                </span>
              </div>
            </Link>
          ) : <div className="hidden md:block w-[350px]" />}

          {/* More Projects in the Center */}
          <Link 
            to="/projects" 
            className="text-[14px] font-bold uppercase tracking-[0.4em] text-gray-900 hover:opacity-60 transition-opacity whitespace-nowrap py-2 md:py-0"
          >
            {lang === 'cn' ? '更多作品' : 'More Projects'}
          </Link>

          {/* Next Project Button */}
          {nextProject ? (
            <Link 
              to={`/project/${nextProject.slug || nextProject.id}`} 
              className="flex items-center gap-3 group text-right max-w-full md:max-w-[350px] w-full md:w-auto justify-end"
            >
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 block">
                  {lang === 'cn' ? '下一个' : 'NEXT'}
                </span>
                <span className="text-xs font-bold uppercase transition-colors group-hover:text-black line-clamp-1 leading-normal">
                  {lang === 'cn' ? nextProject.titleCN : nextProject.titleEN}
                </span>
              </div>
              <ChevronRight size={20} className="text-gray-300 group-hover:text-black group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ) : <div className="hidden md:block w-[350px]" />}
        </div>
      </section>
    </div>
  );
}
