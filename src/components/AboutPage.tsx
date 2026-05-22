import { motion } from 'motion/react';
import type { Language } from '../App';

interface AboutPageProps {
  lang: Language;
}

const realEstatePartners = [
  { group: 'A', items: ['安邦集团'] },
  { group: 'B', items: ['宝龙集团', '保利地产', 'Boeing波音'] },
  { group: 'F', items: ['复星地产', '飞洲国际'] },
  { group: 'G', items: ['高力地产', '岗宏集团'] },
  { group: 'H', items: ['华润置地', '华侨城', '华强集团', '恒大集团'] },
  { group: 'J', items: ['金地集团', '金鹰国际', '金大地', '经纬置地', '静安区市容局'] },
  { group: 'K', items: ['凯德集团', 'HYATT凯悦'] },
  { group: 'L', items: ['绿地集团', '陆家嘴集团', '鹿鸣谷', '龙湖地产', '临港集团'] },
  { group: 'M', items: ['Mercedes-Benz奔驰'] },
  { group: 'R', items: ['融创'] },
  { group: 'S', items: ['Shui On Land瑞安集团', '世茂集团', '中信泰富', '上海达任置业', '上海地产', '三湘集团', '上实集团', '上海天文馆'] },
  { group: 'T', items: ['TISHMAN SPEYER铁狮门', '太古地产', '天誉置业'] },
  { group: 'W', items: ['万年基业集团', '万科集团', '王府井集团', '吴园美术馆', '吴中美术馆', '吴江宾馆'] },
  { group: 'X', items: ['现代集团', '协和房地产'] },
  { group: 'Y', items: ['远洋集团', '阳光城集团', '银城地产', '伊甸城房产'] },
  { group: 'Z', items: ['中信置业', '中洲集团', '中海集团', '中国铁建', '中粮集团', '中央美术学院', '中集产城', '招商局集团'] }
];

const designPartners = [
  { group: 'A', items: ['AECOM', 'Aedas凯达环球'] },
  { group: 'B', items: ['BroadwayMalyan', 'BENOY', 'B+H', 'BCA'] },
  { group: 'C', items: ['BeltCollins贝尔高林', 'CRTKL', 'CCDI'] },
  { group: 'D', items: ['DLR Group', '大舍建筑', '都设设计'] },
  { group: 'E', items: ['ENNEAD'] },
  { group: 'F', items: ['5+Design(五杰设计)', '飞来飞去'] },
  { group: 'G', items: ['Goettsch Partners', 'Gensler'] },
  { group: 'H', items: ['HLW LLP', 'HENN', '华东建筑设计研究院'] },
  { group: 'J', items: ['JERDE'] },
  { group: 'K', items: ['OKAISTUDIOS', 'KPF'] },
  { group: 'M', items: ['蒙泰室内设计'] },
  { group: 'S', items: ['SASAKI', 'SWA', 'SOM'] },
  { group: 'T', items: ['同济建筑设计研究院', '天华建筑', '同济创意设计学院'] },
  { group: 'W', items: ['wcot'] },
  { group: 'Z', items: ['浙大建筑设计研究院', '中央美术学院'] }
];

const gridImages = [
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
  "https://images.unsplash.com/photo-1552664730-d307ca884978",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
  "https://images.unsplash.com/photo-1556761175-b413da4baf72",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1521737711867-e3b97375f902",
  "https://images.unsplash.com/photo-1531538606174-0f90ff5dce83",
  "https://images.unsplash.com/photo-1568992687947-868a62a9f521",
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
  "https://images.unsplash.com/photo-1497366216548-37526070297c",
  "https://images.unsplash.com/photo-1497215842964-222b430dc094",
  "https://images.unsplash.com/photo-1431540015161-0bf868a2d407",
  "https://images.unsplash.com/photo-1454165833267-2720d2930267"
];

