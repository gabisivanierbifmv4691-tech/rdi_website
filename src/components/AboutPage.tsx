import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import type { Language } from '../App';

interface AboutPageProps {
  lang: Language;
}

interface Partner {
  zh: string;
  en: string;
}

interface GroupedPartners {
  group: string;
  items: string[];
}

const STATIC_DEVELOPERS: Partner[] = [

];

const STATIC_DESIGNERS: Partner[] = [

];

const gridImages = [
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/02.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/03.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/04.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/05.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/06.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/07.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/08.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/09.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/10.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/11.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/12.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/13.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/14.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/15.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/16.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/17.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/18.webp",
  "https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/19.webp"
];

function groupPartners(partners: Partner[], lang: Language): GroupedPartners[] {
  const groups: Record<string, string[]> = {};
  
  partners.forEach(p => {
    const displayName = lang === 'cn' ? p.zh : p.en;
    if (!displayName) return;
    
    const enName = p.en.trim();
    let firstChar = 'A';
    if (enName.length > 0) {
      const char = enName[0].toUpperCase();
      if (char >= 'A' && char <= 'Z') {
        firstChar = char;
      } else {
        firstChar = '#';
      }
    }
    
    if (!groups[firstChar]) {
      groups[firstChar] = [];
    }
    groups[firstChar].push(displayName);
  });
  
  return Object.keys(groups)
    .sort((a, b) => {
      if (a === '#') return 1;
      if (b === '#') return -1;
      return a.localeCompare(b);
    })
    .map(group => ({
      group,
      items: groups[group]
    }));
}

