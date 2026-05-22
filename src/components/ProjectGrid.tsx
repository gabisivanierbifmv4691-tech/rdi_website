import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { Language } from '../App';
import { useProjects } from '../context/ProjectContext';

interface ProjectGridProps {
  lang: Language;
}

export default function ProjectGrid({ lang }: ProjectGridProps) {
  const { projects, news, research, homeConfig } = useProjects();

  let items: Array<{
    keyId: string;
    link: string;
    titleCN: string;
    titleEN: string;
    locationCN: string;
    locationEN: string;
    image: string;
    gridArea: string;
  }> = [];

  if (homeConfig && homeConfig.gridItems && homeConfig.gridItems.length > 0) {
    items = homeConfig.gridItems.map((item, idx) => {
      // Prioritize looking up in projects, news, or research
      const p = projects.find(proj => proj.slug === item.id || proj.id.toString() === item.id);
      const n = news.find(newsItem => newsItem.id === item.id);
      const r = research.find(rItem => rItem.id === item.id);

      let link = '';
      let titleCN = '';
      let titleEN = '';
      let locationCN = '';
      let locationEN = '';
      let image = '';
      let found = false;

      if (p) {
        found = true;
        link = `/project/${p.slug}`;
        titleCN = p.titleCN;
        titleEN = p.titleEN;
        locationCN = p.location;
        locationEN = p.locationEN || '';
        image = p.image || p.heroMedia || '';
      } else if (n) {
        found = true;
        link = `/news/${n.id}`;
        titleCN = n.titleCN;
        titleEN = n.titleEN;
        locationCN = n.location || (lang === 'cn' ? '设计创意' : 'RDI Innovation');
        locationEN = n.location || 'RDI Innovation';
        image = n.image;
      } else if (r) {
        found = true;
        link = `/research/${r.id}`;
        titleCN = r.titleCN;
        titleEN = r.titleEN;
        locationCN = r.location || (lang === 'cn' ? '研究报告' : 'Research Report');
        locationEN = r.location || 'Research Report';
        image = r.image;
      }

      if (!found) return null;

      // Sanitize classes: filter out height and aspect ratio classes
      const aspectClasses = item.aspect || '';
      const spanClasses = item.span || '';
      const allTokens = `${spanClasses} ${aspectClasses}`.split(/\s+/);
      
      const filteredTokens = allTokens.filter(token => {
        const t = token.trim().toLowerCase();
        if (!t) return false;
        // Exclude helper aspect ratios or explicit/min height classes
        if (t.startsWith('aspect-') || t.startsWith('h-') || t.startsWith('min-h-') || t.startsWith('max-h-')) {
          return false;
        }
        return true;
      });

      // Ensure we always have grid system col/row spans
      let finalGridArea = filteredTokens.join(' ').trim();
      if (!finalGridArea.includes('col-span')) {
        finalGridArea += ' md:col-span-1';
      }
      if (!finalGridArea.includes('row-span')) {
        finalGridArea += ' md:row-span-1';
      }

      return {
        keyId: `${item.id}-${idx}`,
        link,
        titleCN,
        titleEN,
        locationCN,
        locationEN,
        image,
        gridArea: finalGridArea.trim()
      };
    }).filter(Boolean) as any[];
  }

  return (
    <section className="bg-white p-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 auto-rows-[250px] md:auto-rows-[300px] grid-flow-row-dense">
        {items.map((project, idx) => (
          <Link 
            key={project.keyId} 
            to={project.link}
            className={project.gridArea}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.05 }}
              className="group relative overflow-hidden bg-gray-100 h-full w-full"
            >
              <img 
                src={project.image} 
                alt={lang === 'cn' ? project.titleCN : project.titleEN}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
         
              <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h3 className="text-xs font-bold uppercase tracking-widest">
                  {lang === 'cn' ? project.titleCN : project.titleEN}
                </h3>
                <p className="text-[10px] font-medium opacity-70 mt-1 uppercase">
                  {lang === 'cn' ? project.locationCN : project.locationEN}
                </p>
              </div>

            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
}
