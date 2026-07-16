import { motion } from 'motion/react';
import React, { useState } from 'react';
import { Phone, Mail, MapPin, Globe, ExternalLink } from 'lucide-react';
import type { Language } from '../App';

// ===========================================================================
// MinimalistMap Component
// Renders ultra-polished abstract vectors representing city coordinates and geometry.
// ===========================================================================
interface MinimalistMapProps {
  cityCode: 'SH' | 'HK' | 'SZ';
  lat: string;
  lng: string;
  lang: Language;
}

export function MinimalistMap({ cityCode, lat, lng, lang }: MinimalistMapProps) {
  const [viewMode, setViewMode] = useState<'vector' | 'real'>('vector');
  let lines: React.ReactNode[] = [];
  let landmarkName = '';
  const isCN = lang === 'cn';
  
  if (cityCode === 'SH') {
    landmarkName = isCN ? '上海杨浦 | 纪念路' : 'YANGPU | JINIAN RD';
    lines = [
      // Grid mesh
      <line key="g1" x1="0" y1="50" x2="400" y2="50" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g2" x1="0" y1="150" x2="400" y2="150" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g3" x1="0" y1="250" x2="400" y2="250" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g4" x1="100" y1="0" x2="100" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g5" x1="200" y1="0" x2="200" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g6" x1="300" y1="0" x2="300" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      
      // Abstract roads
      <line key="s1" x1="0" y1="100" x2="400" y2="100" stroke="#E2E8F0" strokeWidth="3" />, // Jinian Road
      <line key="s2" x1="0" y1="220" x2="400" y2="220" stroke="#E2E8F0" strokeWidth="2" />, // Handan Road
      <line key="s3" x1="140" y1="0" x2="140" y2="300" stroke="#CBD5E1" strokeWidth="3.5" />, // Yixian Elevated Rd
      <line key="s4" x1="260" y1="0" x2="260" y2="300" stroke="#E2E8F0" strokeWidth="1.5" />, // Jipu Road
      
      // Technical coordinates rings or lines
      <line key="ss1" x1="50" y1="0" x2="50" y2="300" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />,
      <line key="ss2" x1="350" y1="0" x2="350" y2="300" stroke="#E2E8F0" strokeWidth="0.8" strokeDasharray="3 3" />,
      
      // Curved Huangpu River
      <path key="r1" d="M -50,320 C 150,220 200,80 450,-50" fill="none" stroke="#E2E8F0" strokeWidth="14" strokeLinecap="round" opacity="0.6" />,
      
      // Street Names (周边路名)
      <text key="t-jinian" x="10" y="93" fill="#94A3B8" fontSize="10" fontFamily="sans-serif" fontWeight="500">
        {isCN ? '纪念路 Jinian Rd' : 'Jinian Rd'}
      </text>,
      <text key="t-handan" x="10" y="213" fill="#94A3B8" fontSize="10" fontFamily="sans-serif" fontWeight="500">
        {isCN ? '邯郸路 Handan Rd' : 'Handan Rd'}
      </text>,
      <text key="t-yixian" x="146" y="35" fill="#64748B" fontSize="10" fontFamily="sans-serif" fontWeight="600" transform="rotate(90, 146, 35)">
        {isCN ? '逸仙路高架 Yixian Expwy' : 'Yixian Expwy'}
      </text>,
      <text key="t-jipu" x="266" y="285" fill="#94A3B8" fontSize="10" fontFamily="sans-serif" fontWeight="500">
        {isCN ? '吉浦路 Jipu Rd' : 'Jipu Rd'}
      </text>,
      
      // Area label (区域文字)
      <text key="t-area-sh" x="270" y="155" fill="#94A3B8" fontSize="11" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">
        {isCN ? '杨浦区 YANGPU DISTRICT' : 'YANGPU DISTRICT'}
      </text>,
      <text key="t-univ" x="270" y="172" fill="#CBD5E1" fontSize="10" fontFamily="sans-serif" fontWeight="500">
        {isCN ? '上海财经大学 SUFE Campus' : 'SUFE Campus'}
      </text>,

      // Pulse Target Dot (Room 205, Jinian Road: x=140, y=100)
      <g key="target">
        <circle cx="140" cy="100" r="22" fill="#D97706" fillOpacity="0.04" className="animate-pulse" />
        <circle cx="140" cy="100" r="12" fill="#D97706" fillOpacity="0.1" />
        <circle cx="140" cy="100" r="7" fill="#D97706" fillOpacity="0.25" />
        <circle cx="140" cy="100" r="3" fill="#D97706" />
        
        {/* Callout Label line & Detailed Address label */}
        <polyline points="140,100 110,65 20,65" fill="none" stroke="#D97706" strokeWidth="0.8" opacity="0.8" />
        
        <text x="20" y="56" fontFamily="sans-serif" fontSize="11" fill="#171717" fontWeight="bold">
          {isCN ? 'RDI 上海总部' : 'RDI SHANGHAI HEADQUARTER'}
        </text>
        <text x="20" y="78" fontFamily="sans-serif" fontSize="10" fill="#737373" fontWeight="normal">
          {isCN ? '纪念路8号 财大科技园 1号楼 205' : 'SUFE Tech Park, No. 8 Jinian Rd, Rm 205'}
        </text>
      </g>
    ];
  } else if (cityCode === 'HK') {
    landmarkName = isCN ? '九龙 | 荔枝角' : 'KOWLOON | LAI CHI KOK';
    lines = [
      // Grid mesh
      <line key="g1" x1="0" y1="50" x2="400" y2="50" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g2" x1="0" y1="150" x2="400" y2="150" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g3" x1="0" y1="250" x2="400" y2="250" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g4" x1="100" y1="0" x2="100" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g5" x1="200" y1="0" x2="200" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      <line key="g6" x1="300" y1="0" x2="300" y2="300" stroke="#F1F5F9" strokeWidth="1" />,
      
      // Abstract streets representing Kowloon urban fabric
      <line key="s1" x1="0" y1="110" x2="400" y2="110" stroke="#E2E8F0" strokeWidth="3.5" />, // Lai Chi Kok road
      <line key="s2" x1="0" y1="210" x2="400" y2="210" stroke="#E2E8F0" strokeWidth="2.5" />, // Castle Peak road
      <line key="s3" x1="190" y1="0" x2="190" y2="300" stroke="#CBD5E1" strokeWidth="2" />, // Wing Ming Street
      <line key="s4" x1="300" y1="0" x2="300" y2="300" stroke="#E2E8F0" strokeWidth="1.5" />, // Cheung Sha Wan Road
      
      // West Kowloon ocean waterfront coastline
      <path key="r1" d="M -20,290 C 150,285 240,240 420,230" fill="none" stroke="#E2E8F0" strokeWidth="10" strokeLinecap="round" opacity="0.6" />,
      
      // Street Names (周边路名)
      <text key="t-laichikok" x="10" y="103" fill="#94A3B8" fontSize="10" fontFamily="sans-serif" fontWeight="500">
        {isCN ? '荔枝角道 Lai Chi Kok Rd' : 'Lai Chi Kok Rd'}
      </text>,
      <text key="t-castlepeak" x="10" y="203" fill="#94A3B8" fontSize="10" fontFamily="sans-serif" fontWeight="500">
        {isCN ? '青山道 Castle Peak Rd' : 'Castle Peak Rd'}
      </text>,
      <text key="t-cheungshawan" x="306" y="45" fill="#64748B" fontSize="10" fontFamily="sans-serif" fontWeight="600" transform="rotate(90, 306, 45)">
        {isCN ? '长沙湾道 Cheung Sha Wan Rd' : 'Cheung Sha Wan Rd'}
      </text>,
      <text key="t-wingming" x="196" y="285" fill="#64748B" fontSize="10" fontFamily="sans-serif" fontWeight="500" transform="rotate(90, 196, 285)">
        {isCN ? '永明街 Wing Ming St' : 'Wing Ming St'}
      </text>,
      
      // Area label (区域文字)
      <text key="t-area-hk" x="15" y="40" fill="#94A3B8" fontSize="11" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">
        {isCN ? '九龙 荔枝角 KOWLOON' : 'KOWLOON, LAI CHI KOK'}
      </text>,

      // Target at Wing Ming Street: x=190, y=110
      <g key="target">
        <circle cx="190" cy="110" r="22" fill="#D97706" fillOpacity="0.04" className="animate-pulse" />
        <circle cx="190" cy="110" r="12" fill="#D97706" fillOpacity="0.1" />
        <circle cx="190" cy="110" r="7" fill="#D97706" fillOpacity="0.25" />
        <circle cx="190" cy="110" r="3" fill="#D97706" />
        
        {/* Callout */}
        <polyline points="190,110 220,80 380,80" fill="none" stroke="#D97706" strokeWidth="0.8" opacity="0.8" />
        
        <text x="225" y="71" fontFamily="sans-serif" fontSize="11" fill="#171717" fontWeight="bold">
          {isCN ? 'RDI 香港办公室' : 'RDI HONG KONG'}
        </text>
        <text x="225" y="93" fontFamily="sans-serif" fontSize="10" fill="#737373" fontWeight="normal">
          {isCN ? '永明街3号 泰昌工厂大厦 11楼' : 'Tai Cheong Factory Bldg, 3 Wing Ming St, 11/F'}
        </text>
      </g>
    ];
  } else if (cityCode === 'SZ') {
    landmarkName = isCN ? '深圳福田 | 车公庙' : 'FUTIAN | CHEGONGMIAO';
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
      
      <line key="v1" x1="110" y1="0" x2="110" y2="300" stroke="#CBD5E1" strokeWidth="2.1" />, // Qiaoxiang Rd
      <line key="v2" x1="210" y1="0" x2="210" y2="300" stroke="#CBD5E1" strokeWidth="2" />, // Tairan 9th Rd (passing near target)
      <line key="v3" x1="320" y1="0" x2="320" y2="300" stroke="#E2E8F0" strokeWidth="1.5" />, // Xiangmihu Rd
      
      // Coastline curve of Futian Mangroves
      <path key="r1" d="M -30,280 Q 80,270 120,320" fill="none" stroke="#E2E8F0" strokeWidth="12" strokeLinecap="round" opacity="0.6" />,
      
      // Street Names (周边路名)
      <text key="t-shennan" x="10" y="103" fill="#94A3B8" fontSize="10" fontFamily="sans-serif" fontWeight="500">
        {isCN ? '深南大道 Shennan Blvd' : 'Shennan Blvd'}
      </text>,
      <text key="t-binhe" x="10" y="223" fill="#94A3B8" fontSize="10" fontFamily="sans-serif" fontWeight="500">
        {isCN ? '滨河大道 Binhe Expwy' : 'Binhe Expwy'}
      </text>,
      <text key="t-qiaoxiang" x="116" y="45" fill="#64748B" fontSize="10" fontFamily="sans-serif" fontWeight="600" transform="rotate(90, 116, 45)">
        {isCN ? '侨香路 Qiaoxiang Rd' : 'Qiaoxiang Rd'}
      </text>,
      <text key="t-tairan" x="216" y="285" fill="#64748B" fontSize="10" fontFamily="sans-serif" fontWeight="500" transform="rotate(90, 216, 285)">
        {isCN ? '泰然九路 Tairan 9th Rd' : 'Tairan 9th Rd'}
      </text>,
      
      // Area label (区域文字)
      <text key="t-area-sz" x="235" y="40" fill="#94A3B8" fontSize="11" fontFamily="sans-serif" fontWeight="bold" letterSpacing="1">
        {isCN ? '深圳 福田车公庙' : 'FUTIAN, CHEGONGMIAO'}
      </text>,

      // Target at Chegongmiao Fuchun Building: x=210, y=110
      <g key="target">
        <circle cx="210" cy="110" r="22" fill="#D97706" fillOpacity="0.04" className="animate-pulse" />
        <circle cx="210" cy="110" r="12" fill="#D97706" fillOpacity="0.1" />
        <circle cx="210" cy="110" r="7" fill="#D97706" fillOpacity="0.25" />
        <circle cx="210" cy="110" r="3" fill="#D97706" />
        
        {/* Callout */}
        <polyline points="210,110 235,80 380,80" fill="none" stroke="#D97706" strokeWidth="0.8" opacity="0.8" />
        
        <text x="240" y="71" fontFamily="sans-serif" fontSize="11" fill="#171717" fontWeight="bold">
          {isCN ? 'RDI 深圳办公室' : 'RDI SHENZHEN'}
        </text>
        <text x="240" y="93" fontFamily="sans-serif" fontSize="10" fill="#737373" fontWeight="normal">
          {isCN ? '车公庙 杭钢富春大厦 2804B' : 'Hanggang Fuchun Bldg, Rm 2804B'}
        </text>
      </g>
    ];
  } else {
    // Fallback/NY dummy structure just in case
    landmarkName = isCN ? '曼哈顿 | 中城' : 'MANHATTAN | MIDTOWN';
    lines = [
      <g key="target">
        <circle cx="200" cy="150" r="8" fill="#D97706" />
        <text x="210" y="154" fill="#171717" fontSize="11" fontWeight="bold">RDI OFFICE</text>
      </g>
    ];
  }

  // Calculate coordinates for OpenStreetMap Iframe
  const getCoords = (code: string) => {
    switch (code) {
      case 'SH': return { lat: 31.2985, lng: 121.4880 };
      case 'SZ': return { lat: 22.5323, lng: 114.0253 };
      case 'HK': return { lat: 22.3384, lng: 114.1481 };
      default: return { lat: 31.2985, lng: 121.4880 };
    }
  };

  const coords = getCoords(cityCode);
  const delta = 0.0035;
  const bbox = `${coords.lng - delta}%2C${coords.lat - delta}%2C${coords.lng + delta}%2C${coords.lat + delta}`;
  const iframeUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${coords.lat}%2C${coords.lng}`;

  return (
    <div className="w-full h-full bg-[#FCFCFC] p-6 md:p-8 flex flex-col justify-between relative select-none rounded-sm border border-neutral-100">
      {/* Target coordinates & Switcher */}
      <div className="flex justify-between items-center text-[10px] font-mono text-neutral-400 tracking-widest uppercase mb-1">
        <div className="flex gap-4">
          <span>LAT: {lat}</span>
          <span>LNG: {lng}</span>
        </div>
        
        {/* Switcher Tab */}
        <div className="flex gap-1.5 items-center bg-neutral-100/80 p-0.5 rounded-sm">
          <button 
            onClick={() => setViewMode('vector')}
            className={`px-2 py-0.5 text-[9px] font-bold tracking-wider rounded-xs uppercase transition-all duration-200 cursor-pointer ${
              viewMode === 'vector' 
                ? 'bg-white text-neutral-900 shadow-xs' 
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            {isCN ? '矢量地图' : 'Vector Map'}
          </button>
          <button 
            onClick={() => setViewMode('real')}
            className={`px-2 py-0.5 text-[9px] font-bold tracking-wider rounded-xs uppercase transition-all duration-200 cursor-pointer ${
              viewMode === 'real' 
                ? 'bg-white text-neutral-900 shadow-xs' 
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            {isCN ? '实景地图' : 'Interactive Map'}
          </button>
        </div>
      </div>

      {/* Map Content Container */}
      <div className="w-full flex-grow flex items-center justify-center my-6 min-h-[400px] max-h-[520px] overflow-hidden rounded-sm bg-neutral-50">
        {viewMode === 'vector' ? (
          <svg viewBox="0 0 400 300" className="w-full h-full max-h-[440px]" fill="none" xmlns="http://www.w3.org/2000/svg">
            {lines}
          </svg>
        ) : (
          <iframe
            src={iframeUrl}
            className="w-full h-full min-h-[440px] max-h-[440px] border-0"
            style={{ 
              filter: 'grayscale(0.95) contrast(1.1) brightness(0.96)',
              mixBlendMode: 'multiply'
            }}
            title={`${cityCode} Real Map`}
            loading="lazy"
          />
        )}
      </div>

      {/* Bottom scale bar */}
      <div className="flex justify-between items-end text-[10px] font-mono text-neutral-400 tracking-wider">
        <div className="space-y-0.5">
          <div className="font-bold text-neutral-600 uppercase tracking-widest">{landmarkName}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-1.5 font-bold text-neutral-400">
            <span className="w-12 h-[1px] bg-neutral-200 block"></span>
            <span>
              {viewMode === 'vector' 
                ? (isCN ? '200 米' : '200 METERS') 
                : (isCN ? '可缩放 / 平移' : 'ZOOM / PAN')
              }
            </span>
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
  cityCode: 'SH' | 'HK' | 'SZ';
  lang: Language;
  key?: string | number;
}

function OfficeSection({ city, cityCN, title, description, phone, email, address, lat, lng, cityCode, lang }: OfficeProps) {
  const isCN = lang === 'cn';
  return (
    <section className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Texts Info Pane */}
        <div className="lg:col-span-5 flex flex-col justify-center space-y-6 pr-0 lg:pr-6">
          <div className="space-y-2">
            <h2 className="text-xl md:text-2xl font-bold tracking-widest text-black flex items-baseline gap-3 uppercase">
              <span>{city}</span>
              <span className="text-sm font-light text-neutral-400">{cityCN}</span>
            </h2>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed font-light">
            {description}
          </p>

          <div className="space-y-6 pt-6 border-t border-neutral-100">
            <div className="space-y-1">
              <span className="text-sm text-neutral-400 uppercase tracking-wider block">
                {isCN ? '地址' : 'Address'}
              </span>
              <p className="text-sm text-neutral-800 leading-relaxed font-light">{address}</p>
            </div>

            {phone && (
              <div className="space-y-1">
                <span className="text-sm text-neutral-400 uppercase tracking-wider block">
                  {isCN ? '电话' : 'Phone'}
                </span>
                <p className="text-sm text-neutral-800 font-mono font-light">{phone}</p>
              </div>
            )}

            <div className="space-y-1">
              <span className="text-sm text-neutral-400 uppercase tracking-wider block">
                {isCN ? '邮箱' : 'Email'}
              </span>
              <a href={`mailto:${email}`} className="text-sm text-neutral-800 font-mono hover:text-amber-500 hover:underline font-light block">{email}</a>
            </div>
          </div>
        </div>

        {/* Minimal Vector Map Pane */}
        <div className="lg:col-span-7 h-auto min-h-[560px]">
          <MinimalistMap cityCode={cityCode} lat={lat} lng={lng} lang={lang} />
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
  const officesList: Omit<OfficeProps, 'lang'>[] = [
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
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-white min-h-screen px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-[1280px]">
        
        {/* Editorial Title Header */}
        <section className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold tracking-tight text-black uppercase mb-6"
          >
            {lang === 'cn' ? '联系我们' : 'Contact Us'}
          </motion.h1>
        </section>

        {/* Global Contacts Highlights Panel */}
        <section className="mb-20">
          <div className="bg-transparent border-t border-b border-neutral-100 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start text-left">
              <div className="space-y-3">
                <span className="text-sm font-mono text-neutral-400 tracking-wider uppercase block">
                  {lang === 'cn' ? '商务咨询热线' : 'BUSINESS DEVELOPMENT LINE'}
                </span>
                <p className="text-lg md:text-xl font-mono font-bold text-neutral-900 tracking-tight leading-relaxed select-all">
                  T: 86 21 5510 0690 * 824<br/>
                  M: 86 18918779455
                </p>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  {lang === 'cn' ? '北京时间 09:00 - 18:00 (上海总部)，提供全领域方案咨询' : 'Operation hours: Monday to Friday (GMT+8), providing prompt custom solutions.'}
                </p>
              </div>

              <div className="space-y-3">
                <span className="text-sm font-mono text-neutral-400 tracking-wider uppercase block">
                  {lang === 'cn' ? '全球通用邮箱' : 'GLOBAL CENTRAL INBOX'}
                </span>
                <a 
                  href="mailto:info@rdilighting.com" 
                  className="text-lg md:text-xl font-mono font-bold text-neutral-900 hover:text-amber-600 hover:underline transition-colors block select-all"
                >
                  info@rdilighting.com
                </a>
                <p className="text-sm text-neutral-500 font-light leading-relaxed">
                  {lang === 'cn' ? '对所有办公室的招标计划及学术探讨通常在 24 小时内归档回复' : 'All incoming messages across branches usually receive responses within 24 hours.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Global Offices Map/Address Listing */}
        <section className="space-y-12">
          <h2 className="text-xl md:text-2xl font-bold mb-6 uppercase tracking-wider text-black">
            {lang === 'cn' ? '全球办公室' : 'Worldwide Offices'}
          </h2>
          
          <div className="space-y-12">
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
                lang={lang}
              />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