export default function AboutPage({ lang }: AboutPageProps) {
  const [realEstateList, setRealEstateList] = useState<GroupedPartners[]>([]);
  const [designList, setDesignList] = useState<GroupedPartners[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    
    const fetchPartners = async () => {
      try {
        const response = await fetch('https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/client.csv');
        if (!response.ok) throw new Error('Failed to fetch client.csv');
        const text = await response.text();
        
        // Robust CSV splitter
        const lines = text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        
        const devCN: string[] = [];
        const devEN: string[] = [];
        const designCN: string[] = [];
        const designEN: string[] = [];

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.includes('地产开发商 / 业主') && lines[i + 1]) {
            devCN.push(...lines[i + 1].split(',').map(s => s.trim()).filter(Boolean));
          }
          if (line.includes('Real Estate Developers / Owners') && lines[i + 1]) {
            devEN.push(...lines[i + 1].split(',').map(s => s.trim()).filter(Boolean));
          }
          if (line.includes('设计公司 / 机构') && lines[i + 1]) {
            designCN.push(...lines[i + 1].split(',').map(s => s.trim()).filter(Boolean));
          }
          if (line.includes('Design Companies / Institutions') && lines[i + 1]) {
            designEN.push(...lines[i + 1].split(',').map(s => s.trim()).filter(Boolean));
          }
        }

        const developers: Partner[] = [];
        for (let j = 0; j < Math.max(devCN.length, devEN.length); j++) {
          developers.push({
            zh: devCN[j] || devEN[j] || '',
            en: devEN[j] || devCN[j] || ''
          });
        }

        const designers: Partner[] = [];
        for (let j = 0; j < Math.max(designCN.length, designEN.length); j++) {
          designers.push({
            zh: designCN[j] || designEN[j] || '',
            en: designEN[j] || designCN[j] || ''
          });
        }

        if (isMounted) {
          if (developers.length > 0) {
            setRealEstateList(groupPartners(developers, lang));
          } else {
            setRealEstateList(groupPartners(STATIC_DEVELOPERS, lang));
          }
          
          if (designers.length > 0) {
            setDesignList(groupPartners(designers, lang));
          } else {
            setDesignList(groupPartners(STATIC_DESIGNERS, lang));
          }
          setLoading(false);
        }
      } catch (err) {
        console.error('Failed to load partners dynamically, loading defaults:', err);
        if (isMounted) {
          setRealEstateList(groupPartners(STATIC_DEVELOPERS, lang));
          setDesignList(groupPartners(STATIC_DESIGNERS, lang));
          setLoading(false);
        }
      }
    };

    fetchPartners();
    
    return () => {
      isMounted = false;
    };
  }, [lang]);

  const t = {
    title: lang === 'cn' ? '公司简介' : 'Company Profile',
    intro: lang === 'cn' 
      ? 'RDI瑞国际照明设计（隶属于上海瑞逸环境设计有限公司）创立于2012年，是一家极具创新力的全球化专业照明顾问品牌。公司现已形成成熟的国际化服务布局，在上海、深圳、香港设立注册直营办公室，于纽约、新加坡设立海外办事处，搭建跨时区、跨地域高效协同网络。十余年来，团队凭借前沿设计理念与扎实落地能力，业务版图覆盖亚洲、欧洲、北美洲、南极洲等全球多地，持续斩获多项国际权威照明设计大奖，是业内兼具综合实力、创新能力与国际口碑的标杆照明设计机构。' 
      : 'Founded in 2012, RDESIGN INTERNATIONAL Lighting Design (a subsidiary of Shanghai Ruiyi Environmental Design Co., Ltd.) is a highly innovative global professional lighting consultancy. We have established a mature international service network with direct offices in Shanghai, Shenzhen, and Hong Kong, along with overseas representative offices in New York and Singapore, creating an efficient, cross-time-zone, and cross-regional collaborative system. Over the past decade, leveraging our cutting-edge design philosophy and robust implementation capabilities, RDI has expanded its business footprint across Asia, Europe, North America, and Antarctica. A recipient of numerous prestigious international lighting design awards, RDI is recognized as an industry benchmark, combining comprehensive strength, creative excellence, and global reputation.',
    
    sec1Title: lang === 'cn' ? '一、全域光影设计，重塑空间价值' : 'I. Comprehensive Lighting Solutions: Reshaping Spatial Value',
    sec1Text: lang === 'cn'
      ? 'RDI专注全案照明设计，业务涵盖城市规划、地标建筑、商业综合体、高端酒店、文博艺术及高定住宅等多元领域，设计范畴贯通建筑、室内与景观全空间。我们坚持“美学表达与功能实用并行，艺术价值与生态节能兼顾”，以光为媒介，精准赋能城市空间，提升场景品质。'
      : 'RDI specializes in full-scope lighting design, with a portfolio spanning urban planning, landmark architecture, commercial complexes, luxury hotels, cultural and museum projects, and high-end residential developments. Our design scope integrates architecture, interior, and landscape spaces. We adhere to the principle of "balancing aesthetic expression with functional utility, and artistic value with ecological sustainability," using light as a medium to empower urban spaces and enhance the quality of the built environment.',
    
    sec2Title: lang === 'cn' ? '二、精英跨界团队，链接全球大师' : 'II. Multidisciplinary Elite Team: Connecting with Global Masters',
    sec2Text1: lang === 'cn'
      ? 'RDI拥有一支高资质、复合型精英设计团队，核心成员包含照明专业博士、注册建筑师、国际认证照明设计师及中、亚洲、国际照明学会高级会员，团队累计斩获百余项国内外设计大奖，专业底蕴深厚。成员涵盖建筑、室内、景观、戏剧灯光、艺术装置、新媒体艺术、工程落地等多学科背景，通过跨学科创意交融，突破传统照明设计边界，高效解决各类复杂项目设计难题。'
      : 'RDI boasts a highly qualified and diverse team of elite designers, including PhDs in lighting, registered architects, certified international lighting designers, and senior members of regional and international lighting societies. Our team has garnered over a hundred domestic and international awards, grounded in deep professional expertise. With backgrounds ranging from architecture and interior design to landscape, stage lighting, art installations, new media art, and engineering, our multidisciplinary team excels at breaking traditional boundaries and solving complex design challenges.',
    sec2Text2: lang === 'cn'
      ? '依托国际化项目经验，公司长期与全球殿堂级建筑大师及一线设计机构深度合作，合作大师包括David Alan Chipperfield、矶崎新、Jean Nouvel、Rem Koolhaas、Norman Foster、Tadao Ando、Alvaro Siza等；长期合作事务所涵盖MAD、SOM、KPF、GP、Jerde、5+、Aedas、Benoy等国内外顶尖机构，同时与众多头部房企保持稳定战略合作，持续落地全球标杆性光影项目。'
      : 'Drawing on our extensive international experience, we have established long-term, deep collaborations with world-renowned architects such as David Alan Chipperfield, Arata Isozaki, Jean Nouvel, Rem Koolhaas, Norman Foster, Tadao Ando, and Alvaro Siza. We also maintain strategic partnerships with top-tier firms including MAD, SOM, KPF, GP, Jerde, 5+, Aedas, and Benoy, as well as leading real estate developers, continuously delivering iconic global lighting projects.',
    
    sec3Title: lang === 'cn' ? '三、数智驱动设计，保障极致落地' : 'III. Digital-Driven Design: Ensuring Flawless Execution',
    sec3Text: lang === 'cn'
      ? '公司搭建完善的云端协同体系与标准化技术流程，依托跨区域智能协作平台，实现国内外站点无缝联动、跨时区高效配合，为全球客户提供统一、高效、高品质的设计服务。同时，团队持续以前沿科技赋能设计创新，利用数字化设计、交互技术、人工智能技术支持方案创作、优化迭代、工程落地全流程，不断探索光的应用极限，打造兼具健康舒适、艺术创意、人文质感的优质光影空间。'
      : 'We have built a comprehensive cloud-based collaboration system and standardized technical workflows. Supported by our cross-regional intelligent platform, we achieve seamless coordination across domestic and international sites, ensuring consistent, high-quality service for our global clients. Furthermore, we continuously empower our creativity with frontier technologies. By utilizing digital design, interactive media, and artificial intelligence throughout the entire process—from conceptualization and iteration to construction—we push the boundaries of light to create high-quality spaces that are healthy, comfortable, artistic, and human-centric.',
    
    sec4Title: lang === 'cn' ? '四、品牌理念愿景，深耕创新未来' : 'IV. Brand Philosophy and Vision: Deepening Innovation for the Future',
    sec4Text: lang === 'cn'
      ? 'RDI瑞国际照明设计始终秉持“以光为艺、以质为核、创新赋能、赋能城市”的核心理念，深耕光影艺术创新与绿色节能设计，专注平衡光与建筑、自然、城市人文的共生关系。未来，公司将持续深化全球化布局与科技化设计升级，依托跨学科团队与国际合作优势，持续输出高品质、前瞻性的照明设计成果，致力打造世界级照明设计标杆品牌。'
      : 'RDI consistently upholds our core philosophy: "Light as Art, Quality as Core, Innovation as Empowerment, and Empowering the City." We are committed to fostering innovations in light art and green energy-efficient design, focusing on the symbiotic relationship between light, architecture, nature, and urban culture. Looking ahead, RDI will continue to deepen our global presence and upgrade our technological design capabilities. By leveraging our multidisciplinary expertise and international collaborative advantages, we aim to consistently deliver high-quality, forward-looking lighting solutions and aspire to become a world-class benchmark in the lighting design industry.',
    
    partnersTitle: lang === 'cn' ? '合作伙伴' : 'PARTNERS',
  };

  return (
    <div className="pt-32 pb-20 bg-white">
      {/* Intro Section */}
      <section className="max-w-4xl mx-auto px-8 mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold tracking-tight mb-8"
        >
          {t.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-lg text-gray-700 leading-relaxed font-light"
        >
          {t.intro}
        </motion.p>
      </section>

      {/* Hero Image */}
      <section className="w-full h-[70vh] mb-24 overflow-hidden">
        <img 
          src="https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/01.webp"
          alt="RDI Studio Space"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Section I */}
      <section className="max-w-4xl mx-auto px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-wider text-black">
            {t.sec1Title}
          </h2>
          <p className="text-gray-700 leading-relaxed text-[15px] md:text-base font-light">
            {t.sec1Text}
          </p>
        </motion.div>
      </section>

      {/* Section II */}
      <section className="max-w-4xl mx-auto px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-wider text-black">
            {t.sec2Title}
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed text-[15px] md:text-base font-light">
            <p>{t.sec2Text1}</p>
            <p>{t.sec2Text2}</p>
          </div>
        </motion.div>
      </section>

      {/* Image Grid representing creative collaboration */}
      <section className="max-w-7xl mx-auto px-4 mb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1">
          {gridImages.map((src, idx) => (
            <div key={idx} className="aspect-square overflow-hidden bg-gray-100">
              <img 
                src={`${src}?auto=format&fit=crop&q=60&w=400`}
                alt={`RDI Studio life ${idx}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Section III */}
      <section className="max-w-4xl mx-auto px-8 mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-wider text-black">
            {t.sec3Title}
          </h2>
          <p className="text-gray-700 leading-relaxed text-[15px] md:text-base font-light">
            {t.sec3Text}
          </p>
        </motion.div>
      </section>

      {/* Curated Process Banner */}
      <section className="max-w-4xl mx-auto px-8 mb-24">
        <div className="w-full h-[45vh] overflow-hidden rounded-sm">
          <img 
            src="https://rdilighting.oss-cn-hongkong.aliyuncs.com/aboutus/20.webp"
            alt="Design and Engineering Process"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Section IV */}
      <section className="max-w-4xl mx-auto px-8 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-wider text-black">
            {t.sec4Title}
          </h2>
          <p className="text-gray-700 leading-relaxed text-[15px] md:text-base font-light">
            {t.sec4Text}
          </p>
        </motion.div>
      </section>

      {/* Partners List */}
      <section id="partners" className="bg-neutral-50 py-24 px-8 md:px-16 flex justify-center">
        <div className="w-full max-w-[1280px]">
          <div className="max-w-4xl mx-auto text-left mb-16 px-8 lg:px-0">
            <h2 className="text-xl md:text-2xl font-bold tracking-widest text-black uppercase mb-4 text-center">
              {t.partnersTitle}
            </h2>
            <p className="text-base text-neutral-500 leading-relaxed font-light">
              {lang === 'cn'
                ? '我们为全球诸多设计院及设计公司提供照明设计咨询及服务，与众多知名房地产集团保持长期的项目合作关系。'
                : 'We provide lighting design consultancy and services to numerous design institutes and design firms globally, and maintain long-term project partnerships with leading real estate groups.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            {/* Real Estate Developers Column */}
            <div className="space-y-8">
              <div className="pb-4 flex justify-between items-baseline">
                <h3 className="text-base font-bold text-black tracking-widest uppercase">
                  {lang === 'cn' ? '地产开发商 / 业主' : 'REAL ESTATE DEVELOPERS & OWNERS'}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {loading ? (
                  <div className="col-span-2 text-center text-base text-neutral-400 py-4 font-mono">
                    Loading partners...
                  </div>
                ) : (
                  realEstateList.map((group, idx) => (
                    <div key={idx} className="flex gap-4 items-start pb-4 last:border-0">
                      <span className="text-sm font-mono font-bold text-neutral-300 w-4 block pt-0.5">{group.group}</span>
                      <div className="space-y-1.5 flex-1">
                        {group.items.map((item, idy) => (
                          <div key={idy} className="text-sm text-neutral-600 hover:text-black transition-colors font-light leading-relaxed">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Design Companies Column */}
            <div className="space-y-8">
              <div className="pb-4 flex justify-between items-baseline">
                <h3 className="text-base font-bold text-black tracking-widest uppercase">
                  {lang === 'cn' ? '设计公司 / 机构' : 'DESIGN FIRMS & INSTITUTES'}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {loading ? (
                  <div className="col-span-2 text-center text-base text-neutral-400 py-4 font-mono">
                    Loading partners...
                  </div>
                ) : (
                  designList.map((group, idx) => (
                    <div key={idx} className="flex gap-4 items-start pb-4 last:border-0">
                      <span className="text-sm font-mono font-bold text-neutral-300 w-4 block pt-0.5">{group.group}</span>
                      <div className="space-y-1.5 flex-1">
                        {group.items.map((item, idy) => (
                          <div key={idy} className="text-sm text-neutral-600 hover:text-black transition-colors font-light leading-relaxed">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
