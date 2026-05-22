import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, ExternalLink } from 'lucide-react';
import type { Language } from '../App';

// ===========================================================================
// MinimalistMap Component
// Renders ultra-polished abstract vectors representing city coordinates and geometry.
// ===========================================================================
interface MinimalistMapProps {
  cityCode: 'SH' | 'HK' | 'NY' | 'SZ';
  lat: string;
  lng: string;
}

export function MinimalistMap({ cityCode, lat, lng }: MinimalistMapProps) {
  let lines: React.ReactNode[] = [];
  let landmarkName = '';
  
  if (cityCode === 'SH') {
    landmarkName = 'YANGPU | JINIAN RD';
    lines = [
      // Grid mesh
      <line key="g1" x1="0" y1="50" x2="400" y2="50" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g2" x1="0" y1="150" x2="400" y2="150" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g3" x1="0" y1="250" x2="400" y2="250" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g4" x1="100" y1="0" x2="100" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g5" x1="200" y1="0" x2="200" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g6" x1="300" y1="0" x2="300" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      
      // Abstract roads
      <line key="s1" x1="0" y1="80" x2="400" y2="120" stroke="#E2E8F0" strokeWidth="2.5" />,
      <line key="s2" x1="0" y1="220" x2="400" y2="180" stroke="#E2E8F0" strokeWidth="2" />,
      <line key="s3" x1="120" y1="0" x2="160" y2="300" stroke="#E2E8F0" strokeWidth="3" />, 
      <line key="s4" x1="280" y1="0" x2="240" y2="300" stroke="#E2E8F0" strokeWidth="1.5" />,
      
      // Technical coordinates rings or lines
      <line key="ss1" x1="50" y1="0" x2="50" y2="300" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3 3" />,
      <line key="ss2" x1="350" y1="0" x2="350" y2="300" stroke="#CBD5E1" strokeWidth="0.8" strokeDasharray="3 3" />,
      
      // Curved Huangpu River
      <path key="r1" d="M -50,320 C 150,220 200,80 450,-50" fill="none" stroke="#E2E8F0" strokeWidth="14" strokeLinecap="round" opacity="0.6" />,
      
      // Pulse Target Dot (Room 205, Jinian Road: x=140, y=100)
      <g key="target">
        <circle cx="140" cy="100" r="22" fill="#D97706" fillOpacity="0.04" className="animate-pulse" />
        <circle cx="140" cy="100" r="12" fill="#D97706" fillOpacity="0.1" />
        <circle cx="140" cy="100" r="7" fill="#D97706" fillOpacity="0.25" />
        <circle cx="140" cy="100" r="3" fill="#D97706" />
        
        {/* Callout Label line */}
        <polyline points="140,100 110,75 40,75" fill="none" stroke="#94A3B8" strokeWidth="0.8" />
        <text x="38" y="68" fontFamily="monospace" fontSize="8" fill="#4B5563" fontWeight="bold">RDI HQ_SH_CN</text>
      </g>
    ];
  } else if (cityCode === 'HK') {
    landmarkName = 'KOWLOON | LAI CHI KOK';
    lines = [
      // Grid mesh
      <line key="g1" x1="0" y1="50" x2="400" y2="50" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g2" x1="0" y1="150" x2="400" y2="150" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g3" x1="0" y1="250" x2="400" y2="250" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g4" x1="100" y1="0" x2="100" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g5" x1="200" y1="0" x2="200" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g6" x1="300" y1="0" x2="300" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      
      // Abstract streets representing Kowloon urban fabric
      <line key="s1" x1="0" y1="120" x2="400" y2="50" stroke="#E2E8F0" strokeWidth="3" />, // Lai Chi Kok road
      <line key="s2" x1="0" y1="200" x2="400" y2="130" stroke="#E2E8F0" strokeWidth="2" />, // Castle Peak road
      <line key="s3" x1="0" y1="260" x2="400" y2="180" stroke="#E2E8F0" strokeWidth="1.5" />,
      <line key="s4" x1="120" y1="0" x2="220" y2="300" stroke="#E2E8F0" strokeWidth="2" />,
      <line key="s5" x1="240" y1="0" x2="340" y2="300" stroke="#E2E8F0" strokeWidth="1.5" />,
      
      // West Kowloon ocean waterfront coastline
      <path key="r1" d="M -20,290 C 150,285 240,240 420,230" fill="none" stroke="#E2E8F0" strokeWidth="10" strokeLinecap="round" opacity="0.6" />,
      
      // Target at Wing Ming Street: x=190, y=110
      <g key="target">
        <circle cx="190" cy="110" r="22" fill="#D97706" fillOpacity="0.04" className="animate-pulse" />
        <circle cx="190" cy="110" r="12" fill="#D97706" fillOpacity="0.1" />
        <circle cx="190" cy="110" r="7" fill="#D97706" fillOpacity="0.25" />
        <circle cx="190" cy="110" r="3" fill="#D97706" />
        
        {/* Callout */}
        <polyline points="190,110 215,85 285,85" fill="none" stroke="#94A3B8" strokeWidth="0.8" />
        <text x="220" y="77" fontFamily="monospace" fontSize="8" fill="#4B5563" fontWeight="bold">RDI NODE_HK</text>
      </g>
    ];
  } else if (cityCode === 'NY') {
    landmarkName = 'MANHATTAN | MIDTOWN';
    lines = [
      // Grid mesh
      <line key="g1" x1="0" y1="50" x2="400" y2="50" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g2" x1="0" y1="150" x2="400" y2="150" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g3" x1="0" y1="250" x2="400" y2="250" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g4" x1="100" y1="0" x2="100" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g5" x1="200" y1="0" x2="200" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g6" x1="300" y1="0" x2="300" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      
      // Manhattan grid street block system
      <line key="av1" x1="50" y1="0" x2="150" y2="300" stroke="#E2E8F0" strokeWidth="2" />, // Lexington Ave
      <line key="av2" x1="120" y1="0" x2="220" y2="300" stroke="#E2E8F0" strokeWidth="3" />, // 3rd Ave
      <line key="av3" x1="190" y1="0" x2="290" y2="300" stroke="#E2E8F0" strokeWidth="2" />, // 2nd Ave
      
      <line key="st1" x1="0" y1="220" x2="400" y2="100" stroke="#E2E8F0" strokeWidth="1.5" />, // 53rd St
      <line key="st2" x1="0" y1="180" x2="400" y2="60" stroke="#E2E8F0" strokeWidth="2" />, // 55th St
      <line key="st3" x1="0" y1="140" x2="400" y2="20" stroke="#E2E8F0" strokeWidth="1.5" />, // 57th St
      
      // East River coastline
      <path key="r1" d="M 280,-10 C 310,80 340,200 390,320" fill="none" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" opacity="0.6" />,
      
      // Target at Midtown Manhattan 3rd Ave: x=175, y=110
      <g key="target">
        <circle cx="175" cy="110" r="22" fill="#D97706" fillOpacity="0.04" className="animate-pulse" />
        <circle cx="175" cy="110" r="12" fill="#D97706" fillOpacity="0.1" />
        <circle cx="175" cy="110" r="7" fill="#D97706" fillOpacity="0.25" />
        <circle cx="175" cy="110" r="3" fill="#D97706" />
        
        {/* Callout */}
        <polyline points="175,110 200,85 270,85" fill="none" stroke="#94A3B8" strokeWidth="0.8" />
        <text x="205" y="77" fontFamily="monospace" fontSize="8" fill="#4B5563" fontWeight="bold">RDI NODE_US_NY</text>
      </g>
    ];
  } else if (cityCode === 'SZ') {
    landmarkName = 'FUTIAN | CHEGONGMIAO';
    lines = [
      // Grid mesh
      <line key="g1" x1="0" y1="50" x2="400" y2="50" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g2" x1="0" y1="150" x2="400" y2="150" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g3" x1="0" y1="250" x2="400" y2="250" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g4" x1="100" y1="0" x2="100" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g5" x1="200" y1="0" x2="200" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g6" x1="300" y1="0" x2="300" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      
      // Futian grid system (Shennan Road & Binhe Highway)
      <line key="sn1" x1="0" y1="110" x2="400" y2="110" stroke="#E2E8F0" strokeWidth="3.5" />, // Shennan Road
      <line key="sn2" x1="0" y1="230" x2="400" y2="230" stroke="#E2E8F0" strokeWidth="3.5" />, // Binhe Highway
      
      <line key="v1" x1="110" y1="0" x2="110" y2="300" stroke="#E2E8F0" strokeWidth="2.1" />, // Qiaoxiang Rd
      <line key="v2" x1="250" y1="0" x2="250" y2="300" stroke="#E2E8F0" strokeWidth="2.5" />, // Xiangmihu Rd
      <line key="v3" x1="340" y1="0" x2="340" y2="300" stroke="#E2E8F0" strokeWidth="1.5" />,
      
      // Coastline curve of Futian Mangroves
      <path key="r1" d="M -30,280 Q 80,270 120,320" fill="none" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" opacity="0.6" />,
      
      // Target at Chegongmiao Fuchun Building: x=210, y=110
      <g key="target">
        <circle cx="210" cy="110" r="22" fill="#D97706" fillOpacity="0.04" className="animate-pulse" />
        <circle cx="210" cy="110" r="12" fill="#D97706" fillOpacity="0.1" />
        <circle cx="210" cy="110" r="7" fill="#D97706" fillOpacity="0.25" />
        <circle cx="210" cy="110" r="3" fill="#D97706" />
        
        {/* Callout */}
        <polyline points="210,110 235,85 295,85" fill="none" stroke="#94A3B8" strokeWidth="0.8" />
        <text x="240" y="77" fontFamily="monospace" fontSize="8" fill="#4B5563" fontWeight="bold">RDI NODE_SZ</text>
      </g>
    ];
  }

  return (
    <div className="w-full h-full bg-[#FCFCFC] border border-neutral-150 p-6 md:p-8 flex flex-col justify-between relative select-none rounded-sm">
      {/* Target coordinates and state markers */}
      <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 tracking-widest uppercase">
        <div className="flex gap-4">
          <span>LAT: {lat}</span>
          <span>LNG: {lng}</span>
        </div>
        <div className="flex gap-1.5 items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
          <span>RDI NODE ACTIVE</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="w-full flex-grow flex items-center justify-center my-8 min-h-[220px] max-h-[300px]">
        <svg viewBox="0 0 400 300" className="w-full h-full max-h-[240px] drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          {lines}
        </svg>
      </div>

      {/* Bottom technical text */}
      <div className="flex justify-between items-end text-[10px] font-mono text-neutral-400 tracking-wider">
        <div className="space-y-0.5">
          <div className="font-bold text-neutral-700 uppercase tracking-widest">{landmarkName}</div>
          <span className="text-[8px] opacity-75">MINIMAL ARCHITECTURAL GRID // VECTOR 1.2</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 font-bold text-neutral-500">
            <span className="w-12 h-[1px] bg-neutral-300 block"></span>
            <span>200 METERS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ===========================================================================
// Location Section Component
// Render clean structured grids with technical specifications.
// ===========================================================================
interface OfficeProps {
  city: string;
  cityCN: string;
  title: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  lat: string;
  lng: string;
  cityCode: 'SH' | 'HK' | 'NY' | 'SZ';
  key?: string | number;
}

function OfficeSection({ city, cityCN, title, description, phone, email, address, lat, lng, cityCode }: OfficeProps) {
  return (
    <section className="py-20 border-b border-neutral-150">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        
        {/* Texts Info Pane */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-8 pr-0 lg:pr-8">
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-mono font-bold text-white bg-black px-2 py-0.5 tracking-widest">
                NODE_0{cityCode === 'SH' ? 1 : cityCode === 'SZ' ? 2 : cityCode === 'HK' ? 3 : 4}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase">
                RDI GLOBAL DIRECTORY
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-widest text-black flex items-baseline gap-3 uppercase">
              <span>{city}</span>
              <span className="text-lg md:text-xl font-light text-neutral-400">{cityCN}</span>
            </h2>
            <div className="w-12 h-1 bg-amber-500 rounded-full" />
          </div>

          <p className="text-xs text-neutral-600 leading-relaxed font-light">
            {description}
          </p>

          <div className="space-y-4 pt-6 border-t border-neutral-100">
            <div className="flex gap-4 items-start pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
              <MapPin size={15} className="text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] font-mono font-bold text-neutral-400 block mb-1">OFFICE LOCATION ADDRESS</span>
                <p className="text-xs text-neutral-800 leading-relaxed font-light tracking-wide">{address}</p>
              </div>
            </div>

            {phone && (
              <div className="flex gap-4 items-start pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
                <Phone size={15} className="text-neutral-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-[9px] font-mono font-bold text-neutral-400 block mb-1">MUNICIPAL/DIRECT TEL</span>
                  <p className="text-xs text-neutral-800 font-mono tracking-wide">{phone}</p>
                </div>
              </div>
            )}

            <div className="flex gap-4 items-start pb-4 border-b border-neutral-100 last:border-0 last:pb-0">
              <Mail size={15} className="text-neutral-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-[9px] font-mono font-bold text-neutral-400 block mb-1">DIRECT WEB MAIL</span>
                <a href={`mailto:${email}`} className="text-xs text-neutral-800 font-mono hover:text-amber-500 hover:underline tracking-wide">{email}</a>
              </div>
            </div>
          </div>
        </div>

        {/* Minimal Vector Map Pane */}
        <div className="lg:col-span-7 h-auto min-h-[320px]">
          <MinimalistMap cityCode={cityCode} lat={lat} lng={lng} />
        </div>

      </div>
    </section>
  );
}

// ===========================================================================
// ContactPage Main Screen
// ===========================================================================
interface ContactPageProps {
  lang: Language;
}

export default function ContactPage({ lang }: ContactPageProps) {
  const officesList: OfficeProps[] = [
    {
      city: 'SHANGHAI',
      cityCN: '上海总部',
      title: 'WE ARE SHANGHAI!',
      description: lang === 'cn'
        ? '上海作为瑞国际照明设计（RDI）的全球总部，自2012年成立以来，在建筑泛光、大型城市综合照明与互动系统深层深化方面居于最核心位置。在这里，超过最顶尖的多学科设计师和工程专家协同为全球客户输出一流的灯光美学支持。'
        : 'Serving as the global main headquarters since 2012, Shanghai oversees custom facade illuminations, masterplans, and hardware controller script architecture, hosting our primary team of creative Ph.Ds and lighting advisers.',
      phone: '86 21 5510 0690 * 824 / M: 86 18918779455',
      email: 'info@rdilighting.com',
      address: lang === 'cn' 
        ? '中国 上海市杨浦区纪念路8号财大科技园1号楼205'
        : 'Rm 205, Building 1, Shanghai University of Finance & Economics National University Science Park, No. 8 Jinian Road, Yangpu District, Shanghai, China',
      lat: '31.2985° N',
      lng: '121.4880° E',
      cityCode: 'SH'
    },
    {
      city: 'SHENZHEN',
      cityCN: '深圳办公室',
      title: 'WE ARE SHENZHEN!',
      description: lang === 'cn'
        ? '深圳办公室扎根于中国最具创新竞争力的科技沃土中。我们依托邻近的前沿科技制造生态，在超高层亮化、先锋夜游文旅以及实时机电灯光交互系统方案落地领域不断拓展 RDI 照明顾问的极致体验。'
        : 'Rooted inside the legendary tech park of China, Shenzhen pushes boundaries in skyscraper lighting, hospitality landmarks, and custom electronic interactions, backed by seamless local advanced hardware suppliers.',
      phone: '86 18918779455',
      email: 'info@rdilighting.com',
      address: lang === 'cn'
        ? '中国 深圳市福田区车公庙杭钢富春商务大厦2804B'
        : 'Rm 2804B, Hanggang Fuchun Business Building, Chegongmiao, Futian District, Shenzhen, China',
      lat: '22.5323° N',
      lng: '114.0253° E',
      cityCode: 'SZ'
    },
    {
      city: 'HONG KONG',
      cityCN: '香港办公室',
      title: 'WE ARE HONG KONG!',
      description: lang === 'cn'
        ? '香港办公室代表着国际超一级的协作通道。我们处于金融与文化碰撞的黄金枢纽中，为亚太众多顶级大型复杂设计综合体提供全球顶尖水平的国际化照明设计方案与艺术工程支持。'
        : 'Empowering the gateway of world-class collaborations, Hong Kong aligns bespoke global structures, managing landmark luxury mixed-use retail nodes and commercial hubs with precise international operations.',
      phone: '86 21 5510 0690',
      email: 'info@rdilighting.com',
      address: lang === 'cn'
        ? '九龙长沙湾永明街3号泰昌工厂大厦11楼B及C室B12'
        : 'Room B12, 11/F, Blocks B & C, Tai Cheong Factory Building, 3 Wing Ming Street, Cheung Sha Wan, Kowloon, Hong Kong',
      lat: '22.3384° N',
      lng: '114.1481° E',
      cityCode: 'HK'
    },
    {
      city: 'NEW YORK',
      cityCN: '纽约办公室',
      title: 'WE ARE NEW YORK!',
      description: lang === 'cn'
        ? '纽约办公室将我们的学术深度与国际触角完全铺展到美洲及海外核心大都会区域，密切对接世界级著名建筑巨匠与开发业主，引领高层次、绿色环保、未来感的可持续概念泛光潮流。'
        : 'Spearheading our architectural reach across mature markets, our team inside Manhattan cooperates alongside global master builders and academic figures, fostering carbon-neutral, forward-looking concepts.',
      phone: '86 21 5510 0690',
      email: 'info@rdilighting.com',
      address: lang === 'cn'
        ? '909 Third Avenue, #6216，New York, 10150'
        : '909 Third Avenue, #6216, New York, NY 10150, USA',
      lat: '40.7579° N',
      lng: '73.9680° W',
      cityCode: 'NY'
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        
        {/* Editorial Title Header */}
        <section className="py-12 border-b border-black mb-16 flex flex-col md:flex-row justify-between items-baseline gap-6">
          <div>
            <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-[0.25em] block mb-2">
              {lang === 'cn' ? '与我们取得联系' : 'LET\'S BUILD ATMOSPHERES TOGETHER'}
            </span>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-black uppercase leading-tight select-none">
              {lang === 'cn' ? 'RDI 瑞国际 | 联系我们' : 'RDI | CONTACT CHANNELS'}
            </h1>
          </div>
          <div className="text-right font-mono text-xs text-neutral-400 select-none hidden md:block">
            ACTIVE PORTALS // EST. 2012
          </div>
        </section>

        {/* Global Contacts Highlights Panel */}
        <section className="mb-20">
          <div className="border border-neutral-150 bg-neutral-50/50 p-8 md:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start text-left">
              <div className="space-y-2">
                <span className="text-[9px] font-mono font-bold text-neutral-400 tracking-[0.2em] uppercase block">
                  {lang === 'cn' ? '官方唯一门户' : 'OFFICIAL DOMAIN'}
                </span>
                <a 
                  href="https://www.rdilighting.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="group text-lg font-bold text-neutral-900 hover:text-amber-600 transition-colors flex items-center gap-2"
                >
                  <span>www.rdilighting.com</span>
                  <ExternalLink size={13} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                </a>
                <p className="text-[10px] text-neutral-400 font-light">
                  {lang === 'cn' ? '随时获取最新产品技术、奖项报道与学术白皮书发布' : 'Stay up to date with active visual releases, design portfolios & events.'}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-mono font-bold text-neutral-400 tracking-[0.2em] uppercase block">
                  {lang === 'cn' ? '商务及深度咨询服务热线' : 'BUSINESS DEVELOPMENT LINE'}
                </span>
                <p className="text-lg font-mono font-bold text-neutral-900 tracking-tight leading-relaxed select-all">
                  T: 86 21 5510 0690 * 824<br/>
                  M: 86 18918779455
                </p>
                <p className="text-[10px] text-neutral-400 font-light">
                  {lang === 'cn' ? '北京时间 09:00 - 18:00 (上海总部)，提供全领域方案咨询' : 'Operation hours: Monday to Friday (GMT+8), providing prompt custom solutions.'}
                </p>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-mono font-bold text-neutral-400 tracking-[0.2em] uppercase block">
                  {lang === 'cn' ? '全球通用办公邮箱' : 'GLOBAL CENTRAL INBOX'}
                </span>
                <a 
                  href="mailto:info@rdilighting.com" 
                  className="text-lg font-mono font-bold text-neutral-900 hover:text-amber-600 hover:underline transition-colors block select-all"
                >
                  info@rdilighting.com
                </a>
                <p className="text-[10px] text-neutral-400 font-light">
                  {lang === 'cn' ? '对所有办公室的招标计划及学术探讨通常在 24 小时内归档回复' : 'All incoming messages across branches usually receive responses within 24 hours.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Offices Map/Address Listing */}
        <section className="space-y-4">
          <div className="border-b border-black pb-4 mb-2 flex justify-between items-baseline select-none">
            <h3 className="text-xs font-bold text-black tracking-[0.2em] uppercase">
              {lang === 'cn' ? 'RDI 全球办公室' : 'RDI PATHWAY & WORLDWIDE OFFICES'}
            </h3>
            <span className="font-mono text-[9px] text-neutral-400">TOTAL NODES: 04 ACTIVE PORTS</span>
          </div>
          
          <div className="space-y-6">
            {officesList.map((office, idx) => (
              <OfficeSection 
                key={idx} 
                city={office.city}
                cityCN={office.cityCN}
                title={office.title}
                description={office.description}
                phone={office.phone}
                email={office.email}
                address={office.address}
                lat={office.lat}
                lng={office.lng}
                cityCode={office.cityCode}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