export default function AboutPage({ lang }: AboutPageProps) {
  const t = {
    title: lang === 'cn' ? 'RDI 瑞国际照明设计 | 公司简介' : 'RDI LIGHTING DESIGN | COMPANY PROFILE',
    intro: lang === 'cn' 
      ? '瑞国际照明设计（RDI）是一家具有创造力的建筑照明顾问公司，成立于 2012 年，现于上海、香港、深圳和纽约设有办公室。我们为不同领域的项目进行照明设计服务工作，诸如总体城市规划、超高层、综合体开发、交通枢纽、艺术装置、酒店和展览等。' 
      : 'RDI Lighting Design is a highly creative architectural lighting consultancy. Established in 2012, we maintain staffed offices in Shanghai, Hong Kong, Shenzhen, and New York, providing thorough lighting design services globally for master urban planning, high-rise buildings, mixed-use complexes, transit hubs, art installations, luxury hotels, and exhibitions.',
    philosophyTitle: lang === 'cn' ? '精英团队与多元学科' : 'ELITE MULTIDISCIPLINARY TEAM',
    philosophySub: lang === 'cn' 
      ? '交叉分享，智慧创想' 
      : 'Cross-disciplinary collaboration powering optimal design options',
    philosophyText: lang === 'cn'
      ? '我司拥有高素质的设计团队，其中有照明专业博士、注册建筑师、认证照明设计师、中国照明学会高级成员、亚洲照明学会高级成员、国际照明设计师协会成员，已经获得了众多设计奖项。我们的员工来自于不同的学科背景，诸如建筑设计、室内设计、戏剧灯光、艺术设计、媒体设计、光源研发、工程及展览展示设计，各领域的交叉分享使得团队能够为客户提供最完善的设计方案。'
      : 'Our highly qualified design team consists of Ph.D. holders in lighting, registered architects, certified lighting designers, and senior members of prestigious illuminating institutions (CIES, AALD, IALD). Coming from diverse backgrounds in architecture, interior design, theatrical stage lighting, fine arts, media design, light source R&D, and structural engineering, our cross-disciplinary sharing delivers flawless results for our clients.',
    processTitle: lang === 'cn' ? '全域设计与学术广度' : 'GLOBAL VISION & DISCIPLINARY STRENGTH',
    processSub: lang === 'cn' ? '探索光的应用极限' : 'Testing the aesthetic and technological boundaries of light',
    processText: lang === 'cn'
      ? '我司为全球诸多设计院及设计公司提供了照明设计咨询及服务，包括 Jerde 国际事务所，美国 GP 建筑事务所，SOM 建筑设计事务所，KPF 建筑事务所，5+五杰设计咨询（上海）有限公司，天华建筑设计有限公司等。涉及众多建筑、景观、城市规划等领域的项目，采用先进的手段进行照明设计，不断探索光的应用极限。'
      : 'We have provided state-of-the-art lighting consultations and masterplans for world-renowned design offices including Jerde Partnership, GP (Goettsch Partners), SOM, KPF, 5+design, and Tianhua. Spanning architecture, public landscape, and town planning, our methodologies employ advanced lighting simulations to push past conventional applications.',
    stepTitle: lang === 'cn' ? '经典战略开发商伙伴' : 'STRATEGIC REAL ESTATE CLIENTS',
    stepList: lang === 'cn'
      ? ['绿地集团 (Greenland)', '华润置地 (China Resources Land)', '金地集团 (Gemdale)', '瑞安房地产 (Shui On Land)', '宝龙地产 (Powerlong)', '远洋集团 (Sino-Ocean Group)', '世茂集团 (Shimao)', '万科集团 (Vanke)', '龙湖集团 (Longfor)']
      : ['Greenland Group (绿地集团)', 'China Resources Land (华润置地)', 'Gemdale (金地集团)', 'Shui On Land (瑞安房地产)', 'Powerlong (宝龙地产)', 'Sino-Ocean (远洋集团)', 'Shimao (世茂集团)', 'Vanke (万科)', 'Longfor Group (龙湖集团)'],
    sustainabilityTitle: lang === 'cn' ? '丰富经验与地标代表' : 'ABUNDANT COMPLEX WORLDWIDE EXPERIENCE',
    sustainabilityText: lang === 'cn'
      ? '目前，我司在全国各地的项目中拥有丰富的经验，在超高层，综合体，酒店，示范区等诸多领域中均有地标性项目代表。在众多项目设计、施工、管理的长期合作过程中，我司已非常了解照明项目的各方需求及现状问题。'
      : 'To date, RDI has compiled a massive track record globally, establishing prestigious landmarks across skyscrapers, mixed-use commercial nodes, international luxury hotels, and cultural pavilions. Through years of project management, we hold deep empathy for site challenges, client expectations, and engineering coordinates.',
    daylightTitle: lang === 'cn' ? '美好愿景与品质承托' : 'OUR VISION & HOLISTIC COMMITMENT',
    daylightText: lang === 'cn'
      ? '通过在全球各个办公室之间始终保持的协作沟通中，我司将充分利用专业技能，保证在本地或国际项目工作时能够满足顾问和客户的需要，实现照明设计的美好愿景。'
      : 'By maintaining an effortless collaborative workflow across our Shanghai, Hong Kong, Shenzhen, and New York offices, we leverage integrated global resources to satisfy every delicate requirement. RDI remains fully committed to turning the dream of elegant architectural illumination into stable, stunning realities.',
    collaborationTitle: lang === 'cn' ? '全球化协作' : 'GLOBAL OFFICE CONNECTIVITY',
    collaborationText: lang === 'cn'
      ? '我们在各个办公室之间始终保持最亲密的协作沟通。这得益于我们强大的远程共享云与高标准的技术流支持，使得任何时区的客户都能享受到同等卓越的设计效率。'
      : 'No matter the project location, RDI guarantees the same standard of design efficiency and technological implementation. This unified global resource sharing provides a powerful support matrix for all clients.',
    partnersTitle: lang === 'cn' ? '全渠道合作伙伴选择' : 'SELECTION OF STRATEGIC PARTNERS',
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
          className="text-lg text-gray-700 leading-relaxed max-w-2xl"
        >
          {t.intro}
        </motion.p>
      </section>

      {/* Hero Image */}
      <section className="w-full h-[70vh] mb-24 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000"
          alt="Studio"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </section>

      {/* Philosophy Section */}
      <section className="max-w-4xl mx-auto px-8 mb-24">
        <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">{t.philosophyTitle}</h2>
        <p className="font-bold mb-8 text-lg">{t.philosophySub}</p>
        <div className="text-gray-700 leading-relaxed space-y-6">
          <p>{t.philosophyText}</p>
        </div>
      </section>

      {/* Image Grid */}
      <section className="max-w-7xl mx-auto px-4 mb-32">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-1">
          {gridImages.map((src, idx) => (
            <div key={idx} className="aspect-square overflow-hidden bg-gray-100">
              <img 
                src={`${src}?auto=format&fit=crop&q=60&w=400`}
                alt={`Studio life ${idx}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Design and Process */}
      <section className="max-w-4xl mx-auto px-8 mb-32">
        <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">{t.processTitle}</h2>
        <p className="font-bold mb-8 text-lg">{t.processSub}</p>
        <p className="text-gray-700 leading-relaxed mb-16">{t.processText}</p>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1541888941259-7b3b9517ab42?auto=format&fit=crop&q=80&w=1000"
              alt="Process"
              className="w-full aspect-[4/5] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <span className="text-4xl text-gray-300 font-light mb-4 block">01</span>
            <h3 className="text-xl font-bold mb-8 uppercase tracking-widest">{t.stepTitle}</h3>
            <ul className="space-y-4 text-sm text-gray-600">
              {t.stepList.map((item, idx) => (
                <li key={idx} className="border-b border-gray-100 pb-2">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="max-w-4xl mx-auto px-8 mb-32">
        <h2 className="text-2xl font-bold mb-12 uppercase tracking-wider">{t.sustainabilityTitle}</h2>
        <p className="text-gray-700 leading-relaxed mb-24">{t.sustainabilityText}</p>

        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <img 
              src="https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1000"
              alt="Daylighting"
              className="w-full aspect-square object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1">
            <span className="text-4xl text-gray-300 font-light mb-4 block">01</span>
            <h3 className="text-xl font-bold mb-4 uppercase tracking-widest">{t.daylightTitle}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{t.daylightText}</p>
          </div>
        </div>
      </section>

      {/* Collaboration */}
      <section className="max-w-4xl mx-auto px-8 mb-32">
        <h2 className="text-2xl font-bold mb-4 uppercase tracking-wider">{t.collaborationTitle}</h2>
        <p className="font-bold mb-8 text-lg">{t.processSub}</p>
        <p className="text-gray-700 leading-relaxed">{t.collaborationText}</p>
      </section>

      {/* Partners List */}
      <section className="bg-neutral-50 border-t border-neutral-150 py-24 px-8 md:px-16 flex justify-center">
        <div className="w-full max-w-[1280px]">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em] block mb-3 font-mono">
              {lang === 'cn' ? '合作网络' : 'CLIENTS & PARTNERS'}
            </span>
            <h2 className="text-xl md:text-2xl font-bold tracking-widest text-black uppercase mb-4">
              {t.partnersTitle}
            </h2>
            <p className="text-xs text-neutral-500 leading-relaxed font-light">
              {lang === 'cn'
                ? '我们为全球诸多设计院及设计公司提供照明设计咨询及服务，与众多知名房地产集团保持长期的项目合作关系。'
                : 'We provide lighting design consultancy and services to numerous design institutes and design firms globally, and maintain long-term project partnerships with leading real estate groups.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
            {/* Real Estate Developers Column */}
            <div className="space-y-8">
              <div className="border-b border-black pb-4 flex justify-between items-baseline">
                <h3 className="text-xs font-bold text-black tracking-widest uppercase">
                  {lang === 'cn' ? '地产开发商 / 业主' : 'REAL ESTATE DEVELOPERS & OWNERS'}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {realEstatePartners.map((group, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-4 border-b border-neutral-200/60 last:border-0">
                    <span className="text-xs font-mono font-bold text-neutral-300 w-4 block pt-0.5">{group.group}</span>
                    <div className="space-y-1.5 flex-1">
                      {group.items.map((item, idy) => (
                        <div key={idy} className="text-xs text-neutral-600 hover:text-black transition-colors font-light leading-relaxed">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Design Companies Column */}
            <div className="space-y-8">
              <div className="border-b border-black pb-4 flex justify-between items-baseline">
                <h3 className="text-xs font-bold text-black tracking-widest uppercase">
                  {lang === 'cn' ? '设计公司 / 机构' : 'DESIGN FIRMS & INSTITUTES'}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                {designPartners.map((group, idx) => (
                  <div key={idx} className="flex gap-4 items-start pb-4 border-b border-neutral-200/60 last:border-0">
                    <span className="text-xs font-mono font-bold text-neutral-300 w-4 block pt-0.5">{group.group}</span>
                    <div className="space-y-1.5 flex-1">
                      {group.items.map((item, idy) => (
                        <div key={idy} className="text-xs text-neutral-600 hover:text-black transition-colors font-light leading-relaxed">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
