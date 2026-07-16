import { motion } from 'motion/react';
import type { Language } from '../App';

interface JoinUsPageProps {
  lang: Language;
}

export default function JoinUsPage({ lang }: JoinUsPageProps) {
  const t = {
    heroTitle: lang === 'cn' ? '招聘！虚位以待 共筑梦想' : 'JOIN THE TEAM | EMPOWERING VISION',
    heroIntro1: lang === 'cn'
      ? '照明是一门值得投入的职业，它提供无限的机会为人们的生活和环境创造积极的影响。在设计过程中，我们非常重视所有团队成员的投入。在RDI瑞国际照明设计团队里，设计师将获得最高水平项目的宝贵技能，与建筑师和设计师们共同构建未来。'
      : 'Lighting is a profession worthy of investment, offering endless opportunities to shape positive impacts on people\'s daily lives and environments. Throughout our architectural design process, we deeply value the input of all team members.',
    heroIntro2: lang === 'cn'
      ? '我们提供精细的系统培训，我们的目标是教导设计师独立思考并获得将来在职业生涯中所需的全部技能。我们一直在寻找杰出的人才加入团队，如果你渴望将独特的能动性倾注进领先的建筑语境中，渴望为理想项目协作奋斗，欢迎选择我们。'
      : 'We provide specialized and customized training, with the ultimate goal of coaching our designers to think critically and master all competitive skills required in their future career paths. We are always on the look for bright talent.',
    hubsTitle: lang === 'cn' ? '我们建立于此 / WORKPLACE HUBS' : 'WORKPLACE HUBS',
    shName: lang === 'cn' ? '上海总部 Shanghai Headquarter' : 'Shanghai Headquarter (HQ)',
    shAddress: lang === 'cn' ? '上海市杨浦区纪念路8号财大科技园1号楼205' : 'Rm 205, Building 1, SUFE university Science Park, No. 8 Jinian Road, Yangpu District, Shanghai',
    szName: lang === 'cn' ? '深圳分部 Shenzhen Branch' : 'Shenzhen Branch',
    szAddress: lang === 'cn' ? '深圳市福田区NEO绿景广场B栋29层B号' : 'Unit B, 29th Floor, Block B, NEO Green Plaza, Futian District, Shenzhen',
    benefitsTitle: lang === 'cn' ? '员工福利待遇 / BENEFIT & CULTURE' : 'OUR BENEFIT PACKAGE',
    positionsTitle: lang === 'cn' ? '开放职位 / OPEN POSITIONS' : 'CURRENT OPENINGS',
    applyInstructions: lang === 'cn'
      ? '请将您的简历及附加作品集（方案）发送至下方招聘专属邮箱枢纽，并注明【姓名 - 申请职位】。期待与您在光影长廊相遇。'
      : 'Please send your CV and portfolio, formatted with your application name, to our recruitment email listed below. We look forward to meeting you inside the gallery.',
    responsibilities: lang === 'cn' ? '岗位职责' : 'Duties & Responsibilities',
    requirements: lang === 'cn' ? '任职要求' : 'Hiring Criteria & Background'
  };

  const benefits = lang === 'cn' ? [
    '年末奖金 + 年终涨薪契机',
    '各类定制化专业设计/技术技能培训',
    '定期年度体检及关怀保障',
    '周度/月度公司团队聚餐活动',
    '温馨员工生日会惊喜',
    '通讯费、差旅餐补及各级别交通补贴',
    '国际照明/建筑项目现场考察与年度团队旅游',
    '比肩国际咨询事务所的带薪年休假与带薪病假福利'
  ] : [
    'Year-end Bonus & Annual Performance Salary Raises',
    'Tailored Technical & Creative Lighting Skills Seminars',
    'Comprehensive Annual Medical Check-ups',
    'Regular Company Dinners & Team Bonding Events',
    'Sweet Team Birthday Warmups & Celebrations',
    'Allowances for Communications, Meals & Commutes',
    'Field Trips to Landmark Projects & Annual Team Travel',
    'Paid Annual Vacation & Generous Personal Leave Welfare'
  ];

  const positions = [
    {
      id: 1,
      titleCN: '01. 照明设计师 / 助理照明设计师',
      titleEN: '01. Lighting Designer / Assistant Lighting Designer',
      locCN: '上海（3-4名）/ 深圳（2名）',
      locEN: 'Shanghai (3-4) / Shenzhen (2)',
      dutiesCN: [
        '负责完成各阶段照明设计图纸及申报、控制、节点细节文件；',
        '协助项目经理按时间计划与设计预算完成所需工作；',
        '协助项目经理及总监把控各设计阶段图纸、模型的专业高度与交付质量；',
        '知道并温和指导助理设计师完成日常排板与渲染、计算设计任务。'
      ],
      dutiesEN: [
        'Responsible for detailing lighting design drawings, schematics, and controller schedule files at all stages;',
        'Assist project managers to close out assigned targets within standard schedules and budgets;',
        'Assist project managers in safeguarding overall engineering standards and structural delivery qualities;',
        'Provide gentle guidance and standard templates to junior designers for structural layout and lighting calculations.'
      ],
      reqsCN: [
        '大学专科或以上学历学位，具备照明设计、建筑、室内设计、景观艺术、城市规划或其他相关教育背景；',
        '具有 1~3 年在专业品牌照明设计室或知名设计公司的核心设计业务经验；',
        '熟悉日常设计排版、办公演示工具的使用，掌握制图工作习惯；',
        '精通并熟练操作至少 1~2 种三维/二维设计工具，如：AutoCAD、3Dsmax等；',
        '有国际建筑/空间照明计算软件（如 Dialux、Agi32 或同等品类）实战经验者佳；',
        '若具备纯照明顾问公司任职经验的，面试期间予以强力优先考虑；',
        '具备优良的表达与方案逻辑陈述交谈能力，且有优秀的美学素养及手绘草图表达功底。'
      ],
      reqsEN: [
        'Junior college degree or higher in lighting design, architecture, interior design, fine landscape art, urban planning or related fields;',
        '1-3 years of active portfolio experience inside specialized lighting studios or design offices;',
        'Well-versed in mainstream design document preparation and layout tools;',
        'Proficient in at least 1 or 2 standard CAD/3D modeling suites (such as AutoCAD, 3Dsmax);',
        'Hands-on calculations experience with international software programs (such as Dialux, Agi32 or equivalent tools) is a plus;',
        'Direct experience in lighting design consultancy firms will be highly prioritized;',
        'Strong communication logic and graphic hand-sketching presentation habits.'
      ]
    },
    {
      id: 2,
      titleCN: '02. 媒体视觉交互设计师',
      titleEN: '02. Media Visual Interactive Designer',
      locCN: '上海（1名）',
      locEN: 'Shanghai (1)',
      dutiesCN: [
        '专注于前沿数字新媒体设计，全流程参与互动式装置、灯光秀多媒体编排及多媒体文旅夜游项目；',
        '与跨领域、跨国籍的综合设计团队以及底层架构人员密切配合，高效对接设计草图与动效显示逻辑；',
        '本岗位侧重于高质感效果制作方向：操作主流三维与特效渲染器，创作具有概念厚度的视频短片及沉浸式动态演示大片。'
      ],
      dutiesEN: [
        'Focus on advanced digital installations, multimedia mapping scripts, and cultural-commercial night tourism projects;',
        'Collaborate across disciplines to bridge physical design spaces with programmatic animation behaviors;',
        'This role is heavily focused on premium render/CG production: Utilize professional engine assets to craft scenic video animations.'
      ],
      reqsCN: [
        '具有数字交互艺术、灯光秀展演、空间全息投影项目经验者佳，对基础照明逻辑、舞台灯控制规范有适度了解，以便于发光媒介上进行内容表达；',
        '需能充分发挥美感直觉，熟练应用 Unity、Unreal Engine、C4D、Houdini 等前沿三维特效渲染，或者有 Rhino & Grasshopper、3dMax等建模背景；',
        '若懂一点基础代码，或对学习 TouchDesigner 等可视化高级算法编程具有浓厚兴趣者，我们将予以强力好感与偏爱；',
        '对先锋数码设计行业具备长效热忱，紧跟国际数字交互浪潮，兼具独立创作激情与团队融合操守。'
      ],
      reqsEN: [
        'Familiar with video projections or interactive structures, possessing core understanding of hardware fixtures and theatrical lights for reliable media delivery;',
        'Empowered with high aesthetic sense, using modern render systems like Unity, Unreal Engine, C3D or Houdini, or having strong parametric modeling (Rhino + GH) skills;',
        'Basic developer skills, or code logic familiarity with TouchDesigner is a huge competitive edge for interactive testing;',
        'Informed on global tech trends, eager to test new programming bounds, balancing independent creative passion with reliable team cohesion.'
      ]
    },
    {
      id: 3,
      titleCN: '03. 硬件交互控制开发师',
      titleEN: '03. Hardware Interactive Controller Developer',
      locCN: '上海（1名）',
      locEN: 'Shanghai (1)',
      dutiesCN: [
        '专注于数码视觉项目工程落地，深度主导大型灯具阵列、物理感知装置、沉浸演艺环境的控制协议编写；',
        '与交互设计师精细对表，确定通信协议（DMX、ArtNet、UDP、Modbus等），确保动画效果在芯片端高采样呈现；',
        '本岗位侧重技术调试落地方向：编写稳定的底层硬件驱动，挑选测试控制器，提供现场最稳健的主控排障策略。'
      ],
      dutiesEN: [
        'Fully dedicated to interactive system installations, control protocols scripting, and custom hardware debugging;',
        'Align closely with interactive media designers regarding communication setups (DMX512, Art-Net, UDP/TCP, Modbus) to maintain flicker-free, precision frames state;',
        'Technologically driven role: Formulate robust hardware firmware, specify controllers, and design stable troubleshooting charts on-site.'
      ],
      reqsCN: [
        '有数字新媒体展厅、可控LED矩阵、交互机电雕塑总线等项目经验，对各类发光驱动、多点投影、分布式控制器了如指掌；',
        '需具备优秀的代码集成调试习惯，熟练使用 TouchDesigner、vvvv、Processing 交互软件，或对 Python、C++ 底层编程深有造诣，对常规硬件电气有基本常识；',
        '饱含好奇心，对交互新创意抱有无穷执念，具备非凡的现场问题剖析能力。'
      ],
      reqsEN: [
        'Proven commissioning history in active interactive stages, LED pixel setups, and electric motor triggers;',
        'Excellent coding practices using TouchDesigner, vvvv, or Processing, or experienced scripting with Python/C++ to read serial sensor data reliably;',
        'Filled with active engineering curiosity, possessing logical debugging habits under multi-device environments.'
      ]
    },
    {
      id: 4,
      titleCN: '04. 照明电气工程师',
      titleEN: '04. Lighting Electrical Engineer',
      locCN: '上海（1名）',
      locEN: 'Shanghai (1)',
      dutiesCN: [
        '全面承托照明灯光方案的配套全套电气施工图深化设计并提供设计算量；',
        '对灯光照明所需电线配电组装盒、机柜、核心控制器进行安全负荷测估、技术筛选与品牌审核；',
        '主导现场电气与照度布线故障定位排除，并与建筑施工单位顺畅对焦管线冲突；',
        '输出细致的国家规范级强弱电系统图、管线走线图纸等电气方案说明。'
      ],
      dutiesEN: [
        'Oversee advanced electrical design and documentation matching various decorative dynamic architectural lighting blueprints;',
        'Assess safety limits, evaluate components, design server controls, and cross-examine domestic and international luminaire spec sheets;',
        'Provide rigorous on-site installation guidance, locating short circuits or load errors and negotiating with project general contractors;',
        'Generate code-compliant power diagrams, load calculation schedules, and detailed physical control-loop routing blueprints.'
      ],
      reqsCN: [
        '本科及以上学历，电气自动化、机电一体化、电子等相关专业背景优先；',
        '拥有 12 个月以上建筑电气或泛光工程施工配电专业制图或深化设计工作经验；',
        '通晓室内外防潮、防水布线规范、电气隔离柜和PLC自动化逻辑；',
        '做事严谨，具有深厚的工程师责任心，沉稳务实。'
      ],
      reqsEN: [
        'Bachelor\'s degree in electrical engineering, automation, mechatronics, electronics, or related fields;',
        '1+ years of proven electrical diagram layout or construction drawing experience inside design institute or professional contractor nodes;',
        'Thorough knowledge of landscape cabling, outdoor humidity/UV prevention rules, and regular breaker cabinets;',
        'Meticulous documentation discipline, strong engineering ethic, and a calm, deliberate working demeanour.'
      ]
    },
    {
      id: 5,
      titleCN: '05. 实习生 / 设计助理',
      titleEN: '05. Intern / Design Assistant',
      locCN: '上海（不限）',
      locEN: 'Shanghai (Open)',
      dutiesCN: [
        '专科学位及以上，照明设计、建筑学、环境艺术景观设计、室内设计等相关专业。'
      ],
      dutiesEN: [
        'College degree or higher in lighting, spatial arts, architectural engineering, or related majors.'
      ],
      reqsCN: [
        '熟练且高频操作平面排版及基础三维制图工具如 Photoshop、AutoCAD 等；',
        '参与工作室的大型项目创意简版、照度演算文件与设计资料集成；',
        '工作沉稳主动，愿意配合总监完成多岗位探索。'
      ],
      reqsEN: [
        'Proven agility operating general creative packages like Photoshop and basic AutoCAD layout functions;',
        'Support active teams on layout assembly, lighting calculations, and document archival;',
        'Proactive team player with a humble attitude, keen on wide multithread explore.'
      ]
    }
  ];

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-[1280px]">
        
        {/* Editorial Greeting Header */}
        <section className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-black uppercase"
          >
            {t.heroTitle}
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-6 text-xl md:text-2xl text-black leading-relaxed font-light"
          >
            <p>{t.heroIntro1}</p>
            <p>{t.heroIntro2}</p>
          </motion.div>
        </section>

        {/* Positions Open Panel Accordion */}
        <section className="mb-20">
          <h2 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-wider text-black">
            {t.positionsTitle}
          </h2>

          <div className="border-t border-neutral-200/60">
            {positions.map((pos) => {
              return (
                <div 
                  key={pos.id} 
                  className="border-b border-neutral-200/60 py-8 space-y-6"
                >
                  {/* Position Header (Non-clickable block) */}
                  <div className="space-y-2">
                    <h3 className="text-lg md:text-xl font-bold tracking-tight text-black uppercase">
                      {lang === 'cn' ? pos.titleCN : pos.titleEN}
                    </h3>
                    <div className="flex gap-4 items-center text-xs text-black font-light">
                      <span>
                        {lang === 'cn' ? pos.locCN : pos.locEN}
                      </span>
                      <span className="font-mono text-[10px] text-black">|</span>
                      <span>
                        {lang === 'cn' ? '全职 / 招募' : 'Full-time'}
                      </span>
                    </div>
                  </div>

                  {/* Position details (always expanded) */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4 border-t border-neutral-100/60">
                    
                    {/* Duties column */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-black mb-2">
                        {t.responsibilities}
                      </h4>
                      <ul className="space-y-2">
                        {(lang === 'cn' ? pos.dutiesCN : pos.dutiesEN).map((duty, docId) => (
                          <li key={docId} className="text-base text-black font-light leading-relaxed">
                            {duty}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Reqs column */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-black mb-2">
                        {t.requirements}
                      </h4>
                      <ul className="space-y-2">
                        {(lang === 'cn' ? pos.reqsCN : pos.reqsEN).map((req, reqId) => (
                          <li key={reqId} className="text-base text-black font-light leading-relaxed">
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Application Submit Call-To-Action form */}
        <section className="bg-neutral-50 px-8 py-16 flex flex-col items-center text-center rounded-sm">
          <h3 className="text-xl md:text-2xl font-bold text-black tracking-widest uppercase mb-3">
            {lang === 'cn' ? '申请渠道' : 'HOW TO APPLY'}
          </h3>
          <p className="text-base md:text-lg text-black leading-relaxed font-light max-w-2xl mb-8">
            {t.applyInstructions}
          </p>
          
          <a 
            href="mailto:qwang@rdilighting.com"
            className="px-8 py-3.5 bg-neutral-200 text-black hover:bg-neutral-300 transition-colors uppercase font-mono tracking-widest text-xs font-bold flex items-center select-all cursor-pointer rounded-sm"
          >
            <span>qwang@rdilighting.com</span>
          </a>
        </section>

      </div>
    </div>
  );
}
