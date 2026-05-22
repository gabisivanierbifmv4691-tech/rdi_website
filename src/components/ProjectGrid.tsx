import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { Language } from '../App';
import { useProjects } from '../context/ProjectContext';
import { homeGridData } from '../data/homeGrid';

interface ProjectGridProps {
  lang: Language;
}

export default function ProjectGrid({ lang }: ProjectGridProps) {
  const { projects, homeConfig } = useProjects();

  let items = homeGridData.map(item => ({
    keyId: item.id.toString(),
    pathId: item.id.toString(),
    titleCN: item.titleCN,
    titleEN: item.titleEN,
    locationCN: item.locationCN,
    locationEN: item.locationEN,
    image: item.image,
    gridArea: item.gridArea
  }));

  if (homeConfig && homeConfig.gridItems && homeConfig.gridItems.length > 0 && projects.length > 0) {
    const mapped = homeConfig.gridItems.map((item, idx) => {
      const p = projects.find(proj => proj.slug === item.id);
      if (p) {
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
          keyId: `${p.slug}-${idx}`,
          pathId: p.slug,
          titleCN: p.titleCN,
          titleEN: p.titleEN,
          locationCN: p.location,
          locationEN: p.locationEN,
          image: p.image || p.heroMedia,
          gridArea: finalGridArea.trim()
        };
      }
      return null;
    }).filter(Boolean) as any[];

    if (mapped.length > 0) {
      items = mapped;
    }
  }

  return (
    <section className="bg-white p-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 auto-rows-[250px] md:auto-rows-[300px] grid-flow-row-dense">
        {items.map((project, idx) => (
          <Link 
            key={project.keyId} 
            to={`/project/${project.pathId}`}
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
