import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { Language } from '../App';
import { researchData } from '../data/research';

interface ResearchDetailProps {
  lang: Language;
}

const ResearchDetail = ({ lang }: ResearchDetailProps) => {
  const { id } = useParams<{ id: string }>();
  const researchItem = researchData.find(item => item.id === id);

  if (!researchItem) {
    return (
      <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto text-center">
        <h1 className="text-2xl font-bold mb-8">Research Not Found / 未找到研究内容</h1>
        <Link to="/research" className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:opacity-50 transition-opacity">
          Back to Research / 返回研究
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mb-4">
              {researchItem.category} — Research
            </p>
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter mb-6 leading-none">
              {lang === 'cn' ? researchItem.titleCN : researchItem.titleEN}
            </h1>
          </motion.div>
        </header>

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
                {!researchItem.contentEN && (
                  <p>
                    {lang === 'cn' 
                      ? "通过系统的实地调研与量化分析，我们旨在探索光环境如何深度影响人类的夜间活动轨迹与心理安全感。" 
                      : "Through systematic field surveys and quantitative analysis, we aim to explore how light environments deeply influence human nocturnal activity patterns and psychological sense of security."}
                  </p>
                )}
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

        {/* Footer Navigation */}
        <footer className="border-t border-gray-100 pt-12 text-center">
          <Link to="/research" className="text-xs font-bold uppercase tracking-[0.3em] hover:opacity-50 transition-opacity">
            Close / 关闭
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default ResearchDetail;
